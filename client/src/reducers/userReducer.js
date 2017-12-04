const initialState = {
  id: '',
  username: '',
  name: '',
  email: '',
  isLoggedIn: false,
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RETURN_JWT':
      return { loading: false }
    case 'CURRENT_USER':
      const user = Object.assign({}, state, action.payload);
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        isLoggedIn: true,
        loading: false
      }
    case 'LOGGED_OUT':
      return {
        loading: false,
        isLoggedIn: false,
        id: null,
        username: null,
        name: null,
        email: null
      }
    default:
      return state;
  }
};
