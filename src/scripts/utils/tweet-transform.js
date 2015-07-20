function Transform(tweet) {
  if (typeof tweet === 'undefined') return false; //TODO: raise an error because the argument is mandatory

  if (typeof tweet.retweeted_status !== 'undefined') tweet = tweet.retweeted_status;

  return {
    id: tweet.id_str,
    user: {
      id: tweet.user.id_str,
      username: tweet.user.screen_name,
      display_name: tweet.user.name,
      profile_picture: tweet.user.profile_image_url
    },
    message: _message(tweet.text, tweet.entities), //TODO: parse plain text to enrich tweet with hashtags, user mentions, etc.
    media: { //TODO: tweets media gallery. Tweets can have more than one image
      type: (tweet.entities.media) ? tweet.entities.media[0].type : false,
      url: (tweet.entities.media) ? tweet.entities.media[0].media_url : false,
      link: (tweet.entities.media) ? tweet.entities.media[0].expanded_url : false
    },
    favourites: tweet.favorite_count,
    comments: tweet.retweet_count,
    created_at: new Date(tweet.created_at),
    source: 'twitter'
  }
}

function _message(message, entities) {
  //TODO: check params and raise error
  var formattedMessage = message;
  var options = {
    hashtags: { href: 'https://twitter.com/hashtag/{keyword}', keyword: 'text', prefix: '#'},
    media: {keyword: 'url', prefix: ''},
    user_mentions: { href: 'https://twitter.com/{keyword}', keyword: 'screen_name', prefix: '@'},
    urls: { href: '', keyword: 'url', prefix: ''}
  }

  for (var entityName in entities) {
    var entity = (entities[entityName].length) ? entities[entityName] : false;
    if (entity) {
      entity = _entity(entity, entityName, options[entityName]);
      entity.forEach(function (item) {
        formattedMessage = formattedMessage.replace(item.keyword, item.content);
      });
    }
  }

  return formattedMessage;
}

function _entity(entity, type, options) {
  if (typeof entity === 'undefined') return [];
  if (typeof type === 'undefined') return [];

  var anchor_tmpl = '<a href="{href}" target="_blank">{content}</a>';

  var anchors = entity.map(function (item, index) {
    //TODO: all of this is too obfuscated, there have to be a better way
    var keyword = options.prefix + item[options.keyword];
    var content = (options.href) ? keyword : item.display_url;
    var href = (options.href) ? options.href.replace('{keyword}', keyword) : item.expanded_url;
    var anchor = anchor_tmpl
      .replace('{content}', content)
      .replace('{href}', href);
    return {
      keyword: keyword,
      content: (typeof options.href !== 'undefined') ? anchor : ''
    }
  });

  return anchors;
}

export default Transform;
