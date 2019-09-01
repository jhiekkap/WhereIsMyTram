import React from 'react'
import { connect } from 'react-redux'
import { setShowTrams } from '../reducers/showTramsReducer'
import { setMyStop } from '../reducers/myStopReducer'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const Sidebar = ({
  closeSidebar,
  showSidebar,
  trams,
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
    let chosenTram = trams.find(
      tram => tram.VP.veh.toString() === e.target.value
    )
    console.log('chosen Tram:', chosenTram)
    //setShowTrams(showTrams.concat(chosenTram))
    setShowTrams([chosenTram])
    setCenter({ lat: chosenTram.VP.lat, lng: chosenTram.VP.long })
    setZoom(16)
  }

  const handleShowLine = e => {
    console.log('LINE CHOSEN: ', e.target.value)
    setShowTrams(trams.filter(tram => parseInt(tram.VP.desi) == e.target.value))
    setZoom(13)
  }

  const handleChooseStop = e => {
    console.log('STOP CHOSEN: ', e.target.value)
    setMyStop(stops.find(stop => stop.node.stop.gtfsId === e.target.value))
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
                onClick={() => { setShowTrams(trams); setZoom(13) }}
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
                  <option>choose</option>
                  {tramsInOrder.map((tram, i) => (
                    <option key={i} value={tram.VP.veh}>
                      line: {tram.VP.desi} veh:{tram.VP.veh}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={5}>
              <Form.Group controlId='exampleForm.ControlSelect1'>
                <Form.Label>Show whole line</Form.Label>
                <Form.Control as='select' onChange={handleShowLine}>
                  <option>choose </option>
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
                <Form.Label>My closest stops</Form.Label>
                <Form.Control as='select' onChange={handleChooseStop}>
                  <option>choose </option>
                  {stops.map((stop, i) => (
                    <option key={i} value={stop.node.stop.gtfsId}>
                      {stop.node.stop.name} {stop.node.stop.gtfsId}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
            {/* <Col sm={5}>
            <Form.Label>My stop : {myStop  && `${myStop.node.stop.name} ${myStop.node.stop.gtfsId}`}</Form.Label>
          </Col>  */} 
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
  setShowTrams, setMyStop,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
