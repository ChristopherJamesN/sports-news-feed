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
