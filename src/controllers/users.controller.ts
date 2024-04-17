/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextFunction, type Request, type Response } from 'express';
import createDebug from 'debug';
import { type UserCreateDto, type User } from '../entities/user.js';

import { HttpError } from '../middleware/errors.middleware.js';

import {
  userCreateDtoSchema,
  userUpdateDtoSchema,
} from '../entities/user.schema.js';
import { type UsersSqlRepo } from '../repositories/users.sql.repo.js';

const debug = createDebug('W7E:moths:controller');

export class UsersController {
  constructor(private readonly repo: UsersSqlRepo) {
    debug('Instantiated moth controller');
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.readAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await this.repo.readById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body as User;

    const {
      error,

      value,
    }: { error: Error | undefined; value: UserCreateDto } =
      userCreateDtoSchema.validate(data, {
        abortEarly: false,
      });

    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.create(value);
      res.status(201);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = req.body as User;

    const { error } = userUpdateDtoSchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.update(id, data);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await this.repo.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
