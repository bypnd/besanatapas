import AppDispatcher from '../dispatcher/app-dispatcher';
import { ActionTypes } from '../constants/timeline-constants';

export default {
  receiveInstagram: function(rawResponse) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.INSTAGRAM_API_RESPONSE,
      rawResponse: rawResponse
    });
  },
  receiveTwitter: function(rawResponse) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.TWITTER_API_RESPONSE,
      rawResponse: rawResponse
    });
  }
};
