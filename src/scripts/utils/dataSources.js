import config from '../config'
import jsonp from 'jsonp'
import logger from '../utils/logger'
import request from 'superagent'

const instagramUserId = config.instagram.userId
const instagramClientId = config.instagram.clientId

const twitterURL = config.twitter.apiUrl

export default {
  instagram: function(done) {
    // fetch instagram API
    //TODO: replace use of JSONP in the instagram API call with a proxy with proper CORS header handling
    jsonp(
      `https://api.instagram.com/v1/users/${instagramUserId}/media/recent/?client_id=${instagramClientId}`,
      function (err, res) {
        if (err) {
          logger.error('Ajax error!', err.toString())
        } else {
          //TimelineActions.receiveInstagram(res)
          done(res.data)
          logger.log('Instagram API success!', res)
        }
      }
    )
  },
  twitter: function(done) {
    // fetch twitter API
    return request
      .get(`${twitterURL}/statuses/user_timeline.json`)
      .query({ user_id: config.twitter.userId })
      .end(function (err, res) {
        if (err) {
          logger.error('Ajax error!', err.toString())
        } else {
          done(res.body)
          logger.log('Twitter API success!', res)
        }
      })
  }
}
