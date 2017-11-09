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
    default:
      return state;
  }
};
