import type { FavoriteRepository } from '@/domain/repositories/FavoriteRepository';
import type { Favorite } from '@/domain/entities/Favorite';
import type { Artwork } from '@/domain/entities/Artwork';

const FAVORITES_KEY = 'art-explorer-favorites';

export class LocalStorageFavoriteRepository implements FavoriteRepository {
  async addFavorite(artwork: Artwork): Promise<void> {
    const favorites = this.getFavoritesFromStorage();
    
    if (favorites.find(f => f.objectID === artwork.objectID)) {
      return; // Already exists
    }

    const favorite: Favorite = {
      objectID: artwork.objectID,
      addedAt: Date.now(),
      artwork,
    };

    favorites.push(favorite);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }

  async removeFavorite(objectID: number): Promise<void> {
    const favorites = this.getFavoritesFromStorage();
    const filtered = favorites.filter(f => f.objectID !== objectID);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  }

  async getFavorites(): Promise<Favorite[]> {
    return this.getFavoritesFromStorage();
  }

  async isFavorite(objectID: number): Promise<boolean> {
    const favorites = this.getFavoritesFromStorage();
    return favorites.some(f => f.objectID === objectID);
  }

  private getFavoritesFromStorage(): Favorite[] {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}


