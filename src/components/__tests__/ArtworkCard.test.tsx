import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ArtworkCard } from '../ArtworkCard';
import artworkReducer from '@/store/slices/artworkSlice';
import favoriteReducer from '@/store/slices/favoriteSlice';
import type { Artwork } from '@/domain/entities/Artwork';

const mockArtwork: Artwork = {
  objectID: 1,
  title: 'Test Artwork',
  primaryImage: 'https://example.com/image.jpg',
  artistDisplayName: 'Test Artist',
  objectDate: '2024',
  medium: 'Oil on canvas',
  department: 'Test Department',
  culture: 'Test',
  period: '',
  dynasty: '',
  reign: '',
  portfolio: '',
  artistRole: '',
  artistPrefix: '',
  artistDisplayName0: '',
  artistSuffix: '',
  objectName: '',
  titleType: '',
  objectNumber: '',
  locale: '',
  Locus: '',
  excavation: '',
  river: '',
  classification: '',
  rightsAndReproduction: '',
  linkResource: '',
  objectURL: 'https://example.com',
  metadataDate: '',
  repository: '',
  tags: [],
  isHighlight: false,
  isPublicDomain: true,
  accessionNumber: '123',
  accessionYear: '2024',
  subregion: '',
  region: '',
  artistDisplayBio: '',
  objectBeginDate: 2024,
  objectEndDate: 2024,
  primaryImageSmall: '',
};

describe('ArtworkCard', () => {
  const createMockStore = () => {
    return configureStore({
      reducer: {
        artwork: artworkReducer,
        favorite: favoriteReducer,
      },
    });
  };

  it('renders artwork information', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ArtworkCard artwork={mockArtwork} />
      </Provider>
    );

    expect(screen.getByText('Test Artwork')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
  });

  it('toggles favorite when heart button is clicked', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ArtworkCard artwork={mockArtwork} />
      </Provider>
    );

    const heartButton = screen.getByRole('button');
    fireEvent.click(heartButton);

    // Check if favorite was added to store
    const state = store.getState();
    expect(state.favorite.favorites).toHaveLength(1);
  });
});


