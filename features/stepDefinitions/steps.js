const {
  Given,
  When,
  Then,
} = require('cucumber')
const assert = require('chai').assert
const get = require('lodash/get')
const {
  datastore,
  orm,
} = require('functional-models-orm')
const models = require('../../src/models')
const taxonomyModels = require('../../src/taxonomy/models')


const TaxonomyModelDataset1 = async (datastoreProvider) => {
  const myOrm = orm({ datastoreProvider })
  const { OpenFruitModel } = models({ orm: myOrm })

  const taxModels = taxonomyModels({ OpenFruitModel, fetcher: myOrm.fetcher })

  const g1 = taxModels.Genus.create({ name: 'Apple', latinName: 'Malus' })
  const g2 = taxModels.Genus.create({ name: 'Cherry', latinName: 'Prunus' })

  const s1 = taxModels.Species.create({ name: 'Apple', latinName: 'Malus domestica', genus: await g1.getId() })
  const s2 = taxModels.Species.create({ name: 'Sour Cherry', latinName: 'Prunus cerasus', genus: await g2.getId() })

  const c1 = taxModels.Cultivar.create({ name: 'Red Rebel', species: await s1.getId(), genus: await g1.getId() })
  const c2 = taxModels.Cultivar.create({ name: 'Montmorency', species: await s2.getId(), genus: await g2.getId() })

  return {
    genus: [g1, g2],
    species: [s1, s2],
    cultivar: [c1, c2]
  }
}

const DATA_SETS = {
  TaxonomyModelDataset1,
}


Given('a memoryDatastoreProvider is created', function(){
  this.datastoreProvider = datastore.memory()
})

Given('model instances are created using {word}', function(dataSetKey){
  return DATA_SETS[dataSetKey](this.datastoreProvider)
    .then(models => {
      this.models = models
    })
})

When('the models are saved', async function(){
  const dataInOrder = await Promise.all(
    Object.entries(this.models)
      .map(async ([key, list]) => {
        return await Promise.all(list.map(async x=> {
          return [key, await x.functions.save()]
        }))

      })
  )

  const models = dataInOrder.reduce((acc, list) => {
    return list.reduce((inner, [key, savedObj]) => {
      if (!(key in inner)) {
        return {...inner, [key]: [savedObj]}
      }
      return {...inner, [key]: [...inner[key], savedObj]}
    }, acc)
  }, {})
  this.models = models
})

When('{word} is called on {word} at list index {int}', async function(path, modelType, index){
  if (!(modelType in this.models)) {
    throw new Error(`There were no models with ${modelType} as a type.`)
  }
  const model = this.models[modelType][index]
  const func = get(model, path)
  this.results = await func()
})

Then('{word} at list index {int} is returned', async function(modelType, index){
  const actual = await this.results.getId()
  const expected = await this.models[modelType][index].getId()
  assert.deepEqual(actual, expected)
})
