import React from 'react'
import { connect } from 'react-redux'
import { setShowTrams } from '../reducers/showTramsReducer'
import { setMyTram } from '../reducers/myTramReducer'
import { setTrams } from '../reducers/tramsReducer'
import {
  setCenter,
  setZoom,
  setShowAlert,
  closeSidebar,
  setLine,
  setAlarm,
  setShowSidebarOpenButton,
  setShow,
  setShowLine,
  setPosition,
} from '../reducers/settingsReducer'
import { setMyStop } from '../reducers/myStopReducer'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Button, Alert } from 'react-bootstrap'
import driverIcon from '../utils/icons'
import alarmSound from '../sounds/foghorn-daniel_simon.mp3'
import MapButtons from './MapButtons'
import { LineOnMap, ChosenTrams, Stops } from './TramsAndStops'

const LeafletMap = ({
  trams,
  setTrams,
  showTrams,
  setShowTrams,
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
  setShow,
  tramRoutesOnMap,
  setShowLine,
  stopsQuery,
  setPosition,
}) => {
  const handleChooseTram = e => {
    console.log('valitse nro: ', e.target.value)
    let chosenTram = trams.find(tram => tram.veh == e.target.value)
    console.log('CHOSEN TRAM:', chosenTram)
    if (settings.possibleRoutes.includes(chosenTram.route)) {
      setMyTram(chosenTram)
      setLine(chosenTram.desi)
      //setShowTrams([chosenTram])
      setCenter({ lat: chosenTram.lat, lng: chosenTram.long })
      setZoom(16)
      setShowLine('')
    } else {
      console.log('ERROR! EI KULJE TÄMÄN PYSÄKIN KAUTTA!')
    }
  }

  const handleCancelTram = e => {
    console.log('TRAM CANCELLED', e.target.value)
    setAlarm(false)
    setMyTram('')
    setTrams([])
    setShowTrams(trams)
    setLine('')
  }

  const handleChangeZoom = e => {
    setZoom(e.target._zoom)
    console.log(
      'ZOOM',
      e.target._zoom,
      'CENTER',
      e.target._animateToCenter.lat,
      e.target._animateToCenter.lng
    )
  }

  const handleSetMyStop = stop => {
    if (!myTram) {
      setMyStop(stop)
      setLine('')
    }
  }

  const handleChangeCenter = e => {
    setZoom(e.target._zoom)
    console.log('CHANGED CENTER \n GET ZOOM: ', e.target._zoom)
    console.log('NEW CENTER:\n', e.latlng)
    setCenter(e.latlng)
    setPosition(e.latlng)
    stopsQuery(e.latlng)
  }

  const handleAlarmOff = () => {
    setShowAlert(false)
    setShowSidebarOpenButton(true)
  }

  return (
    settings.possibleRoutes && (
      <div title='Double-click the map to set a new center'>
        <div>{settings.showAlert && <audio src={alarmSound} autoPlay />}</div>

        <MapButtons /> 
        {!settings.showAlert && (
          <Map
            id='map'
            center={settings.center}
            zoom={settings.zoom}
            onclick={() => {
              closeSidebar()
              setShow('menu')
            }}
            onmoveend={({ target }) => setCenter(target.getCenter())}
            onzoomend={handleChangeZoom}
            zoomSnap={0.1}
            minZoom={12}
            maxZoom={18}
            doubleClickZoom={false}
            ondblclick={handleChangeCenter}
            zoomControl={true}
          >
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <ChosenTrams
              settings={settings}
              myTram={myTram}
              showTrams={showTrams}
              trams={trams}
              handleChooseTram={handleChooseTram}
              handleCancelTram={handleCancelTram}
            />
            <Stops
              settings={settings}
              myStop={myStop}
              handleSetMyStop={handleSetMyStop}
              stops={stops}
            />
            {settings.showLine && (
              <LineOnMap
                settings={settings}
                tramRoutesOnMap={tramRoutesOnMap}
              />
            )}
            <Marker
              icon={driverIcon(settings.zoom)}
              position={settings.position}
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
          <Alert.Heading>Your tram has arrived!</Alert.Heading>
          <hr />
          <div className='d-flex justify-content-end'>
            <Button onClick={handleAlarmOff} variant='warning'>
              Close me!
            </Button>
          </div>
        </Alert>
      </div>
    )
  )
}

const mapStateToProps = state => {
  return {
    trams: state.trams.trams,
    tramRoutesOnMap: state.trams.tramRoutesOnMap,
    showTrams: state.showTrams,
    showSidebar: state.showSidebar,
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
  closeSidebar,
  setLine,
  setAlarm,
  setShowSidebarOpenButton,
  setShow,
  setTrams,
  setShowLine,
  setPosition,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeafletMap)
