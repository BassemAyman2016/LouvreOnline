
const artsRouter = require('../routes/arts')
const usersRouter = require('../routes/users')
const sessionsRouter = require('../routes/sessions')
module.exports.init = function (app) {

  app.use('/', artsRouter.router)
  app.use('/', usersRouter.router)
  app.use('/', sessionsRouter.router)

}
