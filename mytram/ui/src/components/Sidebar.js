import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setShowTrams } from '../reducers/showTramsReducer'
import { setMyStop } from '../reducers/myStopReducer'
import {
  setCenter,
  setZoom,
  setShowAlert,
  setShowSidebar,
  closeSidebar,
  toggleAlertVariant,
  setAvgDuration,
  setLine,
} from '../reducers/settingsReducer'
import { setMyTram } from '../reducers/myTramReducer'
import { Container, Row, Col, Button, Dropdown, Alert } from 'react-bootstrap'
import distance, {
  sortByVehicleNumbers,
  sortLineNumbers,
  sortStopNames,
} from '../utils/helpers'
import Sound from 'react-sound'

const Sidebar = ({
  closeSidebar,
  trams,
  showTrams,
  setShowTrams,
  setCenter,
  setZoom,
  stops,
  myStop,
  setMyStop,
  myTram,
  setMyTram,
  setShowAlert,
  settings,
  toggleAlertVariant,
  setAvgDuration,
  setLine,
}) => {
  const [alarm, setAlarm] = useState(false)
  const [speeds, setSpeeds] = useState([])
  const [durations, setDurations] = useState([])
  const [isLogged, setIsLogged] = useState(false)
  const [show, setShow] = useState('menu')
  const [init, setInit] = useState(true)

  const style = settings.showSidebar ? { width: '250px' } : { width: '0' }

  useEffect(() => { 
    console.log('INIT', init)
    if(trams.length > 0 && init){
      console.log('hephep')
      setShowTrams(trams)
      setInit(false)
    }
    if (alarm) {
      let chosenTram = trams.find(tram => tram.VP.veh === myTram.VP.veh)
      let distanceNow = distance(
        myStop.lat,
        myStop.lon,
        chosenTram.VP.lat,
        chosenTram.VP.long
      )
      /* let halfWay = {
        lat: (myStop.lat + chosenTram.VP.lat) / 2,
        lng: (myStop.lon + chosenTram.VP.long) / 2
      }
      setCenter(halfWay) */
      setSpeeds(speeds.concat(chosenTram.VP.spd))
      if (speeds.length > 1) {
        let avgSpeed =
          speeds.reduce((previous, current) => (current += previous)) /
          speeds.length
        let duration = distanceNow / avgSpeed
        setDurations(durations.concat(duration)) 
        let avgDuration = duration
        let sum = 0
        let counter = 0
        if (durations.length > 1) {
          for (let i = durations.length - 1; i >= 0; i--) {
            sum += durations[i]
            counter++
            if (counter > 9) {
              break
            }
          }
          avgDuration = sum / counter
        }
        if (durations.length > 4 && chosenTram.VP.spd > 0) {
          setAvgDuration(avgDuration)
        }

        console.log(
          'DISTANCE NOW: ',
          distanceNow,
          ' m',
          'AVG SPEED: ',
          (avgSpeed * 3.6).toFixed(2),
          ' km/h',
          chosenTram.VP.spd,
          ' m/s',
          'ESTIMATED DURATION: ',
          Math.floor(avgDuration / 60),
          ' min',
          (avgDuration % 60).toFixed(0),
          ' sec'
        )
      }
      if (distanceNow < 20) {
        setAlarm(false)
        setMyTram('')
        setLine(0)
        setSpeeds([])
        setDurations([])
        closeSidebar()
        setShowAlert(true)
      }
    }
    if (settings.showAlert) { 
      toggleAlertVariant(!settings.alertVariant)
    }
  }, [trams])

  const handleChooseMyTram = veh => {
    console.log('TRAM CHOSEN: ', veh)
    if (veh !== 'reset') {
      let chosenTram = trams.find(tram => tram.VP.veh == veh)
      console.log('chosen Tram:', chosenTram)
      //setTrams([])
      setMyTram(chosenTram)
      if (!showTrams.map(tram => tram.VP.veh).includes(chosenTram.VP.veh)) {
        setShowTrams(showTrams.concat(chosenTram))
      }
      //setShowTrams([])
      /* let halfWay = {
        lat: (myStop.lat + chosenTram.VP.lat) / 2,
        lng: (myStop.lon + chosenTram.VP.long) / 2,
      }
      setCenter(halfWay) */
      setCenter({ lat: chosenTram.VP.lat, lng: chosenTram.VP.long })
      //setZoom(16)
    } else {
      setAlarm(false)
      setMyTram('')
      setLine('')
    }
  }

  const handleShowLine = line => {
    console.log('LINE CHOSEN: ', line)
    let tramsToShow = trams.filter(tram => tram.VP.desi == line)
    if(myTram.VP && myTram.VP.desi !== line){
      tramsToShow.push(myTram)
    }
    setShowTrams(tramsToShow)
     
    //setZoom(13)
  }

  const handleChooseStop = stopsGtfsId => {
    console.log('STOP CHOSEN: ', stopsGtfsId)
    setMyStop(stops.find(stop => stop.gtfsId === stopsGtfsId))
  }

  let tramsInOrder = [...trams]
  tramsInOrder.sort(sortByVehicleNumbers)

  const lineNumbers = []
  trams.forEach(tram => {
    if (!lineNumbers.includes(tram.VP.desi)) {
      lineNumbers.push(tram.VP.desi)
    }
  })
  lineNumbers.sort(sortLineNumbers)

  const stopsInOrder = [...stops]
  stopsInOrder.sort(sortStopNames)

  const buttonVariant = 'secondary'

  return (
    <div style={style} className='sidebar' id='mySidebar'>
      {show === 'menu' && (
        <Container>
          {/* <Sound
      url='https://actions.google.com/sounds/v1/alarms/beep_short.ogg'
      playStatus={Sound.status.PLAYING}
      playFromPosition={300}
      volume={90}
      onLoading={this.handleSongLoading}
      onPlaying={this.handleSongPlaying}
      onFinishedPlaying={this.handleSongFinishedPlaying}
    />   */}

          <Row>
            <Col xs={12}>
              <Dropdown>
                <Dropdown.Toggle variant={buttonVariant} id='dropdown-basic'>
                  {!myStop ? 'Choose stop' : myStop.name + ' ' + myStop.gtfsId}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {stopsInOrder.map((stop, i) => (
                    <Dropdown.Item
                      key={i}
                      onClick={() => handleChooseStop(stop.gtfsId)}
                    >
                      {stop.name} {stop.gtfsId}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Dropdown>
                <Dropdown.Toggle variant={buttonVariant} id='dropdown-basic'>
                  {settings.line != '' ? 'Line: ' + settings.line : 'Line?'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {myTram.VP && (
                    <Dropdown.Item onClick={() => handleChooseMyTram('reset')}>
                      reset
                    </Dropdown.Item>
                  )}
                  {lineNumbers.map((line, i) => (
                    <Dropdown.Item
                      key={i}
                      onClick={() => {
                        setLine(line)
                        setMyTram('')
                      }}
                    >
                      {line}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          {settings.line != '' && (
            <Row>
              <Col xs={12}>
                <Dropdown>
                  <Dropdown.Toggle variant={buttonVariant} id='dropdown-basic'>
                    {myTram.VP ? 'Vehicle: ' + myTram.VP.veh : 'Vehicle?'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {myTram.VP && (
                      <Dropdown.Item
                        onClick={() => handleChooseMyTram('reset')}
                      >
                        reset
                      </Dropdown.Item>
                    )}
                    {tramsInOrder
                      .filter(
                        tram =>
                          tram.VP.desi == settings.line ||
                          tram.VP.desi == settings.line + 'T' ||
                          tram.VP.desi == settings.line + 'H'
                      )
                      .map((tram, i) => (
                        <Dropdown.Item
                          key={i}
                          onClick={() => handleChooseMyTram(tram.VP.veh)}
                        >
                          {tram.VP.veh}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          )}

          {myTram.VP && myStop && trams && (
            <Row>
              <Col xs='12'>
                <Button variant={buttonVariant}>
                  Distance:{' '}
                  {distance(
                    myStop.lat,
                    myStop.lon,
                    trams.find(tram => tram.VP.veh === myTram.VP.veh).VP.lat,
                    trams.find(tram => tram.VP.veh === myTram.VP.veh).VP.long
                  )}
                  {' m'} <br />
                  {settings.avgDuration > 0 &&
                    'Duration:' +
                      Math.floor(settings.avgDuration / 60) +
                      ' min' +
                      (settings.avgDuration % 60).toFixed(0) +
                      ' sec'}
                </Button>
              </Col>
            </Row>
          )}

          <Row>
            {myTram.VP && (
              <Col>
                <Button
                  variant={!alarm ? buttonVariant : 'warning'}
                  onClick={() => setAlarm(!alarm)}
                >
                  {!alarm ? 'Set alarm' : 'Alarm off'}
                </Button>
              </Col>
            )}
          </Row>

          {trams.length !== showTrams.length && (
            <Row>
              <Col>
                <Button
                  onClick={() => {
                    setShowTrams(trams)
                    //setZoom(13)
                    //closeSidebar()
                  }}
                  variant={buttonVariant}
                >
                  Show all trams
                </Button>
              </Col>
            </Row>
          )}

          {(myTram.VP || showTrams.length > 0) && (
            <Row>
              <Col>
                <Button
                  onClick={() => setShowTrams([])}
                  variant={buttonVariant}
                >
                  Hide all trams
                </Button>
              </Col>
            </Row>
          )}

          <Row>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant={buttonVariant} id='dropdown-basic'>
                  Show line
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {lineNumbers.map((line, i) => (
                    <Dropdown.Item key={i} onClick={() => handleShowLine(line)}>
                      {line}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                variant={buttonVariant}
                onClick={() => setIsLogged(!isLogged)}
              >
                {isLogged ? 'LOGOUT' : 'LOGIN'}
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                variant={buttonVariant}
                onClick={() => setShow('settings')}
              >
                Settings
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                variant={buttonVariant}
                onClick={() => setShow('goodbye')}
              >
                Exit
              </Button>
            </Col>
          </Row>
        </Container>
      )}

      {show === 'settings' && (
        <Container>
          <Row>
            <Col>
              <Button onClick={() => setShow('menu')}>GO BACK TO MENU</Button>
            </Col>
          </Row>
        </Container>
      )}

      {show === 'goodbye' && (
        <Container>
          <Row>
            <Col onClick={() => setShow('menu')}>goodbye</Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    trams: state.trams,
    showTrams: state.showTrams,
    showSidebar: state.showSidebar,
    stops: state.stops,
    myStop: state.myStop,
    myTram: state.myTram,
    settings: state.settings,
  }
}

const mapDispatchToProps = {
  setShowTrams,
  setMyStop,
  setCenter,
  setZoom,
  setMyTram,
  setShowAlert,
  closeSidebar,
  toggleAlertVariant,
  setAvgDuration,
  setLine,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
