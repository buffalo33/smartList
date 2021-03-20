import { combineReducers } from 'redux'
import listReducer from './listReducer'
import cartReducer from './cartReducer'
import dialogRenameReducer from './dialogRenameReducer'

export default combineReducers({
  listReducer,
  cartReducer,
  dialogRenameReducer,
})