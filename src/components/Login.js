import React, { useState } from 'react';
import axios from 'axios';
import Home from './Home.js'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Login(){
    
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState();

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();

        const fetchData = async () =>{
            const response = await axios.post('http://localhost/LocalStorageReact/api-php/login.php', inputs);
            setMessage(response.data.message);
            
            if(response.data && response.data.userToken){
                Cookies.set('Token', response.data.userToken);
                navigate('/home');
            }  
        }   
        fetchData();
    }

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}));
    }


    return(
        <>
        <p>{message}</p>
        <form method="POST" onSubmit={handleSubmit}>
            <h2>Login</h2>

            <span>User:</span>
            <input type='text' name='user' onChange={handleChange}/>

            <span>Password:</span>
            <input type='text' name='pass' onChange={handleChange}/>

            <button>Login</button>

        </form>
        </>
    )
}