const showSidebarReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_SHOW_SIDEBAR':
      return action.data
    default:
      return state
  }
}

export const setShowSidebar = boolean => {
  return dispatch => {
    dispatch({
      type: 'SET_SHOW_SIDEBAR',
      data: boolean,
    })
  }
}

export default showSidebarReducer
