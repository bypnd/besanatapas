import AppDispatcher from '../dispatcher/app-dispatcher';
import { ActionTypes } from '../constants/timeline-constants';
import { EventEmitter } from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _pictures = [];
let _pagination = []; //eslint-disable-line no-unused-vars

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
  }

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
  console.debug('Instagram Store App Dispatcher register function', { //eslint-disable-line no-console
    source: payload.source,
    actionType: payload.action.type,
    _payload: payload
  });
});

export default InstagramStore;
