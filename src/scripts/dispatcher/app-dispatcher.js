import { PayloadSources } from '../constants/timeline-constants';
import { Dispatcher } from 'flux';
import assign from 'object-assign';

export default assign(new Dispatcher(), {
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
