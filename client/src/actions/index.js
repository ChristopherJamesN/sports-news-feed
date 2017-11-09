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

export function updateNote(noteId, name, description) {
  return (dispatch) => {
    dispatch({ type: 'UPDATING_NOTES' })
    return fetch(`/api/notes/${noteId}`, {
      method: "put", body: JSON.stringify({note:{
        id: noteId,
        name: name,
        description: description
      }
    }), headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(window.location = '/notes')
  }
}

export function fetchNews() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_NEWS' });
    const ESPNNews = fetch(`https://newsapi.org/v1/articles?source=espn&apiKey=${APIKEY}`)
      .then(response => {
        return response.json()})
        .then(responseJSON => {
        return responseJSON.articles
      });

    const FOXSportsNews = fetch(`https://newsapi.org/v1/articles?source=fox-sports&sortBy=top&apiKey=${APIKEY}`)
      .then(response => {
        return response.json()})
        .then(responseJSON => {
        return responseJSON.articles
      });

      const AllNews = ESPNNews + FOXSportsNews

      AllNews.then(news => dispatch({ type: 'FETCH_NEWS', news }));
  };
}
