import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Box, Button, TextField, Typography, Paper,IconButton, InputAdornment, } from '@mui/material';
import { GlobalService } from '../services/GlobalService';
import {Visibility,VisibilityOff} from '@mui/icons-material';

const Login = () => {
  const { email, password, setEmail, setPassword, handleLogin,passwordVisible,isShowPassword } = GlobalService();

  return (
    <div style={{ backgroundImage: `url('/image/background.svg')`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ToastContainer style={{ fontSize: '16px' }} />
      <Box>
        <Typography variant="h6" component="h2" sx={{ color: '#00000' }} gutterBottom>
          LOGIN
        </Typography>
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
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
          <Button variant="contained" color="success" onClick={handleLogin}>
            LOGIN
          </Button>
        </Paper>
        <p>
          Don't have an account? <Link to="/Register">Register here</Link>
        </p>
      </Box>
    </div>
  );
};

export default Login;
