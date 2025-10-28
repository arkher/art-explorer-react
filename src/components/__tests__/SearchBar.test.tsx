import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SearchBar } from '../SearchBar';
import artworkReducer from '@/store/slices/artworkSlice';
import favoriteReducer from '@/store/slices/favoriteSlice';

const createMockStore = () => {
  return configureStore({
    reducer: {
      artwork: artworkReducer,
      favorite: favoriteReducer,
    },
  });
};

describe('SearchBar', () => {
  it('renders search input', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/buscar obras/i);
    expect(input).toBeInTheDocument();
  });

  it('updates search query on input change', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/buscar obras/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test query' } });

    expect(input.value).toBe('test query');
  });

  it('triggers search on button click', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/buscar obras/i);
    const button = screen.getByRole('button', { name: /buscar/i });

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);

    const state = store.getState();
    expect(state.artwork.searchQuery).toBe('test');
  });
});


