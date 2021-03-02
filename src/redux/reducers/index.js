import { combineReducers } from 'redux'
import listReducer from './listReducer'
import pagePointerReducer from './pagePointerReducer'
import addButtonReducer from './addButtonReducer'
import cartReducer from './cartReducer'
export default combineReducers({
  listReducer,
  pagePointerReducer,
  addButtonReducer,
  cartReducer
})