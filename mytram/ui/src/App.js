import React, { useState, useEffect } from 'react'
import './App.css'
import LeafletMap from './LeafletMap'
import SelectTram from './SelectTram'
import Sidebar from './Sidebar'

const App = () => {
  const [trams, setTrams] = useState([])
  const [showTrams, setShowTrams] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [showSidebarCloseButton, setShowSidebarCloseButton] = useState(true)
  const [showSidebarOpenButton, setShowSidebarOpenButton] = useState(true)


  const update = () => {
    fetch('http://localhost:3001/trams')
      .then(response => response.json())
      .then(body => {
        //console.log(body)
        //console.log(new Date())
        //setShowTrams(body)
        setTrams(body)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => update(), [new Date()])

  function openSidebar() {
    setShowSidebar(true)
    //setShowSidebarCloseButton(true)
    setShowSidebarOpenButton(false)
    //document.getElementById("mySidebar").style.width = "250px";
    //document.getElementById("main").style.marginLeft = "250px";
    console.log('open!')
  }

  function closeSidebar() {
    setShowSidebar(false)
    setTimeout(function () { setShowSidebarOpenButton(true) }, 300);
    //document.getElementById("mySidebar").style.width = "0";
    //document.getElementById("main").style.marginLeft= "0";
    console.log('close button!')
  }

  return (
    <div className='App'>
      <div className='App-header'>
        <h2>Where´s my tram?</h2>
      </div>
        <Sidebar 
        closeSidebar={closeSidebar}
        showSidebar={showSidebar}
        showSidebarCloseButton={showSidebarCloseButton}
        trams={trams} 
        />  
      <LeafletMap
        showTrams={showTrams}
        setShowTrams={setShowTrams}
        trams={trams}
        openSidebar={openSidebar}
        showSidebar={showSidebar}
        showSidebarOpenButton={showSidebarOpenButton}f
      />
      <SelectTram
        trams={trams}
        showTrams={showTrams}
        setShowTrams={setShowTrams}
      />
    </div>
  )
}

export default App
