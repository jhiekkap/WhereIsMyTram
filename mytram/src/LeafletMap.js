import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet' 

const mapInitialCenter = { lat: 60.19501135150039, lng: 24.943557594049953 }

const LeafletMap = ({showTram}) => {
   

  const ShowChosenTram = () => { 
    if(showTram.lat !== undefined){
      console.log('valittu ratikka:',showTram)
        return ( 
          <Marker 
             position={{
              lat: showTram.lat,
              lng: showTram.long,
            }} 
          >
            <Popup closeButton={false}>{showTram.linja}</Popup>
          </Marker> 
      )     
    } 
  }
  

  return (
    <div className='App'>
      <Map id='mapid' center={mapInitialCenter} zoom={12}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={mapInitialCenter}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
          {ShowChosenTram()}
      </Map> 
    </div>
  )
}

export default LeafletMap
