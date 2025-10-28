import type { FavoriteRepository } from '@/domain/repositories/FavoriteRepository';
import type { Artwork } from '@/domain/entities/Artwork';
import type { Favorite } from '@/domain/entities/Favorite';

export class FavoriteService {
  private repository: FavoriteRepository;

  constructor(repository: FavoriteRepository) {
    this.repository = repository;
  }

  async addFavorite(artwork: Artwork): Promise<void> {
    await this.repository.addFavorite(artwork);
  }

  async removeFavorite(objectID: number): Promise<void> {
    await this.repository.removeFavorite(objectID);
  }

  async getFavorites(): Promise<Favorite[]> {
    return this.repository.getFavorites();
  }

  async toggleFavorite(artwork: Artwork): Promise<boolean> {
    const isFavorite = await this.repository.isFavorite(artwork.objectID);
    
    if (isFavorite) {
      await this.repository.removeFavorite(artwork.objectID);
      return false;
    } else {
      await this.repository.addFavorite(artwork);
      return true;
    }
  }

  async isFavorite(objectID: number): Promise<boolean> {
    return this.repository.isFavorite(objectID);
  }
}

