import React from 'react'
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

const mapsInitialCenter = { lat: 60.170627, lng: 24.939946 }

const LeafletMap = props => {

  const { trams, showTrams, setShowTrams, openSidebar,
    closeSidebar,
    showSidebar,
    showSidebarOpenButton,
  } = props

  const handleHideTram = (veh) => {
     console.log('piilota ratikka nro: ',veh)
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
          <br/>vehicle:{tram.VP.veh}
          <br/>{tram.VP.drst === 0 ? 'doors closed' : 'doors open'}
          <br/><span onClick={()=>handleHideTram(tram.VP.veh)}>hide x</span>
          </Popup>
        </Marker>
      ))
    }
  }
  const style = showSidebar ? { marginLeft: '200px' } : { marginLeft: '0' }

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
      center={mapsInitialCenter} 
      zoom={16}
      onclick={()=>closeSidebar()}> 
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        /> 
        {ShowChosenTrams()}
      </Map>
    </div>
  )
}

export default LeafletMap
