import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const Sidebar = props => {
  const {
    closeSidebar,
    showSidebar,
    trams,
    showTrams,
    setShowTrams
  } = props

  const style = showSidebar ? { width: '400px' } : { width: '0' }

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  for (let i = 1; i < 100; i++) {
    options.push({ value: `vanilla ${i}`, label: `vanilla ${i}` })
  }

  const handleTramsDropdownChange = e => {
    console.log('TRAM CHOSEN: ', e.target.value)
    let chosenTram = trams.find(tram => tram.VP.veh.toString() === e.target.value)
    console.log('chosen Tram:', chosenTram)
    setShowTrams(showTrams.concat(chosenTram))
  }

   const handleShowLine = e => {
     console.log('LINE CHOSEN: ', e.target.value)
     setShowTrams(trams.filter(tram => (parseInt(tram.VP.desi) == e.target.value)))
   }


  /// COMPARE FUNCTION FOR ARRAY SORT()
  const sortByLineNumbers = (a, b) => {
    return parseInt(a.VP.desi) < parseInt(b.VP.desi) ? -1 : parseInt(a.VP.desi) > parseInt(b.VP.desi) ? 1 : 0
  }
  let tramsInOrder = [...trams].filter(tram => !showTrams.map(tram => tram.VP.veh).includes(tram.VP.veh))
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
          <Form.Group controlId='exampleForm.ControlSelect2'>
            <Row  >
              <Col md="auto">
                <Form.Label>Where's my tram?</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col sm={10}>
                <Form.Control
                  as='select'
                  onChange={handleTramsDropdownChange}
                ><option>{trams.length !== showTrams.length ? 'add a tram' : 'all trams are on the map'}</option>
                  {tramsInOrder.map((tram, i) => (
                    <option
                      key={i}
                      value={tram.VP.veh}>
                      line: {tram.VP.desi} veh:{tram.VP.veh}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
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
            <Col sm={5}>
              <Form.Group controlId='exampleForm.ControlSelect1'>
                <Form.Label>show by line number</Form.Label>
                <Form.Control as='select' onChange={handleShowLine}>
                  <option>choose </option>
                    {lineNumbers.map((line, i) => <option key={i} value={line}>{line}</option>)}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={5}>
              <Button onClick={() => setShowTrams([])} variant='outline-secondary'>hide all trams</Button>
            </Col>
            <Col sm={6}>
              <Button onClick={() => setShowTrams(trams)} variant='outline-secondary'>show all trams</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  )
}

export default Sidebar
