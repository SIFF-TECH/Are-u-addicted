
import './DocProfile.css'
import { useState } from "react";
import { BrowserRouter, Link, Outlet, useNavigate } from "react-router-dom";



import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import QuizIcon from '@mui/icons-material/Quiz';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useSelector } from 'react-redux';
const drawerWidth = 250;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontSize: '40px'


}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center',

    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),

  }),

);



export default function Doc() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  let linksData = [];

  if (user?.isPatient) {
    linksData = [
      { label: 'My Profile', url: '/profile', icon: 'AccountCircleIcon' },
      { label: 'Message', url: '/profile/messages', icon: 'SendIcon' },
      { label: 'See Quiz', url: '/quiz', icon: 'QuizIcon' },
    ]
  }

  if (user?.isMedecin) {
    linksData = [
      { label: 'My Profile', url: '/profile', icon: 'AccountCircleIcon' },
      { label: 'Questions', url: '/profile/question', icon: 'EngineeringIcon' },
      { label: 'Conversations', url: '/profile/conversations', icon: 'SendIcon' },
    ]
  }

  if (user?.isAdmin) {
    linksData = [
      { label: 'My Profile', url: '/profile', icon: 'AccountCircleIcon' },
      { label: 'Questions', url: '/profile/question', icon: 'EngineeringIcon' },
    ]
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };




  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const linksData2 = [
    { label: 'Privecy Setting', url: '/profile/settings', icon: 'AdminPanelSettingsIcon' },
    { label: 'Log Out', url: '/link3', icon: 'LogoutIcon' },
  ];

  if (!user) {
    navigate("/sign")
  }
  return (
    <div className='Account'>


      <div className='side-dashboard'>


        <Drawer variant="permanent" open={open}  >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"

            sx={{ mr: -1, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <DrawerHeader sx={{ ...(!open && { display: "none" }) }}>

            <IconButton onClick={handleDrawerClose} sx={{ mr: 0.6 }} color='primary'>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider style={{ backgroundColor: 'grey', width: '100%', height: '1px', opacity: '0.3' }} />

          <List sx={{ backgroundColor: 'var(--backgrouncolor2)' }}>


            <ListItem disablePadding sx={{ display: 'block' }} >


              {linksData.map((chat, index) =>
                <Link key={index} to={chat.url}><ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {chat?.icon === 'AccountCircleIcon' && <AccountCircleIcon sx={{ color: 'var(--text-color-icon)'}} />}
                    {chat?.icon === 'EngineeringIcon' && <EngineeringIcon sx={{ color: 'var(--text-color-icon)'}} />}
                    {chat?.icon === 'SendIcon' && <SendIcon sx={{ color: 'var(--text-color-icon)'}} />}
                    {chat?.icon === 'QuizIcon' && <QuizIcon sx={{ color: 'var(--text-color-icon)'}} />}
                  </ListItemIcon>

                  <ListItemText primary={chat.label} sx={{ opacity: open ? 1 : 0, color: 'black' }} style={{ color: 'black' }} />

                </ListItemButton></Link>
              )}

            </ListItem>

          </List>
          <Divider style={{ backgroundColor: 'grey', width: '100%', height: '1px', opacity: '0.3' }} />
          <List style={{ color: 'black', backgroundColor: 'var(--backgrouncolor2)', height: '1000px' }}>

            <ListItem disablePadding sx={{ display: 'block' }}>

              {linksData2.map((chat, index) =>
                <Link key={index} to={chat.url}><ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {chat?.icon === 'AdminPanelSettingsIcon' && <AdminPanelSettingsIcon sx={{ color: 'var(--text-color-icon)'}} />}
                    {chat?.icon === 'LogoutIcon' && <LogoutIcon sx={{ color: 'var(--text-color-icon)'}} />}
                  </ListItemIcon>

                  <ListItemText primary={chat.label} sx={{ opacity: open ? 1 : 0, color: 'black' }} style={{ color: 'black' }} />

                </ListItemButton></Link>
              )}

            </ListItem>

          </List>
        </Drawer></div>

      <Outlet />
    </div>

  )
}