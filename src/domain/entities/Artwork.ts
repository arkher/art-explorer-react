export interface Artwork {
  objectID: number;
  title: string;
  primaryImage?: string;
  primaryImageSmall?: string;
  artistDisplayName: string;
  artistDisplayBio: string;
  objectDate: string;
  objectBeginDate: number;
  objectEndDate: number;
  medium: string;
  department: string;
  culture: string;
  period: string;
  dynasty: string;
  reign: string;
  portfolio: string;
  artistRole: string;
  artistPrefix: string;
  artistDisplayName0: string;
  artistSuffix: string;
  objectName: string;
  titleType: string;
  objectNumber: string;
  locale: string;
  Locus: string;
  excavation: string;
  river: string;
  classification: string;
  rightsAndReproduction: string;
  linkResource: string;
  objectURL: string;
  metadataDate: string;
  repository: string;
  tags: Array<{ term: string; AAT_URL: string; Wikidata_URL: string }>;
  isHighlight: boolean;
  isPublicDomain: boolean;
  accessionNumber: string;
  accessionYear: string;
  subregion: string;
  region: string;
  isFavorite?: boolean;
}

export interface ArtworkSearchResult {
  total: number;
  objectIDs: number[];
}

export interface Department {
  departmentId: number;
  displayName: string;
}

