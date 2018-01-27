import React from 'react'
import cx from '../../utils/cx'
import './index.css'

export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false,
      value: ''
    }
  }

  componentDidMount () {
    window.onscroll = () => {
      if (window.scrollY === 0) this.open()
      else this.close()
    }
  }

  open () {
    this.setState({ open: true })
    setTimeout(() => this.target.focus(), 400)
    this.target.focus()
  }

  close () {
    this.setState({ open: false })
  }

  toggle () {
    if (this.state.open) this.close()
    else this.open()
  }

  handleChange ({ target: { value } }) {
    const { onChange=(v=>v) } = this.props
    this.setState({ value })
    onChange({ value })
  }

  clear () {
    this.handleChange({ target: { value: "" } })
    this.target.focus()
  }

  render () {
    const { value, open } = this.state
    return <div className={cx({ search: true, open })}>

      <div className="toggle" onClick={this.toggle.bind(this)} />

      <input
      placeholder="Search"
      value={value}
      ref={target => this.target = target}
      onChange={this.handleChange.bind(this)} />

      <div
        className={cx({ clear: true, hide: !value })}
        onClick={this.clear.bind(this)} />

    </div>
  }
}
