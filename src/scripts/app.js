import React from 'react'; //eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import Timeline from './components/Timeline';
import TimelineSources from './utils/timeline-apis';

TimelineSources.fetchAPI();

ReactDOM.render(
  <Timeline />,
  document.getElementById('timeline-container')
);
