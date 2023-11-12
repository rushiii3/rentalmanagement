import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import animaition from '../../Assets/Animation - 1699337364171.json';

const Loader = () => {
  return (
    
<Player
    autoplay
    loop
    src={animaition}
    className='h-screen w-full'
  >
    
    {/* <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} /> */}
  </Player>

    
  )
}

export default Loader