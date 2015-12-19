import React from 'react'

class Post extends React.Component {
  render() {
    return (
      <div className={'item item_'+this.props.source}>
        <header data-trail={this.props.source + ',click,header'}>
          <img src={this.props.user.profile_picture}
            className="user-picture"
            data-trail={this.props.source + ',click,profile-pic'} />
          <div className="item__header-meta">
            <i className={'fa fa-'+this.props.source}
              data-trail={this.props.source + ',click,source-icon'}></i>
            <h2 data-trail={this.props.source + ',click,username'}>
              {this.props.user.display_name}</h2>
            <span className="engagement" data-trail={this.props.source + ',click,engagement'}>
              <i className="fa fa-comment"></i>
              <span className="qty">{this.props.comments}</span>
              <i className="fa fa-heart"></i>
              <span className="qty">{this.props.favourites}</span>
            </span>
            <small>{this.props.created_at.fromNow()}</small>
          </div>
        </header>
        {(this.props.media.url) ?
          <Picture {...this.props.media} data-trail={this.props.source + ',click,media'} />
        : false}
        <div className="message"
          dangerouslySetInnerHTML={{__html: this.props.message}}
          data-trail={this.props.source + ',click,message'} />
      </div>
    )
  }
}
Post.propTypes = {
  comments: React.PropTypes.number,
  created_at: React.PropTypes.object,
  favourites: React.PropTypes.number,
  id: React.PropTypes.string,
  media: React.PropTypes.object,
  message: React.PropTypes.string,
  source: React.PropTypes.string,
  user: React.PropTypes.shape({
    display_name: React.PropTypes.string,
    id: React.PropTypes.string,
    profile_picture: React.PropTypes.string,
    username: React.PropTypes.string
  })
}

class Picture extends React.Component {
  render() {
    return (
      <a className="picture" href={this.props.link} target="_blank">
        <img src={this.props.url} />
      </a>
    )
  }
}

export default Post
