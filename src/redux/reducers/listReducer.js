const initialState = {
  cart: [],
}
export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_LIST':
      return {
        cart: [action.payload, ...state.cart],
      }
    default:
      return state
  }
}