import sd from './sd'

describe('Standard Deviation', function () {

  test('Should be a function', function () {
    expect(typeof sd).toBe('function')
  })

  test('Should calculate the standard deviation', function () {
    const result = sd([206, 76, -224, 36, -94])
    expect(Math.floor(result)).toBe(147)
  })
})
