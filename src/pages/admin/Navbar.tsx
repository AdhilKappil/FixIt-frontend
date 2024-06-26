
import { createTheme, styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMemo, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import {  Brightness4, Brightness7, Home } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import SideBar from '../../components/admin/Sidebar';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAdminLogoutMutation } from '../../slices/api/adminApiSlices';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const drawerWidth = 240;



interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true)
  const [logOut] = useAdminLogoutMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const darkTheam = useMemo(()=>createTheme({
    palette:{
        mode : dark ? 'dark' : 'light'
    }
  }),[dark])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleLogOut = async()=>{
    try {
      const res = await logOut("").unwrap()
      dispatch(adminLogout())
      toast.success(res.message)
      navigate("/admin/adminLogin")
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <ThemeProvider theme={darkTheam}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
                <Home sx={{m:1}}></Home>
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{flexGrow:1}}>
            Dashboard
          </Typography>
          <Tooltip title='Change Theam'>
          <IconButton onClick={()=>setDark(!dark)}>
            {dark ? <Brightness7/> : <Brightness4/>}
          </IconButton>
          </Tooltip>
          <Tooltip title='Log Out'>
          <IconButton onClick={handleLogOut}>
            <LogoutIcon/>
          </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <SideBar {...{open, setOpen}}/>
    </Box>
    </ThemeProvider>
  );
}
