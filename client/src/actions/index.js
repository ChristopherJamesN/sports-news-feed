import "isomorphic-fetch"
import APIKEY from './URLs.js'

export function getNotes() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_NOTES' })
    return fetch('/api/notes')
        .then(response => {
          return response.json()
        }).then(payload => dispatch({ type: 'SHOW_NOTES', payload }));
  };
}

export function persistNote(name, description, link) {
  const noteInfo = JSON.stringify({
    note:{
      name: name,
      description: description,
      link: link
    }
  });
  return (dispatch) => {
    dispatch({ type: 'SAVING_NOTE' })
    return fetch('/api/notes', {
      method: "post", body: noteInfo, headers: { "Content-Type": "application/json" }})
      .then(response => response.json())
  }
}

export function updateNote(noteId, name, description, link) {
  return (dispatch) => {
    dispatch({ type: 'UPDATING_NOTES' })
    return fetch(`/api/notes/${noteId}`, {
      method: "put", body: JSON.stringify({note:{
        name: name,
        description: description,
        link: link
      }
    }), headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
  }
}

export function fetchNews() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_NEWS' });

    return fetch(`https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=${APIKEY}`)
    .then(response => {
      return response.json()})
      .then(responseJSON => {
      return responseJSON.articles
    }).then(news => dispatch({type: 'FETCH_NEWS', news}));

  };
}

export function fetchFoxSports() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_NEWS' });

    return fetch(`https://newsapi.org/v1/articles?source=fox-sports&sortBy=top&apiKey=${APIKEY}`)
      .then(response => {
        return response.json()})
        .then(responseJSON => {
        return responseJSON.articles
      }).then(news => dispatch({type: 'ADD_FOX_SPORTS', news}));

  };
}

export function fetchNFLNews() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_NEWS' });

    return fetch(`https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=${APIKEY}`)
      .then(response => {
        return response.json()})
        .then(responseJSON => {
        return responseJSON.articles
      }).then(news => dispatch({type: 'ADD_NFL_NEWS', news}));

  };
}
