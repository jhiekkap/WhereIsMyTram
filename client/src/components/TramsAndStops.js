import React from 'react'
import {
  stopIcon,
  myStopIcon,
  lineStopIcon,
  tramIcon,
  myTramIcon,
} from '../utils/icons'

import { Marker, Popup } from 'react-leaflet'
import { Button } from 'react-bootstrap'

export const LineOnMap = ({ settings, tramRoutesOnMap }) => {
  //console.log('tramRoutesOnMap', tramRoutesOnMap)
  console.log('showLine', settings.showLine)
  const coordinates = tramRoutesOnMap.find(
    route => route.shortName == settings.showLine
  ).stops
  return (
    <div>
      {coordinates.map((point, i) => (
        <Marker
          key={i}
          icon={lineStopIcon(13.5)}
          position={{ lat: point.lat, lng: point.lon }}
        ></Marker>
      ))}
    </div>
  )
}

export const Stops = ({ settings, myStop, handleSetMyStop, stops }) => {
  return (
    stops &&
    stops.map((stop, i) => (
      <Marker
        className='stops'
        onClick={() => handleSetMyStop(stop)}
        key={i}
        icon={
          stop.id === myStop.id
            ? myStopIcon(settings.zoom)
            : stopIcon(settings.zoom)
        }
        position={{ lat: stop.lat, lng: stop.lon }}
        zIndexOffset={-500}
      >
        <Popup closeButton={false} autoPan={false}>
          {stop.name}
          <br />
          {stop.gtfsId}
        </Popup>
      </Marker>
    ))
  )
}

export const ChosenTrams = ({
  settings,
  myTram,
  showTrams,
  trams,
  handleChooseTram,
  handleCancelTram,
}) => {
  const popUp = tram => {
    return (
      <Popup closeButton={false} value={tram.veh} autoPan={false}>
        vehicle: {tram.veh}
        <br />
        speed: {(tram.spd * 3.6).toFixed(2)} km/h
        <br />
        route: {tram.route}
        <br />
        {tram.dl > 0 ? 'ahead ' : 'lagging '} {Math.abs(tram.dl)} seconds
        <br />
        {(!myTram || (myTram && myTram.veh !== tram.veh)) &&
          settings.possibleRoutes.includes(tram.route) &&
          !settings.alarm && (
            <Button value={tram.veh} onClick={handleChooseTram}>
              CHOOSE
            </Button>
          )}
        {myTram && myTram.veh === tram.veh && (
          <Button value={tram.veh} onClick={handleCancelTram}>
            CANCEL
          </Button>
        )}
      </Popup>
    )
  }

  let tramsToShow = trams.filter(tram =>
    showTrams.map(tram => tram.veh).includes(tram.veh)
  )

  if (tramsToShow) {
    return tramsToShow.map((tram, i) => (
      <Marker
        className='trams'
        key={i}
        icon={
          myTram && myTram.veh === tram.veh
            ? myTramIcon(settings.zoom, tram.desi)
            : tramIcon(settings.zoom, tram.desi)
        }
        position={{
          lat: tram.lat,
          lng: tram.long,
        }}
        zIndexOffset={500}
      >
        {popUp(tram)}
      </Marker>
    ))
  }
}
