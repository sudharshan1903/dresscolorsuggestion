import React from 'react'
import {
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
  AppBar,
  Button,
} from '@mui/material';
import { GlobalService } from '../services/GlobalService';
const TopBar = () => {
  const {handleLogout} =GlobalService(); 
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#fff',
      },
    },
  });
  return (
    <>
   <ThemeProvider theme={theme}>
        <AppBar position='relative' color='primary'>
          <Toolbar>
            <Typography variant='h5' component='div' sx={{ flexGrow: 1 }} color='white' gutterBottom>
              DAILY DRESS COLOR SUGGESTION
            </Typography>
            {localStorage.getItem('email') && (
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  )
}

export default TopBar;