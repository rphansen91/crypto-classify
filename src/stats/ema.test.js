import ema from './ema'

describe('Exponential Moving Average', function () {

  test('Should be a function', function () {
    expect(typeof ema).toBe('function')
  })

  test('Should calculate exponential moving average', function () {
    const result = ema(2, [1,2,3,4,5,6])
    expect(result).toEqual([null, 1.5, 2.5, 3.5, 4.5, 5.5])
  })

  test('Should calculate complex exponential moving average', function () {
    const result = ema(10, [22.27, 22.19, 22.08, 22.17, 22.18, 22.13, 22.23, 22.43, 22.24, 22.29, 22.15, 22.39, 22.38, 22.61, 23.36, 24.05, 23.75, 23.83, 23.95, 23.63, 23.82, 23.87, 23.65, 23.19, 23.10, 23.33, 22.68, 23.10, 22.40, 22.17]);
    [null, null, null, null, null, null, null, null, null, 22.22, 22.21, 22.24, 22.27, 22.33, 22.52, 22.80, 22.97, 23.13, 23.28, 23.34, 23.43, 23.51, 23.54, 23.47, 23.40, 23.39, 23.26, 23.23, 23.08, 22.92].forEach((avg, i) => {
      if (typeof result[i] === 'number') {
        expect(result[i]).toBeCloseTo(avg, 1);
      } else {
        expect(result[i]).toBe(avg);
      }
    });
  })

})
