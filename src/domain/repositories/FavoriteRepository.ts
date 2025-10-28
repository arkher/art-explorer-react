import type { Favorite } from '../entities/Favorite';
import type { Artwork } from '../entities/Artwork';

export interface FavoriteRepository {
  addFavorite(artwork: Artwork): Promise<void>;
  removeFavorite(objectID: number): Promise<void>;
  getFavorites(): Promise<Favorite[]>;
  isFavorite(objectID: number): Promise<boolean>;
}

