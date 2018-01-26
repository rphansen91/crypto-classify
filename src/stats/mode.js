import mean from './mean'

function group (groupBy) {
  return function (arr) {
    return arr.reduce(function (acc, c) {
      const group = groupBy(c)
      if (!acc[group]) acc[group] = []
      acc[group].push(c)
      return acc
    }, {})
  }
}

function maxGroups (groups) {
  return Object.keys(groups)
  .map(function (key) {
    return groups[key]
  })
  .reduce(function (acc, c) {
    if (acc[0].length === c.length) acc.push(c)
    else if (acc[0].length < c.length) return [c]
    return acc
  }, [[]])
}

export default function (arr, size=1) {
  const grouper = group(v => Math.floor(v / size))
  const grouped = grouper(arr)
  return maxGroups(grouped).map(mean)
}
