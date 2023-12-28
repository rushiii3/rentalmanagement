import React from 'react';
import PersonalInfo from '../Steps/PersonalInfo';
import { motion as m } from 'framer-motion';
import Media from '../Steps/Media';
import ThankyouPage from '../Steps/ThankyouPage';
import Details from '../Steps/Details';
import Location from '../Steps/Location';

const Form = ({ step, next, prev, goto }) => {
  const btnVariants = {
    hover: {
      scale: [null, 1.1, 1.05],
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
    },
  };
  
  return (
    <div className='flex flex-col justify-between  p-4'>
      {step === 0 && <PersonalInfo />}
      {step === 1 && <Location />}
      {step === 2 && <Details />}
      {step === 3 && <Media />}
      <m.div
        className='flex gap-5 justify-end transform -translate-y-10 lg:transform-none '
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {step !== 0 && step !== 4 && (
          <m.button
          className="py-2.5 px-6 rounded-lg text-sm font-medium bg-teal-200 text-teal-800" 
            type='button'
            variants={btnVariants}
            whileHover='hover'
            whileTap='tap'
            onClick={prev}
          >
            Go Back
          </m.button>
        )}
      {step === 4 && <ThankyouPage goto={goto} />}
        {/* {step === 0 && <div></div>} */}
        {step !== 4 && (
          
          <m.button
          className='py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-teal-600'
          
            type='submit'
            variants={btnVariants}
            whileHover='hover'
            whileTap='tap'
            onClick={next}
          >
            {step === 3 ? 'Confirm' : 'Next Step'}
          </m.button>
        )}
      </m.div>
    </div>
  );
};

export default Form;
