import mean from './mean'

function subtract (a, b) {
  return a - b
}

export default function (arr) {
  const middle = (arr.length - 1) / 2
  const sorted = arr.sort(subtract)
  const floor = sorted[Math.floor(middle)]
  const ceil = sorted[Math.ceil(middle)]
  return mean([floor, ceil])
}
