import React from 'react'
import Servicelogo from '../../assets/Images/Servicelogo.png';
import Trustlogo from '../../assets/Images/Trustlogo.png';
import FutureForward from '../../assets/Images/FutureForward.png';

const Foundingteam = () => {
  return (
    <div className='w-full h-full'>

        <div className='text  font-bold text-4xl p-4'>
            <h1 className='text-black ml-6 '>
                Founding Team
            </h1>
            <div className='flex justify-center gap-4 p-4 '>
                <img src={Servicelogo} alt="Service Logo" 
                 className='w-25 h-25 rounded-full '
                />
                <img src={Servicelogo} alt="Service Logo" 
                 className='w-25 h-25  rounded-full'
                />
                <img src={Servicelogo} alt="Service Logo" 
                 className='w-25 h-25 rounded-full'
                />


            </div>
        </div>



    </div>
  )
}

export default Foundingteam