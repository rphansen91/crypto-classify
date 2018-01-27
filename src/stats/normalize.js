import mean from './mean'
import maximum from './max'
import minimum from './min'
import sd from './sd'

export function standard (arr) {
  const avg = mean(arr)
  const stdd = sd(arr)
  return arr.map(function (v) {
    return (v - avg) / stdd
  })
}

export function tStat (arr) {

}

export function featureScaling (arr) {
  const max = maximum(arr)
  const min = minimum(arr)
  return arr.map(function (v) {
    return (v - min) / (max - min)
  })
}
