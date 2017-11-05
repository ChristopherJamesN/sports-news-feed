export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_NEWS':
      return action.news;
    default:
      return state;
  }
};
