const showVehiclesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SHOW_VEHICLES':
      return action.data
    default:
      return state
  }
}

export const setShowVehicles = vehicles => {
  return dispatch => {
    dispatch({
      type: 'SET_SHOW_VEHICLES',
      data: vehicles,
    })
  }
}

export default showVehiclesReducer
