import mean from './mean'
import sliding from './sliding'

export default function (size, arr) {
  return sliding(size, mean, arr)
}
