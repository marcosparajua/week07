import Joi from 'joi';
import { type ArtistCreateDto } from './artist.js';

export const artistCreateDtoSchema = Joi.object<ArtistCreateDto>({
  name: Joi.string().required(),
  medium: Joi.string().required(),

  isAlive: Joi.boolean().default(false),
});

export const artistUpdateDtoSchema = Joi.object<ArtistCreateDto>({
  name: Joi.string(),
  medium: Joi.string(),

  isAlive: Joi.boolean(),
});
