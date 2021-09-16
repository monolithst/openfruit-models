const { StatusCodes } = require('http-status-codes')
const { createAPILogging } = require('../logging')
const { getUuid, getTags } = require('./utils')

module.exports = serviceLog => {
  const logging = createAPILogging(serviceLog)

  const uuidMiddleware = (req, res, next) => {
    const uuid = getUuid(req)
    // eslint-disable-next-line functional/immutable-data
    req.uuid = uuid
    next()
  }

  const tagsMiddleware = (req, res, next) => {
    const tags = getTags(req)
    // eslint-disable-next-line functional/immutable-data
    req.tags = tags
    next()
  }

  const tagQueryMiddleware = (req, res, next) => {
    const tags = getTags(req)
    // eslint-disable-next-line functional/immutable-data
    req.isMockExecution = () => tags.includes('@mock')
    next()
  }

  const logRouteRequest = (req, res, next) => {
    const log = logging.uuidLog(getUuid(req))
    log.debug(`Received request`, {
      method: req.method,
      url: req.url,
      body: req.body,
    })
    next()
  }

  const middleware404 = (req, res) => {
    const uuid = getUuid(req)
    const log = createAPILogging(serviceLog).uuidLog(uuid)
    const errorData = {
      code: StatusCodes.NOT_FOUND,
      message: 'RouteNotFound',
      details: `No route for ${req.url}`,
    }
    log.warning(`Route not found.`, {
      error: errorData,
    })
    return res.status(StatusCodes.NOT_FOUND).json({
      uuid,
      error: errorData,
    })
  }

  return {
    logRouteRequest,
    uuidMiddleware,
    tagsMiddleware,
    middleware404,
    tagQueryingMiddleware: tagQueryMiddleware,
  }
}

