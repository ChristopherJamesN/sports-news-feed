export default (state = [{loading: false, news:[]}], action) => {
  switch (action.type) {
    case 'FETCH_NEWS':
      return {loading: false, news: action.news};
    case 'ADD_NEWS':
      const newsItem = Object.assign({}, action.news, { id: state.length + 1} );
      return [ ...state, newsItem ];
    default:
      return state;
  }
};
