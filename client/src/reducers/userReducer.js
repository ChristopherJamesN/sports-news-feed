const initialState = {
  loading: '',
  user: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_USER':
      return {...state, loading: true}
    case 'SHOW_USER':
      return {...state, loading: false, user: action.user}
    case 'ADD_USER':
      return state;
    case 'SIGN_OUT':
      return state;
    default:
      return state;
  }
};
