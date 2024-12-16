import { Link, Navigate } from 'react-router-dom';
import './Chat.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Chat=()=>{
const navigate = useNavigate();
 const access=()=>{
       const ifuser = JSON.parse(localStorage.getItem('user'));
       if(!ifuser){

        navigate('/login');
       }

    }
    return(

        <>
        
        <div onClick={access} className='chat-maindiv'><Link to="chat"><div className='chat-subdiv'><h1>CHAT HERE</h1></div></Link></div></>
    )
}

export default Chat;