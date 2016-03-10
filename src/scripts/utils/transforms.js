import moment from 'moment'

export default {
  instagram: function (item) {
    return item && {
      id: item.id,
      user: {
        id: item.user.id,
        username: item.user.username,
        display_name: item.user.full_name,
        profile_picture: item.user.profile_picture
      },
      message: (item.caption) ? item.caption.text : undefined,
      media: {
        type: 'image',
        url: item.images.standard_resolution.url,
        link: item.link
      },
      favourites: item.likes.count,
      comments: item.comments.count,
      created_at: moment.unix(item.created_time),
      source: 'instagram',
      source_url: item.link
    }
  },
  twitter: function (item) {
    if (typeof item === 'undefined') return false //TODO: raise an error because the argument is mandatory
    if (typeof item.retweeted_status !== 'undefined') item = item.retweeted_status

    return {
      id: item.id_str,
      user: {
        id: item.user.id_str,
        username: item.user.screen_name,
        display_name: item.user.name,
        profile_picture: item.user.profile_image_url
      },
      message: _message(item.text, item.entities), //TODO: parse plain text to enrich tweet with hashtags, user mentions, etc.
      media: { //TODO: tweets media gallery. Tweets can have more than one image
        type: (item.entities.media) ? item.entities.media[0].type : false,
        url: (item.entities.media) ? item.entities.media[0].media_url_https : false,
        link: (item.entities.media) ? item.entities.media[0].expanded_url : false
      },
      favourites: item.favorite_count,
      comments: item.retweet_count,
      created_at: moment(Date.parse(item.created_at)),
      source: 'twitter',
      source_url: 'http://twitter.com/' + item.user.screen_name + '/status/' + item.id_str
    }
  }
}

/**
 * @param {String} message
 * @param {Object} entities
 *
 * @return {String}
 */
function _message(message, entities) {
  //TODO: check params and raise error
  var formattedMessage = message
  var options = {
    hashtags: { href: 'https://twitter.com/hashtag/{keyword}', keyword: 'text', prefix: '#'},
    media: {keyword: 'url', prefix: ''},
    user_mentions: { href: 'https://twitter.com/{keyword}', keyword: 'screen_name', prefix: '@'},
    urls: { href: '', keyword: 'url', prefix: ''}
  }

  for (var entityName in entities) {
    var entity = (entities[entityName].length) ? entities[entityName] : false
    if (entity) {
      entity = _entity(entity, entityName, options[entityName])
      entity.forEach(function (item) {
        formattedMessage = formattedMessage.replace(item.keyword, item.content)
      })
    }
  }

  return formattedMessage
}

/**
 * @param {Array} entity
 * @param {String} type
 * @param {Object} options
 *
 * @return {Array}
 */
function _entity(entity, type, options) {
  if (typeof entity === 'undefined') return []
  if (typeof type === 'undefined') return []

  var anchor_tmpl = '<a href="{href}" target="_blank">{content}</a>'

  var anchors = entity.map(function (item) {
    //TODO: all of this is too obfuscated, there have to be a better way
    var keyword = options.prefix + item[options.keyword]
    var content = (options.href) ? keyword : item.display_url
    var href = (options.href)
      ? options.href.replace('{keyword}', item[options.keyword])
      : item.expanded_url
    var anchor = anchor_tmpl
      .replace('{content}', content)
      .replace('{href}', href)
    return {
      keyword: keyword,
      content: (typeof options.href !== 'undefined') ? anchor : ''
    }
  })

  return anchors
}
