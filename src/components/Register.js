import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, TextField, Typography, Paper,IconButton, InputAdornment, } from '@mui/material';
import { GlobalService } from '../services/GlobalService';
import {Visibility,VisibilityOff} from '@mui/icons-material';

const Register = () => {
  const { userName, setUserName, email, setEmail, password, setPassword, handleRegister,passwordVisible,isShowPassword } = GlobalService();

  return (
    <div style={{ backgroundImage: `url('/image/background.svg')`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ToastContainer style={{ fontSize: '16px' }} />
      <Box>
        <Typography variant="h6" component="h2" sx={{ color: '#000000' }} gutterBottom>
          REGISTER
        </Typography>
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <TextField
            type="text"
            label="User Name"
            name="userName"
            color="success"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            type="email"
            label="Email"
            name="email"
            color="success"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type={isShowPassword ? "text" : "password"}
            label="Password"
            name="password"
            color="success"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={passwordVisible}
                    edge="end"
                  >
                    {isShowPassword? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="success" onClick={handleRegister}>
            REGISTER
          </Button>
        </Paper>
        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </Box>
    </div>
  );
};

export default Register;
