import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom';
import store from './configureStore';
import { Provider } from 'react-redux';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
