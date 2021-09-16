const get = require('lodash/get')

const engine = ({
  processingVsFresh, // 0.8

  pNutVsFNut,    // 0.8
  pFruitVsFFruit, // 0.8

  pNutSizes,   // [0.6, 0.4, 0.1] small, medium, large
  fNutSizes,   // [0.6, 0.4, 0.1]
  pFruitSizes, // [0.6, 0.4, 0.1]
  fFruitSizes, // [0.6, 0.4, 0.1]

  pNutSNuts, // [0.8, 0.2] protein, carb
  pNutMNuts, // [0.8, 0.2]
  pNutLNuts, // [0.8, 0.2]
  fNutSNuts, // [0.8, 0.2]
  fNutMNuts, // [0.8, 0.2]
  fNutLNuts, // [0.8, 0.2]

  pFruitSWhen, // [0.5, 0.3, 0.1] early, mid, late
  pFruitMWhen, // [0.5, 0.3, 0.1]
  pFruitLWhen, // [0.5, 0.3, 0.1]
  fFruitSWhen, // [0.5, 0.3, 0.1]
  fFruitMWhen, // [0.5, 0.3, 0.1]
  fFruitLWhen, // [0.5, 0.3, 0.1]
}) => {
  const build = () => {
    return {
      processing: usePath({ percent: processingVsFresh, use: 'processing'}),
      fresh: usePath({percent: 1 - processingVsFresh, use: 'fresh'}),
    }
  }

  const usePath = ({percent, use}) => {
    const _getPercent = (isNut) => {
      const value = isNut ? pNutVsFNut : pFruitVsFFruit
      const value2 = use === 'processing'
        ? value
        : 1 - value
      return percent * value2
    }
    return {
      percent,
      nut: typePath({ percent: _getPercent(true), use, type: 'nut' }),
      fruit: typePath({ percent: _getPercent(false), use, type: 'fruit' }),
    }
  }

  const typePath = ({ percent, type, use }) => {
    const _getPercent = (size) => {
      const value = type === 'nut'
        ? use === 'processing'
          ? pNutSizes[size]
          : fNutSizes[size]
        : use === 'processing'
          ? pFruitSizes[size]
          : fFruitSizes[size]

      return value * percent
    }
    return {
      percent,
      small: sizePath({percent: _getPercent(0), type, use, size: 'small'}),
      medium: sizePath({percent: _getPercent(1), type, use, size: 'medium' }),
      large: sizePath({percent: _getPercent(2), type, use, size: 'large' }),
    }
  }


  const sizePath = ({percent, type, use, size }) => {
    if (type === 'nut') {
      const _getPercent = (nutType) => {
        const data = {
          processing: {
            small: pNutSNuts, // [0.8, 0.2]
            medium: pNutMNuts, // [0.8, 0.2]
            large: pNutLNuts, // [0.8, 0.2]
          },
          fresh: {
            small: fNutSNuts, // [0.8, 0.2]
            medium: fNutMNuts, // [0.8, 0.2]
            large: fNutLNuts, // [0.8, 0.2]

          }
        }
        const value = data[use][size][nutType]
        return value * percent
      }
      const result = {
        percent,
        protein: nutPath({ percent: _getPercent(0), size, use, type, nut: 'protein'}),
        carb: nutPath({ percent: _getPercent(1), size, use, type, nut: 'carb'}),
      }
      return result
    } else {
      const _getPercent = (when) => {
        const data = {
          processing: {
            small: pFruitSWhen, // [0.5, 0.3, 0.1] early, mid, late
            medium: pFruitMWhen, // [0.5, 0.3, 0.1]
            large: pFruitLWhen, // [0.5, 0.3, 0.1]
          },
          fresh: {
            small: fFruitSWhen, // [0.5, 0.3, 0.1]
            medium: fFruitMWhen, // [0.5, 0.3, 0.1]
            large: fFruitLWhen, // [0.5, 0.3, 0.1]
          }
        }
        const value = data[use][size][when]
        return value * percent
      }

      const result = {
        percent,
        early: whenPath({ percent: _getPercent(0), size, type, use, when: 'early'}),
        mid: whenPath({ percent: _getPercent(1), size, type, use, when: 'mid'}),
        late: whenPath({ percent: _getPercent(2), size, type, use, when: 'late'}),
      }
      return result
    }
  }


  const nutPath = ({percent, type, use, size, nut}) => {
    return {
      percent,
      type, 
      use,
      size,
      nut
    }
  }


  const whenPath = ({percent, size, type, use, when}) => {
    return {
      percent,
      type, 
      use,
      size,
      when
    }
  }

  return {
    build
  }
}

module.exports = {
  engine
}
