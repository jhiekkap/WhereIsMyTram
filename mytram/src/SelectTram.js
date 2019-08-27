import React from 'react'
import { subscribe } from 'mqtt-react'

const SelectTram = props => {
  const { trams, setTrams, showTram, setShowTram } = props

  const handleChooseTram = e => {
    console.log('TRAM CHOSEN: ', e.target.value)
    console.log('TRAMS: ', trams)
    let chosenTram = trams.find(tram => tram.veh == e.target.value)
    console.log('chosen Tram:', chosenTram)
    setShowTram(chosenTram)
  }

  let newData = props.data[0]

  if (newData) {
    let VP = newData.VP
    //console.log(new Date())
    if (!trams.map(tram => tram.veh).includes(VP.veh)) {
      //console.log(new Date(), 'trams: ', trams.length)
      setTrams(
        trams.concat({
          linja: VP.desi,
          veh: VP.veh,
          lat: VP.lat,
          long: VP.long,
        })
      )
    } /* else {
      //console.log('hep', new Date())
       let newTrams =  
        trams.map(tram => tram.veh === VP.veh ? {
          linja: VP.desi,
          veh: VP.veh,
          lat: VP.lat,
          long: VP.long,
        }: tram) 
        //console.log(newTrams)
        setTrams(newTrams) 
    }  */
  }
  if (newData && (showTram.veh === newData.VP.veh)) {
    let VP = newData.VP
    setShowTram({
      linja: VP.desi,
      veh: VP.veh,
      lat: VP.lat,
      long: VP.long,
    })
  }

  return (
    <div>
      <p>valitse ratikka:</p>
      <select onChange={handleChooseTram}>
        {trams.map((tram, i) => (
          <option key={i} value={tram.veh}>
            linja: {tram.linja} veh: {tram.veh}
          </option>
        ))}
      </select>
    </div>
  )
}

export default subscribe({
  topic: '/hfp/v2/journey/ongoing/vp/tram/#',
})(SelectTram)
