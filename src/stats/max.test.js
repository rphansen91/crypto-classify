import max from './max'

describe('Maximum', function () {

  test('Should be a function', function () {
    expect(typeof max).toBe('function')
  })

  test('Should calculate max', function () {
    expect(max([1,2,3,4,5])).toBe(5)
  })

})
