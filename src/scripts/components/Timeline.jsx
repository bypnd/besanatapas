import React, { Component } from 'react'
import { Tracker } from '../utils/Tracker'

import Post from './Post'
import TimelineStore from '../stores/timeline-store'

let getPosts = function () {
  return {
    posts: TimelineStore.get()
  }
}

class Timeline extends Component {
  constructor(props) {
    super(props)

    this._onChange = this._onChange.bind(this)
    this.state = getPosts()
  }
  componentDidMount() {
    TimelineStore.addChangeListener(this._onChange)
  }
  _onChange() {
    this.setState(getPosts())
  }
  render() {
    if (this.state.posts.length === 0) return <div>Loading...</div>
    return (
      <div className="timeline" data-trail=",click,timeline-container">
        {this.state.posts.map( post => <Post key={post.id} {...post} /> )}
      </div>
    )
  }
}
Timeline.displayName = 'Timeline'

export default Tracker(Timeline)
