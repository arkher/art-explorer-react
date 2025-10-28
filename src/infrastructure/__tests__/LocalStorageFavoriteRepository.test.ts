import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LocalStorageFavoriteRepository } from '../storage/LocalStorageFavoriteRepository';
import type { Artwork } from '@/domain/entities/Artwork';

describe('LocalStorageFavoriteRepository', () => {
  let repository: LocalStorageFavoriteRepository;
  let localStorageMock: Storage;

  beforeEach(() => {
    repository = new LocalStorageFavoriteRepository();
    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    };
    global.localStorage = localStorageMock as Storage;
    vi.clearAllMocks();
  });

  it('adds favorite to localStorage', async () => {
    const mockArtwork: Artwork = {
      objectID: 1,
      title: 'Test',
      artistDisplayName: 'Artist',
      objectDate: '2024',
      medium: '',
      department: '',
      culture: '',
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
      objectURL: '',
      metadataDate: '',
      repository: '',
      tags: [],
      isHighlight: false,
      isPublicDomain: true,
      accessionNumber: '',
      accessionYear: '',
      subregion: '',
      region: '',
      artistDisplayBio: '',
      objectBeginDate: 2024,
      objectEndDate: 2024,
      primaryImageSmall: '',
    };

    localStorageMock.getItem = vi.fn().mockReturnValue('[]');

    await repository.addFavorite(mockArtwork);

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('retrieves favorites from localStorage', async () => {
    const mockFavorites = [
      {
        objectID: 1,
        addedAt: Date.now(),
        artwork: {} as Artwork,
      },
    ];

    localStorageMock.getItem = vi.fn().mockReturnValue(JSON.stringify(mockFavorites));

    const favorites = await repository.getFavorites();

    expect(favorites).toEqual(mockFavorites);
  });

  it('removes favorite from localStorage', async () => {
    const mockFavorites = [
      {
        objectID: 1,
        addedAt: Date.now(),
        artwork: {} as Artwork,
      },
    ];

    localStorageMock.getItem = vi.fn().mockReturnValue(JSON.stringify(mockFavorites));

    await repository.removeFavorite(1);

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('checks if artwork is favorite', async () => {
    const mockFavorites = [
      {
        objectID: 1,
        addedAt: Date.now(),
        artwork: {} as Artwork,
      },
    ];

    localStorageMock.getItem = vi.fn().mockReturnValue(JSON.stringify(mockFavorites));

    const isFavorite = await repository.isFavorite(1);
    const isNotFavorite = await repository.isFavorite(2);

    expect(isFavorite).toBe(true);
    expect(isNotFavorite).toBe(false);
  });
});


