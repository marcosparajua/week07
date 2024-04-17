export type Moth = {
  id: string;
  type: string;
  description: string;
  location: string;
  isExtinct: boolean;
  collectorId?: string;
  collector?: string;
};

export type MothCreateDto = {
  type: string;
  description: string;
  location: string;
  isExtinct: boolean;
  collectorId?: string;
  collector?: string;
};
