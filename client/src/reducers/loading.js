export default function loading(state = {
  loading: false}, action) {
    switch(action.type) {
      case 'LOADING':
        return { loading: true }
      case 'NOTLOADING':
        return { loading: false }
      default:
        return state;
    }
  }
