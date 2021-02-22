const initialState = {
  pagePointer: ''
}


export default function pagePointerReducer(state = initialState, action){
  //alert(action.type)
  switch (action.type) {
    case 'HOME_SCREEN':
      return { pagePointer: 'Courses' }
      break;
    case 'LISTES_SCREEN':
      return { pagePointer: 'Listes' }
      break;
    case 'STORE_SCREEN':
      return { pagePointer: 'Garde-Manger' }
      break;

    default:
      return { pagePointer: 'Courses' }

      break;
  }
  return state

}