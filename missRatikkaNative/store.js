import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
//import { composeWithDevTools } from 'redux-devtools-extension'
import tramsReducer from './reducers/tramsReducer'
import showTramsReducer from './reducers/showTramsReducer'  
import stopsReducer from './reducers/stopsReducer' 
import myStopReducer from './reducers/myStopReducer'  
import myTramReducer from './reducers/myTramReducer' 
import settingsReducer from './reducers/settingsReducer'

const reducer = combineReducers({
  trams: tramsReducer,
  showTrams: showTramsReducer,   
  stops: stopsReducer,
  myStop: myStopReducer,  
  myTram: myTramReducer,
  settings: settingsReducer,
})

const store = createStore(reducer, (applyMiddleware(thunk)))

export default store
