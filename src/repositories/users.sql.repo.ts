/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type PrismaClient, type User } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type UserCreateDto } from '../entities/user.js';

const debug = createDebug('W7E:users :repository:sql');

export class UsersSqlRepo {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated moths sql repository');
  }

  async readAll() {
    const users = await this.prisma.user.findMany({
      distinct: ['createdAt', 'updatedAt'],
    });
    return users;
  }

  async readById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        password: true,
        name: true,
        role: true,
      },
    });
    if (!user) {
      throw new HttpError(404, 'Not Found', ` ${id} not found`);
    }

    return user;
  }

  async create(data: UserCreateDto) {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: string, data: Partial<UserCreateDto>): Promise<User> {
    let user: User;
    try {
      user = await this.prisma.user.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw new HttpError(404, 'Not Found', `${id} not found`);
    }

    return user;
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
