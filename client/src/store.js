import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import loading from './reducers/loading';
import userReducer from './reducers/userReducer';
import notesReducer from './reducers/notesReducer';
import newsReducer from './reducers/newsReducer';
import { loadState, saveState } from './localStorage';

const reducers = combineReducers({
  userReducer,
  loading,
  notesReducer,
  newsReducer
});

const persistedState = loadState();

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
)

store.subscribe(() => {
  saveState({
    userReducer: store.getState().userReducer,
    notesReducer: store.getState().notesReducer,
    newsReducer: store.getState().newsReducer
  });
});
export default store;
