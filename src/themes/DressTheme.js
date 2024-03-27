import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, ThemeProvider, createTheme, Button, CircularProgress, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { GlobalService } from '../services/GlobalService';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../api/Api';

const DressTheme = () => {
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  const [homeThemes, setHomeThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState();
  const { handleLogout } = GlobalService();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#ffffff',
      },
    },
  });

  const anotherChoice = async () => {
    try {
      const dressCollection = await axios.get(`${BASE_URL}/dressTheme`);
      await setCollection(dressCollection.data[0].dressImage);
    } catch (error) {
      console.error('Error fetching dress theme:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/homeTheme`);
        const resdata = response.data;
        const dressCollection = await axios.get(`${BASE_URL}/dressTheme`);
        await setCollection(dressCollection.data[0].dressImage);

        let homeTheme = [];
        for (let i = 0; i < resdata.length; i++) {
          homeTheme.push({ dressImage: resdata[i].dressImage });
        }

        await setHomeThemes(homeTheme);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position='fixed' color='primary'>
          <Toolbar>
            <Typography variant='h5' component='div' sx={{ flexGrow: 1 }} color='secondary' gutterBottom>
              DAILY DRESS COLOR SUGGESTION
            </Typography>
            {localStorage.getItem('email') && (
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      {loading ? (
        <CircularProgress style={{ marginTop: '100px' }} />
      ) : (
        <Carousel>
          {homeThemes.map((item, index) => (
            <Paper key={index}>
              <img
                src={item.dressImage}
                alt={`dress-${index}`}
                style={{
                  marginTop: '80px',
                  width: '400px',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '20px'
                }}
              />
            </Paper>
          ))}
        </Carousel>
      )}

      {localStorage.getItem('email') ? 
        <>
        <center>
        <div className='collectionCards'>
        <img
            className='collections'
            src={collection}
            alt='collections'
            style={{
              width: '500px',
              height: '500px',
              objectFit: 'cover',
              margin: '20px',
              borderRadius: '60px',
            }}
          />
        </div>

        </center>

          <Button style={{ top: '15px' }} variant='contained' color='primary' onClick={anotherChoice}>
            Another Choice
          </Button>
        </>
        :
        <>
          <h1>YOU SHOULD BE LOGIN..... </h1>
          <p>
            Already have an account? <Link to="/">Login here</Link>
          </p>
        </>
      }
    </>
  );
};

export default DressTheme;
