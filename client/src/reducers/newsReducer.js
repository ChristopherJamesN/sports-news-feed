const initialState = {
  loading: '',
  news: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_NEWS':
      return {...state, loading: true}
    case 'FETCH_NEWS':
      return {...state, loading: false, news: action.news}
    case 'ADD_FOX_SPORTS':
      return Object.assign({}, state, {news: state.news.concat(action.news)});
    case 'ADD_NFL_NEWS':
      return Object.assign({}, state, {news: state.news.concat(action.news)});
    default:
      return state;
  }
};
