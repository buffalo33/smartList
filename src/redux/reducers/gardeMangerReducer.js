import firebase, { firestore } from 'firebase'

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
    
    case 'SAVE_TO_CLOUD_GM': {
      //console.warn(firebase.auth().currentUser.uid);
      firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid)
        .collection("User").doc("user").update({ gardeManger: [...state.gardeManger] });
      return {
        gardeManger: [...state.gardeManger],

      }
    }
    case 'LOAD_LISTS_CLOUD_GM': {

      return {
        gardeManger: [...action.payload.gardeManger],


      }
    }
    default:
      return state;
  }
}
