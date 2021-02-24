const initialState = {
  cart: [],
}
export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_LIST':
      return {
        cart: [action.payload, ...state.cart],
      }
    case 'DELETE_ITEM':
      return {
        cart: [...state.cart.filter(x=> x!=action.payload)],
      }
    default:
      return state
  }
}