import React from 'react'

export const SoundEffect = props => {
  props.horn.src = props.audioUrl
  if (props.play) {
    props.horn.play()
    props.init()
  }
  return <div></div>
}
