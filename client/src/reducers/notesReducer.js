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
    case 'SAVING_NOTE':
      return { ...state, loading: false }
    case 'DELETING_NOTE':
      return { ...state, loading: false }
    case 'ADD_NOTES':
      return{...state, loading: false, notes: state.notes.concat(action.payload)};
    default:
      return state;
  }
};
