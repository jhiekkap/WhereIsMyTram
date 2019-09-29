const myVehicleReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MY_VEHICLE':
      return action.data
    default:
      return state
  }
}

export const setMyVehicle = vehicle => {
  return dispatch => {
    dispatch({
      type: 'SET_MY_VEHICLE',
      data: vehicle,
    })
  }
}

export default myVehicleReducer
