import Tick from '../../../../../Assets/svg/icon-thank-you.svg';
import { useEffect } from 'react'
import { motion as m } from 'framer-motion'

export default function ThankyouPage({ goto }) {
  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  }
  useEffect(() => {
    console.log('Form submitted!')
    setTimeout(() => {
      goto(0)
    }, 2000);
  }, [goto])

  return (
    <m.div 
    className="w-full p-4 flex items-center justify-center flex-col rounded-xl shadow-2xl lg:shadow-none text-left bg-white  transform -translate-y-10 max-w-full overflow-hidden md:p-8 md:mt-0 md:text-left  lg:transform-none md:max-w-full md:w-full"
    variants={container}
      initial='hidden'
      animate='show'
    >
      <img src={Tick} alt="tick mark" className='w-12 h-12 md:w-24 md:h-24' />
      <h1 className='my-4 md:my-6 text-2xl md:text-4xl'>Thank you!</h1>
      <p className='text-cool-gray text-center max-w-xl'>
        Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
      </p>

      
    </m.div>
  )
}
