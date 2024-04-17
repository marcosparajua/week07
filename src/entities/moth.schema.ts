import Joi from 'joi';
import { type MothCreateDto } from './moth';

export const mothCreateDtoSchema = Joi.object<MothCreateDto>({
  type: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().default(''),
  isExtinct: Joi.boolean().default(false),
});

export const mothUpdateDtoSchema = Joi.object<MothCreateDto>({
  type: Joi.string(),
  description: Joi.string(),
  location: Joi.string(),
  isExtinct: Joi.boolean(),
});
