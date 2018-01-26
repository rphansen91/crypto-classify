import variance from './variance'

describe('Variance', function () {

  test('Should be a function', function () {
    expect(typeof variance).toBe('function')
  })

  test('Should calculate the variance', function () {
    const result = variance([206, 76, -224, 36, -94])
    expect(result).toBe(21704)
  })

})
