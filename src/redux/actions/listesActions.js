export function mapStateToProps(state) {
  return {
    lists: state.listReducer.lists,
    cart: state.listReducer.cart,
    isRenameVisible: state.dialogRenameReducer.isRenameVisible
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    addToLists: (newItem) => dispatch({
      type: 'ADD_TO_LISTS',
      payload: newItem
    }),
    removeToLists: (id) => dispatch({
      type: 'DELETE_ITEM_LIST',
      payload: id
    }),
    renameToLists: (text) => dispatch({
      type: 'RENAME_ITEM_LIST',
      payload: text
    }),
    addToCart: (newItem, id_list) => dispatch({
      type: 'ADD_TO_CART',
      payload: { newItem, id_list },
      //id_list: id_list
    }),
    deleteItemCart: (id, id_list) => dispatch({
      type: 'DELETE_ITEM_CART',
      payload: { id, id_list },
      //id_list: id_list
    }),
    setIdSelected: (id) => dispatch({
      type: 'SET_ID_SELECTED',
      payload: id
    }),

    setDialogRenameVisible: (stateVisible) => dispatch({
      type: 'SET_STATE_VISIBLE',
      payload: stateVisible
    }),
  }
}