'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.post('/api/users/register', controller.users.register);
  router.post('/api/users/login', controller.users.login);
  router.get('/api/users/:id', controller.users.show);

  router.get('/api/notebooks', app.controller.notebooks.index);
  router.post('/api/notebooks', jwt, app.controller.notebooks.create);
  router.put('/api/notebooks/:id', jwt, app.controller.notebooks.update);
  router.delete('/api/notebooks/:id', jwt, app.controller.notebooks.destroy);

  router.get('/api/notes', app.controller.notes.index);
  router.post('/api/notes', jwt, app.controller.notes.create);
  router.get('/api/notes/:id', app.controller.notes.show);
  router.put('/api/notes/:id', jwt, app.controller.notes.update);
  router.delete('/api/notes/:id', jwt, app.controller.notes.destroy);

  // router.resources('users', '/users', controller.users);
  // router.resources('notebooks', '/notebooks', controller.notebooks);

};
