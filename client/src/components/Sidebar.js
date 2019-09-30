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
  countDuration,
  sortByVehicleNumbers,
  sortLineNumbers,
} from '../utils/helpers'
import closeX from '../img/icons8-close-window-16.png'
import {
  ChooseStopButton,
  ChooseLineButton,
  ChooseTramButton,
} from './SidebarButtons'

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
  setGeolocation,
  setAlarmDistance,
  setShow,
  setShowLine,
}) => {
  const [speeds, setSpeeds] = useState([])
  const [durations, setDurations] = useState([])
  const [init, setInit] = useState(true)

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
        /* console.log(
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
        ) */
      }
      if (settings.alarm && settings.distance < settings.alarmDistance) {
        reset()
        closeSidebar()
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
  }

  const handleChooseMyTram = veh => {
    console.log('TRAM CHOSEN: ', veh)
    if (veh !== 'reset') {
      let chosenTram = trams.find(tram => tram.veh === veh)
      console.log('chosen Tram:', chosenTram)
      setMyTram(chosenTram)
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

  const handleChooseLine = line => {
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

  const buttonVariant = 'outline-secondary'

  const style = settings.showSidebar ? { width: '250px' } : { width: '0' }

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

          <ChooseStopButton
            myStop={myStop}
            myTram={myTram}
            settings={settings}
            handleChooseStop={handleChooseStop}
            stops={stops}
          />

          {myStop && (
            <ChooseLineButton
              myTram={myTram}
              settings={settings}
              handleChooseMyTram={handleChooseMyTram}
              trams={trams}
              handleChooseLine={handleChooseLine}
            />
          )}

          {settings.line && (
            <ChooseTramButton
              myTram={myTram}
              settings={settings}
              handleChooseMyTram={handleChooseMyTram}
              trams={trams}
            />
          )}

          {myTram && (
            <Row>
              <Col>
                <Button
                  variant={
                    !settings.alarm ? 'outline-danger' : 'outline-success'
                  }
                  onClick={() => {
                    setAlarm(!settings.alarm)
                    setShowLine('')
                  }}
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
                  onClick={() => {
                    reset()
                    setShowLine('')
                  }}
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
                    //setZoom(15)
                    closeSidebar(false)
                  }}
                  variant={buttonVariant}
                >
                  Show all trams
                </Button>
              </Col>
            </Row>
          )}

          {((!myTram && showTrams.length > 0) ||
            (myTram && showTrams.length > 1)) &&
            myStop && (
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

          {myStop && (
            <Row>
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
                      <Dropdown.Item
                        key={i}
                        onClick={() => handleShowLine(line)}
                      >
                        {line}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          )}

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
              <Button onClick={() => reStart()}>GOODBYE</Button>
            </Col>
            <Col>
              <Button onClick={() => setShow('menu')}>Cancel</Button>
            </Col>
          </Row>
        </Container>
      )}
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
