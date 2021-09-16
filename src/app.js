const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const middlewareFunc = require('./middleware')

module.exports = (router, serviceLog) => {
  const app = express()
  const middleware = middlewareFunc(serviceLog)
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(middleware.uuidMiddleware)
  //app.use(middleware.logRouteRequest)
  app.use(router)
  app.use(middleware.middleware404)
  return app
}
