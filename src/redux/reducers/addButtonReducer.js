const initialState = {
  fabIsVisible: true
}
export default function addButtonReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW':
      return { fabIsVisible: true }

    case 'HIDE':
      return { fabIsVisible: false }

    default:
      return initialState
  }
}