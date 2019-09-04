const settingsReducer = (state = {
  center: { lat: 60.170627, lng: 24.939946 },
  showAlert: false,
  zoom: 16,
}, action) => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return { ...state, showAlert: action.data }
    case 'SET_CENTER':
      return { ...state, center: action.data }
    case 'SET_ZOOM':
      return { ...state, zoom: action.data }
    default:
      return state
  }
}

export const setShowAlert = boolean => {
  return dispatch => {
    dispatch({
      type: 'SHOW_ALERT',
      data: boolean
    })
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

export const setZoom = zoom => {
  return dispatch => {
    dispatch({
      type: 'SET_ZOOM',
      data: zoom,
    })
  }
}

export default settingsReducer
