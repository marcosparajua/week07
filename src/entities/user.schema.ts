import Joi from 'joi';
import { type UserCreateDto } from './user.js';

export const userCreateDtoSchema = Joi.object<UserCreateDto>({
  email: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().default(''),
});

export const userUpdateDtoSchema = Joi.object<UserCreateDto>({
  email: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().default(''),
});
