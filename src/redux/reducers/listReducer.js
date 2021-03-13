
import firebase, { firestore } from 'firebase'

const initialState = {

  lists: [],
  lastIdSelected: ''
}

export default function listReducer(state = initialState, action) {

  switch (action.type) {

    case 'SET_ID_SELECTED':
      return {
        lists: [...state.lists],
        lastIdSelected: action.payload,
      }

    case 'ADD_TO_LISTS': {
      firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({ lists: [action.payload, ...state.lists] });
      return {
        lists: [action.payload, ...state.lists],
      }
    }

    case 'DELETE_ITEM_CART': {
      console.log('heey');
      console.log(action.payload);
      var Tmp = state.lists;
      for (let i = 0; i < Tmp.length; i++) {
        console.log(Tmp[i].id);
        console.log(state.lastIdSelected);

        if (Tmp[i].id == state.lastIdSelected) {
          console.log('im heeeere');
          console.log(Tmp[i].cart.filter(x => x.id != action.payload.id));

          Tmp[i].cart = Tmp[i].cart.filter(x => x.id != action.payload.id);
        }
      }
      return {
        lists: [...Tmp],
      }
    }

    case 'DELETE_ITEM_LIST':
      var Tmp = state.lists;
      for (let i = 0; i < Tmp.length; i++) {
        if (Tmp[i].id == action.payload) {
          Tmp.splice(i, 1);
        }
      }
      return {
        lists: [...Tmp],
      }

    case 'RENAME_ITEM_LIST':
      var Tmp = state.lists;
      for (let i = 0; i < Tmp.length; i++) {
        if (Tmp[i].id == state.lastIdSelected) {
          Tmp[i].title = action.payload;
        }
      }
      return {
        lists: [...Tmp],
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