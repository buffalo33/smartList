import { combineReducers } from 'redux'
import listReducer from './listReducer'
import pagePointerReducer from './pagePointerReducer'
import addButtonReducer from './addButtonReducer'
import cartReducer from './cartReducer'
import dialogRenameReducer from './dialogRenameReducer'
export default combineReducers({
  listReducer,
  pagePointerReducer,
  addButtonReducer,
  cartReducer,
  dialogRenameReducer
})