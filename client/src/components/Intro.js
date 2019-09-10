import React from 'react'
import { connect } from 'react-redux'
//import { setIntro } from '../reducers/settingsReducer'
import { Container, Row, Col, Button } from 'react-bootstrap'
 

const Intro = ({ 
  settings,
  //setIntro,
  initHorn 
  }) => {

    

  return (
    settings.intro && (
      <Container>
        <Row>
          <Col>
            <Button onClick={initHorn}>Welcome</Button>
          </Col>
        </Row>
      </Container>
    )
  )
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
  }
}

 /* const mapDispatchToProps = {
  setIntro,
}  */

export default connect(
  mapStateToProps,
  null
  //mapDispatchToProps
)(Intro)
