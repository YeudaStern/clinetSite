import * as React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { pink } from '@mui/material/colors';
import BurgerModal from './components/burgerModal';
import { useWindowSize } from '../../services/hooks/screenSizeHook';


export default function NavBar() {
  const { width } = useWindowSize();


  function notificationsLabel(count) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }

  let showBurgerElement = width <= 762;

    return (
      <>
      {showBurgerElement && <BurgerModal/>}
        <div className='navbar border text-stone-600 hidden md:flex '>
          <div className='px-4 w-full flex justify-between '>
            <div className=''>
              <div className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search..." aria-label="Search" />
                <button className="btn btn-outline-primary" type="submit">Search</button>
              </div>
            </div>
            <div className=' flex'>
              <div className=' m-2'>
                <Link to="login">LOG IN</Link>
              </div>
              <div className=' m-2 cursor-pointer'>
                <LanguageIcon className='icon mx-1' />
                English
              </div>
              <div className='m-2 cursor-pointer'>
                <FullscreenExitOutlinedIcon className='icon' />
              </div>
              <IconButton aria-label={notificationsLabel(100)}>
                <Badge badgeContent={100} color="primary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton className='mx-2' aria-label={notificationsLabel(100)}>
                <Badge badgeContent={100} sx={{ color: pink[500] }} >
                  <MailIcon />
                </Badge>
              </IconButton>
            </div>
          </div>
        </div>
      </>
    )
  }


