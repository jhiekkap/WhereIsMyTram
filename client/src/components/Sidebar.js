import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setShowTrams } from '../reducers/showTramsReducer'
import { setMyStop } from '../reducers/myStopReducer'
import { setTrams } from '../reducers/tramsReducer'
import {
  setCenter,
  setZoom,
  setShowAlert,
  closeSidebar,
  toggleAlertVariant,
  setAvgDuration,
  setLine,
  setDistance,
  setAlarm,
  setIntro,
  setGeolocation,
  setAlarmDistance,
  setShow,
  setShowLine,
} from '../reducers/settingsReducer'
import { setMyTram } from '../reducers/myTramReducer'
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  Form,
  DropdownButton,
} from 'react-bootstrap'
import distance, {
  printDuration,
  //sortEverything,
  countDuration,
  sortByVehicleNumbers,
  sortLineNumbers,
  sortStopNames,
} from '../utils/helpers'
import closeX from '../img/icons8-close-window-16.png'
//import { SoundEffect } from './SoundEffect'
//import alarmSound from '../sounds/foghorn-daniel_simon.mp3'

//const horn = {}

const Sidebar = ({
  closeSidebar,
  trams,
  setTrams,
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
  setGeolocation,
  setAlarmDistance,
  setShow,
  setShowLine,
}) => {
  const [speeds, setSpeeds] = useState([])
  const [durations, setDurations] = useState([])
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

    if (myTram) {
      let chosenTram = trams.find(tram => tram.veh === myTram.veh)
      let distanceNow = distance(
        myStop.lat,
        myStop.lon,
        chosenTram.lat,
        chosenTram.long
      )
      setDistance(distanceNow)
      //setCenter({lat: chosenTram.lat,lng:chosenTram.long})

      let speed = chosenTram.spd
      setSpeeds(speeds.concat(speed))
      if (speeds.length > 1) {
        let avgSpeed =
          speeds.reduce((previous, current) => (current += previous)) /
          speeds.length
        let duration = distanceNow / avgSpeed
        setDurations(durations.concat(duration))
        let avgDuration = countDuration(duration, durations)
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
      if (settings.alarm && settings.distance < settings.alarmDistance) {
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
    setCenter(settings.geoLocation ? settings.position : settings.defaultCenter)
    setZoom(16)
  }

  const reStart = () => {
    reset()
    closeSidebar()
  }

  const handleChooseMyTram = veh => {
    console.log('TRAM CHOSEN: ', veh)
    if (veh !== 'reset') {
      let chosenTram = trams.find(tram => tram.veh === veh)
      console.log('chosen Tram:', chosenTram)
      setMyTram(chosenTram)
      //setShowTrams([chosenTram])
      setCenter({ lat: chosenTram.lat, lng: chosenTram.long })
      setZoom(16)
    } else {
      setAlarm(false)
      setMyTram('')
      setTrams([])
      setShowTrams(trams)
      setLine('')
      setZoom(16)
    }
  }

  const showMyTram = () => {
    let chosenTram = trams.find(tram => tram.veh === myTram.veh)
    setCenter({ lat: chosenTram.lat, lng: chosenTram.long })
    console.log('SHOW MY TRAM', chosenTram)
    //setShowTrams([chosenTram])
    setZoom(16)
  }

  const handleShowLine = line => {
    console.log('LINE CHOSEN: ', line)
    let tramsToShow = trams.filter(tram => tram.desi == line)
    setZoom(13)
    setCenter(settings.defaultCenter)
    if (myTram && myTram.desi !== line) {
      tramsToShow.push(myTram)
    }
    setShowLine(line)
    setShowTrams(tramsToShow)
  }

  const handleChooseLine = (line) => {
    setLine(line)
    setShowLine('')
    if (myTram) {
      setMyTram('')
    }
  }

  const handleChooseStop = stopsGtfsId => {
    if (!myTram) {
      console.log('STOP CHOSEN: ', stopsGtfsId)
      setMyStop(stops.find(stop => stop.gtfsId === stopsGtfsId))
    }
  }
  const tramsInOrder = [...trams].filter(tram =>
    settings.possibleRoutes.includes(tram.route)
  )
  tramsInOrder.sort(sortByVehicleNumbers)

  const lineNumbers = []
  tramsInOrder.forEach(tram => {
    if (!lineNumbers.includes(tram.desi)) {
      lineNumbers.push(tram.desi)
    }
  })
  const lineNumbersForTourists = []
  trams.forEach(tram => {
    if (!lineNumbersForTourists.includes(tram.desi)) {
      lineNumbersForTourists.push(tram.desi)
    }
  })
  lineNumbers.sort(sortLineNumbers)
  lineNumbersForTourists.sort(sortLineNumbers)

  const stopsInOrder = [...stops]
  stopsInOrder.sort(sortStopNames)

  const buttonVariant = 'outline-secondary'

  return (
    <div style={style} className='sidebar' id='mySidebar'>
      {settings.show === 'menu' && (
        <Container>
          <Row>
            <img
              src={closeX}
              alt='trash'
              style={{ position: 'absolute', right: 12, top: 8 }}
              onClick={() => closeSidebar()}
            />
          </Row>

          <Row>
            <Col xs={12}>

              {myStop ? !myTram && !settings.line ? (
                <Dropdown>
                  <Dropdown.Toggle variant={buttonVariant}>
                    My stop: <br/>
                    {myStop.name}  {myStop.gtfsId}
                  </Dropdown.Toggle>
                  {myStop && <Dropdown.Menu>
                    {stopsInOrder.map((stop, i) => (
                      <Dropdown.Item
                        id='dropdown-chooseStop'
                        key={i}
                        onClick={() => handleChooseStop(stop.gtfsId)}
                      >
                        {stop.name} {stop.gtfsId}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>}
                </Dropdown>
              ) : (
                  <Button variant={buttonVariant}>
                    {myStop.name} {myStop.gtfsId}
                  </Button>
                ) : <Button variant={buttonVariant}>
                  No tram stops available. Go to Helsinki.
              </Button>}
            </Col>
          </Row>

          {myStop && <Row>
            <Col xs={12}>
              {!settings.alarm ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant={!settings.line ? 'outline-danger' : buttonVariant}
                    id='dropdown-basic'
                  >
                    {settings.line !== ''
                      ? 'Line: ' + settings.line
                      : 'Choose line'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {myTram && (
                      <Dropdown.Item
                        onClick={() => handleChooseMyTram('reset')}
                      >
                        reset
                      </Dropdown.Item>
                    )}
                    {lineNumbers.map((line, i) => (
                      <Dropdown.Item
                        key={i}
                        onClick={() => handleChooseLine(line)}
                      >
                        {line}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                  <Button variant={buttonVariant}>Line: {settings.line}</Button>
                )}
            </Col>
          </Row>}

          {settings.line && (
            <Row>
              <Col xs={12}>
                {!settings.alarm ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      variant={
                        settings.line && !myTram
                          ? 'outline-danger'
                          : buttonVariant
                      }
                      id='dropdown-basic'
                    >
                      {myTram ? 'Vehicle: ' + myTram.veh : 'Choose vehicle'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {myTram && (
                        <Dropdown.Item
                          onClick={() => handleChooseMyTram('reset')}
                        >
                          reset
                        </Dropdown.Item>
                      )}
                      {tramsInOrder
                        .filter(
                          tram =>
                            tram.desi == settings.line ||
                            tram.desi == settings.line + 'T' ||
                            tram.desi == settings.line + 'H'
                        )
                        .map((tram, i) => (
                          <Dropdown.Item
                            key={i}
                            onClick={() => handleChooseMyTram(tram.veh)}
                          >
                            {tram.veh}
                          </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                    <Button variant={buttonVariant}>Vehicle: {myTram.veh}</Button>
                  )}
              </Col>
            </Row>
          )}

          {myTram && (
            <Row>
              <Col>
                <Button
                  variant={!settings.alarm ? 'outline-danger' : 'outline-success'}
                  onClick={() => {
                    setAlarm(!settings.alarm);setShowLine('')}}
                >
                  {!settings.alarm ? 'Set alarm' : 'Alarm off'}
                </Button>
              </Col>
            </Row>
          )}

          {settings.alarm && (
            <Row>
              <Col>
                <DropdownButton
                  variant={settings.alarm ? 'outline-danger' : buttonVariant}
                  id='alarmDistance'
                  title={`Alarm distance ${settings.alarmDistance} m`}
                >
                  {[50, 100, 150, 200, 250].map((meters, i) => (
                    <Dropdown.Item
                      key={i}
                      onClick={() => setAlarmDistance(meters)}
                    >
                      {meters} m
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Col>
            </Row>
          )}

          {myTram && myStop && trams && (
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

          {myTram && (
            <Row>
              <Col>
                <Button
                  variant={
                    settings.alarm || myTram ? 'outline-danger' : buttonVariant
                  }
                  onClick={() => { reset(); setShowLine('') }}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          )}

          {myTram && (
            <Row>
              <Col>
                <Button
                  variant={buttonVariant}
                  onClick={() => {
                    showMyTram()
                    closeSidebar()
                    setShowLine('')
                  }}
                >
                  Where's my tram?
                </Button>
              </Col>
            </Row>
          )}

          {myTram && (
            <Row>
              <Col>
                <Button
                  variant={buttonVariant}
                  onClick={() => {
                    closeSidebar()
                    setCenter(settings.position)
                  }}
                >
                  Where am I?
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
                    setShowLine('')
                    setZoom(15)
                    closeSidebar(false)
                  }}
                  variant={buttonVariant}
                >
                  Show all trams
                </Button>
              </Col>
            </Row>
          )}

          {(((!myTram && showTrams.length > 0) ||
            (myTram && showTrams.length > 1))  && myStop) && (
              <Row>
                <Col>
                  <Button
                    onClick={() => {
                      if (!myTram) {
                        setShowTrams([])
                      } else {
                        setShowTrams([
                          trams.find(tram => tram.veh === myTram.veh),
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

          {myStop && <Row>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant={buttonVariant} id='dropdown-basic'>
                  Show line{settings.showLine && ': ' + settings.showLine}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {settings.showLine && (
                    <Dropdown.Item onClick={() => handleShowLine('')}>
                      clear
                    </Dropdown.Item>
                  )}
                  {lineNumbersForTourists.map((line, i) => (
                    <Dropdown.Item key={i} onClick={() => handleShowLine(line)}>
                      {line}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>}

          <Row>
            <Col>
              <Button variant={buttonVariant}>
                <Form>
                  <Form.Check
                    onChange={() => setGeolocation(!settings.geoLocation)}
                    checked={settings.geoLocation}
                    type='checkbox'
                    id='geolocation'
                    label='Geolocation'
                  />
                </Form>
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

      {settings.show === 'goodbye' && (
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
    trams: state.trams.trams,
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
  setGeolocation,
  setAlarmDistance,
  setShow,
  setShowLine,
  setTrams,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
