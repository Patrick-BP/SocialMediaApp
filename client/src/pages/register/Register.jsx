import React, { useRef, useState } from 'react' ;
import './register.css';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();
    const [errorMessage, SetErrorMessage] = useState("")
    
    const toLogin = ()=>{
        navigate('/login')
    }
    const handleClick = async (event)=>{
        event.preventDefault();
        if(confirmPassword.current.value !== password.current.value){
            console.log(confirmPassword , password);
            confirmPassword.current.setCustomValidity("Passwords don't match!")
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                confirmPassword: confirmPassword.current.value,
            }

            try{
                await axios.post('/users/register', user)
              .then(res=>{
                    navigate('/login')
              }).catch(err=>{
                
               SetErrorMessage(err.response.data);
            })
                
                
              
            }catch(err){
              
                
            }
           
            
        }
       
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
                
                <form className="loginBox" onSubmit={handleClick}>
                    <p style={{color:"red", fontSize:"12px"}}>{errorMessage}</p>
                    <input type="text" placeholder='User Name' className="loginInput" ref={username}/> 
                    <input type="Email" placeholder='Email' className="loginInput" ref={email}/>        
                    <input type="password" placeholder='password' className="loginInput" ref={password}/>
                    <input type="password" placeholder='Confirm password' className="loginInput" ref={confirmPassword}/>
                     <button className="loginButton" type='submit'>Sign up </button>
                    <button className="loginRegisterButton" type="button" onClick={toLogin}>Log into your Account</button>
                </form>
               
                
            </div>
        </div>
    </div>
  )
}
