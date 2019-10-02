import React from 'react'
import { connect } from 'react-redux'
import {
  setCenter,
  setZoom,
  openSidebar,
  closeSidebar, 
  setIntro,
  setAlarm,
} from '../reducers/settingsReducer'
import { printDuration } from '../utils/helpers'
import alarmOnButton from '../img/icon-alarm.png'
import alarmOffButton from '../img/iconfinder_stop_green_61688.png'
import centerButton from '../img/icons8-navigation-50.png'
import tramButton from '../img/icons8-ice-cream-50.png'

const MapButtons = ({
  trams,
  openSidebar,
  closeSidebar,
  setCenter,
  setZoom,
  myTram,
  settings,
  setAlarm,
}) => {
  const handleCenterButton = () => {
    setCenter(settings.position)
    setZoom(16)
    closeSidebar()
  }

  return (
    <div>
      {settings.showSidebarOpenButton && (
        <div
          id='sidebarButton'
          variant='outline-dark'
          style={{ display: settings.showSidebar ? 'none' : '' }}
          onClick={() => openSidebar()}
        >
          {settings.showSidebarOpenButton ? '☰' : ''}
        </div>
      )}
      {myTram && <div id='distanceOnMap'>{settings.distance} m</div>}
      {myTram && (
        <div id='durationOnMap'>
          {settings.avgDuration > 0 && printDuration(settings.avgDuration)}
        </div>
      )}
      {myTram && (
        <div id='alarmButtonOnMap'>
          <img
            alt='alarmButton'
            id='alarmButton'
            src={settings.alarm ? alarmOffButton : alarmOnButton}
            onClick={() => setAlarm(!settings.alarm)}
          />
        </div>
      )}
      <div id='centerButtonOnMap'>
        <img
          alt='centerButton'
          id='centerButton'
          src={centerButton}
          onClick={handleCenterButton}
        />
      </div>
      {myTram && (
        <div id='tramButtonOnMap'>
          <img
            alt='tramButton'
            id='tramButton'
            src={tramButton}
            onClick={() => {
              let chosenTram = trams.find(tram => tram.veh == myTram.veh)
              setCenter({
                lat: chosenTram.lat,
                lng: chosenTram.long,
              })
              closeSidebar()
            }}
          />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    trams: state.trams.trams,
    showSidebar: state.showSidebar, 
    settings: state.settings,
    myTram: state.myTram,
  }
}

const mapDispatchToProps = {
  setZoom,
  setCenter,
  openSidebar,
  closeSidebar,
  setIntro,
  setAlarm,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapButtons)
