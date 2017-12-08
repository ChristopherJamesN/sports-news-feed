const initialState = {
  loading: '',
  notes: [],
  errors: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_NOTES':
      return {...state, loading: true}
    case 'SHOW_NOTES':
      return {...state, loading: false, notes: action.payload};
    case 'SAVING_NOTE':
      return { ...state, loading: false }
    case 'ADD_NOTES':
      return{...state, loading: false, notes: action.payload};
    default:
      return state;
  }
};
