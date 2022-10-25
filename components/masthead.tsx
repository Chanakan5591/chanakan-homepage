import React from 'react'
import Image from 'next/image'
import styles from '../styles/MastHead.module.css'
import Chanakan from '../public/images/chanakan.jpg'

const MastHead: React.FC = () => {
  return (
    <section className={`min-h-screen flex flex-col items-center justify-center ${styles.mastheadsection}`}>
      <div className={`pl-10 pr-10 pt-10 backdrop-blur shadow-[0_40px_40px_rgba(0,0,0,0.25)] rounded-3xl ${styles.mastheadcard}`}>
        <div className='rounded-full items-center justify-center flex flex-col '>
          <Image
            width="150"
            height="160"
            layout='fixed'
            placeholder='blur'
            priority={true}
            className='rounded-full border-solid border-4'
            src={Chanakan}
            alt='Profile Image' />
        </div>
        <div className={`p-12 -mt-7 font-bold text-black text-center ${styles.head}`}>
          <h1 className={`mb-2 text-white text-2xl ${styles.image}`}>Chanakan Mungtin</h1>
          <h2>
            <span className='text-white'>Passionate Developer / Photographer</span>
          </h2>
        </div>
      </div>
    </section >
  )
}

export default MastHead
