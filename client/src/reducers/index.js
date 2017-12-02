import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import newsReducer from './newsReducer';
import userReducer from './userReducer';

export default combineReducers({
  notes: notesReducer,
  news: newsReducer,
  user: userReducer,
});
