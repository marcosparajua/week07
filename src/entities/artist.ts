export type Artist = {
  id: string;
  name: string;
  medium: string;

  isAlive: boolean;
};

export type ArtistCreateDto = {
  name: string;
  medium: string;

  isAlive: boolean;
};
