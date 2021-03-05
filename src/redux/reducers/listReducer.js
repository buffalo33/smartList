const initialState = {
  lists: [],
}



export default function listReducer(state = initialState, action) {
  // console.log(action.payload);
  // console.log(updateObjectInArray(state.lists,action))
  /*
    console.log(...state.lists.filter(x => x.id == action.payload.id_list).map((y) => {
      y.cart.push(action.payload.newItem)
      return y;
    }));*/



  switch (action.type) {
    case 'ADD_TO_LISTS':
      return {
        lists: [action.payload, ...state.lists],
      }
    case 'DELETE_ITEM_CART': {
      console.log('heey');
      console.log(...state.lists.filter(x => x.id == action.payload.id_list))

      return {

        lists: [...state.lists.filter(x => x.id == action.payload.id_list).map((z) => {
          z.cart.map(o => {
            if (o._id != action.payload.deleteItem._id) {
              return action.payload.deleteItem._id;
            }
          })
          return z;
        }), ...state.lists.filter(x => x.id != action.payload.id_list)]
      };
    }
    case 'DELETE_ITEM_LIST':
      return {
        lists: [...state.lists.filter(x => x != action.payload)],
      }
    case 'ADD_TO_CART':
      return {
        //    ...state,
        lists: [...state.lists.filter(x => x.id == action.payload.id_list).map((y) => {
          y.cart.push(action.payload.newItem);
          // console.log(y);
          return y;
        }), ...state.lists.filter(x => x.id != action.payload.id_list)]
      };
    default:
      return state
  }
}