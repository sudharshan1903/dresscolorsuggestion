import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopBar from '../components/TopBar';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';



const Admin = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: '24px',
    background: '#000000',
    margin: '10px',
    p: 4,
  };
  const [imageFiles, setImageFiles] = useState([]);
  const [responsify, setResponsify] = useState('');

  const notify = () => toast.success(responsify);
  const warningfy = () => toast.warning('Warning: Must upload a file');
  const errorify = () => toast.error(responsify);
  const adminUpload = async () => {
    if (imageFiles.length > 0) {
      const formData = new FormData();
      formData.append('file', imageFiles[0]);
  
      try {
        const response = await axios.post('http://localhost:4000/AdminUpload', formData);
        console.log(response.data, 'response.data');
        setResponsify(response.data.message);
        notify();
      } catch (error) {
        console.error(error);
        setResponsify(error.response?.data || 'Error uploading file.');
        errorify();
      }
    } else {
      warningfy();
    }
  };
  

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setImageFiles(filesArray);
  };

  return (
    <>
    <TopBar />
    <div style={{ backgroundImage: `url('/image/background.svg')`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ToastContainer style={{ fontSize: '16px' }} />
     {localStorage.getItem('email') ? 
     <>
 <Box sx={style}>
        <Typography variant="h6" component="h2" color="#fff" gutterBottom>
          ADMIN DRESS THEME UPLOAD
        </Typography>
        <Paper elevation={3} sx={{ p: 2, mt: 2 }} color='#000000'>
          <TextField
            type="file"
            name="file"
            color="success"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleFileUpload}
            inputProps={{ accept: 'image/*' }}
          />
          <Button variant="contained" color="success" onClick={adminUpload}>
            Upload
          </Button>
        </Paper>
      </Box>
     </>
     :
     <>
     <h2>Admin login has only handle this....  </h2>
     </>}
    </div>
    </>
  );
};

export default Admin;
