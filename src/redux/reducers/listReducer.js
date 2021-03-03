const initialState = {
  lists: [],
}

function updateObjectInArray(array, action) {
  return array.map((x) => {
    x

  });
}

export default function listReducer(state = initialState, action) {
  // console.log(action.payload);
  // console.log(updateObjectInArray(state.lists,action))
  /*
    console.log(...state.lists.filter(x => x.id == action.payload.id_list).map((y) => {
      y.cart.push(action.payload.newItem)
      return y;
    }));*/
  var l = { ...state.lists.filter(x => x.id == action.payload.id_list) };
  var b = l[0];
  // console.log(b.cart)
  switch (action.type) {
    case 'ADD_TO_LISTS':
      return {
        lists: [action.payload, ...state.lists],
      }
    case 'DELETE_ITEM':
      return {
        lists: [...state.lists.filter(x => x != action.payload)],
      }
    case 'ADD_TO_CART':
      return {
        ...state,
        lists: [...state.lists.filter(x => x.id == action.payload.id_list).map((y) => {
          y.cart.push(action.payload.newItem)
          return y;
        }), ...state.lists.filter(x => x.id != action.payload.id_list)]
      };
    default:
      return state
  }
}