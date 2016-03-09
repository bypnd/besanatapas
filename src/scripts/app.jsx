import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Timeline from './components/Timeline'
import configureStore from './store/configureStore'

const store = configureStore()

render(
  <Provider store={store}>
    <Timeline />
  </Provider>,
  document.getElementById('container')
)
