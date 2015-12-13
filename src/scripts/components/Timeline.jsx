import React from 'react';
import { Tracker } from '../utils/tracker';

import Post from './Post';
import TimelineStore from '../stores/timeline-store';

let getPosts = function () {
  return {
    posts: TimelineStore.get()
  };
};

class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this.state = getPosts();
  }
  componentDidMount() {
    TimelineStore.addChangeListener(this._onChange);
  }
  render() {
    if (this.state.posts.length === 0) return <div>Loading...</div>;
    return (
      <div className="timeline">
        <h2>Timeline</h2>
        <div className="timeline-item" data-trail=",click,timeline-container">
          {this.state.posts.map( post => <Post key={post.id} {...post} /> )}
        </div>
      </div>
    );
  }
  _onChange() {
    this.setState(getPosts());
  }
}

export default Tracker(Timeline);