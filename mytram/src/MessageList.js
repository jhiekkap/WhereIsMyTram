import React from 'react'  
import { subscribe } from 'mqtt-react' 

// Messages are passed on the "data" prop
const MessageList = (props) => {
  console.log(props.data[0]);
  return (
    <div> 
      {/* <ul>
        {props.data.map((message, i) => <li key={i}>{message}</li>)}
      </ul> */}
    </div>)
 
} 
 
export default subscribe({
  topic: '/hfp/v2/journey/ongoing/vp/tram/#'
})(MessageList)