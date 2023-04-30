import React from 'react'
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import { Brightness7Rounded, EngineeringRounded } from '@mui/icons-material';



export default function BarSide() {
  return (
    <div className=' border-2 border-e-slate-950 min-h-screen w-56 hidden md:block text-neutral-800'>
      <div className=' justify-center flex mt-1 h-12'>
        <span className='logo ' ><img src='https://www.logodesignlove.com/wp-content/uploads/2022/11/carebibi-logo-01-1200x1200.jpeg' alt='person' className='avatar rounded-full w-10' /></span>
      </div>
      <hr />
      <div className=' px-4 hidden md:block '>
        <ul className='px-2'>
          <p className='title text-gray-400 mt-6 '>MAIN</p>
          <li className='px-3 mb-12 hover:bg-sky-200 rounded-full cursor-pointer'><DashboardCustomizeRoundedIcon className='icon bg-lime-500 rounded-full p-1' />
            <span className='mt-1 mx-2'>Dashboard</span>
          </li>
          <p className='title text-gray-400 mt-6'>LIST</p>
          <li className='px-3  hover:bg-sky-200 rounded-full cursor-pointer'><PeopleAltIcon className='icon  bg-pink-200 rounded-full p-1' />
            <span className='mt-1 mx-2'>Users</span>
          </li>
          <li className='px-3 mt-3 hover:bg-sky-200 rounded-full cursor-pointer'><AccountTreeIcon className='icon  bg-orange-200 rounded-full p-1' />
            <span className='mt-1 mx-2'>Projects</span>
          </li>
          <li className='px-3 mb-12 mt-3 hover:bg-sky-200 rounded-full cursor-pointer'><EngineeringRounded className='icon  bg-green-200 rounded-full p-1' />
            <span className='mt-1 mx-2'>Constructor</span>
          </li>
          <p className='title text-gray-400 mt-6'>SERVICE</p>
          <li className='px-3 mt-3 hover:bg-sky-200 rounded-full cursor-pointer'><ConnectWithoutContactIcon className='icon bg-orange-200 rounded-full p-1' />
            <span className='mt-1 mx-2'>Contact us</span>
          </li>
          <li className='px-3 mt-3 hover:bg-sky-200 rounded-full cursor-pointer'><AssignmentIndIcon className='icon bg-lime-200 rounded-full p-1' />
            <span className='mt-1 mx-2'>Profile</span>
          </li>
          <li className='px-3 mb-12 mt-3 hover:bg-sky-200 rounded-full cursor-pointer'><LogoutIcon className='icon bg-cyan-200 rounded-full p-1' />
            <span className='mt-1 mx-2 '>Logout</span>
          </li>
          <p className='title text-gray-400 mt-6'>DARK MODE</p>
        </ul>
        <div className=' flex px-2.5 mx-4 mt-3 w-20 rounded-full border-1 drop-shadow-md border-stone-400  '>
          <div className=' p-0.5 '> <Brightness7Rounded className=' cursor-pointer text-yellow-400' /></div>
          <div className=' p-0.5'><NightlightRoundIcon className=' cursor-pointer ' />  </div>
        </div>
      </div>

    </div>

  )
}