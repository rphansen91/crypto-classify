import mode from './mode'

// Test arrays supplied by https://www.mathsisfun.com/mode.html

xdescribe('Mode', function () {

  test('Should be a function', function () {
    expect(typeof mode).toBe('function')
  })

  test('Should find mode', function () {
    const result = mode([3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29])
    expect(result).toEqual([23])
  })

  test('Should find bimodal', function () {
    const result = mode([1, 3, 3, 3, 4, 4, 6, 6, 6, 9])
    expect(result).toEqual([3, 6])
  })

  test('Grouping', function () {
    const result = mode([4, 7, 11, 16, 20, 22, 25, 26, 33], 10)
    expect(result).toEqual([25])
  })

  test('Grouping multiple', function () {
    const result = mode([35, 36, 32, 42, 58, 56, 35, 39, 46, 47, 34, 37], 5)
    expect(result).toEqual([37])
  })

})
