import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import artworkReducer from './slices/artworkSlice';
import favoriteReducer from './slices/favoriteSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorite'],
};

const persistedFavoriteReducer = persistReducer(persistConfig, favoriteReducer);

export const store = configureStore({
  reducer: {
    artwork: artworkReducer,
    favorite: persistedFavoriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


