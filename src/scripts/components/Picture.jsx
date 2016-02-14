import React, { Component, PropTypes } from 'react'

export default class Picture extends Component {
  render() {
    return (
      <a className="picture" href={this.props.link} target="_blank">
        <img src={this.props.url} />
      </a>
    )
  }
}
Picture.displayName = 'Picture'
Picture.propTypes = {
  link: PropTypes.string,
  url: PropTypes.string
}
