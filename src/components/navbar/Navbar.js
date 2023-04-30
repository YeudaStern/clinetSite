import * as React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { pink } from '@mui/material/colors';


export default function NavBar() {

  function notificationsLabel(count) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }

  function SwipeableTemporaryDrawer() {
    const [state, setState] = React.useState({
      left: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {[<div className='item'>
            <LanguageIcon className='icon' />
            English
          </div>,
          <div className='item'>
            <DarkModeOutlinedIcon className='icon' />
          </div>,
          <div className='item'>
            <FullscreenExitOutlinedIcon className='icon' />
          </div>,
          <div className='item'>
            <NotificationsOutlinedIcon className='icon' />
            <div className='counter'>1</div>
          </div>,
          <p className='title '>MAIN</p>,
          <li><DashboardCustomizeRoundedIcon className='icon' />
            <span>Dashboard</span>
          </li>,
          <p className='title'>LIST</p>,
          <li><PeopleAltIcon className='icon' />
            <span>Users</span>
          </li>,
          <li><AccountTreeIcon className='icon' />
            <span>Projects</span>
          </li>,
          <p className='title'>SERVICE</p>,
          <li><ConnectWithoutContactIcon className='icon' />
            <span>Contact us</span>
          </li>,
          <li><AssignmentIndIcon className='icon' />
            <span>Profile</span>
          </li>,
          <li><LogoutIcon className='icon' />
            <span>Logout</span>
          </li>,
          <p className='title'>SETINGS</p>
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[<div className='item'>
            <ChatBubbleOutlineOutlinedIcon className='icon' />
            <div className='counter'>2</div>
          </div>,].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  
    
  


  return (
    <>
    <div>
    {['left'].map((anchor) => (
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}>
          {<div className='md:hidden'>
            <ListOutlinedIcon className='icon text-sky-800' />
          </div>}
        </Button>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </SwipeableDrawer>
      </React.Fragment>
    ))}
  </div>
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
          <div className='item blo m-2 cursor-pointer '>
            <ListOutlinedIcon className='icon' />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
}

 