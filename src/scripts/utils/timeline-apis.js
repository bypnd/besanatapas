import jsonp from 'jsonp'
import logger from '../utils/logger'
import request from 'superagent'

import TimelineActions from '../actions/timeline-actions'

const instagram = {
  userId: '1464295575',
  clientId: 'c0901148858d4ec684d3894bc6c7bc1c'
}

const twitter = {
  userId: '239744001'
}

export default {
  fetchAPI: function () {
    // fetch instagram API
    jsonp(
      'https://api.instagram.com/v1/users/' + instagram.userId + '/media/recent/?client_id=' + instagram.clientId,
      function (err, res) {
        if (err) {
          logger.error('Ajax error!', err.toString())
        } else {
          TimelineActions.receiveInstagram(res)
          logger.log('Instagram API success!', res)
        }
      }
    )
    // fetch twitter API
    request
      .get('http://localhost:5000/statuses/user_timeline.json')
      .query({ user_id: twitter.userId })
      .end(function (err, res) {
        if (err) {
          logger.error('Ajax error!', err.toString())
        } else {
          TimelineActions.receiveTwitter(res.body)
          logger.log('Twitter API success!', res)
        }
      })
  }
}

//TODO: replace use of JSONP in the instagram API call with a proxy with proper CORS header handling
