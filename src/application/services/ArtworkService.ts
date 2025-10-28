import type { ArtworkRepository } from '@/domain/repositories/ArtworkRepository';
import type { Artwork, Department } from '@/domain/entities/Artwork';

export class ArtworkService {
  private repository: ArtworkRepository;

  constructor(repository: ArtworkRepository) {
    this.repository = repository;
  }

  async searchWithImages(query?: string, departmentId?: number, artistOrCulture = false): Promise<number[]> {
    const result = await this.repository.searchArtworks({
      query,
      hasImages: true,
      departmentId,
      artistOrCulture,
    });
    return result.objectIDs;
  }

  async getArtworkDetails(objectID: number): Promise<Artwork> {
    return this.repository.getArtworkDetails(objectID);
  }

  async getDepartments(): Promise<Department[]> {
    return this.repository.getDepartments();
  }

  async getArtworksBatch(objectIDs: number[], startIndex: number, batchSize: number): Promise<Artwork[]> {
    const endIndex = Math.min(startIndex + batchSize, objectIDs.length);
    const batch = objectIDs.slice(startIndex, endIndex);
    
    const artworks = await Promise.all(
      batch.map(id => this.getArtworkDetails(id))
    );
    
    return artworks;
  }
}

