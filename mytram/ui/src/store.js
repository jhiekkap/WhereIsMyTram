import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import tramsReducer from './reducers/tramsReducer'
import showTramsReducer from './reducers/showTramsReducer'
import showSidebarReducer from './reducers/showSidebarReducer'
import showSidebarOpenButtonReducer from './reducers/showSidebarOpenButtonReducer'
import stopsReducer from './reducers/stopsReducer' 
import myStopReducer from './reducers/myStopReducer' 

const reducer = combineReducers({
  trams: tramsReducer,
  showTrams: showTramsReducer,
  showSidebar: showSidebarReducer,
  showSidebarOpenButton: showSidebarOpenButtonReducer,
  stops: stopsReducer,
  myStop: myStopReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
