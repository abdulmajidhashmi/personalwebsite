import './Signup.css';
import { Link } from 'react-router-dom';
const Signup = ()=>{


    return (
        <div className='signup-maindiv'>
        <div className='signup-div'>
        
        <h1 className='s-head'>Sign up here</h1>

        <div className='s-inp-div'>
       <Link to="/"><i class="fa-solid fa-xmark cross-mark"></i></Link> 

        <input className='signup-inp' placeholder='Enter Name'/>
        <input className='signup-inp' placeholder='Enter Email'/>
        <input className='signup-inp' type='password' placeholder='Enter Password'/>
        <input className='signup-inp'type='password' placeholder='Confirm your password'/>
        <div className='signup-button'>Sign Up</div>
        <Link to="/login"><div className='already-userdiv'><p>Already a user?</p><p className='already-user'>Login here</p></div></Link>
        </div>
        </div>
        </div>
    )
}

export default Signup;