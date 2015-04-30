var TimelineConstants = require('../constants/timeline-constants');
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var PayloadSources = TimelineConstants.PayloadSources;

var AppDispatcher = assign(new Dispatcher(), {
  handleServerAction: function (action) {
    var playload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(playload);
  },
  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = AppDispatcher;
