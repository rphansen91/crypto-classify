/* global Highcharts */

import React, { Component } from 'react'
import randomId from './randomId'

export default class extends Component {
  constructor (props) {
    super(props)
    this.id = randomId('chart')
    this.renderer = render(this.id)
  }

  componentDidMount () {
    this.renderChart()
  }

  componentDidUpdate (prevProps) {
    this.renderChart()
  }

  renderChart () {
    requestAnimationFrame(() => {
      Promise.resolve()
      .then(() => this.chartOpts())
      .then((chart) => this.renderer(chart))
    })
  }

  chartOpts () {
    throw new Error('Must supply chartOpts method')
  }

  render () {
    return <div id={this.id}></div>
  }
}

function render (id) {
  let prevChart = null
  return function (chart) {
    if (chart === prevChart) return

    try {
      Highcharts.stockChart(id, chart)
      prevChart = chart
    } catch (err) {
      console.log(err)
    }
  }
}
