import React from 'react'
import { connect } from 'react-redux'
import { setShowTrams } from '../reducers/showTramsReducer'
import { setMyStop } from '../reducers/myStopReducer'
import { setCenter } from '../reducers/centerReducer'
import { setZoom } from '../reducers/zoomReducer'
import { setMyTram } from '../reducers/myTramReducer'
import { Container, Row, Col, Form, Button, Dropdown } from 'react-bootstrap'
import distance, {
  sortByLineNumbers,
  sortLineNumbers,
  sortStopNames,
} from '../utils/helpers'

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
  const style = showSidebar ? { width: '250px' } : { width: '0' }

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
    }
  }

  const handleShowLine = e => {
    console.log('LINE CHOSEN: ', e.target.value)
    if (e.target.value !== '-') {
      setShowTrams(
        trams.filter(tram => parseInt(tram.VP.desi) == e.target.value)
      )
      setZoom(13)
    }
  }

  const handleChooseStop = stopsGtfsId => {
    console.log('STOP CHOSEN: ', stopsGtfsId)
    setMyStop(stops.find(stop => stop.gtfsId === stopsGtfsId))
  }

  let tramsInOrder = [...trams]
  tramsInOrder.sort(sortByLineNumbers)

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
        <Row>
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
        </Row>
        <Row>
          <Col>
            <Dropdown /* id='tramDropdown' */>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                {myTram.VP
                  ? 'line: ' + myTram.VP.desi + ' vehicle: ' + myTram.VP.veh
                  : 'Choose tram'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {!myTram.VP ? (
                  <Dropdown.Item> - </Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={() => handleChooseMyTram('reset')}>
                    reset
                  </Dropdown.Item>
                )}
                {tramsInOrder.map((tram, i) => (
                  <Dropdown.Item
                    key={i}
                    onClick={() => handleChooseMyTram(tram.VP.veh)}
                  >
                    line: {tram.VP.desi} veh:{tram.VP.veh}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown /* id='tramDropdown' */>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                {myTram.VP
                  ? 'line: ' + myTram.VP.desi + ' vehicle: ' + myTram.VP.veh
                  : 'Choose tram'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {!myTram.VP ? (
                  <Dropdown.Item> - </Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={() => handleChooseMyTram('reset')}>
                    reset
                  </Dropdown.Item>
                )}
                {tramsInOrder.map((tram, i) => (
                  <Dropdown.Item
                    key={i}
                    onClick={() => handleChooseMyTram(tram.VP.veh)}
                  >
                    line: {tram.VP.desi} veh:{tram.VP.veh}
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
              ).toFixed(2)}{' '}
              km
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
              variant='outline-secondary'
            >
              show all trams
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={() => setShowTrams([])}
              variant='outline-secondary'
            >
              hide all trams
            </Button>
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
        </Form> */
}
