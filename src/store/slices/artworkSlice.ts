import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MetMuseumApi } from '@/infrastructure/http/MetMuseumApi';
import { ArtworkService } from '@/application/services/ArtworkService';
import type { Artwork, Department } from '@/domain/entities/Artwork';

interface ArtworkState {
  objectIDs: number[];
  artworks: Artwork[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  departments: Department[];
  selectedDepartment: number | null;
  searchQuery: string;
  artistOrCulture: boolean;
}

const initialState: ArtworkState = {
  objectIDs: [],
  artworks: [],
  loading: false,
  error: null,
  hasMore: true,
  currentPage: 0,
  departments: [],
  selectedDepartment: null,
  searchQuery: '',
  artistOrCulture: false,
};

const artworkRepository = new MetMuseumApi();
const artworkService = new ArtworkService(artworkRepository);

export const searchArtworks = createAsyncThunk(
  'artwork/search',
  async ({ query, departmentId, artistOrCulture }: { query?: string; departmentId?: number; artistOrCulture?: boolean }) => {
    const objectIDs = await artworkService.searchWithImages(query, departmentId, artistOrCulture);
    const artworks = await artworkService.getArtworksBatch(objectIDs, 0, 15);
    return { objectIDs, artworks };
  }
);

export const loadMoreArtworks = createAsyncThunk(
  'artwork/loadMore',
  async (_, { getState }) => {
    const state = getState() as { artwork: ArtworkState };
    const { objectIDs, currentPage } = state.artwork;
    
    if (currentPage * 15 >= objectIDs.length) {
      throw new Error('No more artworks');
    }
    
    const artworks = await artworkService.getArtworksBatch(objectIDs, currentPage * 15 + 15, 15);
    return artworks;
  }
);

export const loadDepartments = createAsyncThunk(
  'artwork/loadDepartments',
  async () => {
    return await artworkService.getDepartments();
  }
);

const artworkSlice = createSlice({
  name: 'artwork',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedDepartment: (state, action: PayloadAction<number | null>) => {
      state.selectedDepartment = action.payload;
    },
    setArtistOrCulture: (state, action: PayloadAction<boolean>) => {
      state.artistOrCulture = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchArtworks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchArtworks.fulfilled, (state, action) => {
        state.loading = false;
        state.objectIDs = action.payload.objectIDs;
        state.artworks = action.payload.artworks;
        state.currentPage = 1;
        state.hasMore = action.payload.objectIDs.length > 15;
      })
      .addCase(searchArtworks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar obras';
      })
      .addCase(loadMoreArtworks.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMoreArtworks.fulfilled, (state, action) => {
        state.artworks = [...state.artworks, ...action.payload];
        state.currentPage += 1;
        state.hasMore = state.objectIDs.length > state.artworks.length;
      })
      .addCase(loadMoreArtworks.rejected, (state) => {
        state.loading = false;
        state.hasMore = false;
      })
      .addCase(loadDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
      });
  },
});

export const { clearError, setSearchQuery, setSelectedDepartment, setArtistOrCulture } = artworkSlice.actions;
export default artworkSlice.reducer;

