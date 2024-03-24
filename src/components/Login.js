import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { GlobalService } from '../services/GlobalService';

const Login = () => {
  const { email, password, setEmail, setPassword, handleLogin } = GlobalService();

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
            type="password"
            label="Password"
            name="password"
            color="success"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
