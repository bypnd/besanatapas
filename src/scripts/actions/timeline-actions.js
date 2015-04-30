var AppDispatcher = require('../dispatcher/app-dispatcher');
var TimelineConstants = require('../constants/timeline-constants');

TimelineActions = {
  receiveInstagram: function(rawResponse) {
    AppDispatcher.handleServerAction({
      type: TimelineConstants.ActionTypes.INSTAGRAM_API_RESPONSE,
      rawResponse: rawResponse
    });
  },
  receiveTwitter: function(rawResponse) {
    AppDispatcher.handleServerAction({
      type: TimelineConstants.ActionTypes.TWITTER_API_RESPONSE,
      rawResponse: rawResponse
    });
  }
};

module.exports = TimelineActions;
