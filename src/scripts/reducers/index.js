import { combineReducers } from 'redux'
import {
  REQUEST_API, RECEIVE_API
} from '../actions'
import assign from 'object-assign'

function posts(state = {
  isFetching: false,
  posts: []
}, action) {
  switch (action.type) {
    case REQUEST_API:
      return assign({}, state, {
        isFetching: true
      })
    case RECEIVE_API:
      return assign({}, state, {
        isFetching: false,
        posts: state.posts
          .concat(action.posts)
          .sort(createdAtDateSortDesc),
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  posts
})

/**
 * comparison function to order posts by date
 */
function createdAtDateSortDesc(obj1, obj2) {
  // This is a comparison function that will result in dates being sorted in DESCENDING order.
  //TODO: move sorting function to 'utils'
  if (obj1.created_at > obj2.created_at) return -1
  if (obj1.created_at < obj2.created_at) return 1
  return 0
}

export default rootReducer
