import express from 'express';
import { createApp, startApp } from './app.js';
import { type PrismaClient } from '@prisma/client';

describe('Given the function createApp ', () => {
  test('Then it should be call and return app', () => {
    const app = createApp();
    expect(app).toBeDefined();
  });

  describe('Given the function startApp', () => {
    test('Then it should call app.use', () => {
      const app = express();
      const prisma = {} as unknown as PrismaClient;

      jest.spyOn(app, 'use');

      startApp(app, prisma);

      expect(app.use).toHaveBeenCalled();
    });
  });
});
