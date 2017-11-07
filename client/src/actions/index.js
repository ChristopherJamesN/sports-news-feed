import "isomorphic-fetch"
import ESPNAPI from './URLs.js'

export function addNote(note){
  return {
    type: 'ADD_NOTE',
    note
  };
};

export function fetchNotes() {
  const notes = [
    {id: 1, name: 'First', description: 'The first note.'},
    {id: 2, name: 'Second', description: 'The second note.'},
    {id: 3, name: 'Third', description: 'The third note.'}
  ];
  return {
    type: 'FETCH_NOTES',
    notes
  };
}

export function getNotes() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_NOTES' })
    return fetch('/api/notes')
      .then(response => response.json())
      .then(payload => dispatch({ type: 'SHOW_NOTES', payload }))
  }
}

export function addNews(newsItem){
  return {
    type: 'ADD_NEWS',
    newsItem
  };
};

/*
export function fetchNews() {
  const news = [
    {id: 1, name: 'First news article', title: 'The first news article.'},
    {id: 2, name: 'Second news article', title: 'The second news article.'},
    {id: 3, name: 'Third news article', title: 'The third news article.'}
  ];
  return {
    type: 'FETCH_NEWS',
    news
  };
}
*/

export function fetchNews() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_NEWS' });
    return fetch(ESPNAPI)
      .then(response => {
        return response.json()
      }).then(responseJSON => {
        return responseJSON.articles
      }).then(news => dispatch({ type: 'FETCH_NEWS', news }));
  };
}

/*
export function fetchNotes(query) {
  return fetch(`/api/note?q=${query}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON);
}
*/
