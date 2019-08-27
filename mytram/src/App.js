import React, {useState} from 'react'
import './App.css'
import { Connector } from 'mqtt-react' 
import LeafletMap from './LeafletMap'
import SelectTram from './SelectTram'

const App = () => {

  const [trams, setTrams] = useState([])
  const [showTram, setShowTram] = useState({})

  return (
    <Connector mqttProps='wss://mqtt.hsl.fi:443/'>
      <div className='App'>
        <div className='App-header'>
          <h2>Where´s my tram?</h2>
        </div>
        <LeafletMap 
        showTram={showTram}/> 
        <SelectTram 
        trams={trams}
        setTrams={setTrams}
        showTram={showTram}
        setShowTram={setShowTram}
        />
      </div>
    </Connector>
  )
}

export default App
