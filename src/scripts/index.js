import React from 'react';
import Timeline from './components/timeline.react';
import TimelineSources from './utils/timeline-apis';

TimelineSources.fetchAPI();

React.render(
  <Timeline />,
  document.getElementById('timeline-container')
);
