import { combineReducers } from 'redux'
import listReducer from './listReducer'
import pagePointerReducer from './pagePointerReducer'

export default combineReducers({
  listReducer,
  pagePointerReducer
})