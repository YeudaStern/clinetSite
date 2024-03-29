import * as React from 'react';
import '../../style/colorKit.css'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Clear, EngineeringRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MenuIcon from '@mui/icons-material/Menu';
import { useStateContext } from '../../context';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import logo2 from './../barside/logo2.png'
import BarNav from '../navbar/BarNav';


export default function BurgerModal() {

  const { login } = useStateContext()

  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <>
      {login === 2 &&
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 190 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List className='login2 text-white'>
            {[""].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <Clear className='mb-2'>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </Clear>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List className='login2 text-white min-h-screen'>
            {[].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ul className='px-2'>
              <p className='title text-cyan-400 mt-6  '>MAIN</p>
              <Link to='/'>
                <li className='ps-3 mb-12 cursor-pointer hover:text-yellow-500'><DashboardCustomizeRoundedIcon />
                  <span className='mt-1 mx-2'>דף הבית</span>
                </li>
              </Link>
              <p className='title  text-cyan-400 mt-6'>LIST</p>
              <Link to='/users'>
                <li className='ps-3 cursor-pointer hover:text-yellow-500'><PeopleAltIcon />
                  <span className='mt-1 mx-2'>משתמשים</span>
                </li>
              </Link>
              <Link to='/projects'>
                <li className='px-3 mt-3 cursor-pointer hover:text-yellow-500'><AccountTreeIcon />
                  <span className='mt-1 mx-2'>פרוייקטים</span>
                </li>
              </Link>
              <Link to='/missions'>
                <li className='px-3 mt-3 cursor-pointer hover:text-yellow-500'><ChecklistRtlIcon />
                  <span className='mt-1 mx-2'>משימות</span>
                </li>
              </Link>
              <Link to='/contractors'>
                <li className='px-3 mb-12 mt-3 cursor-pointer hover:text-yellow-500'><EngineeringRounded />
                  <span className='mt-1 mx-2'>קבלנים</span>
                </li>
              </Link>
              <p className='title  text-cyan-400 mt-6'>SERVICE</p>
              <li className='px-3 mt-3 cursor-pointer hover:text-yellow-500'><ConnectWithoutContactIcon />
                <span className='mt-1 mx-2'>צור קשר</span>
              </li>
              <Link to='userProfile'>
                <li className='px-3 mt-3 cursor-pointer hover:text-yellow-500'><AssignmentIndIcon />
                  <span className='mt-1 mx-2'>פרופיל</span>
                </li>
              </Link>
              <Link to='/'>
                <li className='px-3 mt-3 cursor-pointer hover:text-yellow-500'><LogoutIcon />
                  <span className='mt-1 mx-2 ' onClick={() => {
                    localStorage.token = ''
                    window.location.reload()
                  }}>יציאה</span>
                </li>
              </Link>
            
            </ul>
          </List>
        </Box>
      }
      {login === 3 &&
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 190 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List className=' text-white login3'>
            {[""].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <Clear className='mb-2'>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </Clear>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List className='text-white min-h-screen login3'>
            {[].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ul className='px-2'>
              <p className='title text-cyan-400 mt-6  text-sm 2xl:text-lg'>MAIN</p>
              <Link to='/'>
                <li className='px-3 mb-12 cursor-pointer hover:text-yellow-500'><DashboardCustomizeRoundedIcon />
                  <span className='mt-1 mx-2'>דף הבית</span>
                </li>
              </Link>
              <p className='title text-gray-300 mt-6'>LIST</p>
              <Link to='/contractors'>
                <li className='px-3 mb-12 mt-3 cursor-pointer hover:text-yellow-500'><EngineeringRounded />
                  <span className='mt-1 mx-2'>קבלנים</span>
                </li>
              </Link>
              <p className='title text-gray-300 mt-6'>SERVICE</p>
              <Link to='userProfile'>
                <li className='px-3 mt-3 cursor-pointer hover:text-yellow-500'><AssignmentIndIcon />
                  <span className='mt-1 mx-2'>פרופיל</span>
                </li>
              </Link>
              <Link to='/'>
                <li className='px-3 mt-3 cursor-pointer hover:text-yellow-500'><LogoutIcon />
                  <span className='mt-1 mx-2 ' onClick={() => {
                    localStorage.token = ''
                    window.location.reload()
                  }}>יציאה</span>
                </li>
              </Link>
             
            </ul>
          </List>
        </Box>
      }
    </>
  );

  return (
    <div >
      <Box sx={{ flexGrow: 1 }}>
        {login === 2 &&
          <div className=' flex justify-between w-full login2' position="static">
            <div>
              {['right'].map((anchor) => (
                <React.Fragment key={anchor} >
                  <Button onClick={toggleDrawer(anchor, true)}>
                    <MenuIcon fontSize='large' className='text-white pt-1' />
                  </Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
            <Button>
              <img src={logo2} alt='person' className=' rounded-full w-10' />
            </Button>
          
          </div>
        }
        {login === 3 &&
          <div className=' flex justify-between w-full login3' position="static">
            <div>
              {['right'].map((anchor) => (
                <React.Fragment key={anchor} >
                  <Button onClick={toggleDrawer(anchor, true)}>
                    <MenuIcon fontSize='large' className='text-white' />
                  </Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
            <Button>
              <img src={logo2} alt='person' className=' rounded-full w-10' />
            </Button>
          </div>
        }
      </Box>
    </div>
  );
}
