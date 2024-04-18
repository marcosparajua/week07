/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Moth, type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type MothCreateDto } from '../entities/moth';
import {} from '@prisma/client';

const debug = createDebug('W7E:moths :repository:sql');
const select = {
  type: true,
  description: true,
  location: true,
  isExtinct: true,
  collectorId: true,
  collector: {
    select: {
      name: true,
      email: true,
    },
  },
};

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
      select,
    });
    if (!moth) {
      throw new HttpError(404, 'Not Found', ` ${id} not found`);
    }

    return moth;
  }

  async create(data: MothCreateDto) {
    return this.prisma.moth.create({
      data: {
        type: data.type,
        description: data.description,
        location: data.location,
        isExtinct: data.isExtinct,
        collectorId: data.collectorId,
        collector: { connect: { id: data.collectorId } } as any,
      },
      select,
    });
  }

  async update(id: string, data: Partial<MothCreateDto>): Promise<Moth> {
    let moth: Moth;
    try {
      moth = await this.prisma.moth.update({
        where: {
          id,
        },
        data: {
          type: data.type,
          description: data.description,
          location: data.location,
          isExtinct: data.isExtinct,
          collectorId: data.collectorId,
          collector: { connect: { id: data.collectorId } } as any,
        },
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
