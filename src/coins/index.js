let allCoinsRes
let allCoins = new Promise((res) => {
  allCoinsRes = res
})

const qs = require('../utils/querystring')
const loadCoins = loadPage('https://api.coinmarketcap.com/v1/ticker/')
const hashCoins = hashKeys(['id', 'symbol', 'name'])

getAllCoins().then(cacheCoins)

function getAllCoins () {
  return loadCoins()
  .then(combinePages)
}

function cacheCoins (res) {
  allCoinsRes(res)
  return allCoins
}

function hashKeys (keys) {
  return function (acc, c) {
    [].concat(keys)
    .forEach((key) => {
      if (!c || !c[key]) return
      acc[c[key]] = c
      acc[c[key].toLowerCase()] = c
      acc[c[key].toUpperCase()] = c
    })
    return acc
  }
}

function getCoin (name='') {
  return allCoins
  .then(res => res.reduce(hashCoins, {}))
  .then((coins) =>
    coins[name.trim()])
}

function loadPage (url, limit=1000) {
  return function next (page=0) {
    return fetch(url + '?' + qs.stringify({ limit, start: page * limit }))
    .then(res => res.json())
    .then(data => {
      if (!data.length) return { data: [] }
      return { data, next: () => next(page + 1) }
    })
  }
}

function combinePages (res) {
  let values = []

  function load ({ data, next }) {
    if (!next) return values.concat(data)
    values = values.concat(data)
    return next().then(load)
  }

  return load(res)
}

module.exports = {
  getAllCoins,
  allCoins,
  getCoin
}
