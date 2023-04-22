import React from 'react'
import "./sidebar.scss"
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';

export default function BarSide() {
  return (
    <div className='sidebar'>
      <div className='top'>
        <span className='logo ' >M&Y logo</span>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className='title '>MAIN</p>
          <li><DashboardCustomizeRoundedIcon className='icon' />
            <span>Dashboard</span>
          </li>
          <p className='title'>LIST</p>
          <li><PeopleAltIcon className='icon' />
            <span>Users</span>
          </li>
          <li><AccountTreeIcon className='icon' />
            <span>Projects</span>
          </li>
          <p className='title'>SERVICE</p>
          <li><ConnectWithoutContactIcon className='icon' />
            <span>Contact us</span>
          </li>         
          <li><AssignmentIndIcon className='icon' />
            <span>Profile</span>
          </li>
          <li><LogoutIcon className='icon' />
            <span>Logout</span>
          </li>
          <p className='title'>SETINGS</p>
        </ul>
      </div>
      <div className='bottom'>
       <div className='colorOption'> <LightModeOutlinedIcon className='icon' /></div>
       <div className='colorOption'><NightlightRoundIcon className='icon' />  </div>
      </div>
    </div>

  )
}
//       
//        