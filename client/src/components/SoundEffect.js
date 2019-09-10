import React from 'react'

export const SoundEffect = ({ horn, audioUrl, play, initHorn }) => {
  console.log('ö')
  horn.src = audioUrl
  console.log('ää')
  if (play) {
    horn.play() 
    console.log('åååå')
  }
  return <div></div>
}
 