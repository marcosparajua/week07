import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type ArtistsController } from '../controllers/artists.controller.js';

const debug = createDebug('W7E:artists:router');

export class ArtistsRouter {
  router = createRouter();

  constructor(private readonly controller: ArtistsController) {
    debug('Instantiated artists router');

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
