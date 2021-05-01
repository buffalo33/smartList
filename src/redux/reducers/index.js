import {combineReducers} from 'redux';
import listReducer from './listReducer';
import cartReducer from './cartReducer';
import settingsReducer from './settingsReducer';
import gardeMangerReducer from './gardeMangerReducer';

import dialogRenameReducer from './dialogRenameReducer';

export default combineReducers({
  listReducer,
  cartReducer,
  dialogRenameReducer,
  settingsReducer,
  gardeMangerReducer,
});
