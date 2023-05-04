

import * as React from 'react';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import MailIcon from '@mui/icons-material/Mail';
// k
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import BurgerModal from "../burgers/burgerModal"
import { useWindowSize } from '../../services/hooks/screenSizeHook';


export default function BarNav() {
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

  let showBurgerElement = width <= 768;

    return (
      <>
      {showBurgerElement && <BurgerModal/>}
        <div className='navbar border text-stone-600 hidden md:flex '>
          <div className='px-4 w-full flex justify-between '>
            <div className=''>
             
            </div>
            <div className=' flex'>            
              
              
              <IconButton aria-label={notificationsLabel(100)}>
                <Badge badgeContent={100} color="primary">
                  <MailIcon />
                </Badge>
              </IconButton>            
            </div>
          </div>
        </div>
      </>
    )
  }


