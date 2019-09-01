import React from 'react'
import { connect } from 'react-redux'
import { setShowTrams } from '../reducers/showTramsReducer'
import { setMyStop } from '../reducers/myStopReducer'
import { setCenter } from '../reducers/centerReducer'
import { setZoom } from '../reducers/zoomReducer'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import distance from '../helpers'

const Sidebar = ({
  closeSidebar,
  showSidebar,
  trams,
  showTrams,
  setShowTrams,
  setCenter,
  setZoom,
  stops,
  myStop,
  setMyStop,
}) => {
  const style = showSidebar ? { width: '400px' } : { width: '0' }

  const handleShowMyTram = e => {
    console.log('TRAM CHOSEN: ', e.target.value)
    if (e.target.value !== '-') {
      let chosenTram = trams.find(
        tram => tram.VP.veh.toString() === e.target.value
      )
      console.log('chosen Tram:', chosenTram)
      //setShowTrams(showTrams.concat(chosenTram))
      setShowTrams([chosenTram])
      setCenter({ lat: chosenTram.VP.lat, lng: chosenTram.VP.long })
      setZoom(16)
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

  const handleChooseStop = e => {
    console.log('STOP CHOSEN: ', e.target.value)
    setMyStop(stops.find(stop => stop.gtfsId === e.target.value))
  }

  /// COMPARE FUNCTION FOR ARRAY SORT()
  const sortByLineNumbers = (a, b) => {
    return parseInt(a.VP.desi) < parseInt(b.VP.desi)
      ? -1
      : parseInt(a.VP.desi) > parseInt(b.VP.desi)
      ? 1
      : 0
  }
  let tramsInOrder = [...trams]
  tramsInOrder.sort(sortByLineNumbers)

  const sortLineNumbers = (a, b) => {
    return parseInt(a) < parseInt(b) ? -1 : parseInt(a) > parseInt(b) ? 1 : 0
  }
  const lineNumbers = []
  trams.forEach(tram => {
    if (!lineNumbers.includes(parseInt(tram.VP.desi))) {
      lineNumbers.push(parseInt(tram.VP.desi))
    }
  })
  lineNumbers.sort(sortLineNumbers)

  return (
    <div style={style} className='sidebar' id='mySidebar'>
      <a
        href='javascript:void(0)'
        className='closebtn'
        onClick={() => closeSidebar()}
      >
        ☰
      </a>
      <Container>
        <Form>
          <Row>
            <Col sm={6}>
              <Button
                onClick={() => {
                  setShowTrams(trams)
                  setZoom(13)
                }}
                variant='outline-secondary'
              >
                show all trams
              </Button>
            </Col>
            <Col sm={5}>
              <Button
                onClick={() => setShowTrams([])}
                variant='outline-secondary'
              >
                hide all trams
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group controlId='exampleForm.ControlSelect2'>
                <Form.Label>Find my tram</Form.Label>
                <Form.Control as='select' onChange={handleShowMyTram}>
                  <option> - </option>
                  {tramsInOrder.map((tram, i) => (
                    <option key={i} value={tram.VP.veh}>
                      line: {tram.VP.desi} veh:{tram.VP.veh}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group controlId='exampleForm.ControlSelect1'>
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
          <Row>
            <Col sm={5}>
              <Form.Group controlId='exampleForm.ControlSelect1'>
                <Form.Label>Closest stops</Form.Label>
                <Form.Control as='select' onChange={handleChooseStop}>
                  {stops.map(stop => (
                    <option key={stop.id} value={stop.gtfsId}>
                      {stop.name} {stop.gtfsId}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={5}>
              <Form.Group controlId='exampleForm.ControlSelect1'>
                <Form.Label>
                  My stop : {myStop && `${myStop.name} ${myStop.gtfsId}`}
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {showTrams[0] && (
              <Col>
                distance from myTram to myStop:{' '}
                {distance(
                  myStop.lat,
                  myStop.lon,
                  trams.find(tram => tram.VP.veh === showTrams[0].VP.veh).VP
                    .lat,
                  trams.find(tram => tram.VP.veh === showTrams[0].VP.veh).VP
                    .long
                )}
              </Col>
            )}
          </Row>

          {/*  <Row>
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
          </Row> */}
        </Form>
      </Container>
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
  }
}

const mapDispatchToProps = {
  setShowTrams,
  setMyStop,
  setCenter,
  setZoom,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
