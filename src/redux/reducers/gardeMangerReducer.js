const initialState = {
  gardeManger: [],
};

export default function gardeMangerReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_GARDEMANGER':
      return {
        gardeManger: [action.payload.newItem, ...state.gardeManger],
      };

    case 'SET_GARDEMANGER':
      return {
        gardeManger: action.payload,
      };

    case 'DELETE_GARDEMANGER':
      return {
        gardeManger: [...state.cart.filter((x) => x != action.payload)],
      };

    default:
      return state;
  }
}
