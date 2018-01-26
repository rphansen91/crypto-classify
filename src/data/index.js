const { curry } = require('lodash')
const historicalData = curry(require('./historical'))
const btcData = historicalData({ pair: 'BTC' })
const usdData = historicalData({ pair: 'USD' })

module.exports = {
  btcData,
  usdData
}
