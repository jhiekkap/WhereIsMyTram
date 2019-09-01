const zoomReducer = (state = 16, action) => {
  switch (action.type) {
    case 'SET_ZOOM':
      return action.data
    default:
      return state
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

export default zoomReducer
