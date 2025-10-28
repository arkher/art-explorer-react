import type { Artwork, ArtworkSearchResult, Department } from '../entities/Artwork';

export interface ArtworkRepository {
  searchArtworks(params: {
    query?: string;
    hasImages?: boolean;
    departmentId?: number;
    artistOrCulture?: boolean;
  }): Promise<ArtworkSearchResult>;
  
  getArtworkDetails(objectID: number): Promise<Artwork>;
  
  getDepartments(): Promise<Department[]>;
}

