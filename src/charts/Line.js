/* global Highcharts */

import Chart from './Chart'

export default class extends Chart {
  chartOpts () {
    return line(this.props)
  }
}

function logPoint (e) {
  console.log(e.point)
}

function line ({
  title='',
  subtitle='',
  yAxis='',
  series={},
  annotations=[],
  colors=Highcharts.getOptions().colors,
  yFormatter=(v=>v),
  xFormatter=(v=>v),
  onClick,
  onLoad
}) {
  const events = {
    click: onClick || logPoint,
    load: function () {
      if (onLoad) onLoad(this)
    }
  }

  return {
    chart: {
      zoomType: 'x',
      backgroundColor: 'rgba(0,0,0,0)',
      height: `${9 / 16 * 100}%`,
      events
    },

    rangeSelector: {
      selected: 1
    },

    colors: colors,

    title: {
      text: title,
      style: {
        color: '#fff'
      }
    },

    subtitle: {
      text: subtitle
    },

    yAxis: {
      title: {
        text: yAxis
      },
      labels: {
        formatter: function() {
          return yFormatter(this.value);
        }
      }
    },

    xAxis: {
      type: 'datetime'
    },

    tooltip: {
      enabled: false,
      // pointFormatter: function() {
      //   const { low, high, open, close, y } = this
      //   const { series: { name } } = this

      //   if (low && high && open && close) {
      //     return `<p>
      //       <p><b>${name}</b>:</p><br>
      //       <p>low: ${yFormatter(low)}</p><br>
      //       <p>open: ${yFormatter(open)}</p><br>
      //       <p>close: ${yFormatter(close)}</p><br>
      //       <p>high: ${yFormatter(high)}</p><br>
      //     </p>`
      //   }

      //   if (low && high) return `<p><b>${name}</b>: ${yFormatter(low)} - ${yFormatter(high)}</p>`
      //   return `<p><b>${name}</b>: ${yFormatter(y)}</p>`
      // }
    },

    legend: {
      enabled: true
    },

    points: [],

    series: series,

    annotations: annotations,

    plotOptions: {
      candlestick: {
        color: 'red',
        upColor: 'green'
      }
    },

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          yAxis: {
            labels: {
              align: 'left',
              x: 0,
              y: -5
            },
            title: {
              text: null
            }
          },
          subtitle: {
            text: null
          }
        }
      }]
    },

    exporting: {
      enabled: false
    },

    credits: {
      enabled: false
    }
  }
}
