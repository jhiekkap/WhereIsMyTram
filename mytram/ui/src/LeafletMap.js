import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("./img/icons8-office-xs-50.png"),
  iconUrl: require("./img/icons8-office-xs-50.png"),
  shadowUrl: require("../node_modules/leaflet/dist/images/marker-shadow.png"),
  iconSize: [40, 40] 
});

const mapsInitialCenter = { lat: 60.19501135150039, lng: 24.943557594049953 }

const LeafletMap = ({ showTrams }) => {


  const ShowChosenTrams = () => {

    if (showTrams) { 
      return showTrams.map((tram, i) =>
        <Marker
          key={i}
          position={{
            lat: tram.VP.lat,
            lng: tram.VP.long,
          }}
        >
          <Popup closeButton={false}>{tram.VP.desi}</Popup>
        </Marker>
      )
    }
  }


  return (
    <div className='App'>
      <Map id='mapid' center={mapsInitialCenter} zoom={12}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
         <Marker position={mapsInitialCenter}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>  
        {ShowChosenTrams()}
      </Map>
    </div>
  )
}

export default LeafletMap
