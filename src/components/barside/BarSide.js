import React from 'react'
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import { EngineeringRounded } from '@mui/icons-material';
import { ThemeProvider, useTheme } from '@mui/private-theming';
import { Box, createTheme } from '@mui/system';
import { Button, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

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
        p: 1,
      }}
    >
      <IconButton  onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      {theme.palette.mode} mode
    </Box>
  );
}

export default function BarSide() {

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
  return (
    <div className='border-2 border-e-slate-950 min-h-screen hidden md:block'>
    <div className='m-1  text-center'>
      <Button>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-OhVu04vi5MILVrHMKjFHz68ULPUqfuE-g&usqp=CAU' alt='person' className=' rounded-full w-9' />
      </Button>
      </div>
      <hr />
      <div className=' px-4 hidden md:block '>
        <ul className='px-2'>
          <p className='title text-gray-400 mt-6 '>MAIN</p>
          <Link to='/'  >
            <li className='ps-1 mb-12 cursor-pointer mt-3'>
              <DashboardCustomizeRoundedIcon />
              <span className='mt-1 mx-2' >Dashboard</span>
            </li>
          </Link>
          <p className='title text-gray-400 mt-6'>LIST</p>
          <Link to='/users'>
            <li className='ps-1 cursor-pointer mt-3'>
              <PeopleAltIcon />
              <span className='mt-1 mx-2'>
                Users
              </span>
            </li>
          </Link>
          <Link to='/projects'>
            <li className='ps-1 mt-3  cursor-pointer'>
              <AccountTreeIcon />
              <span className='mt-1 mx-2'>
                Projects
              </span>
            </li>
          </Link>
          <Link to='...'>
            <li className='ps-1 mb-12 mt-3 cursor-pointer'><EngineeringRounded />
              <span className='mt-1 mx-2'>Constructor</span>
            </li>
          </Link>
          <p className='title text-gray-400 mt-6'>SERVICE</p>
          <Link to='...'>
            <li className='ps-1 mt-3 cursor-pointer'><ConnectWithoutContactIcon />
              <span className='mt-1 mx-2'>Contact us</span>
            </li>
          </Link>
          <Link to='...'>
            <li className='ps-1 mt-3 cursor-pointer'><AssignmentIndIcon />
              <span className='mt-1 mx-2'>Profile</span>
            </li>
          </Link>
          <Link to='...'>
            <li className='ps-1 mt-3 cursor-pointer'><LogoutIcon />
              <span className='mt-1 mx-2 '>Logout</span>
            </li>
          </Link>
          <Link to='/login'>
            <li className='ps-1 mb-12 mt-3 cursor-pointer'> <LoginIcon />
              <span className='mt-1 mx-2 '>Login</span>
            </li>
          </Link>
          <p className='title text-gray-400 mt-6'>MODE</p>
        </ul>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <MyApp />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </div>

      

    </div>

  )
}