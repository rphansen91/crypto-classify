import range from './range'

describe('Range', function () {

  test('Should be a function', function () {
    expect(typeof range).toBe('function')
  })

  test('Should calculate range', function () {
    expect(range([1,2,3,4,5,6])).toBe(5)
  })

})
