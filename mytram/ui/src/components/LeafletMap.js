import React from 'react'
import { connect } from 'react-redux'
import { setShowTrams } from '../reducers/showTramsReducer'
import { setMyTram } from '../reducers/myTramReducer'
import { setCenter } from '../reducers/centerReducer'
import { setZoom } from '../reducers/zoomReducer'
import { setMyStop } from '../reducers/myStopReducer';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Button } from 'react-bootstrap' 
import driverIcon, { stopIcon, myStopIcon, myTramIcon } from '../utils/icons'
   
const LeafletMap = ({
  trams,
  showTrams,
  setShowTrams,
  openSidebar,
  closeSidebar,
  showSidebar,
  showSidebarOpenButton,
  center,
  setCenter,
  zoom,
  setZoom,
  stops,
  myStop,
  setMyStop,
  myTram,
  setMyTram,
}) => {

  const handleChooseTram = e => {
    console.log('valitse nro: ', e.target.value)
    let chosenTram = trams.find(tram => tram.VP.veh == e.target.value)
    setMyTram(chosenTram)
    setShowTrams([])
    setCenter({ lat: chosenTram.VP.lat, lng: chosenTram.VP.long })
    setZoom(16)

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
      return (
        <Marker
          icon={myTramIcon}
          position={{ lat: myTramAlive.VP.lat, lng: myTramAlive.VP.long }}
        >
          {popUp(myTramAlive)}
        </Marker>
      )
    }
  }

  const showStops = () => {

    return stops &&
    stops.map((stop, i) => (
      <Marker
        onClick={() => { setMyStop(stop) }}
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

  const style = showSidebar ? { marginLeft: '20px' } : { marginLeft: '0'}

  return (
    <div 
    id='mapContainer'
     style={style} >
      {showSidebarOpenButton && (
        <Button
          variant='light'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1,
            fontSize: 36,
            marginTop: '4px',
            display: showSidebar ? 'none' : '',
          }}
          onClick={() => openSidebar()}
        >
          {showSidebarOpenButton ? '☰' : ''}
        </Button>
      )}
      <Map
        id='map'
        center={center}
        //center={myTram.VP ? {lat:trams.find(tram => tram.VP.veh === myTram.VP.veh).VP.lat, lng:trams.find(tram => tram.VP.veh === myTram.VP.veh).VP.long} : center}
        zoom={zoom}
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
      </Map>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    trams: state.trams,
    showTrams: state.showTrams,
    showSidebar: state.showSidebar,
    showSidebarOpenButton: state.showSidebarOpenButton,
    stops: state.stops,
    center: state.center,
    zoom: state.zoom,
    myStop: state.myStop,
    myTram: state.myTram,
  }
}

const mapDispatchToProps = {
  setShowTrams,
  setMyStop, setMyTram,setZoom,setCenter,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeafletMap)
