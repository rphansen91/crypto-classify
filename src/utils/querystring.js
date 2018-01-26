export const stringify = obj =>
  Object.keys(obj || {})
  .map(key => `${key}=${obj[key]}`)
  .join('&')
