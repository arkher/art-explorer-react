import type { Artwork } from "./Artwork";

export interface Favorite {
  objectID: number;
  addedAt: number;
  artwork: Artwork;
}

