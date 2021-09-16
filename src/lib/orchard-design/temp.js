const { engine } = require('.')

const TOTAL = 1000
//const TOTAL = 100

const data = {
  processingVsFresh: .8,

  pNutVsFNut: .8,    // 0.8
  pFruitVsFFruit: .8, // 0.8

  pNutSizes: [0, .2, .8],   // [0.6, 0.4, 0.1] small, medium, large
  fNutSizes: [0, .8, .2],   // [0.6, 0.4, 0.1]
  pFruitSizes: [0, .5, .5], // [0.6, 0.4, 0.1]
  fFruitSizes: [.8, .2, 0], // [0.6, 0.4, 0.1]

  pNutSNuts: [.8, .2], // [0.8, 0.2] protein, carb
  pNutMNuts: [.8, .2], // [0.8, 0.2]
  pNutLNuts: [.8, .2], // [0.8, 0.2]
  fNutSNuts: [.8, .2], // [0.8, 0.2]
  fNutMNuts: [.8, .2], // [0.8, 0.2]
  fNutLNuts: [.8, .2], // [0.8, 0.2]

  pFruitSWhen: [0, 0, 0], // [0.5, 0.3, 0.1] early, mid, late
  pFruitMWhen: [0.1, 0.2, 0.7], // [0.5, 0.3, 0.1]
  pFruitLWhen: [0.1, 0.2, 0.7], // [0.5, 0.3, 0.1]
  fFruitSWhen: [0.2, 0.6, 0.2], // [0.5, 0.3, 0.1]
  fFruitMWhen: [0.2, 0.6, 0.2], // [0.5, 0.3, 0.1]
  fFruitLWhen: [0, 0, 0], // [0.5, 0.3, 0.1]
}


const result = engine(data).build()

const _traverse = (obj) => {
  if (typeof obj === 'object') {
    if (obj.type && obj.use && obj.size) {
      if (obj.when || obj.nut) {
        return [obj]
      }
    }
    return Object.values(obj).reduce((acc, value) => {
      return [...acc, ..._traverse(value)]
    }, [])
  } 
  return []
}

const finalValues = _traverse(result)
  .map(obj => {
    return {
      ...obj,
      count: Math.round(obj.percent * TOTAL)
    }
  })
  .sort((x, y) => {
    return x.count - y.count
  })


finalValues.forEach(value => {
  if (value.percent === 0) {
    return
  }
  const base = `${value.use}-${value.type}-${value.size}`
  if (value.nut) {
    console.log(`${base}-${value.nut}: ${(value.percent * 100).toFixed()}% (${value.count})`)
  } else {
    console.log(`${base}-${value.when}: ${(value.percent * 100).toFixed()}% (${value.count})`)
  }
})

//console.log(finalValues)
