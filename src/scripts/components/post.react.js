var React = require('react');
var ReactPropTypes = React.PropTypes;

var Post = React.createClass({
  propTypes: {
   data: ReactPropTypes.object.isRequired
  },

  render: function () {
    var data = this.props.data;

    if (data.media.url) {
      //var picture = <a href={data.media.link} target="_blank"><img src={data.media.url} /></a>;
      var picture = <Picture data={data.media} />;
    }

    return (
      <div className="post">
        <h3>{data.user.display_name} | ID: {data.id} <small>{data.source}</small></h3>
        <p>Date: {data.created_at.toString()}</p>
        {picture}
        <div dangerouslySetInnerHTML={{__html: data.message}} />
        <p>Comments: {data.comments}</p>
      </div>
    );
  }
});

var Picture = React.createClass({
  render: function () {
    var data = this.props.data;

    return (
      <a className="picture" href={data.link} target="_blank">
        <img src={data.url} />
      </a>
    )
  }
});

module.exports = Post;
