import { get, identity } from 'lodash'

export default function (posCb=(v => v), negCb=(v => v)) {
  return function (val) {
    if (val >= 0) {
      return posCb(val)
    } else {
      return negCb(val)
    }
  }
}
