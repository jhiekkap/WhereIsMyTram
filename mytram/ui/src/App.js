import React, {useState} from 'react'
import './App.css' 
import LeafletMap from './LeafletMap'
import SelectTram from './SelectTram' 

const App = () => {

  const [trams, setTrams] = useState([])
  const [showTrams, setShowTrams] = useState([])

  const update =  () => setInterval(() => {
    fetch('http://localhost:3001/trams')
    .then(response => response.json())
    .then(body => {

      console.log(body)
      console.log(new Date())
      //setShowTrams(body)
    })
    .catch(error => {
      console.log(error) 
    })
  }, 1000) 

  update()

  return ( 
      <div className='App'>
        <div className='App-header'>
          <h2>Where´s my tram?</h2>
        </div>
        <LeafletMap 
        showTrams={showTrams}/> 
        <SelectTram 
        trams={trams} 
        setShowTrams={setShowTrams}
        />
      </div> 
  )
}

export default App
