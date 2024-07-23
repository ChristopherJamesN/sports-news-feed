import 'isomorphic-fetch';

export function getNotes() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_NOTES' });
    return fetch('/api/notes', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((payload) => dispatch({ type: 'SHOW_NOTES', payload }))
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message
        );
        dispatch({ type: 'INVALID_SIGNUP' });
      });
  };
}

export function persistNote(name, description, link, comments) {
  const noteInfo = JSON.stringify({
    note: {
      name: name,
      description: description,
      link: link,
      comments: comments,
    },
  });
  return (dispatch) => {
    dispatch({ type: 'SAVING_NOTE' });
    return fetch('/api/notes', {
      method: 'post',
      body: noteInfo,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((response) => response.json())
      .then((payload) => dispatch({ type: 'ADD_NOTES', payload }))
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message
        );
        dispatch({ type: 'INVALID_SIGNUP' });
      });
  };
}

export function updateNote(noteId, name, description, link, comments) {
  return (dispatch) => {
    dispatch({ type: 'SAVING_NOTE' });
    return fetch(`/api/notes/${noteId}`, {
      method: 'put',
      body: JSON.stringify({
        note: {
          name: name,
          description: description,
          link: link,
          comments: comments,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((response) => response.json())
      .then((payload) => dispatch({ type: 'SAVING_NOTE' }))
      .then((payload) => {
        dispatch({ type: 'LOADING_NOTES' });
        return fetch('/api/notes', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((payload) => dispatch({ type: 'SHOW_NOTES', payload }));
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message
        );
        dispatch({ type: 'INVALID_SIGNUP' });
      });
  };
}

export function deleteNote(noteId) {
  return (dispatch) => {
    dispatch({ type: 'DELETING_NOTE' });
    return fetch(`/api/notes/${noteId}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    }).then((payload) => {
      dispatch({ type: 'LOADING_NOTES' });
      return fetch('/api/notes', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((payload) => dispatch({ type: 'SHOW_NOTES', payload }))
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ',
            error.message
          );
          dispatch({ type: 'INVALID_SIGNUP' });
        });
    });
  };
}

export function fetchSportsNews() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_NEWS' });

    return fetch('/retrieve_news?searchTerm=sports')
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        if (responseJSON.status === 'error') {
          throw new Error(
            'Could not retrieve sports news from the news api due to an error: ' +
              responseJSON.message
          );
        }
        const sportsNewsResponse = responseJSON.articles;
        sportsNewsResponse.forEach((article) => {
          article.source = article.source.name;
        });
        return sportsNewsResponse;
      })
      .then((news) => dispatch({ type: 'ADD_SPORTS_NEWS', news }))
      .catch(function (error) {
        console.warn(error);
      });
  };
}

export function jwt(data, routerHistory) {
  return (dispatch) => {
    dispatch({ type: 'LOADING' });
    return fetch('/user_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: data,
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          response.json().then((data) => {
            localStorage.setItem('jwt', data.jwt);
            dispatch({ type: 'RETURN_JWT' });
            dispatch({ type: 'LOADING' });
            return fetch('/api/users/:id', {
              method: 'GET',
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
              },
            })
              .then((response) => response.json())
              .then((data) => {
                localStorage.setItem('user', JSON.stringify(data));
                dispatch({ type: 'CURRENT_USER', payload: data });
                routerHistory.replace('/');
              });
          });
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message
        );
        dispatch({ type: 'INVALID_SIGNIN' });
      });
  };
}

export function signUp(data, routerHistory) {
  return (dispatch) => {
    dispatch({ type: 'LOADING' });
    return fetch('/api/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: data,
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          response.json().then((data) => {
            localStorage.setItem('jwt', data.jwt);
            dispatch({ type: 'RETURN_JWT' });
            dispatch({ type: 'LOADING' });
            return fetch('/api/users/:id', {
              method: 'GET',
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
              },
            })
              .then((response) => response.json())
              .then((data) => {
                localStorage.setItem('user', JSON.stringify(data));
                dispatch({ type: 'CURRENT_USER', payload: data });
                routerHistory.replace('/');
              });
          });
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message
        );
        dispatch({ type: 'INVALID_SIGNUP' });
      });
  };
}

export function signOut(routerHistory) {
  return (dispatch) => {
    dispatch({ type: 'LOGGED_OUT' });
    routerHistory.replace('/login');
  };
}
