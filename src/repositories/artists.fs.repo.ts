/* eslint-disable @typescript-eslint/member-ordering */
import { readFile, writeFile } from 'fs/promises';
import createDebug from 'debug';
import { type ArtistCreateDto, type Artist } from '../entities/artist.js';

import { HttpError } from '../middleware/errors.middleware.js';
const debug = createDebug('W7E:articles:repository:fs');

export class ArtistsFsRepo {
  constructor() {
    debug('Instantiated artists fs repository');
  }

  private async load(): Promise<Artist[]> {
    const data = await readFile('artists.json', 'utf-8');
    return JSON.parse(data) as Artist[];
  }

  private async save(artists: Artist[]) {
    await writeFile('artists.json', JSON.stringify(artists, null, 2));
  }

  async readAll() {
    const artists = await this.load();
    return artists;
  }

  async readById(id: string) {
    const artists = await this.load();
    const artist = artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpError(404, 'Not Found', `Artist ${id} not found`);
    }

    return artist;
  }

  async create(data: ArtistCreateDto) {
    const newArtist: Artist = {
      id: crypto.randomUUID(),

      ...data,
    };
    let artists = await this.load();
    artists = [...artists, newArtist];
    await this.save(artists);
    return newArtist;
  }

  async update(id: string, data: Partial<Artist>) {
    let artists = await this.load();
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpError(404, 'Not Found', `Artist ${id} not found`);
    }

    const newArtist: Artist = { ...artist, ...data };
    artists = artists.map((artist) => (artist.id === id ? newArtist : artist));
    await this.save(artists);
    return newArtist;
  }

  async delete(id: string) {
    const artists = await this.load();
    const foundArtist = artists.find((artist) => artist.id === id);
    if (!foundArtist) {
      throw new HttpError(404, 'Not Found', `Artist ${id} not found`);
    }

    const updatedArtists = artists.filter((artist) => artist.id !== id);
    await this.save(updatedArtists);
    return foundArtist;
  }
}
