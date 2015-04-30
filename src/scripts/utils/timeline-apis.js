var TimelineActions = require('../actions/timeline-actions');
var request = require('superagent');
var jsonp = require('jsonp');

var instagram = {
  userId: '1464295575',
  clientId: 'c0901148858d4ec684d3894bc6c7bc1c'
};

var twitter = {
  userId: '239744001'
};

module.exports = {
  fetchAPI: function () {

    // fetch instagram API
		jsonp(
			'https://api.instagram.com/v1/users/' + instagram.userId + '/media/recent/?client_id=' + instagram.clientId,
			function (err, res) {
				if (err) {
					console.error('Ajax error!', err.toString());
				} else {
					TimelineActions.receiveInstagram(res);
        	console.info('Ajax success (instagram)!', res);
				}
			}
		);

    // fetch twitter API
		request
			.get('http://localhost:8080/statuses/user_timeline.json')
			.query({ user_id: twitter.userId })
			.end(function (err, res) {
				if (err) {
					console.error('Ajax error!', err.toString());
				} else {
					TimelineActions.receiveTwitter(res.body);
        	console.info('Ajax success (twitter)!', res);
				}
			});

  }
};

//TODO: replace console with some loggin API
//TODO: replace use of JSONP in the instagram API call with a proxy with proper CORS header handling
