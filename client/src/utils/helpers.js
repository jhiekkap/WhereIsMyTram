const distance = (lat1, lon1, lat2, lon2) => {
  var R = 6371 // km (change this constant to get miles)
  var dLat = ((lat2 - lat1) * Math.PI) / 180
  var dLon = ((lon2 - lon1) * Math.PI) / 180
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * 
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  /* if (d>1) return d.toFixed(2) +"km";
	else if (d<=1) return Math.round(d*1000)+"m"; */
  return Math.round(d*1000)
}

export const sortByVehicleNumbers = (a, b) => { 
  return parseInt(a.VP.veh) < parseInt(b.VP.veh)
    ? -1
    : parseInt(a.VP.veh) > parseInt(b.VP.veh)
    ? 1
    : 0
}

export const sortLineNumbers = (a, b) => {
    return parseInt(a) < parseInt(b) ? -1 : parseInt(a) > parseInt(b) ? 1 : 0
  }

  export const sortStopNames = (a, b) => {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  }

  export const printDuration = (seconds) => { 
  let min = ''
  if(seconds > 59){
    min = `${Math.floor(seconds/ 60)} min`
  } 
  return seconds < 10000 && (
     min + `${(seconds % 60).toFixed(0)} sec`
  )
}

export const sortEverything = (trams, stops) => {
  const tramsInOrder = [...trams]
  tramsInOrder.sort(sortByVehicleNumbers)

  const lineNumbers = []
  trams.forEach(tram => {
    if (!lineNumbers.includes(tram.VP.desi)) {
      lineNumbers.push(tram.VP.desi)
    }
  })
  lineNumbers.sort(sortLineNumbers)

  const stopsInOrder = [...stops]
  stopsInOrder.sort(sortStopNames)

  return [tramsInOrder, lineNumbers, stopsInOrder] 
}

export const countDuration = (duration, durations) => {
  let avgDuration = duration
  let sum = 0
  let counter = 0
  if (durations.length > 1) {
    for (let i = durations.length - 1; i >= 0; i--) {
      sum += durations[i]
      counter++
      if (counter > 9) {
        break
      }
    }
    avgDuration = sum / counter
  }
  return avgDuration
}
 

export default distance
