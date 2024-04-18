import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type MothsController } from '../controllers/moths.controller';
import { type AuthInterceptor } from '../middleware/auth.interceptor';

const debug = createDebug('W7E:articles:router');

export class MothsRouter {
  router = createRouter();

  constructor(
    private readonly controller: MothsController,
    readonly authInterceptor: AuthInterceptor
  ) {
    debug('Instantiated moths router');

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
