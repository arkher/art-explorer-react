import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { MetMuseumApi } from '../http/MetMuseumApi';

vi.mock('axios');
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };

describe('MetMuseumApi', () => {
  let api: MetMuseumApi;

  beforeEach(() => {
    api = new MetMuseumApi();
    vi.clearAllMocks();
  });

  it('searches artworks with parameters', async () => {
    const mockResponse = {
      data: {
        total: 100,
        objectIDs: [1, 2, 3, 4, 5],
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await api.searchArtworks({
      query: 'painting',
      hasImages: true,
    });

    expect(result).toEqual(mockResponse.data);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('hasImages=true&q=painting')
    );
  });

  it('gets artwork details by ID', async () => {
    const mockArtwork = {
      objectID: 1,
      title: 'Test Artwork',
      artistDisplayName: 'Test Artist',
    };

    mockedAxios.get.mockResolvedValue({ data: mockArtwork });

    const result = await api.getArtworkDetails(1);

    expect(result).toEqual(mockArtwork);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/objects/1')
    );
  });

  it('gets list of departments', async () => {
    const mockDepartments = {
      departments: [
        { departmentId: 1, displayName: 'Test Department' },
      ],
    };

    mockedAxios.get.mockResolvedValue({ data: mockDepartments });

    const result = await api.getDepartments();

    expect(result).toEqual(mockDepartments.departments);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/departments')
    );
  });
});


