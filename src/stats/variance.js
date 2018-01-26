import { curry, flow } from 'lodash'
import mean from './mean'
import sum from './sum'

function square (v) {
  return v * v
}

const subtract = curry(function subtract (a, b) {
  return b - a
})

export default function (arr) {
  const subtractMean = subtract(mean(arr))
  const difference = flow(subtractMean, square)
  const v = sum(arr.map(difference))
  return v / arr.length
}
