import React from 'react'
import isPositive from '../../utils/isPositive'
import percent from '../../formatters/percent'
import { percent24h, priceBtc, priceUsd } from '../../formatters/coin'

const renderPercent = isPositive(
  v => <div className="green">{ percent(v) }</div>,
  v => <div className="red">{ percent(v) }</div>
)

export default ({ coin, image, ...props }) =>
  <button {...props}>
    { image ? <img src={image} /> : <div/> }
    <p className="title">#{coin.rank} {coin.name}</p>
    <p>{priceUsd(coin)}</p>
    <p>{priceBtc(coin)}</p>
    { renderPercent(percent24h(coin)) }
  </button>
