const qs = require('../../utils/querystring')

module.exports = ({ pair, limit }, { symbol }) =>
  fetch('https://min-api.cryptocompare.com/data/histoday?' + qs.stringify({
    aggregate: 1,
    e: 'CCCAGG',
    fsym: symbol.toUpperCase(),
    tsym: (symbol === pair) ? 'USD' : pair.toUpperCase(),
    limit: limit || 365,
    tryConversion: false
  }))
  .then(res => res.json())
  .then(res => {
    if (res.Message) throw new Error(res.Message)
    return res
  })
