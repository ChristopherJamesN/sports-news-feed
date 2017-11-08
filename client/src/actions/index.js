import "isomorphic-fetch"
import ESPNAPI from './URLs.js'

export function getNotes() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_NOTES' })
    return fetch('/api/notes')
        .then(response => {
          return response.json()
        }).then(payload => dispatch({ type: 'SHOW_NOTES', payload }));
  };
}

export function persistNote(name, description) {
  const noteInfo = JSON.stringify({
    note:{
      name: name,
      description: description
    }
  });
  return (dispatch) => {
    dispatch({ type: 'SAVING_NOTE' })
    return fetch('/api/notes', {
      method: "post", body: noteInfo, headers: { "Content-Type": "application/json" }})
      .then(response => response.json())
      .then(window.location = '/notes')
  }
}

export function updateNote(noteId) {
  return (dispatch) => {
    dispatch({ type: 'UPDATING_NOTES' })
    return fetch(`/api/notes/${noteId}`, {
      method: "put", body: JSON.stringify({id:noteId}), headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(payload => dispatch({ type: 'SHOW_NOTES', payload }))
  }
}

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
