import React  from 'react' 
import './App.css' 
import { Connector } from 'mqtt-react' 
import MessageContainer from './MessageContainer' 


const App = () => {

  return (
    <Connector mqttProps="wss://mqtt.hsl.fi:443/">
      <div className="App">
        <div className="App-header"> 
          <h2>Where´s my tram?</h2>
        </div>
        <MessageContainer />
      </div>
    </Connector>
  ) 
}

export default App 
