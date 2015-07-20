import React from 'react';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props.data;

    return (
      <div className="post">
        <h3>{data.user.display_name} | ID: {data.id} <small>{data.source}</small></h3>
        <p>Date: {data.created_at.toString()}</p>
        {(data.media.url) ? <Picture data={data.media} /> : false}
        <div dangerouslySetInnerHTML={{__html: data.message}} />
        <p>Comments: {data.comments}</p>
      </div>
    );
  }
}
Post.propTypes = {
  data: React.PropTypes.object.isRequired
}

class Picture extends React.Component {
  render() {
    const data = this.props.data;

    return (
      <a className="picture" href={data.link} target="_blank">
        <img src={data.url} />
      </a>
    )
  }
}

export default Post;
