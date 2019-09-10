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
  setDistance,
  setAlarm,
  setIntro,
} from '../reducers/settingsReducer'
import { setMyTram } from '../reducers/myTramReducer'
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap'
import distance, {
  printDuration,
  /* sortEverything,
  countDuration, */
  sortByVehicleNumbers,
  sortLineNumbers,
  sortStopNames,
} from '../utils/helpers'
//import { SoundEffect } from './SoundEffect'
import alarmSound from '../sounds/foghorn-daniel_simon.mp3'

//const horn = {}

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
  setDistance,
  setAlarm,
  horn,
  setIntro,
}) => {
  const [speeds, setSpeeds] = useState([])
  const [durations, setDurations] = useState([])
  const [show, setShow] = useState('menu')
  const [init, setInit] = useState(true)

  const style = settings.showSidebar ? { width: '250px' } : { width: '0' }

 /*  const init = () => {
    setIntro(false)
    console.log('eka tööt')
    horn.src={alarmSound}
    horn.play()
  }  */

  useEffect(() => {
    if (trams.length > 0 && init) {
      console.log('initialized!')
      setShowTrams(trams)
      setInit(false)
    }

    if (myTram.VP) {
      let chosenTram = trams.find(tram => tram.VP.veh === myTram.VP.veh)
      let distanceNow = distance(
        myStop.lat,
        myStop.lon,
        chosenTram.VP.lat,
        chosenTram.VP.long
      )
      setDistance(distanceNow)

      let speed = chosenTram.VP.spd
      setSpeeds(speeds.concat(speed))
      if (speeds.length > 1) {
        let avgSpeed =
          speeds.reduce((previous, current) => (current += previous)) /
          speeds.length
        let duration = distanceNow / avgSpeed
        setDurations(durations.concat(duration))
        //let avgDuration = countDuration(duration, durations)
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
        if (durations.length > 4 && speed > 0) {
          setAvgDuration(avgDuration)
        }

        console.log(
          'DISTANCE NOW: ',
          distanceNow,
          ' m',
          'AVG SPEED: ',
          (avgSpeed * 3.6).toFixed(2),
          ' km/h',
          speed,
          ' m/s',
          'ESTIMATED DURATION: ',
          printDuration(settings.avgDuration)
        )
      }
      if (settings.alarm && settings.distance < 50) {
       /*  horn.src={alarmSound}
        horn.play() */
        reStart()
        setShowAlert(true)
      } 
    }
    if (settings.showAlert) {
      toggleAlertVariant(!settings.alertVariant)
    }
  }, [trams])

  const reset = () => {
    setAlarm(false)
    setShow('menu')
    setMyTram('')
    setDurations([])
    setAvgDuration(0)
    setDistance(0)
    setSpeeds([])
    setLine('')
    setShowTrams(trams)
    setCenter({ lat: 60.1698, lng: 24.9395 })
    setZoom(16)
  }
 
  const reStart = () => {
    reset()
    closeSidebar()
  }

  const handleChooseMyTram = veh => {
    console.log('TRAM CHOSEN: ', veh)
    if (veh !== 'reset') {
      let chosenTram = trams.find(tram => tram.VP.veh == veh)
      console.log('chosen Tram:', chosenTram)
      setMyTram(chosenTram)
      setShowTrams([chosenTram])
      /* if (!showTrams.map(tram => tram.VP.veh).includes(chosenTram.VP.veh)) {
        setShowTrams(showTrams.concat(chosenTram))
      } */
      setCenter({ lat: chosenTram.VP.lat, lng: chosenTram.VP.long })
    } else {
      setAlarm(false)
      setMyTram('')
      setLine('')
    }
  }

  const showMyTram = () => {
    let chosenTram = trams.find(tram => tram.VP.veh == myTram.VP.veh)
    setCenter({ lat: chosenTram.VP.lat, lng: chosenTram.VP.long })
    console.log('SHOW MY TRAM', chosenTram)
    setShowTrams([chosenTram])
  }

  const handleShowLine = line => {
    console.log('LINE CHOSEN: ', line)
    let tramsToShow = trams.filter(tram => tram.VP.desi == line)
    if (myTram.VP && myTram.VP.desi !== line) {
      tramsToShow.push(myTram)
    }
    setShowTrams(tramsToShow)
  }

  const handleChooseStop = stopsGtfsId => {
    console.log('STOP CHOSEN: ', stopsGtfsId)
    setMyStop(stops.find(stop => stop.gtfsId === stopsGtfsId))
  }

  //const [tramsInOrder, lineNumbers, stopsInOrder] = sortEverything(trams, stops)
  //console.log(tramsInOrder, lineNumbers, stopsInOrder)
  const tramsInOrder = [...trams]
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

  const buttonVariant = 'outline-secondary'

  return (
    <div style={style} className='sidebar' id='mySidebar'>
      {show === 'menu' && (
        <Container>
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
                <Dropdown.Toggle
                  variant={!settings.line ? 'outline-danger' : buttonVariant}
                  id='dropdown-basic'
                >
                  {settings.line != ''
                    ? 'Line: ' + settings.line
                    : 'Choose line'}
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
                        if (myTram) {
                          setMyTram('')
                        }
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
                  <Dropdown.Toggle
                    variant={
                      settings.line && !myTram.VP
                        ? 'outline-danger'
                        : buttonVariant
                    }
                    id='dropdown-basic'
                  >
                    {myTram.VP ? 'Vehicle: ' + myTram.VP.veh : 'Choose vehicle'}
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

          {myTram.VP && (
            <Row>
              <Col>
                <Button
                  variant={!settings.alarm ? 'outline-danger' : 'success'}
                  onClick={() => {
                    setAlarm(!settings.alarm)
                    closeSidebar()
                  }}
                >
                  {!settings.alarm ? 'Set alarm' : 'Alarm off'}
                </Button>
              </Col>
            </Row>
          )}

          {myTram.VP && myStop && trams && (
            <Row>
              <Col xs='12'>
                <Button variant={buttonVariant}>
                  Distance:
                  {settings.distance} m <br />
                  {settings.avgDuration > 0 &&
                    ' Duration: ' + printDuration(settings.avgDuration)}
                </Button>
              </Col>
            </Row>
          )}

          {myTram.VP && (
            <Row>
              <Col>
                <Button variant={buttonVariant} onClick={() => reset()}>
                  Reset
                </Button>
              </Col>
            </Row>
          )}

          {myTram.VP && (
            <Row>
              <Col>
                <Button
                  variant={buttonVariant}
                  onClick={() => {
                    showMyTram()
                    closeSidebar()
                  }}
                >
                  Where's my tram?
                </Button>
              </Col>
            </Row>
          )}

          {trams.length !== showTrams.length && (
            <Row>
              <Col>
                <Button
                  onClick={() => {
                    setShowTrams(trams)
                    //setZoom(13)
                    //closeSidebar(false)
                  }}
                  variant={buttonVariant}
                >
                  Show all trams
                </Button>
              </Col>
            </Row>
          )}

          {((!myTram.VP && showTrams.length > 0) ||
            (myTram.VP && showTrams.length > 1)) && (
            <Row>
              <Col>
                <Button
                  onClick={() => {
                    if (!myTram.VP) {
                      setShowTrams([])
                    } else {
                      setShowTrams([
                        trams.find(tram => tram.VP.veh === myTram.VP.veh),
                      ])
                    }
                  }}
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
            <Col>Geolocation on / off ?</Col>
          </Row>
          <Row>
            <Col>Alarm distance ?</Col>
          </Row>
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
            <Col>
              <Button onClick={() => reStart()}>RESTART</Button>
            </Col>
            <Col>
              <Button onClick={() => setShow('menu')}>Cancel</Button>
            </Col>
          </Row>
        </Container>
      )}
      {/* <SoundEffect
        play={settings.showAlert}
        audioUrl={alarmSound}
      ></SoundEffect> */}
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
  setDistance,
  setAlarm,
  setIntro,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
