import React, { useState } from 'react'
import Link from 'next/link'

const Navbar: React.FC = () => {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive(!active)
  }

  return (
    <nav className='flex items-center bg-black bg-opacity-30 flex-wrap p-2 z-10 fixed w-screen backdrop-blur'>
      <Link href='/'>
        <a className='inline-flex items-center p-2 mr-4'>
          <span className='text-xl text-white font-bold tracking-wide'>
            Chanakan Mungtin
          </span>
        </a>
      </Link>
      <button className='inline-flex p-3 hover:bg-cyan-400 rounded lg:hidden text-white ml-auto hover:text-white outline-none mr-4' onClick={handleClick}>
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>
      <div className={`${active ? '' : 'hidden'} w-full lg:inline-flex lg:flex-grow lg:w-auto mr-4`}>
        <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
          <Link href='/'>
            <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-purple-600 hover:text-white '>
              Home
            </a>
          </Link>
          <Link href='/works'>
            <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-violet-400 hover:text-white'>
              Works
            </a>
          </Link>
          <Link href='/'>
            <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-fuchsia-400 hover:text-white'>
              About me
            </a>
          </Link>
          <Link href='/contact-me'>
            <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-cyan-400 hover:text-white'>
              Contact me
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
