import React from 'react'
import '../../style/colorKit.css'
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import { EngineeringRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../context';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import PermMediaRoundedIcon from '@mui/icons-material/PermMediaRounded';
import logo2 from './logo2.png'


export default function BarSide() {
  const { login } = useStateContext()


  return (
    <>
      {login === 2 &&
        <div className='border-l-slate-600 border-l text-xs 2xl:text-base min-h-screen fixed hidden md:block text-white w-[20%] login2'>
          <div className=' text-center h-[70px] border-b border-b-slate-600 '>
            <Button>
              <img src={logo2} alt='person' className=' rounded-full w-14' />
            </Button>
          </div>
          <div className=' px-4 hidden md:block '>
            <ul className='px-2'>
              <p className='title text-cyan-400 mt-6  text-sm 2xl:text-lg'>MAIN</p>
              <Link to='/'  >
                <li className='ps-1 xl:ps-3 2xl:mb-12 cursor-pointer mt-2 hover:text-yellow-500'>
                  <DashboardCustomizeRoundedIcon />
                  <span className='mt-1 mx-2 text-sm 2xl:text-lg' >דף הבית</span>
                </li>
              </Link>
              <p className='title text-cyan-400 mt-4 2xl:mt-6 text-sm'>LIST</p>
              <Link to='/users'>
                <li className='ps-1 xl:ps-3 cursor-pointer mt-2 hover:text-yellow-500'>
                  <PeopleAltIcon />
                  <span className='mt-1 mx-2 text-sm 2xl:text-lg'>
                    לקוחות
                  </span>
                </li>
              </Link>
              <Link to='/projects'>
                <li className='ps-1 xl:ps-3 mt-3  cursor-pointer hover:text-yellow-500'>
                  <AccountTreeIcon />
                  <span className='mt-1 mx-2 text-sm 2xl:text-lg'>
                    פרוייקטים
                  </span>
                </li>
              </Link>
              <Link to='/missions'>
                <li className='ps-1 xl:ps-3 mt-3  cursor-pointer hover:text-yellow-500'>
                  <ChecklistRtlIcon />
                  <span className='mt-1 mx-2 text-sm 2xl:text-lg'>
                    משימות
                  </span>
                </li>
              </Link>
              <Link to='/listOfAll'>
                <li className='ps-1 xl:ps-3 mt-3  cursor-pointer hover:text-yellow-500'>
                  <PermMediaRoundedIcon />
                  <span className='mt-1 mx-2 text-sm 2xl:text-lg'>
                    קבצים ומסמכים
                  </span>
                </li>
              </Link>
              <Link to='/contractors'>
                <li className='ps-1 xl:ps-3 2xl:mb-12 mb:2 mt-3 cursor-pointer hover:text-yellow-500'><EngineeringRounded />
                  <span className='mt-1 mx-2 text-sm 2xl:text-lg'>קבלנים</span>
                </li>
              </Link>
              <p className='title text-cyan-400 2xl:mt-6 mt-4 text-sm'>SERVICE</p>

              <Link to='userProfile'>
                <li className='ps-1 xl:ps-3 mt-2 cursor-pointer hover:text-yellow-500'><AssignmentIndIcon />
                  <span className='mt-1 mx-2 text-sm 2xl:text-lg'>פרופיל</span>
                </li>
              </Link>
              <Link to='/'>
                <li className='ps-1 xl:ps-3 mt-3 cursor-pointer hover:text-yellow-500'><LogoutIcon />
                  <span className='mt-1 mx-2  text-sm 2xl:text-lg' onClick={() => {
                    localStorage.token = ''
                    window.location.reload()
                  }}>יציאה</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      }
      {/* Customer */}
      {login === 3 &&
        <div className='border-l-slate-600 border-l  min-h-screen fixed hidden md:block text-white w-[20%] login3 '>
          <div className=' text-center h-[70px] border-b border-b-slate-600'>
            <Button>
              <img src={logo2} alt='person' className=' rounded-full w-14' />
            </Button>
          </div>
      
          <div className=' px-4 hidden md:block '>
            <ul className='px-2'>
              <p className='title text-cyan-400  mt-6  text-sm 2xl:text-lg'>MAIN</p>
              <Link to='/'  >
                <li className='ps-1 xl:ps-3 mb-12 cursor-pointer mt-3 hover:text-yellow-500'>
                  <DashboardCustomizeRoundedIcon />
                  <span className='mt-1 mx-2' >דף הבית</span>
                </li>
              </Link>
              <p className='title text-cyan-400 mt-6'>LIST</p>
              <Link to='/contractors'>
                <li className='ps-1 mb-12 mt-3 cursor-pointer hover:text-yellow-500'><EngineeringRounded />
                  <span className='mt-1 mx-2'>קבלנים</span>
                </li>
              </Link>
              <p className='title text-cyan-400 mt-6'>SERVICE</p>

              <Link to='userProfile'>
                <li className='ps-1 mt-3 cursor-pointer hover:text-yellow-500'><AssignmentIndIcon />
                  <span className='mt-1 mx-2'>פרופיל</span>
                </li>
              </Link>
              <Link to='/'>
                <li className='ps-1 mt-3 cursor-pointer hover:text-yellow-500'><LogoutIcon />
                  <span className='mt-1 mx-2 ' onClick={() => {
                    localStorage.token = ''
                    window.location.reload()
                  }}>יציאה</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      }
    </>
  )
}
