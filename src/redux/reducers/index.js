import { combineReducers } from 'redux'
import listReducer from './listReducer'
import pagePointerReducer from './pagePointerReducer'
import addButtonReducer from './addButtonReducer'

export default combineReducers({
  listReducer,
  pagePointerReducer,
  addButtonReducer
})