import L from 'leaflet'
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl 
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../img/iconfinder_Ball Green_34555.png'),
  iconUrl: require('../img/iconfinder_Ball Green_34555.png'),
  shadowUrl: require('../../node_modules/leaflet/dist/images/marker-shadow.png'),
  iconSize: [40, 40],
})
 

export const stopIcon = new L.Icon({
  iconUrl: require('../img/iconfinder_Ball Green_34555.png'),
  iconRetinaUrl: require('../img/iconfinder_Ball Green_34555.png'),
  //iconAnchor: [5, 55],
  //popupAnchor: [10, -44],
  //shadowUrl: require('../../node_modules/leaflet/dist/images/marker-shadow.png'),
  iconSize: [25,25],
  //shadowSize: [68, 95],
  //shadowAnchor: [20, 92], 
})

export const myStopIcon = new L.Icon({
  iconUrl: require('../img/iconfinder_Circle_Red_34214.png'),
  iconRetinaUrl: require('../img/iconfinder_Circle_Red_34214.png'),
  /* iconAnchor: [5, 55],
  popupAnchor: [10, -44], */
  iconSize: [30, 30],
  /* shadowSize: [68, 95],
  shadowAnchor: [20, 92],  */
})

export const tramIcon = new L.Icon({
  iconUrl: require('../img/icons8-office-xs-50.png'),
  iconRetinaUrl: require('../img/icons8-office-xs-50.png'),
 /*  iconAnchor: [5, 55],
  popupAnchor: [10, -44], */
  iconSize: [40, 40],
  /* shadowSize: [68, 95],
  shadowAnchor: [20, 92],  */
}) 

export const myTramIcon = new L.Icon({
  iconUrl: require('../img/icons8-color-50.png'),
  iconRetinaUrl: require('../img/icons8-color-50.png'),
  /* iconAnchor: [5, 55],
  popupAnchor: [10, -44], */
  iconSize: [50, 50],
  /* shadowSize: [68, 95],
  shadowAnchor: [20, 92], */
  zIndex:5000 
})

const driverIcon = new L.Icon({
    iconUrl: require('../img/iconfinder_029_-_Gingerbread_Man_2793032.png'),
    iconRetinaUrl: require('../img/iconfinder_029_-_Gingerbread_Man_2793032.png'),
    /* iconAnchor: [5, 55],
    popupAnchor: [10, -44], */
    iconSize: [30, 30],
    /* shadowSize: [68, 95],
    shadowAnchor: [20, 92], */
  })

  
  
  export default driverIcon