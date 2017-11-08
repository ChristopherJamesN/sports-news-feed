const initialState = {
  loading: '',
  notes: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_NOTES':
      return {...state, loading: true}
    case 'SHOW_NOTES':
      return {...state, loading: false, notes: action.payload};
    case 'ADD_NOTE':
      const note = Object.assign({}, action.note, { id: state.notes.length + 1} );
      return [ ...state, notes: state.notes.push(note) ];
    default:
      return state;
  }
};
