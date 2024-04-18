import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { ArtistsController } from './controllers/artists.controller.js';
import { ArtistsRouter } from './routers/artists.router.js';
import { ArtistsFsRepo } from './repositories/artists.fs.repo.js';
import { MothsController } from './controllers/moths.controller.js';
import { MothsRouter } from './routers/moths.router.js';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { type PrismaClient } from '@prisma/client';
import { MothsSqlRepo } from './repositories/moths.sql.repo.js';
import { UsersController } from './controllers/users.controller.js';
import { UsersRouter } from './routers/users.router.js';
import { UsersSqlRepo } from './repositories/users.sql.repo.js';
import { AuthInterceptor } from './middleware/auth.interceptor.js';

const debug = createDebug('W7E:app');
export const createApp = () => {
  const app = express();

  return app;
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug('Starting app');
  const authInterceptor = new AuthInterceptor();
  const mothsRepo = new MothsSqlRepo(prisma);
  const mothsController = new MothsController(mothsRepo);
  const mothsRouter = new MothsRouter(mothsController, authInterceptor);
  const errorsMiddleware = new ErrorsMiddleware();
  const artistsRepo = new ArtistsFsRepo();
  const artistsController = new ArtistsController(artistsRepo);
  const artistsRouter = new ArtistsRouter(artistsController);
  const usersRepo = new UsersSqlRepo(prisma);
  const usersController = new UsersController(usersRepo);
  const usersRouter = new UsersRouter(usersController, authInterceptor);

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public'));

  app.use('/moths', mothsRouter.router);
  app.use('/artists', artistsRouter.router);
  app.use('/users', usersRouter.router);

  app.use(errorsMiddleware.handle.bind(errorsMiddleware));
};
