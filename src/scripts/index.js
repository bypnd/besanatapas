(function () {
	'use strict';

	var React = require('react');

	var Timeline = require('./components/timeline.react');
	var TimelineSources = require('./utils/timeline-apis');

	TimelineSources.fetchAPI();

	React.render(
	  <Timeline />,
	  document.getElementById('timeline-container')
	);

})();
