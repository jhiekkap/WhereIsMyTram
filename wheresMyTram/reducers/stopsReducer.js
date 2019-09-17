const stopsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_STOPS':
      return action.data
    default:
      return state
  }
}

export const setStops = stops => {
  return dispatch => {
    dispatch({
      type: 'SET_STOPS',
      data: stops,
    })
  }
}

export default stopsReducer
