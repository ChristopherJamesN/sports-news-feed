import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import newsReducer from './newsReducer';
import userReducer from './userReducer';
import loading from './loading';

export default combineReducers({
  notes: notesReducer,
  news: newsReducer,
  user: userReducer,
  loading: loading,
});
