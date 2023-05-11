import React from 'react'
import './style.css'

const WatchNow = (video) => {
  return (
    <div className="player">
     <video className='video' src="../src/components/MoviePlayer/Dummy.mp4" poster="../src/components/MoviePlayer/Dummy_poster.jpg" controls></video>
   </div>
  )
}

export default WatchNow

