import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchAPIsIfNeeded } from '../actions'
import { Tracker } from '../utils/Tracker'

import Post from './Post'

const NETWORKS = ['instagram', 'twitter']

class Timeline extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    NETWORKS.forEach(
      network => dispatch(fetchAPIsIfNeeded(network))
    )
  }
  render() {
    const { isFetching, posts } = this.props
    const isEmpty = posts.length === 0
    return (
      <div className="timeline" data-trail=",click,timeline-container">
      {isEmpty
        ? (isFetching ? <div>Loading...</div> : <div>Empty</div>)
        : posts.map( post => <Post key={post.id} {...post} /> )
      }
      </div>
    )
  }
}
Timeline.displayName = 'Timeline'
Timeline.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return state.posts
}

export default Tracker(connect(mapStateToProps)(Timeline))
