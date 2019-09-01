const centerReducer = (state = { lat: 60.170627, lng: 24.939946 }, action) => {
  switch (action.type) {
    case 'SET_CENTER':
      return action.data
    default:
      return state
  }
}

export const setCenter = position => {
  return dispatch => {
    dispatch({
      type: 'SET_CENTER',
      data: position,
    })
  }
}

export default centerReducer
