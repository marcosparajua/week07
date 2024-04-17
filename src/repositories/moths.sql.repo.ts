import { type Moth, type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type MothCreateDto } from '../entities/moth';

const debug = createDebug('W7E:moths :repository:sql');

export class MothsSqlRepo {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated moths sql repository');
  }

  async readAll() {
    const moths = await this.prisma.moth.findMany({
      distinct: ['createdAt', 'updatedAt'],
    });
    return moths;
  }

  async readById(id: string) {
    const moth = await this.prisma.moth.findUnique({
      where: {
        id,
      },
      select: {
        type: true,
        description: true,
        location: true,
        isExtinct: true,
      },
    });
    if (!moth) {
      throw new HttpError(404, 'Not Found', ` ${id} not found`);
    }

    return moth;
  }

  async create(data: MothCreateDto) {
    return this.prisma.moth.create({
      data,
    });
  }

  async update(id: string, data: Partial<MothCreateDto>): Promise<Moth> {
    let moth: Moth;
    try {
      moth = await this.prisma.moth.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw new HttpError(404, 'Not Found', `${id} not found`);
    }

    return moth;
  }

  async delete(id: string) {
    return this.prisma.moth.delete({
      where: {
        id,
      },
    });
  }
}
