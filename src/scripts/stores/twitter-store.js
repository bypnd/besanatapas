var AppDispatcher = require('../dispatcher/app-dispatcher');
var TimelineConstants = require('../constants/timeline-constants');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = TimelineConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _tweets = [];

function _insertTweets(data) {
  if (typeof data === 'undefined') return false;

  _tweets = data;
}

var TwitterStore = assign({}, EventEmitter.prototype, {

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
    return _tweets;
  },

});

TwitterStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.TWITTER_API_RESPONSE:
      _insertTweets(action.rawResponse);
      TwitterStore.emitChange();
      break;

    default:
      //no default
  }

  //TODO: replace console with some loggin API
  console.debug('Twitter Store App Dispatcher register function', {
    source: payload.source,
    actionType: payload.action.type,
    _payload: payload
  });
});

module.exports = TwitterStore;
