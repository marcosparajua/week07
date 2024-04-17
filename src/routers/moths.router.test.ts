import { type MothsController } from '../controllers/moths.controller';
import { MothsRouter } from './moths.router';

describe('Given a instance of the class MothsRouter', () => {
  const controller = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as MothsController;
  const router = new MothsRouter(controller);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(MothsRouter);
  });
});
