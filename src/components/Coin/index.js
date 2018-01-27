import React, { Component } from 'react'
import cx from '../../utils/cx'
import isPositive from '../../utils/isPositive'
import percent from '../../formatters/percent'
import { percent24h, priceBtc, priceUsd } from '../../formatters/coin'
import './index.css'

const renderPercent = isPositive(
  v => <p className="green">{ percent(v) }</p>,
  v => <p className="red">{ percent(v) }</p>
)

export default class Coin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hidden: true
    }
  }

  componentDidMount () {
    this.frame = requestAnimationFrame(() => {
      this.setState({ hidden: false })
    })
  }

  componentWillUnmount () {
    cancelAnimationFrame(this.frame)
  }

  render () {
    const { coin, image, className, ...props } = this.props
    const { hidden } = this.state
    return <button {...props}
      className={cx({ [className]: true, hide: hidden })} >
      { image ? <img src={image} alt={coin.name} /> : <div/> }
      <div className="detail">
        <div className="percent">{ renderPercent(percent24h(coin)) }</div>
        <p className="title">#{coin.rank} {coin.name}</p>
        <p>{priceUsd(coin)}</p>
        <p>{priceBtc(coin)}</p>
      </div>
    </button>
  }
}

