import ma from './ma'

describe('Moving Average', function () {

  test('Should be a function', function () {
    expect(typeof ma).toBe('function')
  })

  test('Should calculate moving average', function () {
    const result = ma(2, [1,2,3,4,5,6])
    expect(result).toEqual([null, 1.5, 2.5, 3.5, 4.5, 5.5])
  })

  test('Should calculate complex moving average', function () {
    const result = ma(10, [22.27, 22.19, 22.08, 22.17, 22.18, 22.13, 22.23, 22.43, 22.24, 22.29, 22.15, 22.39, 22.38, 22.61, 23.36, 24.05, 23.75, 23.83, 23.95, 23.63, 23.82, 23.87, 23.65, 23.19, 23.10, 23.33, 22.68, 23.10, 22.40, 22.17]);
    [null, null, null, null, null, null, null, null, null, 22.22, 22.21, 22.23, 22.26, 22.31, 22.42, 22.61, 22.77, 22.91, 23.08, 23.21, 23.38, 23.53, 23.65, 23.71, 23.69, 23.61, 23.51, 23.43, 23.28, 23.13].forEach((avg, i) => {
      if (typeof result[i] === 'number') {
        expect(result[i]).toBeCloseTo(avg, 1);
      } else {
        expect(result[i]).toBe(avg);
      }
    });
  })

})
