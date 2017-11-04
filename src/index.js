import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import React from 'react';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk';

registerServiceWorker();

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
