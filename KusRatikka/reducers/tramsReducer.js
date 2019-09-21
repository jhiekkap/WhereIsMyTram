const tramsReducer = (state = { trams: [], tramRoutesOnMap: [] }, action) => {
  switch (action.type) {
    case 'SET_TRAMS':
      return { ...state, trams: action.data }
    case 'SET_TRAM_ROUTES_ON_MAP':
      return { ...state, tramRoutesOnMap: action.data }
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

export const setTramRoutesOnMap = tramRoutes => { 
  return dispatch => {
    dispatch({
      type: 'SET_TRAM_ROUTES_ON_MAP',
      data: tramRoutes,
    })
  }
}

export default tramsReducer
