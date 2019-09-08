const settingsReducer = (
  state = {
    center: { lat: 60.169800, lng: 24.939500 },
    showAlert: false,
    alertVariant: true,
    zoom: 17  ,
    showSidebar: false,
    showSidebarOpenButton: true,
    init: true,
    avgDuration: 0,
    line: '',
    distance: 0,
    alarm: false,
  },
  action
) => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return { ...state, showAlert: action.data }
    case 'TOGGLE_ALERT_VARIANT':
      return { ...state, alertVariant: action.data }
    case 'SET_CENTER':
      return { ...state, center: action.data }
    case 'SET_ZOOM':
      return { ...state, zoom: action.data }
    case 'SET_SHOW_SIDEBAR':
      return { ...state, showSidebar: action.data }
    case 'SET_SHOW_SIDEBAR_OPEN_BUTTON':
      return { ...state, showSidebarOperButton: action.data }
    case 'SET_INIT':
      return { ...state, init: action.data }
    case 'SET_AVG_DURATION':
      return { ...state, avgDuration: action.data }
    case 'SET_LINE':
      return { ...state, line: action.data }
    case 'SET_DISTANCE':
      return { ...state, distance: action.data }
    case 'SET_ALARM':
      return { ...state, alarm: action.data }
    default:
      return state
  }
}

export const setShowAlert = boolean => {
  return dispatch => {
    dispatch({
      type: 'SHOW_ALERT',
      data: boolean,
    })
  }
}

export const toggleAlertVariant = boolean => {
  return dispatch => {
    dispatch({
      type: 'TOGGLE_ALERT_VARIANT',
      data: boolean,
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

export const setShowSidebar = boolean => {
  return dispatch => {
    dispatch({
      type: 'SET_SHOW_SIDEBAR',
      data: boolean,
    })
  }
}

export const setShowSidebarOpenButton = boolean => {
  return dispatch => {
    dispatch({
      type: 'SET_SHOW_SIDEBAR_OPEN_BUTTON',
      data: boolean,
    })
  }
}

export const setInit = boolean => {
  return dispatch => {
    dispatch({
      type: 'SET_INIT',
      data: boolean,
    })
  }
}

export const openSidebar = () => {
  return dispatch => {
    dispatch({
      type: 'SET_SHOW_SIDEBAR',
      data: true,
    })
    dispatch({
      type: 'SET_SHOW_SIDEBAR_OPEN_BUTTON',
      data: false,
    })
  }
}

export const closeSidebar = () => {
  return dispatch => {
    dispatch({
      type: 'SET_SHOW_SIDEBAR',
      data: false,
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_SHOW_SIDEBAR_OPEN_BUTTON',
        data: true,
      })
    }, 300)
  }
}

export const setAvgDuration = seconds => {
  return dispatch => {
    dispatch({
      type: 'SET_AVG_DURATION',
      data: seconds,
    })
  }
}

export const setLine = linenumber => {
  return dispatch => {
    dispatch({
      type: 'SET_LINE',
      data: linenumber,
    })
  }
}

export const setDistance = meters => {
  return dispatch => {
    dispatch({
      type: 'SET_DISTANCE',
      data: meters,
    })
  }
}

export const setAlarm = boolean => {
  return dispatch => {
    dispatch({
      type: 'SET_ALARM',
      data: boolean,
    })
  }
}

export default settingsReducer
