import mean from './mean'

describe('Mean', function () {

  test('Should be a function', function () {
    expect(typeof mean).toBe('function')
  })

  test('Should calculate mean', function () {
    const result = mean([1,2,3,4,5,6])
    expect(result).toBe(3.5)
  })

})
