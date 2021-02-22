const initialState = {
  cart: [],
  total: 0,
}
export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [action.payload, ...state.cart],
        total: state.total + action.payload.cost
      }
    default:
      return state
  }
}