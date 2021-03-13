const initialState = {
  cart: [],
}

export default function cartReducer(state = initialState, action) {

  switch (action.type) {

    case 'ADD_TO_CART':
      return {
        cart: [action.payload, ...state.cart],
      }

    case 'DELETE_ITEM_CART':
      return {
        cart: [...state.cart.filter(x => x != action.payload)],
      }

    default:
      return state
  }
}