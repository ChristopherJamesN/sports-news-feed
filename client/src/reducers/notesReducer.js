export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_NOTES':
      return action.notes;
    case 'LOADING_NOTES':
      return {...state, loading: true}
    case 'SHOW_NOTES':
      return {...state, loading: false, notes: action.payload};
    case 'ADD_NOTE':
      const note = Object.assign({}, action.note, { id: state.length + 1} );
      return [ ...state, note ];
    default:
      return state;
  }
};
