import React from 'react'
import subscribe, { subscribtion } from '../../data/realtime'
import formatDollar from '../../formatters/dollar'

export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      price: 0
    }
  }

  componentDidMount () {
    const { coin, onMessage=(v=>v) } = this.props

    this.unsub = subscribe(
      subscribtion({ from: coin.symbol }),
      (message, event) => {
        const price = message.PRICE
        const up = price > this.state.price
        this.setState({ price, up })
        onMessage(message, event)
      }
    )
  }

  componentWillUnmount () {
    this.unsub()
  }

  render () {
    const { coin } = this.props
    const { price, up } = this.state

    return <p className={up ? 'green' : 'red'}>
      ${formatDollar(price)}USD
    </p>
  }
}
