var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    INSTAGRAM_API_RESPONSE: null,
    INSTAGRAM_COMMENT: null,
    INSTAGRAM_FAVOURITE: null,
    RETWEET: null,
    TWITTER_API_RESPONSE: null,
    TWITTER_FAVOURITE: null,
    TWITTER_REPLY: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
