import React from 'react'
import { connect } from 'react-redux'
import { setShowTrams } from '../reducers/showTramsReducer'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Button } from 'react-bootstrap'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../img/icons8-office-xs-50.png'),
  iconUrl: require('../img/icons8-office-xs-50.png'),
  shadowUrl: require('../../node_modules/leaflet/dist/images/marker-shadow.png'),
  iconSize: [40, 40],
}) 

const pointerIcon = new L.Icon({
  iconUrl: require("../img/iconLocation.png"),
  iconRetinaUrl: require("../img/iconLocation.png"),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [55, 55], 
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});


const stopIcon = new L.Icon({
  iconUrl: require("../img/rosaPin.png"),
  iconRetinaUrl: require("../img/rosaPin.png"),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [55, 55], 
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});

const LeafletMap = ({
  trams,
  showTrams,
  setShowTrams,
  openSidebar,
  closeSidebar,
  showSidebar,
  showSidebarOpenButton,
  center,
  zoom,
  stops,
}) => {


  const handleHideTram = (veh) => {
    console.log('piilota ratikka nro: ', veh)
    setShowTrams(showTrams.filter(tram => tram.VP.veh !== veh))
  }

  const ShowChosenTrams = () => {
    if (showTrams) {
      return trams.filter(tram => showTrams.map(tram => tram.VP.veh).includes(tram.VP.veh)).map((tram, i) => (
        <Marker
          key={i}
          position={{
            lat: tram.VP.lat,
            lng: tram.VP.long,
          }}
        >
          <Popup
            closeButton={false}
            value={tram.VP.veh}>line:{tram.VP.desi}
            <br />vehicle:{tram.VP.veh}
            <br />speed:{(tram.VP.spd * 3.6).toFixed(2)} km/h
          <br />stop:{tram.VP.stop}
            <br />route:{tram.VP.route}
            <br />{tram.VP.dl > 0 ? 'ahead ' : 'lagging '} {Math.abs(tram.VP.dl)} seconds
          <br />{tram.VP.drst === 0 ? 'doors closed' : 'doors open'}
            <br /><span onClick={() => handleHideTram(tram.VP.veh)}>hide x</span>
          </Popup>
        </Marker>
      ))
    }
  }
  const style = showSidebar ? { marginLeft: '250px' } : { marginLeft: '0' }

  return (
    <div id='map' style={style} title='Double-click map to set a new center'>
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
        zoom={zoom}
        onclick={() => closeSidebar()}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {ShowChosenTrams()}
        {stops && stops.map((stop, i) => <Marker key={stop.id} icon={stopIcon} position={{ lat: stop.lat, lng: stop.lon }}>
            <Popup>
              stop {i}
              <br />  
            </Popup>
          </Marker>)}
        <Marker icon={pointerIcon} position={{ lat: 60.170627, lng: 24.939946 }}>
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
  }
}

const mapDispatchToProps = {
  setShowTrams,
}

export default connect(mapStateToProps,
  mapDispatchToProps)(LeafletMap)
