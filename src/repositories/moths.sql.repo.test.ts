import { type Moth, type PrismaClient } from '@prisma/client';
import { MothsSqlRepo } from './moths.sql.repo';
import { type MothCreateDto } from '../entities/moth';

const mockPrisma = {
  moth: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
  },
} as unknown as PrismaClient;

describe('given an instance of MothsSqlRepository', () => {
  const repo = new MothsSqlRepo(mockPrisma);

  test('then there should be an instance of MothsSqlRepository', () => {
    expect(repo).toBeInstanceOf(MothsSqlRepo);
  });

  test('then readAll should call prisma.moth.findMany', async () => {
    const result = await repo.readAll();
    expect(mockPrisma.moth.findMany).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
  test('when we use the method create', async () => {
    const data = {} as unknown as MothCreateDto;
    const result = await repo.create(data);
    expect(mockPrisma.moth.create).toHaveBeenCalled();
    expect(result).toEqual({});
  });
  describe('when we use the method update', () => {
    test('then it should call prisma.moth.update', async () => {
      const id = '1';
      const data = {} as unknown as Partial<MothCreateDto>;
      const result = await repo.update(id, data);
      expect(mockPrisma.moth.update).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
  describe('when we use the method delete', () => {
    test('then it should call prisma.moth.delete', async () => {
      const id = '1';
      const result = await repo.delete(id);
      expect(mockPrisma.moth.delete).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
  describe('when we use the method readById', () => {
    test('then it should call prisma.moth.findUnique', async () => {
      const id = '1';
      const result = await repo.readById(id);
      expect(mockPrisma.moth.findUnique).toHaveBeenCalled();
      expect(result).toEqual({});
    });
    test('then it should throw an error if moth is not found', async () => {
      await mockPrisma.moth.findUnique({ where: { id: '1' } });
    });
  });
});
