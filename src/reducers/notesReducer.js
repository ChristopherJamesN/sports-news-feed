export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_NOTES':
      return action.notes;
    case 'FETCH_NEWS':
      return action.news;
    case 'ADD_NOTE':
      const note = Object.assign({}, action.note, { id: state.length + 1} );
      return [ ...state, note ];
    default:
      return state;
  }
};
