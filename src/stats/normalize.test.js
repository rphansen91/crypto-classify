import { standard, tStat, featureScaling } from './normalize'

describe('Normalize', function () {

  test('Should be a function', function () {
    expect(typeof standard).toBe('function')
  })

  test('Should be a function', function () {
    expect(typeof tStat).toBe('function')
  })

  test('Should be a function', function () {
    expect(typeof featureScaling).toBe('function')
  })



})
