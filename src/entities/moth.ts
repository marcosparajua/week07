export type Moth = {
  id: string;
  type: string;
  description: string;
  location: string;
  isExtinct: boolean;
};

export type MothCreateDto = {
  type: string;
  description: string;
  location: string;
  isExtinct: boolean;
  collectorId: string;
};
