import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
//import { composeWithDevTools } from 'redux-devtools-extension'
import vehiclesReducer from './reducers/vehiclesReducer'
import showVehiclesReducer from './reducers/showVehiclesReducer'  
import stopsReducer from './reducers/stopsReducer' 
import myStopReducer from './reducers/myStopReducer'  
import myVehicleReducer from './reducers/myVehicleReducer' 
import settingsReducer from './reducers/settingsReducer'

const reducer = combineReducers({
  vehicles: vehiclesReducer,
  showVehicles: showVehiclesReducer,   
  stops: stopsReducer,
  myStop: myStopReducer,  
  myVehicle: myVehicleReducer,
  settings: settingsReducer,
})

const store = createStore(reducer, (applyMiddleware(thunk)))

export default store
