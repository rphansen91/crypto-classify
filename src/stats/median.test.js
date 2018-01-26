import median from './median'

describe('Median', function () {

  test('Should be a function', function () {
    expect(typeof median).toBe('function')
  })

  test('Should calculate median', function () {
    const result = median([1,200,3,44,57])
    expect(result).toBe(44)
  })

  test('Should calculate median', function () {
    const result = median([1,200,3,44,50,80])
    expect(result).toBe(47)
  })

})
