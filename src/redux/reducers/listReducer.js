const initialState = {
  lists: [],
}
export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_LISTS':
      return {
        lists: [action.payload, ...state.lists],
      }
    case 'DELETE_ITEM':
      return {
        lists: [...state.lists.filter(x => x != action.payload)],
      }
    default:
      return state
  }
}