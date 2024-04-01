import React, { createContext, useContext, useState } from 'react';
import Navigation from './useNavigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../api/Api';

const WrappingChildren = createContext();

export const WrapperData = ({ children }) => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    const { directPage } = Navigation();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isregister, setIsregister] = useState(false);
    const [isShowPassword,setIsShowPassword] = useState(false)
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    // validate email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //  validate password 
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return passwordRegex.test(password);
    };

    // handle user registration
    const handleRegister = async () => {
        try {
          if(userName==='')
          {
            notifyError('must be fill user name');
            return;
          }
            if (!validateEmail(email)) {
                notifyError('Invalid email format');
                return;
            }

            if (!validatePassword(password)) {
                notifyError('Password must contain at least one letter, one number, and be at least 6 characters long');
                return;
            }
            const userRegister = {
                userName: userName,
                email: email,
                password: password,
            };

            const response = await axios.post(`${BASE_URL}/Register`, userRegister);

            if (response.data.success) {
                setIsregister(true);
                toast.success(response.data.message);
                setEmail('');
                setPassword('');
                setUserName('');
                
                if (isregister) {
                    directPage('/');
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Registration failed');
        }
    };

//  handle user login
const handleLogin = async () => {
    try {
        if (!validateEmail(email)) {
            notifyError('Invalid email format');
            return;
        }

        if (!validatePassword(password)) {
            notifyError('Password must contain at least one letter, one number, and be at least 6 characters long');
            return;
        }

        const userLogin = {
            email: email,
            password: password
        };

        const response = await axios.post(`${BASE_URL}/Login`, userLogin);
        const data = response.data;

        if (data.success) {
            localStorage.setItem('userName', data.userName); 
            localStorage.setItem('email', email);
            notifySuccess(data.message);
            setEmail('')
            setPassword('')
            // Check if the user is an admin
            if (data.isAdmin) {
                // Redirect to admin page
                directPage('Admin');
            } else {
                // Redirect to user page
                directPage('DressTheme');
            }
        } else {
            notifyError(data.message);
            setEmail('')
            setPassword('')
        }
    } catch (error) {
        notifyError('Login failed. Please try again later.');
    }
};

    //  handle user logout
    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        notifySuccess('Logged out successfully!');
        directPage('');
    };
    //handle visible password
    const passwordVisible = ()=>{
        setIsShowPassword(!isShowPassword);
    }

    return (
        <WrappingChildren.Provider
            value={{
                directPage,
                userName,setUserName,
                email,setEmail,
                password,setPassword,
                isregister,setIsregister,
                handleRegister,
                handleLogin,
                handleLogout,
                isShowPassword,
                passwordVisible
            }}
        >
            {children}
        </WrappingChildren.Provider>
    );
};

export const GlobalService = () => {
  return useContext(WrappingChildren);
};
