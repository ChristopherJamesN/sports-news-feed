export default (state = [{loading: false, articles:[]}], action) => {
  switch (action.type) {
    case 'FETCH_NEWS':
      return {loading: false, articles: action.payload};
    case 'ADD_NEWS':
      const newsItem = Object.assign({}, action.news, { id: state.length + 1} );
      return [ ...state, newsItem ];
    default:
      return state;
  }
};
