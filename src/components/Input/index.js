import React from 'react'
import { cx, isMobile, handleScroll } from '../../utils'
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
    isMobile(null, this.handleScroll.bind(this))()
  }

  handleScroll () {
    handleScroll(({ y }) => {
      if (y) this.close()
      else this.open()
    })
  }

  open () {
    this.setState({ open: true })
    setTimeout(() => this.target.focus(), 400)
    this.target.focus()
  }

  close () {
    this.setState({ open: false })
    setTimeout(() => this.target.blur(), 400)
    this.target.blur()
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
