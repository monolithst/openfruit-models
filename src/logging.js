const _doConsoleLog = (key) => (uuid=null) => (message, {data=undefined, error=undefined}) => {
  if (uuid) {
  }
}


const consoleLogger = () => {
  return {
    info: _doConsoleLog('info')(),
    warning: _doConsoleLog('warning')(),
    debug: _doConsoleLog('debug')(),
    error: _doConsoleLog('error')(),
  }
}


const consoleUuidLogger = ({ uuid }) => {
  return {
    info: _doConsoleLog('info')(uuid),
    warning: _doConsoleLog('warning')(uuid),
    debug: _doConsoleLog('debug')(uuid),
    error: _doConsoleLog('error')(uuid),
  }
}


const createLogging = ({}) => {
  const log = consoleLogger()
  return {
    ...log,
    uuidLog: (uuid) => consoleUuidLogger({uuid})
  }
}


module.exports = {
  createLogging
}
