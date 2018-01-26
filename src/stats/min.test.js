import min from './min'

describe('Minimum', function () {

  test('Should be a function', function () {
    expect(typeof min).toBe('function')
  })

  test('Should calculate min', function () {
    expect(min([1,2,3,4,5])).toBe(1)
  })

})
