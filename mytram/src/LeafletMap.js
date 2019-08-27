import React, { useState } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { subscribe } from 'mqtt-react'

const mapInitialCenter = { lat: 60.19501135150039, lng: 24.943557594049953 }



const LeafletMap = props => {
  const [trams, setTrams] = useState([])
  const [showTrams, setShowTrams] = useState([])

  const MarkerFactory = () => {
    
    let currentTrams = []
    for(let i=0;i<trams.length;i++){
      let VP = props.data[i].VP
      currentTrams.push({
        linja: VP.desi,
        veh: VP.veh,
        lat: VP.lat,
        long: VP.long,
      })
    }
  
    return currentTrams.map(tram => (
      <Marker
        key={tram.veh + tram.linja}
        position={{
          lat: tram.lat,
          lng: tram.long,
        }}
      >
        <Popup closeButton={false}>{tram.linja}</Popup>
      </Marker>
    ))
  }

    let newData = props.data[0]
  if (newData) {
    let VP = newData.VP
    //console.log(new Date())
    if (!trams.map(tram => tram.veh).includes(VP.veh)) {
      //console.log(new Date(), 'trams: ', trams.length)
      setTrams(
        trams.concat({
          linja: VP.desi,
          veh: VP.veh,
          lat: VP.lat,
          long: VP.long,
        })
      )
    } else {
      //console.log('hep', new Date())
      /* let newTrams =  
        trams.map(tram => tram.veh === VP.veh ? {
          linja: VP.desi,
          veh: VP.veh,
          lat: VP.lat,
          long: VP.long,
        }: tram) 
        //console.log(newTrams)
        setTrams(newTrams) */
    }
  }  

  //console.log(trams)
  //console.log(props.data)

 

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
        {MarkerFactory(trams)}
      </Map>
      <div>
        {/* <ul>
          {props.data.map(data => (
            <li>öö{data.vp && data.vp.veh}</li>
          ))}
        </ul> */}
      </div>
    </div>
  )
}

  export default subscribe({
  topic: '/hfp/v2/journey/ongoing/vp/tram/#',
})(LeafletMap) 

//export default LeafletMap
