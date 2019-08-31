const showTramsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SHOW_TRAMS':
      return action.data
    default:
      return state
  }
}

export const setShowTrams = trams => {
  return dispatch => {
    dispatch({
      type: 'SET_SHOW_TRAMS',
      data: trams,
    })
  }
}

export default showTramsReducer
