const initialState = {
  id: '',
  email: '',
  isLoggedIn: false,
  loading: false,
  signupError: false,
  signinError: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RETURN_JWT':
      return { loading: false }
    case 'CURRENT_USER':
      const user = Object.assign({}, state, action.payload);
      return {
        id: user.id,
        email: user.email,
        isLoggedIn: true,
        loading: false,
        signupError: false,
        signinError: false
      }
    case 'LOGGED_OUT':
      return {
        loading: false,
        isLoggedIn: false,
        id: null,
        email: null,
        signupError: false,
        signinError: false
      }
      case 'INVALID_SIGNUP':
        return {
          loading: false,
          isLoggedIn: false,
          id: null,
          email: null,
          signupError: true,
          signinError: false
        }
        case 'INVALID_SIGNIN':
          return {
            loading: false,
            isLoggedIn: false,
            id: null,
            email: null,
            signupError: false,
            signinError: true
          }
    default:
      return state;
  }
};
