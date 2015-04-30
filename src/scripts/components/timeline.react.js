var React = require('react');

var Post = require('./post.react');
var TimelineActions = require('../actions/timeline-actions');
var TimelineStore = require('../stores/timeline-store');

var items = [];

var getPosts = function () {
  return {
    posts: TimelineStore.get()
  };
}

var Timeline = React.createClass({
  getInitialState: function () {
    return getPosts();
  },
  componentDidMount: function() {
    TimelineStore.addChangeListener(this._onChange);
  },
  render: function () {
    var posts = [];

    if (Object.keys(this.state.posts).length < 1) {
      posts = <div>Loading...</div>;
    } else {
      this.state.posts.forEach(function (post, index) {
        posts.push(<Post key={index} data={post} />);
      });
    }

    return (
      <div>
        <h2>Timeline</h2>
        {posts}
      </div>
    );
  },
  _onChange: function() {
    this.setState(getPosts());
  }
});

module.exports = Timeline;
