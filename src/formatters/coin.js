import formatDollar  from './dollar'
import formatSatoshi from './satoshi'

export const image = ({ symbol }) =>
  `https://hodlstream.com/png/${symbol}.png`

export const percent1h  = ({ percent_change_1h:  percent }) => percent

export const percent24h = ({ percent_change_24h: percent }) => percent

export const percent7d  = ({ percent_change_7d:  percent }) => percent

export const priceUsd = ({ price_usd: usd }) =>
  `$${formatDollar(usd)} USD`

export const priceBtc = ({ price_btc: btc }) =>
  `${formatSatoshi(btc)} BTC`
