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

export function persistNote(name, description, link, comments) {
  const noteInfo = JSON.stringify({
    note:{
      name: name,
      description: description,
      link: link,
      comments: comments
    }
  });
  return (dispatch) => {
    dispatch({ type: 'SAVING_NOTE' })
    return fetch('/api/notes', {
      method: "post", body: noteInfo, headers: { "Content-Type": "application/json" }})
      .then(response => response.json()).then(payload => dispatch({ type: 'ADD_NOTES', payload }));
  }
}

export function updateNote(noteId, name, description, link, comments) {
  return (dispatch) => {
    dispatch({ type: 'SAVING_NOTE' })
    return fetch(`/api/notes/${noteId}`, {
      method: "put", body: JSON.stringify({note:{
        name: name,
        description: description,
        link: link,
        comments: comments
      }
    }), headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json()).then(payload => dispatch({ type: 'SAVING_NOTE' }));
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

//Add a .env file to the root of the react project
//To access in app process.env.REACT_APP_FOX_SPORTS_KEY

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

export function getUser() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_USER' })
    return fetch('/auth/is_signed_in')
        .then(response => {
          return response.json()
        }).then(payload => dispatch({ type: 'SHOW_USER', payload }));
  };
}

export function signIn(email, password) {
  const userInfo = JSON.stringify({
    user:{
      email: email,
      password: password
    }
  });
  return (dispatch) => {
    dispatch({ type: 'SAVING_USER' })
    return fetch('api/users/sign_in', {
      method: "post", body: userInfo, headers: { "Content-Type": "application/json" }})
      .then(response => response.json()).then(payload => dispatch({ type: 'SHOW_USER', payload }));
  }
}

export function signUp(email, password, password_confirmation) {
  const userInfo = JSON.stringify({
    user:{
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }
  });
  return (dispatch) => {
    dispatch({ type: 'SAVING_USER' })
    return fetch('api/users', {
      method: "post", body: userInfo, headers: { "Content-Type": "application/json" }})
      .then(response => response.json()).then(payload => dispatch({ type: 'SHOW_USER', payload }));
  }
}

export function signOut(currentUser) {
  const userInfo = JSON.stringify({
    user:{
      currentUser: currentUser
    }
  });
  return (dispatch) => {
    dispatch({ type: 'SIGN_OUT' })
    return fetch('api/users/sign_out', {
      method: "delete", body: userInfo, headers: { "Content-Type": "application/json" }})
      .then(response => response.json()).then(payload => dispatch({ type: 'SHOW_USER', payload }));
  }
}
