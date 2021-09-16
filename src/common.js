const { createUuid } = require('./utils')

const loweredTitleCase = string => {
  return `${string.slice(0,1).toLowerCase()}${string.slice(1)}`
}


const toJSON = (keyToFunc) => () => {
  return Object.entries(keyToFunc).reduce((acc, [key, value]) => {
    if (key === 'meta') {
      return acc
    }
    if (key === 'functions') {
      return acc
    }
    const realValue = value && value.toJSON
      ? value.toJSON()
      : value
    const trueValue = typeof realValue === 'function' ? realValue() : realValue
    console.log(key)
    console.log(trueValue)
    const keyToUse = key.startsWith('get')
      ? loweredTitleCase(key.slice(3))
      : key
    if (trueValue === undefined) {
      return {...acc, [keyToUse]: null}
    }
    return {...acc, [keyToUse]: trueValue}
  }, {})
}


const smartObject = (internals, meta=null) => {
  const realInternals = Array.isArray(internals)
    ? internals.reduce((acc, obj) => ({...acc, ...obj}), {})
    : internals
  console.log("INTERNALS")
  console.log(realInternals)

  return {
    ...(meta ? metaProperties(meta) : {}),
    ...realInternals,
    functions: {
      toJSON: toJSON(realInternals),
    }
  }
}


const toTitleCase = string => {
  return `${string.slice(0,1).toUpperCase()}${string.slice(1)}`
}

const property = (key, arg) => {
  if (typeof key === 'object') {
    return Object.entries(key).reduce((acc, [keyName, realValue]) => {
      const goodName = toTitleCase(keyName)
      return {
        ...acc,
        [`get${goodName}`]: () => realValue 
      }
    }, {})
  }
  return {
    [`get${toTitleCase(key)}`]: () => arg 
  }
}


const metaProperties = (obj) => {
  return {
    meta: {...obj}
  }
}

const funct = (key, method) => {
  return {
    [key]: method
  }
}


const named = (name) => property('Name', name)
const typed = (type) => property('Type', type)


const lazyValue = (method) => {
  let value = undefined
  let called = false
  return {
    getValue: () => {
      if (!called) {
        value = method()
        called = true
      }

      return value 
    }
  }
}


const lazyProperty = (key, method, selector=null) => {
  const lazy = lazyValue(method)
  return {
    [`get${key}`]: () => {
      const value = lazy.getValue()
      return selector
        ? selector(value)
        : value
    }
  }
}

const lazyProperty2 = (key, lazy, selector=null) => {
  return {
    [`get${key}`]: () => {
      const value = lazy.getValue()
      return selector
        ? selector(value)
        : value
    }
  }
}

const lazyProperty3 = (object, key, initializer) => {
  Object.defineProperty(object, key, {
    get: () => {
      //const v = initializer.call(
    }
  })
}

const uniqueId = (
  id=null
) => {
  return property('id', id || createUuid())
}

const dateProperty = (date, key) => {
  return {
    ...property({[key]: date}),
  }
}


module.exports = {
  named,
  typed,
  property,
  smartObject,
  toJSON,
  lazyProperty,
  lazyProperty2,
  lazyValue,
  uniqueId,
  dateProperty,
  metaProperties,
}
