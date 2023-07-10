import React, { useState } from 'react'
import './homePage.css'
import { VscChromeClose, VscThreeBars } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import logo3 from '../../components/barside/logo3.png'



export default function AppBar() {
  const [nav, setNav] = useState(false)
  const hendleNav = () => {
    setNav(!nav)
  }

  const [color, setColor] = useState(false)
  const changeColor = () => {
    if (window.scrollY >= 75) {
      setColor(true)
    } else {
      setColor(false)
    }

  }


  window.addEventListener('scroll', changeColor)


  return (  
      <div className={color ? ' sticky top-0 z-10 bg-slate-800 bg-opacity-90 ease-in-out duration-1000' : ''}>
        <div className='bar flex justify-between items-center px-4 mx-auto  h-24 '>        
          <ul className={color ? 'text-white md:flex hidden text-xl':'hidden md:flex text-black text-xl'}>
            <li className='p-4'><Link to='/login' className='bg-yellow-600 text-black font-bold mx-auto rounded-md h-3 p-2 hover:text-black'>כניסה</Link></li>
            <li className='p-4'><button ><a className=' hover:text-yellow-600  underline underline-offset-8 ' href='#home'>בית</a></button></li>
            <li className='p-4'><button><a className=' hover:text-yellow-600 underline underline-offset-8' href='#about'>עלינו</a></button></li>
            <li className='p-4'><button><a className=' hover:text-yellow-600 underline underline-offset-8' href='#our'>עבודות שלנו</a></button></li>
            <li className='p-4'><button><a className=' hover:text-yellow-600 underline underline-offset-8' href='#contact'>צור קשר</a></button></li>
          </ul>
          <Button className='text-center'>
            <img src={logo3} alt='logo' className='md:w-12 w-10 mt-2 md:mt-0 rounded-full' />
          </Button>
          <div onClick={hendleNav} className='block md:hidden text-black md:text-white'>
            {nav ? <VscChromeClose size={30} /> : <VscThreeBars size={30} />}
          </div>
          <div className={nav ? ' fixed right-0 top-0 h-full w-[50%] border-r border-r-gray-900 bg-gray-900  bg-opacity-95 ease-in-out duration-1000 ' : 'fixed right-[-100%] ease-out duration-500'}>
            <div className=' mt-4 mr-5 '>
              <Button>
                <img src={logo3} alt='logo' className='w-10 rounded-full' />
              </Button>
            </div>
            <ul className='mt-4 p-4 uppercase text-white text-center '>
              <li className='p-2  mb-4 border-gray-500 border-x-2 bg-gray-900  rounded-md'> <a className=' hover:text-yellow-600 ' href='home'  >בית</a></li>
              <li className='p-2  mb-4 border-gray-500 border-x-2 bg-gray-900  rounded-md '> <a className=' hover:text-yellow-600 ' href='#about'>עלינו</a></li>
              <li className='p-2  mb-4 border-gray-500  border-x-2 bg-gray-900  rounded-md'> <a className=' hover:text-yellow-600 ' href='#our'>עבודות שלנו</a></li>
              <li className='p-2  mb-4 border-gray-500  border-x-2 bg-gray-900 text-sm  rounded-md'> <a className=' hover:text-yellow-600 ' href='#contact'>צרו קשר</a></li>
              <li className='p-2 border-gray-500  border-x-2 bg-gray-900  rounded-md'> <Link className='bg-yellow-600  text-black font-bold mx-auto rounded-md h-3 p-2' to='/login'>כניסה</Link></li>
            </ul>
          </div>
        </div>
      </div>
)
}