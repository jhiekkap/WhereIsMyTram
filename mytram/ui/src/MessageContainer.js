import React from 'react' 
import MessageList from './MessageList' 


const MessageContainer = (props) => {

  return (
    <div>
      <MessageList data={props.data} />
    </div>
  )

} 
export default MessageContainer
