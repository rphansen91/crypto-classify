import React from 'react'

export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange ({ target: { value } }) {
    const { onChange=(v=>v) } = this.props
    this.setState({ value })
    onChange({ value })
  }

  render () {
    const { value } = this.state
    return <div className="search">
      <input
      placeholder="Search"
      value={value}
      ref={target => this.target = target}
      onChange={this.handleChange.bind(this)} />
    </div>
  }
}
