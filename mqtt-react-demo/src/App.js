import React, { Component } from 'react';
import logo from './nearForm-logo.svg';
import './App.css';
import { Connector } from 'mqtt-react';

import _MessageContainer from './MessageContainer.js';
import {subscribe} from 'mqtt-react';

const MessageContainer = subscribe({topic: '@near/demo'})(_MessageContainer);


class App extends Component { 
  render() {
    return (
      <Connector mqttProps="wss://mqtt.hsl.fi:443/">
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to our MQTT-Demo</h2>
        </div>
        <MessageContainer/> 
      </div>
      </Connector>
    );
  }
}

export default App;
