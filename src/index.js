import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import React from 'react';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom';
import store from './configureStore';
import { Provider } from 'react-redux';

registerServiceWorker();

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
