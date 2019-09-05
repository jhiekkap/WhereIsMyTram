import React from 'react'
import { connect } from 'react-redux'
import { setShowTrams } from '../reducers/showTramsReducer'
import { setMyTram } from '../reducers/myTramReducer'
import { setCenter, setZoom, setShowAlert, openSidebar, closeSidebar, toggleAlertVariant } from '../reducers/settingsReducer'
import { setMyStop } from '../reducers/myStopReducer';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Button, Alert } from 'react-bootstrap'
import driverIcon, { stopIcon, myStopIcon, myTramIcon, locationIcon } from '../utils/icons'

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
}) => {

  const handleChooseTram = e => {
    console.log('valitse nro: ', e.target.value)
    let chosenTram = trams.find(tram => tram.VP.veh == e.target.value)
    setMyTram(chosenTram)
    setShowTrams([])
    //setCenter({ lat: chosenTram.VP.lat, lng: chosenTram.VP.long })
    //setZoom(16)

  }

  const popUp = tram => {
    return (
      <Popup
        closeButton={true}
        value={tram.VP.veh}
        autoPan={false}
      >
        line:{tram.VP.desi}
        <br />
        vehicle:{tram.VP.veh}
        <br />
        speed:{(tram.VP.spd * 3.6).toFixed(2)} km/h
        <br />
        stop:{tram.VP.stop}
        <br />
        route:{tram.VP.route}
        <br />
        {tram.VP.dl > 0 ? 'ahead ' : 'lagging '} {Math.abs(tram.VP.dl)} seconds
        <br />
        {tram.VP.drst === 0 ? 'doors closed' : 'doors open'}
        <br />
        {(!myTram.VP || (myTram.VP && myTram.VP.veh !== tram.VP.veh)) && <Button value={tram.VP.veh} onClick={handleChooseTram}>CHOOSE</Button>}
      </Popup>
    )
  }

  const ShowChosenTrams = () => {

    let tramsToShow = [...trams].filter(tram =>
      showTrams.map(tram => tram.VP.veh).includes(tram.VP.veh)
    )
    if (myTram.VP) {
      tramsToShow = tramsToShow.filter(tram => tram.VP.veh !== myTram.VP.veh)
    }

    if (showTrams) {
      return tramsToShow.map((tram, i) => (
        <Marker
          key={i}
          position={{
            lat: tram.VP.lat,
            lng: tram.VP.long,
          }}
        >
          {popUp(tram)}
        </Marker>
      ))
    }
  }

  const showMyTram = () => {
    if (myTram.VP) {
      let myTramAlive = trams.find(tram => tram.VP.veh === myTram.VP.veh)
      let halfWay = { lat: (myStop.lat +  myTramAlive.VP.lat)/2,
        lng: (myStop.lon + myTramAlive.VP.long)/2 }
      return (
        <div>
        <Marker
          icon={myTramIcon}
          position={{ lat: myTramAlive.VP.lat, lng: myTramAlive.VP.long }}
        >
          {popUp(myTramAlive)}
        </Marker>
        {/* <Marker
        icon={locationIcon}
        position={halfWay}
      > 
      </Marker> */}
      </div>
      )
    }
  }

  const showStops = () => {

    return stops &&
      stops.map((stop, i) => (
        <Marker
          onClick={() => setMyStop(stop)}
          key={i}
          icon={stop.id === myStop.id ? myStopIcon : stopIcon}
          position={{ lat: stop.lat, lng: stop.lon }}
        >
          <Popup autoPan={false}>
            <br /> {stop.name}
            <br /> {stop.gtfsId}
          </Popup>
        </Marker>
      ))
  }

  const style = settings.showSidebar ? { marginLeft: '20px' } : { marginLeft: '0' }

  return (
    <div
      id='mapContainer'
      style={style} >
      {settings.showSidebarOpenButton && (
        <Button
          variant='light'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1,
            fontSize: 36,
            marginTop: '4px',
            display: settings.showSidebar ? 'none' : '',
          }}
          onClick={() => openSidebar()}
        >
          {settings.showSidebarOpenButton ? '☰' : ''}
        </Button>
      )}
        {!settings.showAlert && <Map
        id='map'
        center={settings.center}
        zoom={settings.zoom}
        onclick={() => closeSidebar()}
        zoomControl={false}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {ShowChosenTrams()}
        {showStops()}
        {showMyTram()}
        <Marker
          icon={driverIcon}
          position={{ lat: 60.170627, lng: 24.939946 }}
        >
          <Popup>
            We are here! <br /> This is our position!
          </Popup>
        </Marker>
      </Map>}  
      <Alert id='alert' show={settings.showAlert} variant={settings.alertVariant ? 'danger' : 'warning'}>
        <br /><br /><br /><br /><br />
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus 
        </p>
        <hr />
        <div className='d-flex justify-content-end'>
          <Button onClick={() => setShowAlert(false)} variant='warning'>
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
  setMyStop, setMyTram, setZoom, setCenter, setShowAlert, openSidebar, closeSidebar,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeafletMap)
