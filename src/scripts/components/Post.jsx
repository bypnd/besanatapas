import React, { Component, PropTypes } from 'react'
import Picture from './Picture'

export default class Post extends Component {
  render() {
    return (
      <div className={'item item_'+this.props.source}>
        <header data-trail={this.props.source + ',click,header'}>
          <img className="user-picture"
            data-trail={this.props.source + ',click,profile-pic'}
            src={this.props.user.profile_picture} />
          <div className="item__header-meta">
            <i className={'fa fa-'+this.props.source}
              data-trail={this.props.source + ',click,source-icon'}></i>
            <h2 data-trail={this.props.source + ',click,username'}>
              {this.props.user.display_name}</h2>
            <span className="engagement"
              data-trail={this.props.source + ',click,engagement'}>
              <i className="fa fa-comment"></i>
              <span className="qty">{this.props.comments}</span>
              <i className="fa fa-heart"></i>
              <span className="qty">{this.props.favourites}</span>
            </span>
            <small>{this.props.created_at.fromNow()}</small>
          </div>
        </header>
        {(this.props.media.url) ?
          <Picture {...this.props.media}
            data-trail={this.props.source + ',click,media'} />
        : false}
        <div className="message"
          dangerouslySetInnerHTML={{__html: this.props.message}}
          data-trail={this.props.source + ',click,message'} />
      </div>
    )
  }
}
Post.displayName = 'Post'
Post.propTypes = {
  comments: PropTypes.number,
  created_at: PropTypes.object,
  favourites: PropTypes.number,
  id: PropTypes.string,
  media: PropTypes.object,
  message: PropTypes.string,
  source: PropTypes.string,
  user: PropTypes.shape({
    display_name: PropTypes.string,
    id: PropTypes.string,
    profile_picture: PropTypes.string,
    username: PropTypes.string
  })
}
