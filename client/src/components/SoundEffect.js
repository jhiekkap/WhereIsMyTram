import React from 'react'

export const SoundEffect = props => {
  var horn = new Audio(props.audioUrl)
  if (props.play) {
    horn.play()
  }
  return <div></div>
}
