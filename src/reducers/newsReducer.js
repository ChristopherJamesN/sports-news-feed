export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_NEWS':
      return action.news;
    case 'ADD_NEWS':
      const newsItem = Object.assign({}, action.news, { id: state.length + 1} );
      return [ ...state, newsItem ];
    default:
      return state;
  }
};
