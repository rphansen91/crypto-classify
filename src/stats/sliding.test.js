import sliding from './sliding'

describe('Sliding Window', function () {

  test('Should be a function', function () {
    expect(typeof sliding).toBe('function')
  })

  test('Should create a window', function () {
    const result = sliding(2, v => v, [1,2,3,4])
    expect(result).toEqual([null, [1,2], [2,3], [3,4]])
  })

  test('Should create a window', function () {
    const result = sliding(3, v => v, [1,2,3,4])
    expect(result).toEqual([null, null, [1,2,3], [2,3,4]])
  })

})
