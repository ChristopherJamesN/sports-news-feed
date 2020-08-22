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

export function fetchNews() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_NEWS' });

    return fetch('/retrieve_espn_news')
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        const espnNewsResponse = responseJSON.articles;
        espnNewsResponse.forEach((article) => {
          article.source = 'ESPN';
        });
        return espnNewsResponse;
      })
      .then((news) => dispatch({ type: 'FETCH_NEWS', news }));
  };
}

export function fetchFoxSports() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_NEWS' });

    return fetch('/retrieve_fox_sports_news')
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        const foxSportsNewsResponse = responseJSON.articles;
        foxSportsNewsResponse.forEach((article) => {
          article.source = 'Fox Sports';
        });
        return foxSportsNewsResponse;
      })
      .then((news) => dispatch({ type: 'ADD_FOX_SPORTS', news }));
  };
}

export function fetchNFLNews() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_NEWS' });

    return fetch('/retrieve_nfl_news')
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        const NFLNetworkNewsResponse = responseJSON.articles;
        NFLNetworkNewsResponse.forEach((article) => {
          article.source = 'NFL Network';
        });
        return NFLNetworkNewsResponse;
      })
      .then((news) => dispatch({ type: 'ADD_NFL_NEWS', news }));
  };
}

export function fetchSportsNews() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_NEWS' });

    return fetch('/retrieve_sports_news')
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        const sportsNewsResponse = responseJSON.articles;
        sportsNewsResponse.forEach((article) => {
          article.source = article.source.name;
        });
        return sportsNewsResponse;
      })
      .then((news) => dispatch({ type: 'ADD_SPORTS_NEWS', news }));
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
