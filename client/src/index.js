import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import React from 'react';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';

registerServiceWorker();
const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk))

store.subscribe(() => {
  saveState({
    notes: store.getState().notesReducer,
    loginStatus: store.getState().userReducer,
  });
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
