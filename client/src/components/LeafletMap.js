import React, { useState } from 'react'
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
  setIntro,
  setShow,
} from '../reducers/settingsReducer'
import { setMyStop } from '../reducers/myStopReducer'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Button, Alert } from 'react-bootstrap'
import driverIcon, {
  stopIcon,
  myStopIcon,
  tramIcon,
  myTramIcon,
} from '../utils/icons'
import { printDuration } from '../utils/helpers'
import alarmOnButton from '../img/iconfinder_Circle_Red_34214.png'
import alarmOffButton from '../img/iconfinder_stop_green_61688.png'
import centerButton from '../img/icons8-navigation-50.png'
import tramButton from '../img/icons8-ios-filled-50.png'
//import { SoundEffect } from './SoundEffect'
import alarmSound from '../sounds/foghorn-daniel_simon.mp3'
import Intro from '../components/Intro'

//let horn = {}

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
  setIntro,
  setShow,
}) => {
  const [playHorn, setPlayHorn] = useState(false)
  const initHorn = () => {
    //horn = new Audio()
    //console.log('new Audio()', horn)
    setIntro(false)
    setPlayHorn(true)
    setTimeout(() => {
      setPlayHorn(false)
    }, 2000)
    //horn.src={alarmSound}
    //horn.play()
  }

  const handleChooseTram = e => {
    console.log('valitse nro: ', e.target.value, trams)
    let chosenTram = trams.find(tram => tram.veh == e.target.value)
    console.log('CHOSEN TRAM:', chosenTram)
    if (settings.possibleRoutes.includes(chosenTram.route)) {
      setMyTram(chosenTram)
      setLine(chosenTram.desi)
      setShowTrams([chosenTram])
      setCenter({ lat: chosenTram.lat, lng: chosenTram.long })
      setZoom(16)
    } else {
      console.log('ERROR! EI KULJE TÄMÄN PYSÄKIN KAUTTA!')
    }
  }

  const handleChangeZoom = e => {
    setZoom(e.target._zoom)
    //setCenter({lat:e.target._animateToCenter.lat, lng:e.target._animateToCenter.lng})
   /*  console.log(
      'ZOOM',
      e.target._zoom,
      'CENTER',
      e.target._animateToCenter.lat,
      e.target._animateToCenter.lng
    )*/
  } 

  const handleCenterButton = () => {
    setCenter(settings.geoLocation ? settings.position : settings.defaultCenter)
    setZoom(16)
    closeSidebar()
  }

  const popUp = tram => {
    return (
      <Popup closeButton={false} value={tram.veh} autoPan={false}>
        line:{tram.desi}
        <br />
        vehicle:{tram.veh}
        <br />
        speed:{(tram.spd * 3.6).toFixed(2)} km/h
        <br />
        {tram.stop && (
          <span>
            stop: {tram.stop}
            <br />
          </span>
        )}
        route:{tram.route}
        <br />
        {tram.dl > 0 ? 'ahead ' : 'lagging '} {Math.abs(tram.dl)} seconds
        <br />
        {tram.drst === 0 ? 'doors closed' : 'doors open'}
        <br />
        {((!myTram || (myTram && myTram.veh !== tram.veh)) && settings.possibleRoutes.includes(tram.route)) && (
          <Button value={tram.veh} onClick={handleChooseTram}>
            CHOOSE
          </Button>
        )}
      </Popup>
    )
  }

  const ShowChosenTrams = () => {
    let tramsToShow = trams.filter(tram =>
      showTrams.map(tram => tram.veh).includes(tram.veh)
    )

    if (tramsToShow) {
      return tramsToShow.map((tram, i) => (
        <Marker
          className='trams'
          key={i}
          icon={
            myTram && myTram.veh === tram.veh
              ? myTramIcon(settings.zoom)
              : tramIcon(settings.zoom)
          }
          position={{
            lat: tram.lat,
            lng: tram.long,
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
          icon={
            stop.id === myStop.id
              ? myStopIcon(settings.zoom)
              : stopIcon(settings.zoom)
          }
          position={{ lat: stop.lat, lng: stop.lon }}
          zIndexOffset={-500}
        >
          {/* <Popup closeButton={false} autoPan={false}>
            <br /> {stop.name}
            <br /> {stop.gtfsId}
          </Popup> */}
        </Marker>
      ))
    )
  }

  const style = settings.showSidebar
    ? { marginLeft: '20px' }
    : { marginLeft: '0' }

  return (
    settings.possibleRoutes && (
      <div>
        <div>
          {(settings.showAlert || playHorn) && (
            <audio src={alarmSound} autoPlay />
          )}
        </div>
        {!settings.intro ? (
          <div id='mapContainer' style={style}>
            {/* <SoundEffect initHorn={initHorn} horn={horn} play={settings.showAlert} audioUrl={alarmSound}> 
          </SoundEffect> */}
            {settings.showSidebarOpenButton && (
              <div
                id='sidebarButton'
                variant='outline-dark'
                //style={{ display: settings.showSidebar ? 'none' : '' }}
                onClick={() => openSidebar()}
              >
                {settings.showSidebarOpenButton ? '☰' : ''}
              </div>
            )}
            {myTram && <div id='distanceOnMap'>{settings.distance} m</div>}
            {myTram && (
              <div id='durationOnMap'>
                {settings.avgDuration > 0 &&
                  printDuration(settings.avgDuration)}
              </div>
            )}
            {myTram && (
              <div id='alarmButtonOnMap'>
                <img
                  id='alarmButton'
                  src={settings.alarm ? alarmOffButton : alarmOnButton}
                  onClick={() => setAlarm(!settings.alarm)}
                />
              </div>
            )}
            <div id='centerButtonOnMap'>
              <img
                id='centerButton'
                src={centerButton}
                onClick={handleCenterButton}
              />
            </div>
            {myTram && (
              <div id='tramButtonOnMap'>
                <img
                  id='tramButton'
                  src={tramButton}
                  onClick={() => {
                    let chosenTram = trams.find(
                      tram => tram.veh == myTram.veh
                    )
                    setCenter({
                      lat: chosenTram.lat,
                      lng: chosenTram.long,
                    })
                    closeSidebar()
                  }}
                />
              </div>
            )}

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
                maxZoom={19}
                doubleClickZoom={false}
                ondblclick={({ target }) =>
                  console.log(target.getCenter(), 'pöö')
                }
                zoomControl={true}
              >
                <TileLayer
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {ShowChosenTrams()}
                {showStops()}
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
              <Alert.Heading>How's it going?!</Alert.Heading>
              <p>Duis mollis, est non commodo luctus</p>
              <hr />
              <div className='d-flex justify-content-end'>
                <Button
                  onClick={() => {
                    setShowAlert(false)
                    setShowSidebarOpenButton(true)
                  }}
                  variant='warning'
                >
                  Close me ya'll!
                </Button>
              </div>
            </Alert>
          </div>
        ) : (
          <Intro initHorn={initHorn} />
        )}
      </div>
    )
  )
}

const mapStateToProps = state => {
  return {
    trams: state.trams.trams,
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
  setIntro,
  setShow,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeafletMap)
