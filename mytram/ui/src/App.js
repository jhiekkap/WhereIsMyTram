import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setTrams } from './reducers/tramsReducer'
import { setShowSidebar} from './reducers/showSidebarReducer'
import { setShowSidebarOpenButton } from './reducers/showSidebarOpenButtonReducer'
import './App.css'
import LeafletMap from './components/LeafletMap'
import Sidebar from './components/Sidebar'

const App = props => {
  const { setTrams } = props
  const { setShowSidebar } = props 
  const { setShowSidebarOpenButton } = props 

  const update = () => {
    //fetch('https://agile-gorge-39829.herokuapp.com/trams')
    //fetch('http://localhost:3001/trams')
    fetch('/trams')
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

  //useEffect(() => update(), [new Date()])
  setInterval(() =>{
    update()
  }, 1000)

  const openSidebar = () => {
    setShowSidebar(true)
    setShowSidebarOpenButton(false)
    console.log('open!')
  }

  const closeSidebar = () => {
    setShowSidebar(false)
    setTimeout(() => {
      setShowSidebarOpenButton(true)
    }, 300)
    console.log('close!')
  }

  return (
    <div className='App'>
      <Sidebar 
      closeSidebar={closeSidebar}  
      />
      <LeafletMap
        openSidebar={openSidebar}
        closeSidebar={closeSidebar}  
      />
    </div>
  )
}

const mapDispatchToProps = {
  setTrams, setShowSidebar, setShowSidebarOpenButton,
}

export default connect(
  null,
  mapDispatchToProps
)(App)
