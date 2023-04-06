import React, { useContext, useRef } from 'react'
import './login.css';
import {loginCall} from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext';
import {Stack, CircularProgress} from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()
    const email = useRef();
    const password = useRef();
    
    const {isFetching, dispatch} = useContext(AuthContext)
    const handleClick = (event)=>{
        event.preventDefault();
       
        loginCall({email: email.current.value, password:password.current.value}, dispatch)
    }
    const toRegister = ()=>{
        navigate('/register')
    }
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Social Media</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Social media.
                </span>
            </div>
            <div className="loginRight">
                <form onSubmit={handleClick} className="loginBox" >
                    
                     <input type="Email" placeholder='Email' value='paul@gmail.com' className="loginInput" ref={email} />
                    <input type="password" placeholder='password' value="123" className="loginInput" ref={password}  />
                    {isFetching ? <Stack spacing ={2}><CircularProgress /></Stack> : <button className="loginButton" type='submit'>Log In </button>}
                    <span className="loginForgot">Forgot password</span>
                    <button className="loginRegisterButton" type='button' onClick={toRegister}>Create a new Account</button>
                </form>
               
                
            </div>
        </div>
    </div>
  )
}

