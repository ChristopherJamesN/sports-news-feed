import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import newsReducer from './newsReducer';

export default combineReducers({
  notes: notesReducer,
  news: newsReducer
});
