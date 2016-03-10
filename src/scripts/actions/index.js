import api from '../utils/dataSources'
import transform from '../utils/transforms'

export const REQUEST_API = 'REQUEST_API'
export const RECEIVE_API = 'RECEIVE_API'

function requestAPI(network) {
  return {
    type: REQUEST_API,
    network
  }
}

function receiveAPI(network, res) {
  return {
    type: RECEIVE_API,
    source: network,
    posts: res.map(transform[network]),
    receivedAt: Date.now()
  }
}

function fetchAPI(network) {
  return dispatch => {
    dispatch(requestAPI(network))
    return api[network](function (res) {
      dispatch(receiveAPI(network, res))
    })
  }
}

function shouldFetchAPI(state, network) {
  return network ? true : false
}

/**
 * fetch API from different social networks
 *
 * @param {String} network
 * @return {Object}
 */
export function fetchAPIsIfNeeded(network) {
  return (dispatch, getState) => {
    if (shouldFetchAPI(getState(), network)) {
      return dispatch(fetchAPI(network, receiveAPI))
    }
  }
}
