import AppDispatcher from '../dispatcher/app-dispatcher';
import TimelineConstants from '../constants/timeline-constants';

export default {
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
