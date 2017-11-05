import "isomorphic-fetch"

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
    const news = fetch('https://newsapi.org/v1/articles?source=espn&apiKey=')
      .then(response => response.json())
      .then(responseJSON => responseJSON.articles)
    dispatch({ type: 'FETCH_NEWS', news })
  };
}
