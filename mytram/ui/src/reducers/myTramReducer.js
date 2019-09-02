const myTramReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MY_TRAM':
      return action.data
    default:
      return state
  }
}

export const setMyTram = tram => {
  return dispatch => {
    dispatch({
      type: 'SET_MY_TRAM',
      data: tram,
    })
  }
}

export default myTramReducer
