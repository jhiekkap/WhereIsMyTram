const showSidebarOpenButtonReducer = (state = true, action) => {
  switch (action.type) {
    case 'SET_SHOW_SIDEBAR_OPEN_BUTTON':
      return action.data
    default:
      return state
  }
}

export const setShowSidebarOpenButton = boolean => {
  return dispatch => {
    dispatch({
      type: 'SET_SHOW_SIDEBAR_OPEN_BUTTON',
      data: boolean,
    })
  }
}

export default showSidebarOpenButtonReducer
