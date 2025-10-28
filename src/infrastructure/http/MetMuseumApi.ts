import axios from 'axios';
import type { ArtworkRepository } from '@/domain/repositories/ArtworkRepository';
import type { Artwork, ArtworkSearchResult, Department } from '@/domain/entities/Artwork';

const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export class MetMuseumApi implements ArtworkRepository {
  async searchArtworks(params: {
    query?: string;
    hasImages?: boolean;
    departmentId?: number;
    artistOrCulture?: boolean;
  }): Promise<ArtworkSearchResult> {
    const searchParams = new URLSearchParams();
    
    if (params.query) searchParams.append('q', params.query);
    if (params.hasImages) searchParams.append('hasImages', 'true');
    if (params.departmentId) searchParams.append('departmentId', params.departmentId.toString());
    if (params.artistOrCulture) searchParams.append('artistOrCulture', 'true');

    const response = await axios.get<ArtworkSearchResult>(
      `${API_BASE_URL}/search?${searchParams.toString()}`
    );
    return response.data;
  }

  async getArtworkDetails(objectID: number): Promise<Artwork> {
    const response = await axios.get<Artwork>(
      `${API_BASE_URL}/objects/${objectID}`
    );
    return response.data;
  }

  async getDepartments(): Promise<Department[]> {
    const response = await axios.get<{ departments: Department[] }>(
      `${API_BASE_URL}/departments`
    );
    return response.data.departments;
  }
}

