import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { subscribe } from 'mqtt-react'


const mapInitialCenter = { lat: 60.19501135150039, lng: 24.943557594049953 }



const LeafletMap = (props) => {

  const [trams, setTrams] = useState([])
  //const [showTrams, setShowTrams] = useState([])




  let newData = props.data[0]
  if (newData) {

    let VP = newData.VP

       
     
      if (!trams.map(tram => tram.veh).includes(VP.veh)) {
      setTrams(trams.concat(
        {
          linja: VP.desi,
          veh: VP.veh,
          lat: VP.lat,
          long: VP.long
        }
      )) 

    } else {


      /* setTrams(trams.map(
      tram => tram.veh === VP.veh ?
        {
          linja: VP.desi,
          veh: VP.veh,
          lat: VP.lat,
          long: VP.long
        }
        : tram)) */
      // console.log(new Date())
     }  
  }

  //console.log(trams)
  //console.log(newData)

  const MarkerFactory = () => {
    return (
      trams.map(tram =>
        <Marker
          key={tram.veh}
          position={{
            lat: tram.lat,
            lng: tram.long
          }}
        >
          <Popup closeButton={false}>
            {tram.linja}
          </Popup>
        </Marker>
      )

    )
  }


  return (
    <div className="App">
      <Map id="mapid" center={mapInitialCenter} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={mapInitialCenter}>
          <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
        {MarkerFactory()}
      </Map>
    </div>
  );
}

export default subscribe({
  topic: '/hfp/v2/journey/ongoing/vp/tram/#'
})(LeafletMap)
