var AppDispatcher = require('../dispatcher/app-dispatcher');
var TimelineConstants = require('../constants/timeline-constants');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = TimelineConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _pictures = [];
var _pagination = [];

function _insertPictures(data) {
  if (typeof data === 'undefined') return false;

  _pictures = data;
}
function _insertPagination(data) {
  if (typeof data === 'undefined') return false;

  _pagination = data;
}

var InstagramStore = assign({}, EventEmitter.prototype, {

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
    return _pictures;
  },

});

InstagramStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.INSTAGRAM_API_RESPONSE:
      _insertPictures(action.rawResponse.data);
      _insertPagination(action.rawResponse.pagination);
      InstagramStore.emitChange();
      break;

    default:
      //no default
  }

  //TODO: replace console with some loggin API
  console.debug('Instagram Store App Dispatcher register function', {
    source: payload.source,
    actionType: payload.action.type,
    _payload: payload
  });
});

module.exports = InstagramStore;
