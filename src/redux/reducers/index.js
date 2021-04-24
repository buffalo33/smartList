import { combineReducers } from 'redux'
import listReducer from './listReducer'
import cartReducer from './cartReducer'
import settingsReducer from './settingsReducer'

import dialogRenameReducer from './dialogRenameReducer'

export default combineReducers({
  listReducer,
  cartReducer,
  dialogRenameReducer,
  settingsReducer
})