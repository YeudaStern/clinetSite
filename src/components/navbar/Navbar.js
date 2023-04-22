import React from 'react'
import "./navbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

export default function NavBar() {
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input type='text' placeholder='search...' />
          <SearchIcon />
        </div>
        <div className='items'>
          <div className='item'>
            <LanguageIcon className='icon'/>
            English
          </div>
          <div className='item'>
            <DarkModeOutlinedIcon className='icon'/>
          </div>
          <div className='item'>
            <FullscreenExitOutlinedIcon className='icon'/>
          </div>
          <div className='item'>
            <NotificationsOutlinedIcon className='icon'/>
            <div className='counter'>1</div>
          </div>
          <div className='item'>
            <ChatBubbleOutlineOutlinedIcon className='icon'/>
            <div className='counter'>2</div>
          </div>
          <div className='item'>
            <ListOutlinedIcon className='icon'/>
          </div>
          <div className='item'>
           <img src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='person' className='avatar'/>
          </div>
        </div>
      </div> 
    </div>
  )
}
