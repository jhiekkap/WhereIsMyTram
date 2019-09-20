 

import React from 'react' 
import { Provider } from 'react-redux'
import store from './store' 
import Appi from './App'

 

const App = () => {
  return (
    <Provider store={store}>
      <Appi />
    </Provider>
  ) 
}

export default App

 