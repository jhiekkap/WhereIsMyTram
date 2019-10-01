import L from 'leaflet'
import "leaflet/dist/leaflet.css";
 
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../img/iconfinder_Ball Green_34555.png'),
  iconUrl: require('../img/iconfinder_Ball Green_34555.png'),
  shadowUrl: require('../../node_modules/leaflet/dist/images/marker-shadow.png'),
  iconSize: [40, 40],
})


export const stopIcon = zoom => new L.Icon({
  iconUrl: require('../img/iconfinder_Ball Green_34555.png'),
  iconRetinaUrl: require('../img/iconfinder_Ball Green_34555.png'), 
  iconSize: [Math.round(40 - (19 - zoom) * 6), Math.round(40 - (19 - zoom) * 6)], 
})

export const myStopIcon = zoom => new L.Icon({
  iconUrl: require('../img/iconfinder_Circle_Red_34214.png'),
  iconRetinaUrl: require('../img/iconfinder_Circle_Red_34214.png'),
  iconSize: [Math.round(50 - (19 - zoom) * 6), Math.round(50 - (19 - zoom) * 6)],
})

export const lineStopIcon = zoom => new L.Icon({
  iconUrl: require('../img/iconfinder_Ball Green_34555.png'),
  iconRetinaUrl: require('../img/iconfinder_Ball Green_34555.png'),
  iconSize: [Math.round(50 - (19 - zoom) * 6), Math.round(50 - (19 - zoom) * 6)],
})

export const tramIcon = (zoom, line) => new L.Icon({
  iconUrl: require(`../img/trams/${line}tram.png`),
  iconRetinaUrl: require(`../img/trams/${line}tram.png`),
  iconSize: [Math.round(60 - (19 - zoom) * 4), Math.round(50 - (19 - zoom) * 4)],
})


export const myTramIcon = (zoom, line) => new L.Icon({
  iconUrl: require(`../img/trams/${line}tram.png`),
  iconRetinaUrl: require(`../img/trams/${line}tram.png`),
  iconSize: [Math.round(80 - (19 - zoom) * 4), Math.round(70 - (19 - zoom) * 4)],
})

export const busIcon = (zoom) => new L.Icon({
  iconUrl: require(`../img/icons8-bus-64.png`),
  iconRetinaUrl: require(`../img/icons8-bus-64.png`),
  iconSize: [Math.round(60 - (19 - zoom) * 4), Math.round(50 - (19 - zoom) * 4)],
})

export const trainIcon = (zoom) => new L.Icon({
  iconUrl: require(`../img/icons8-train-40.png`),
  iconRetinaUrl: require(`../img/icons8-train-40.png`),
  iconSize: [Math.round(60 - (19 - zoom) * 4), Math.round(50 - (19 - zoom) * 4)],
})

 
const driverIcon = zoom => new L.Icon({
  iconUrl: require('../img/icons8-policeman-female-48.png'),
  iconRetinaUrl: require('../img/icons8-policeman-female-48.png'),
  iconSize: [Math.round(70 - (19 - zoom) * 8), Math.round(70 - (19 - zoom) * 8)],
})

  
export default driverIcon