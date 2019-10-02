import React from 'react'
import distance, {
  printDuration,
  //sortEverything,
  countDuration,
  sortByVehicleNumbers,
  sortLineNumbers,
  sortStopNames,
} from '../utils/helpers'
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  Form,
  DropdownButton,
} from 'react-bootstrap'

const buttonVariant = 'outline-secondary'

export const ChooseStopButton = ({
  myStop,
  myTram,
  settings,
  handleChooseStop,
  stops,
}) => {
  const stopsInOrder = [...stops]
  stopsInOrder.sort(sortStopNames)

  return (
    <Row>
      <Col xs={12}>
        {myStop ? (
          !myTram && !settings.line ? (
            <Dropdown>
              <Dropdown.Toggle variant={buttonVariant}>
                My stop: <br />
                {myStop.name} {myStop.gtfsId}
              </Dropdown.Toggle>
              {myStop && (
                <Dropdown.Menu>
                  {stopsInOrder.map((stop, i) => (
                    <Dropdown.Item
                      id='dropdown-chooseStop'
                      key={i}
                      onClick={() => handleChooseStop(stop.gtfsId)}
                    >
                      {stop.name} {stop.gtfsId}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              )}
            </Dropdown>
          ) : (
            <Button variant={buttonVariant}>
              {myStop.name} {myStop.gtfsId}
            </Button>
          )
        ) : (
          <Button variant={buttonVariant}>
            No tram stops available. Go to Helsinki.
          </Button>
        )}
      </Col>
    </Row> 
  )
}

export const ChooseLineButton = ({
  settings,
  myTram,
  handleChooseMyTram,
  trams,
  handleChooseLine,
}) => {
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
  /* const lineNumbersForTourists = []
    trams.forEach(tram => {
      if (!lineNumbersForTourists.includes(tram.desi)) {
        lineNumbersForTourists.push(tram.desi)
      }
    }) */
  lineNumbers.sort(sortLineNumbers)
  /*  lineNumbersForTourists.sort(sortLineNumbers) */

  return (
    <Row>
      <Col xs={12}>
        {!settings.alarm ? (
          <Dropdown>
            <Dropdown.Toggle
              variant={!settings.line ? 'outline-danger' : buttonVariant}
              id='dropdown-basic'
            >
              {settings.line !== '' ? 'Line: ' + settings.line : 'Choose line'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {myTram && (
                <Dropdown.Item onClick={() => handleChooseMyTram('reset')}>
                  reset
                </Dropdown.Item>
              )}
              {lineNumbers.map((line, i) => (
                <Dropdown.Item key={i} onClick={() => handleChooseLine(line)}>
                  {line}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button variant={buttonVariant}>Line: {settings.line}</Button>
        )}
      </Col>
    </Row>
  )
}

export const ChooseTramButton = ({
  settings,
  myTram,
  handleChooseMyTram,
  trams,
}) => {
  const tramsInOrder = [...trams].filter(tram =>
    settings.possibleRoutes.includes(tram.route)
  )
  tramsInOrder.sort(sortByVehicleNumbers)

  return (
    <Row>
      <Col xs={12}>
        {!settings.alarm ? (
          <Dropdown>
            <Dropdown.Toggle
              variant={
                settings.line && !myTram ? 'outline-danger' : buttonVariant
              }
              id='dropdown-basic'
            >
              {myTram ? 'Vehicle: ' + myTram.veh : 'Choose vehicle'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {myTram && (
                <Dropdown.Item onClick={() => handleChooseMyTram('reset')}>
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
  )
}

export const ShowLineButton = ({ settings, handleShowLine, trams }) => {

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
  return (
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
              <Dropdown.Item key={i} onClick={() => handleShowLine(line)}>
                {line}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  )
}
