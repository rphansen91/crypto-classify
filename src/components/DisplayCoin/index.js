import React from 'react'
import { zip } from 'lodash'
import { btcData } from '../../data'
import { ema, ma, sd, sliding } from '../../stats'
import dark from '../../charts/themes/dark'
import Line from '../../charts/Line'
import Loader from 'react-loader'
import RealtimePrice from '../RealtimePrice'
import formatSatoshi from '../../formatters/satoshi'
import formatDollar from '../../formatters/dollar'

function yFormatter ({ symbol }) {
  if (symbol === 'BTC') return formatDollar
  return formatSatoshi
}

function ts ({ time }={}) {
  return time * 1000
}

function computeSeries (indicators, symbol, data) {
  const time = data.map(ts)
  const prices = data.map(d => d.close)
  const stdd = sliding(21, sd, prices)
  const ema21 = ema(21, prices)
  const ma21 = ma(21, prices)
  const ma50 = ma(50, prices)
  const ma100 = ma(100, prices)
  const sdpos = ma21.map((v, i) => v + (stdd[i] * 1))
  const sdneg = ma21.map((v, i) => v - (stdd[i] * 1))

  return [{
    type: 'arearange',
    name: 'Bollinger Bands',
    data: zip(time, sdneg, sdpos)
  }, {
    name: '21 EMA',
    data: zip(time, ema21)
  }, {
    name: '21 MA',
    data: zip(time, ma21)
  }, {
    name: '50 MA',
    data: zip(time, ma50)
  }, {
    name: '100 MA',
    data: zip(time, ma100)
  }, {
    name: symbol,
    type: 'candlestick',
    data: data.map(d => ({
      x: ts(d),
      open: d.open,
      low: d.low,
      high: d.high,
      close: d.close
    }))
  }]
}

export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      data: null,
      indicators: [],
      current: {}
    }
  }

  componentDidMount () {
    const { coin } = this.props

    btcData(coin)
    .then(({ Data: data }) => {
      this.setState({ data, loading: false })
    })
    .catch(({ message: error }) => {
      this.setState({ error, loading: false })
    })
  }

  chartLoaded (chart) {
    this.chart = chart
    // load: function () {
    console.log(chart)
      // set up the updating of the chart each second
      // var series = this.series[0];
      // setInterval(function () {
      //     var x = (new Date()).getTime(), // current time
      //         y = Math.round(Math.random() * 100);
      //     series.addPoint([x, y], true, true);
      // }, 1000);
  // }
  }

  handleMessage (m) {
    if (this.chart) {
      console.log(this.chart.series, m)
    }
  }

  renderState () {
    const { coin } = this.props
    const { error, data, indicators } = this.state

    if (error) return <p>{ error }</p>
    if (data) {
      const series = computeSeries(indicators, coin.symbol, data)
      return <Line
        onLoad={this.chartLoaded.bind(this)}
        yFormatter={yFormatter(coin)} series={series} />
    }
    return <div/>
  }

  render () {
    const { coin } = this.props
    const { loading } = this.state

    return <div className="display">
      <div className="ticker">
        <h1>{coin.name}</h1>
        <RealtimePrice coin={coin} onMessage={this.handleMessage.bind(this)} />
      </div>
      <Loader loaded={!loading} color="#fff">
        { this.renderState() }
      </Loader>
    </div>
  }
}
