import React, { useState, useEffect } from 'react'
import './App.css'
import LeafletMap from './components/LeafletMap' 
import Sidebar from './components/Sidebar'

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

  const openSidebar = () => {
    setShowSidebar(true) 
    setShowSidebarOpenButton(false) 
    console.log('open!')
  }

  const closeSidebar = () =>  {
    setShowSidebar(false)
    setTimeout(function () { setShowSidebarOpenButton(true) }, 300); 
    console.log('close!')
  }

  return (
    <div className='App'> 
        <Sidebar 
        closeSidebar={closeSidebar}
        showSidebar={showSidebar}
        showSidebarCloseButton={showSidebarCloseButton}
        trams={trams} 
        showTrams={showTrams}
        setShowTrams={setShowTrams}
        />  
      <LeafletMap
        showTrams={showTrams}
        setShowTrams={setShowTrams}
        trams={trams}
        openSidebar={openSidebar}
        closeSidebar={closeSidebar}
        showSidebar={showSidebar}
        showSidebarOpenButton={showSidebarOpenButton}f
      /> 
    </div>
  )
}

export default App
