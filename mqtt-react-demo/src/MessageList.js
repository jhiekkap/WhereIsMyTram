import React from 'react';

/* export default ({data}) => {
  const dataList = data.map((d) => <li>{d}</li>)
  console.log(data);
  return (
    <div>
      <h3>Messages</h3>
      <ul>
        {dataList}
      </ul>
    </div> 
  )
} */
import { subscribe } from 'mqtt-react';

// Messages are passed on the "data" prop
const MessageList = (props) => {
  console.log(props.data);
  return (
    <div> 
      {/* <ul>
        {props.data.map((message, i) => <li key={i}>{message}</li>)}
      </ul> */}
    </div>)

}

// simple subscription to messages on the "@test/demo" topic
export default subscribe({
  topic: '/hfp/v2/journey/ongoing/vp/tram/#'
})(MessageList)