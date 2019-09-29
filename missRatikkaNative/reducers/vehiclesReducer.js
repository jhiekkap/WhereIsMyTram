const vehiclesReducer = (state = { vehicles: [], vehicleRoutesOnMap: [] }, action) => {
  switch (action.type) {
    case 'SET_VEHICLES':
      return { ...state, vehicles: action.data }
    case 'SET_VEHICLE_ROUTES_ON_MAP':
      return { ...state, vehicleRoutesOnMap: action.data }
    default:
      return state
  }
} 

export const setVehicles = vehicles => {
  return dispatch => {
    dispatch({
      type: 'SET_VEHICLES',
      data: vehicles,
    })
  }
}

export const setVehicleRoutesOnMap = vehicleRoutes => { 
  return dispatch => {
    dispatch({
      type: 'SET_VEHICLE_ROUTES_ON_MAP',
      data: vehicleRoutes,
    })
  }
}

export default vehiclesReducer
