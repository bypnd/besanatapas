var React = require('react');
var ReactPropTypes = React.PropTypes;

var Post = React.createClass({
  propTypes: {
   data: ReactPropTypes.object.isRequired
  },

  render: function () {
    var data = this.props.data;

    if (data.media.url) {
      var picture = <img src={data.media.url} />;
    }

    return (
      <div>
        <h3>ID: {data.id} <small>{data.source}</small></h3>
        <p>Date: {data.created_at.toString()}</p>
        {picture}
        <p>Text: {data.message}</p>
        <p>Comments: {data.comments}</p>
      </div>
    );
  }
});

module.exports = Post;
