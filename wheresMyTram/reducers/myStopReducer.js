const myStopReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MY_STOP': 
      return action.data
    default:
      return state
  }
}

export const setMyStop = stop => {
  return dispatch => {
    dispatch({
      type: 'SET_MY_STOP',
      data: stop,
    })
  }
}

export default myStopReducer
