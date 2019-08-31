const tramsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TRAMS':
      return action.data
    default:
      return state
  }
}

export const setTrams = trams => {
  return dispatch => {
    dispatch({
      type: 'SET_TRAMS',
      data: trams,
    })
  }
}

export default tramsReducer
