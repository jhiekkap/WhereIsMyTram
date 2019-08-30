import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap' 

const Sidebar = props => {
  const {
    closeSidebar, 
    showSidebar,
    showSidebarCloseButton, 
    trams
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
    console.log('CHOOSE TRAM: ', e.target.value)
/* 
    let newTagList = []

    if (e.target.value === 'EVERYTHING') {
      newTagList = allTags.map(tag => ({ name: tag.name, value: true }))
    } else if (e.target.value === 'NOTHING') {
      newTagList = allTags.map(tag => ({ name: tag.name, value: false }))
    } else {
      newTagList = allTags.map(tag =>
        tag.name === e.target.value
          ? { name: e.target.value, value: !tag.value }
          : tag
      )
    }
    console.log('TRUE: ', newTagList.filter(tag => tag.value === true).length)
    console.log('FALSE: ', newTagList.filter(tag => tag.value === false).length) */

    //let newInterestingEventsList = filterByTags(newTagList)

    //setShowIndex(0)
   /*  setAllTags(newTagList) */
    //setFirstTimeHere(false)
    //filterByTime(timeFilter, newInterestingEventsList)
  }

  //const BasicSelect = () => <Select options={options} />

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
                <Form.Label>Choose tag</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col sm={10}>
                <Form.Control
                  as='select'
                  size={5}
                  multiple={true}
                  value={trams
                    .map(tram => tram.VP.veh)}
                  onChange={handleTramsDropdownChange}
                >
                  {trams.map((tram, i) => (
                    <option 
                    key={i} 
                    value={tram.VP.veh}>
                      linja: {tram.VP.desi} veh:{tram.VP.veh}
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
                <Form.Label>Distance km</Form.Label>
                <Form.Control as='select'>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>Capital area</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={5}>
              <Button variant='outline-secondary'>clear filters</Button>
            </Col>
            <Col sm={6}>
              <Button variant='outline-secondary'>show a list</Button>
            </Col>
          </Row>
        </Form> 
      </Container>
    </div>
  )
}

export default Sidebar
