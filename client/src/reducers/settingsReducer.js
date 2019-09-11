const settingsReducer = (
  state = {
    center: { lat: 60.1698, lng: 24.9395 },
    defaultCenter: { lat: 60.1698, lng: 24.9395 },
    showAlert: false,
    alertVariant: true,
    zoom: 16,
    showSidebar: false,
    showSidebarOpenButton: true,
    init: true,
    avgDuration: 0,
    line: '',
    distance: 0,
    alarm: false,
    intro: false,
    geoLocation: false,
    alarmDistance: 50,
    position: { lat: 60.1698, lng: 24.9395 },
    show: 'menu',
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
    case 'SET_POSITION':
      return { ...state, position: action.data }
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
    case 'SET_INTRO':
      return { ...state, intro: action.data }
    case 'SET_GEOLOCATION':
      return { ...state, geoLocation: action.data }
    case 'SET_ALARM_DISTANCE':
      return { ...state, alarmDistance: action.data }
      case 'SET_SHOW':
          return { ...state, show: action.data }
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

export const setPosition = position => {
  return dispatch => {
    dispatch({
      type: 'SET_POSITION',
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

export const setIntro = boolean => {
  return dispatch => {
    dispatch({
      type: 'SET_INTRO',
      data: boolean,
    })
  }
}

export const setGeolocation = boolean => {
  return dispatch => {
    dispatch({
      type: 'SET_GEOLOCATION',
      data: boolean,
    })
  }
}

export const setAlarmDistance = meters => {
  return dispatch => {
    dispatch({
      type: 'SET_ALARM_DISTANCE',
      data: meters,
    })
  }
}

export const setShow = boolean => {
  return dispatch => {
    dispatch({
      type: 'SET_SHOW',
      data: boolean,
    })
  }
}

export default settingsReducer
