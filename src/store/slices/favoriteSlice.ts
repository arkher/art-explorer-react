import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LocalStorageFavoriteRepository } from '@/infrastructure/storage/LocalStorageFavoriteRepository';
import { FavoriteService } from '@/application/services/FavoriteService';
import type { Artwork } from '@/domain/entities/Artwork';
import type { Favorite } from '@/domain/entities/Favorite';

interface FavoriteState {
  favorites: Favorite[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoriteRepository = new LocalStorageFavoriteRepository();
const favoriteService = new FavoriteService(favoriteRepository);

export const loadFavorites = createAsyncThunk('favorite/load', async () => {
  return await favoriteService.getFavorites();
});

export const toggleFavorite = createAsyncThunk(
  'favorite/toggle',
  async (artwork: Artwork) => {
    const result = await favoriteService.toggleFavorite(artwork);
    return { artwork, isFavorite: result };
  }
);

export const addFavorite = createAsyncThunk('favorite/add', async (artwork: Artwork) => {
  await favoriteService.addFavorite(artwork);
  return artwork;
});

export const removeFavorite = createAsyncThunk('favorite/remove', async (objectID: number) => {
  await favoriteService.removeFavorite(objectID);
  return objectID;
});

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favorites.push({
            objectID: action.payload.artwork.objectID,
            addedAt: Date.now(),
            artwork: action.payload.artwork,
          });
        } else {
          state.favorites = state.favorites.filter(
            f => f.objectID !== action.payload.artwork.objectID
          );
        }
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const favorite: Favorite = {
          objectID: action.payload.objectID,
          addedAt: Date.now(),
          artwork: action.payload,
        };
        state.favorites.push(favorite);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(f => f.objectID !== action.payload);
      });
  },
});

export default favoriteSlice.reducer;

