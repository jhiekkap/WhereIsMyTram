import React from 'react'
import { connect } from 'react-redux'
import { setShowTrams } from '../reducers/showTramsReducer'
import { setMyTram } from '../reducers/myTramReducer'
import {
  setCenter,
  setZoom,
  setShowAlert,
  openSidebar,
  closeSidebar,
  setLine,
  setAlarm,
  setShowSidebarOpenButton,
} from '../reducers/settingsReducer'
import { setMyStop } from '../reducers/myStopReducer'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Button, Alert } from 'react-bootstrap'
import driverIcon, {
  stopIcon,
  myStopIcon,
  tramIcon,
  myTramIcon,
  locationIcon,
} from '../utils/icons'
import { printDuration } from '../utils/helpers'
import alarmOnButton from '../img/iconfinder_Circle_Red_34214.png'
import alarmOffButton from '../img/iconfinder_stop_green_61688.png'

const LeafletMap = ({
  trams,
  showTrams,
  setShowTrams,
  openSidebar,
  closeSidebar,
  setCenter,
  setZoom,
  stops,
  myStop,
  setMyStop,
  myTram,
  setMyTram,
  settings,
  setShowAlert,
  setLine,
  setAlarm,
  setShowSidebarOpenButton,
}) => {
  const handleChooseTram = e => {
    console.log('valitse nro: ', e.target.value)
    let chosenTram = trams.find(tram => tram.VP.veh == e.target.value) 
    setMyTram(chosenTram)
    setLine(chosenTram.VP.desi)
    /* if (!showTrams.map(tram => tram.VP.veh).includes(chosenTram.VP.veh)) {
      setShowTrams(showTrams.concat(chosenTram))
    } */
    setShowTrams([chosenTram])
    setCenter({ lat: chosenTram.VP.lat, lng: chosenTram.VP.long })
    //setZoom(16)
  }

  const popUp = tram => {
    return (
      <Popup closeButton={true} value={tram.VP.veh} autoPan={false}>
        line:{tram.VP.desi}
        <br />
        vehicle:{tram.VP.veh}
        <br />
        speed:{(tram.VP.spd * 3.6).toFixed(2)} km/h
        <br />
        {tram.VP.stop && <span>stop:   {tram.VP.stop}<br /></span>}
        route:{tram.VP.route}
        <br />
        {tram.VP.dl > 0 ? 'ahead ' : 'lagging '} {Math.abs(tram.VP.dl)} seconds
        <br />
        {tram.VP.drst === 0 ? 'doors closed' : 'doors open'}
        <br />
        {(!myTram.VP || (myTram.VP && myTram.VP.veh !== tram.VP.veh)) && (
          <Button value={tram.VP.veh} onClick={handleChooseTram}>
            CHOOSE
          </Button>
        )}
      </Popup>
    )
  }

  const ShowChosenTrams = () => {
    let tramsToShow = trams.filter(tram =>
      showTrams.map(tram => tram.VP.veh).includes(tram.VP.veh)
    )

    if (tramsToShow) {
      return tramsToShow.map((tram, i) => (
        <Marker
          className='trams'
          key={i}
          icon={
            myTram.VP && myTram.VP.veh === tram.VP.veh ? myTramIcon : tramIcon
          }
          position={{
            lat: tram.VP.lat,
            lng: tram.VP.long,
          }}
          zIndexOffset={500}
        >
          {popUp(tram)}
        </Marker>
      ))
    }
  }

  const showStops = () => {
    return (
      stops &&
      stops.map((stop, i) => (
        <Marker
          className='stops'
          onClick={() => setMyStop(stop)}
          key={i}
          icon={stop.id === myStop.id ? myStopIcon : stopIcon}
          position={{ lat: stop.lat, lng: stop.lon }}
          zIndexOffset={-500}
        >
          <Popup autoPan={false}>
            <br /> {stop.name}
            <br /> {stop.gtfsId}
          </Popup>
        </Marker>
      ))
    )
  }

  const style = settings.showSidebar
    ? { marginLeft: '20px' }
    : { marginLeft: '0' }
 

  return (

    <div id='mapContainer' style={style}>
      {settings.showSidebarOpenButton && (
        <Button
          id='sidebarButton'
          variant='outline-dark'
          style={{ display: settings.showSidebar ? 'none' : '' }}
          onClick={() => openSidebar()}
        >
          {settings.showSidebarOpenButton ? '☰' : ''}
        </Button>
      )}
      {myTram && <div id='distanceOnMap'>{settings.distance} m</div>}
      {myTram && <div id='durationOnMap'>{settings.avgDuration > 0 && printDuration(settings.avgDuration)}</div>}
      {myTram && <div id='alarmButtonOnMap'><img id='alarmButton' src={settings.alarm ? alarmOffButton : alarmOnButton} onClick={() => setAlarm(!settings.alarm)} /></div>}
      {!settings.showAlert && (
        <Map
          id='map'
          center={settings.center}
          zoom={settings.zoom}
          onclick={() => closeSidebar()}
        //zoomControl={false}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {ShowChosenTrams()}
          {showStops()}
          <Marker
            icon={driverIcon}
            position={settings.center}
          >
            <Popup>
              We are here! <br /> This is our position!
            </Popup>
          </Marker>
        </Map>
      )}

      <Alert
        id='alert'
        show={settings.showAlert}
        variant={settings.alertVariant ? 'danger' : 'warning'}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>Duis mollis, est non commodo luctus</p>
        <hr />
        <div className='d-flex justify-content-end'>
          <Button onClick={() => {setShowAlert(false);setShowSidebarOpenButton(true)}} variant='warning'>
            Close me ya'll!
          </Button>
        </div>
      </Alert>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    trams: state.trams,
    showTrams: state.showTrams,
    //showSidebar: state.showSidebar,
    showSidebarOpenButton: state.showSidebarOpenButton,
    stops: state.stops,
    settings: state.settings,
    myStop: state.myStop,
    myTram: state.myTram,
  }
}

const mapDispatchToProps = {
  setShowTrams,
  setMyStop,
  setMyTram,
  setZoom,
  setCenter,
  setShowAlert,
  openSidebar,
  closeSidebar,
  setLine,
  setAlarm,
  setShowSidebarOpenButton,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeafletMap)
