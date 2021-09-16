const { DAL_TYPES } = require('./constants')

const _dalTypeToDal = {
  [DAL_TYPES.fileDal]: (args) => {
    const fileDal = require('./fileDal')
    return fileDal(args)
  }
}


const createDal = ({
  dalType,
  dalArgs={}
}) => {
  const dalConstructor = _dalTypeToDal[dalType]
  const dal = dalConstructor(dalArgs)

  const modelDal = Object.entries(require('../models'))
    .reduce((acc, [key, modelObj]) => {
      return {...acc, [key]: dal.modelCRUD('', key)}
    }, {})

  return {
    ...modelDal
  }
}


module.exports = createDal 
