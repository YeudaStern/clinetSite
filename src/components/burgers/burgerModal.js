import * as React from 'react';
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
import {Clear, EngineeringRounded, Login } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import { Badge, IconButton } from '@mui/material';
import { pink } from '@mui/material/colors';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, useTheme } from '@mui/private-theming';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { createTheme } from '@mui/system';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}



export default function BurgerModal() {

  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    marginLeft: 4,
    marginRight: 5,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    cursor: 'pointer',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  function notificationsLabel(count) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }

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
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 190 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
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

        <ul className='px-2 mb-2'>
          <li className='px-3 mb-2 rounded-full cursor-pointer'>
            <Login className=' mx-1' style={{ color: '#1976d2' }} />
            <Link to="login" className='icon'>LOG IN</Link>
          </li>
          <li className='px-3 rounded-full cursor-pointer'>
            <LanguageIcon className='icon mx-1 ' color="primary" />
            English
          </li>

        </ul>
      </List>
      <Divider />
      <List>
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
        <div>
          <p className='px-2 text-gray-400 mb-1'>MASSAGE</p>
          <IconButton className='mx-3' aria-label={notificationsLabel(100)}>
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
        <ul className='px-2'>
          <p className='title text-gray-400 mt-6 '>MAIN</p>
          <li className='px-3 mb-12 rounded-full cursor-pointer'><DashboardCustomizeRoundedIcon className='icon bg-lime-500 rounded-full p-1' />
            <span className='mt-1 mx-2'>Dashboard</span>
          </li>
          <p className='title text-gray-400 mt-6'>LIST</p>
          <li className='px-3   rounded-full cursor-pointer'><PeopleAltIcon className='icon  bg-pink-200 rounded-full p-1' />
            <span className='mt-1 mx-2'>Users</span>
          </li>
          <li className='px-3 mt-3 rounded-full cursor-pointer'><AccountTreeIcon className='icon  bg-orange-200 rounded-full p-1' />
            <span className='mt-1 mx-2'>Projects</span>
          </li>
          <li className='px-3 mb-12 mt-3 rounded-full cursor-pointer'><EngineeringRounded className='icon  bg-green-200 rounded-full p-1' />
            <span className='mt-1 mx-2'>Constructor</span>
          </li>
          <p className='title text-gray-400 mt-6'>SERVICE</p>
          <li className='px-3 mt-3 rounded-full cursor-pointer'><ConnectWithoutContactIcon className='icon bg-orange-200 rounded-full p-1' />
            <span className='mt-1 mx-2'>Contact us</span>
          </li>
          <li className='px-3 mt-3 rounded-full cursor-pointer'><AssignmentIndIcon className='icon bg-lime-200 rounded-full p-1' />
            <span className='mt-1 mx-2'>Profile</span>
          </li>
          <li className='px-3 mb-12 mt-3 rounded-full cursor-pointer'><LogoutIcon className='icon bg-cyan-200 rounded-full p-1' />
            <span className='mt-1 mx-2 '>Logout</span>
          </li>
          <p className='title text-gray-400 mt-6'>DARK MODE</p>
        </ul>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <MyApp />
          </ThemeProvider>
        </ColorModeContext.Provider>

      </List>
    </Box>
  );

  return (
    <div className='flex justify-between'>


      <Box sx={{ flexGrow: 1 }}>
        <div className='bg-gray-200 ' position="static">
          <Toolbar>
            <div>
              {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button onClick={toggleDrawer(anchor, true)}>
                    <MenuIcon fontSize='large' className='text-black' />
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

            <Search>
              <SearchIconWrapper >
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { sm: 'block' }, margin: '9px', color: 'grey' }}
            >
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-OhVu04vi5MILVrHMKjFHz68ULPUqfuE-g&usqp=CAU' alt='person' className='w-9 rounded-full' />
            </Typography>
          </Toolbar>
        </div>
      </Box>

    </div>
  );
}