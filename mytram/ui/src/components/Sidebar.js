import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setShowTrams } from '../reducers/showTramsReducer'
import { setMyStop } from '../reducers/myStopReducer'
import { setCenter } from '../reducers/centerReducer'
import { setZoom } from '../reducers/zoomReducer'
import { setMyTram } from '../reducers/myTramReducer'
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap'
import distance, {
  sortByVehicleNumbers,
  sortLineNumbers,
  sortStopNames,
} from '../utils/helpers'  
import Sound from 'react-sound' 

const Sidebar = ({
  closeSidebar,
  showSidebar,
  trams,
  //showTrams,
  setShowTrams,
  setCenter,
  setZoom,
  stops,
  myStop,
  setMyStop,
  myTram,
  setMyTram,
}) => {
  const [line, setLine] = useState(0)
  const [alarm, setAlarm] = useState(false)

  const style = showSidebar ? { width: '250px' } : { width: '0' }

  useEffect(() => {
    if(alarm){
      let distanceNow = distance(
        myStop.lat,
        myStop.lon,
        trams.find(tram => tram.VP.veh === myTram.VP.veh).VP.lat,
        trams.find(tram => tram.VP.veh === myTram.VP.veh).VP.long
      )
      console.log('DISTANCE NOW: ', distanceNow, new Date()) 
    }
  }, [trams])

  const handleChooseMyTram = veh => {
    console.log('TRAM CHOSEN: ', veh)
    if (veh !== 'reset') {
      let chosenTram = trams.find(tram => tram.VP.veh == veh)
      console.log('chosen Tram:', chosenTram)
      setMyTram(chosenTram)
      setShowTrams([])
      setCenter({ lat: chosenTram.VP.lat, lng: chosenTram.VP.long })
      //setZoom(16)
    } else {
      setMyTram('')
      setLine(0)
    }
  }

  const handleShowLine = line => {
    console.log('LINE CHOSEN: ', line)
    setShowTrams(trams.filter(tram => parseInt(tram.VP.desi) == line))
    setZoom(13)
  }

  const handleChooseStop = stopsGtfsId => {
    console.log('STOP CHOSEN: ', stopsGtfsId)
    setMyStop(stops.find(stop => stop.gtfsId === stopsGtfsId))
  }
  /* const getTrams = () => {
   return [...trams]
 } */

  /* const handleSetAlarm = () => {
    console.log('ALARM SET')
    setInterval(()=> {
        let upDatedTrams = getTrams()
        console.log('DISTANCE NOW: ', distance(
          myStop.lat,
          myStop.lon,
          upDatedTrams.find(tram => tram.VP.veh === myTram.VP.veh).VP.lat,
          upDatedTrams.find(tram => tram.VP.veh === myTram.VP.veh).VP.long
        ), new Date())
    }, 1000)
  } */

  let tramsInOrder = [...trams]
  tramsInOrder.sort(sortByVehicleNumbers)

  const lineNumbers = []
  trams.forEach(tram => {
    if (!lineNumbers.includes(parseInt(tram.VP.desi))) {
      lineNumbers.push(parseInt(tram.VP.desi))
    }
  })
  lineNumbers.sort(sortLineNumbers)

  const stopsInOrder = [...stops]
  stopsInOrder.sort(sortStopNames)

  return (
    <div style={style} className='sidebar' id='mySidebar'>
      <Container>
      {/* <Sound
      url='https://actions.google.com/sounds/v1/alarms/beep_short.ogg'
      playStatus={Sound.status.PLAYING}
      playFromPosition={300 /* in milliseconds */}
      volume={90}
      //onLoading={this.handleSongLoading}
      //onPlaying={this.handleSongPlaying}
      //onFinishedPlaying={this.handleSongFinishedPlaying}
    /> */}
        <Row>
          <Col xs={12}>
            <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                {!myStop ? 'CHOOSE STOP' : myStop.name + ' ' + myStop.gtfsId}
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
          <Col xs={6}>
            <Dropdown /* id='tramDropdown' */>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                {line > 0 ? 'Line: ' + line : 'Line?'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {lineNumbers.map((line, i) => (
                  <Dropdown.Item key={i} onClick={() => setLine(line)}>
                    {line}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={6}>
            <Dropdown /* id='tramDropdown' */>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                {myTram.VP ? 'Vehicle: ' + myTram.VP.veh : 'Vehicle?'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {myTram.VP ? (
                  <Dropdown.Item onClick={() => handleChooseMyTram('reset')}>
                    reset
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item>choose line</Dropdown.Item>
                )}
                {tramsInOrder
                  .filter(tram => tram.VP.desi == line)
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

        <Row>
          {myTram.VP && myStop && (
            <Col xs='auto'>
              Distance:{' '}
              {distance(
                myStop.lat,
                myStop.lon,
                trams.find(tram => tram.VP.veh === myTram.VP.veh).VP.lat,
                trams.find(tram => tram.VP.veh === myTram.VP.veh).VP.long
              )}{' '}
              m
            </Col>
          )}
        </Row>

        <Row>
          <Col>
            <Button
              onClick={() => {
                setShowTrams(trams)
                setZoom(13)
                closeSidebar()
              }}
              variant='success'
            >
              show all trams
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => setShowTrams([])} variant='success'>
              hide all trams
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Dropdown /* id='tramDropdown' */>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                Show Line
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
        {myTram.VP && (
          <Row>
            <Button onClick={() => setAlarm(!alarm)}>
              {!alarm ? 'Set alarm' : 'Alarm off'}
            </Button>
          </Row>
        )}
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    trams: state.trams,
    //showTrams: state.showTrams,
    showSidebar: state.showSidebar,
    stops: state.stops,
    myStop: state.myStop,
    myTram: state.myTram,
  }
}

const mapDispatchToProps = {
  setShowTrams,
  setMyStop,
  setCenter,
  setZoom,
  setMyTram,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)

{
  /* 
        <Form>
          <Row>
            <Col xs='auto'>
              <Form.Group controlId='exampleForm.ControlSelect3'>
                <Form.Label>My stop</Form.Label>
                <Form.Control
                  as='select'
                  onChange={handleChooseStop}
                  value={myStop.gtfsId}
                >
                  <option> - </option>
                  {stopsInOrder.map((stop, i) => (
                    <option key={i} value={stop.gtfsId}>
                      {stop.name} {stop.gtfsId}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId='exampleForm.ControlSelect1'>
                <Form.Label>Choose tram</Form.Label>
                <Form.Control as='select' onChange={handleChooseMyTram}>
                  {!myTram.VP ? (
                    <option> - </option>
                  ) : (
                    <option value='reset'>reset</option>
                  )}
                  {tramsInOrder.map((tram, i) => (
                    <option key={i} value={tram.VP.veh}>
                      line: {tram.VP.desi} veh:{tram.VP.veh}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
 
           <Row>
            <Col sm={5}>
              <Form.Group>
                <Form.Check
                  type='radio'
                  label='All times'
                  name='formHorizontalRadios'
                  id='formHorizontalRadios1'
                />
                <Form.Check
                  type='radio'
                  label='today'
                  name='formHorizontalRadios'
                  id='formHorizontalRadios2'
                />
                <Form.Check
                  type='radio'
                  label='this week'
                  name='formHorizontalRadios'
                  id='formHorizontalRadios3'
                />
              </Form.Group>
            </Col>   
          </Row> 
          <Row>
          <Col>
            <Form.Group controlId='exampleForm.ControlSelect2'>
              <Form.Label>Show line</Form.Label>
              <Form.Control as='select' onChange={handleShowLine}>
                <option> - </option>
                {lineNumbers.map((line, i) => (
                  <option key={i} value={line}>
                    {line}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row> 
        </Form> */
}
