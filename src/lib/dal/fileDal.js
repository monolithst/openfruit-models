const fs = require('fs')


module.exports = ({
  dalDirectory
}) => {
  const _retrieve = (modelNamespace, modelName, filePath, id) => {
    return _retrieveList(true)(modelNamespace, modelName, filePath)[id]
  }

  const _retrieveList = (asObj = true) => (modelNamespace, modelName, filePath) => {
    const r = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const converted = Object.values(r)
      .map(obj => {
        const constructor = require(`../models${modelNamespace}`)[modelName]
        return constructor(obj)
      })
    if (asObj) {
      return converted.reduce((acc, obj) => {
        return {...acc, [obj.getId()]: obj}
      }, {})
    }
    return converted
  }

  const _create = (modelNamespace, modelName, filePath, obj) => {
    if (fs.existsSync(filePath) === false) {
      console.log(filePath)
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2))
    }
    const data = _retrieveList(true)(modelNamespace, modelName, filePath)
    const newData = {...data, [obj.getId()]: obj.toJSON()}
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2))
  }

  const _delete = (modelNamespace, filePath, id) => {
    const data = _retrieveList(true)(modelNamespace, modelName, filePath)
    const newData = Object.entries(data)
      .filter(([key, value]) => key === id)
      .reduce((acc, [key, value]) => ({...acc, [key]: value}), {})
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2))
  }

  const _update = (modelNamespace, filePath, obj) => {
    return _create(modelNamespace, filePath, obj)
  }

  const _do = (method, modelNamespace, modelName) => data => {
    const filePath = path.join(dalDirectory, `${modelName}.json`) 
    return new Promise((good, bad) => {
      const response = method(modelNamespace, modelName, filePath, data)
      good(response)
    })
  }


  const _createModelCRUD = (modelNamespace, modelName) => {
    return {
      create: _do(_create, modelNamespace, modelName),
      update: _do(_update, modelNamespace, modelName),
      delete: _do(_delete, modelNamespace, modelName),
      retrieve: _do(_retrieve, modelNamespace, modelName),
      retrieveList: _do(_retrieveList(false), modelNamespace, modelName),
    }
  }


  return {
    modelCRUD: _createModelCRUD
  }
}

