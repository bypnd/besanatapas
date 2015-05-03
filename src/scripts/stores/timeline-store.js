var AppDispatcher = require('../dispatcher/app-dispatcher');
var InstagramStore = require('./instagram-store');
var TwitterStore = require('./twitter-store');
var TimelineConstants = require('../constants/timeline-constants');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var tweet = require('../utils/tweet-transform');

var ActionTypes = TimelineConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _posts = [];

function _insertInstagramPictures(data) {
  if (typeof data === 'undefined') return false;
  //TODO move social network response mapper to 'utils'
  data.map(function (item) {
    _posts.push({
      id: item.id,
      user: {
        id: item.user.id,
        username: item.user.username,
        display_name: item.user.full_name,
        profile_picture: item.user.profile_picture
      },
      message: (item.caption) ? item.caption.text : false,
      media: {
        type: 'image',
        url: item.images.standard_resolution.url,
        link: item.link
      },
      favourites: item.likes.count,
      comments: item.comments.count,
      created_at: new Date(item.created_time*1000),
      source: 'instagram'
    });
  });
}
function _insertTweets(data) {
  if (typeof data === 'undefined') return false;
  //TODO move social network response mapper to 'utils'
  data.map(function (item) {
    _posts.push(tweet(item));
  });
  _posts.sort(createdAt_date_sort_desc);
}
var createdAt_date_sort_desc = function (obj1, obj2) {
  // This is a comparison function that will result in dates being sorted in DESCENDING order.
  //TODO: move sorting function to 'utils'
  if (obj1.created_at > obj2.created_at) return -1;
  if (obj1.created_at < obj2.created_at) return 1;
  return 0;
};


var TimelineStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  get: function () {
    return _posts;
  },

});

TimelineStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {

    case ActionTypes.INSTAGRAM_API_RESPONSE:
      AppDispatcher.waitFor([InstagramStore.dispatchToken]);
      _insertInstagramPictures(InstagramStore.get());
      TimelineStore.emitChange();
      break;

    case ActionTypes.TWITTER_API_RESPONSE:
      AppDispatcher.waitFor([TwitterStore.dispatchToken]);
      _insertTweets(TwitterStore.get());
      TimelineStore.emitChange();
      break;

    default:
      // no default

  }

  //TODO: replace console with some loggin API
  console.debug('Timeline Store App Dispatcher register function', {
    source: payload.source,
    actionType: payload.action.type,
    _payload: payload
  });
});

module.exports = TimelineStore;