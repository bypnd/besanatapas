import config from '../config'
import jsonp from 'jsonp'
import logger from '../utils/logger'
import request from 'superagent'

import TimelineActions from '../actions/timeline-actions'

const instagramUserId = config.instagram.userId
const instagramClientId = config.instagram.clientId

const twitterURL = config.twitter.apiUrl

export default {
  fetchAPI: function () {
    // fetch instagram API
    jsonp(
      `https://api.instagram.com/v1/users/${instagramUserId}/media/recent/?client_id=${instagramClientId}`,
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
      .get(`${twitterURL}/statuses/user_timeline.json`)
      .query({ user_id: config.twitter.userId })
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
