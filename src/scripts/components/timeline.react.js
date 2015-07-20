import React from 'react';

import Post from './post.react';
import TimelineActions from '../actions/timeline-actions';
import TimelineStore from '../stores/timeline-store';

let getPosts = function () {
  return {
    posts: TimelineStore.get()
  };
}

class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this.state = getPosts()
  }
  componentDidMount() {
    TimelineStore.addChangeListener(this._onChange);
  }
  render() {
    var posts = [];

    if (Object.keys(this.state.posts).length < 1) {
      posts = <div>Loading...</div>;
    } else {
      this.state.posts.forEach(function (post, index) {
        posts.push(<Post key={index} data={post} />);
      });
    }

    return (
      <div className="timeline">
        <h2>Timeline</h2>
        <div className="posts">{posts}</div>
      </div>
    );
  }
  _onChange() {
    this.setState(getPosts());
  }
}

export default Timeline;
