import './Signup.css';
import { Link } from 'react-router-dom';
const Signup = ()=>{


    return (
        <div className='signup-maindiv'>
        <div className='signup-div'>
        
        <h1>Signup here</h1>

        <input className='signup-inp' placeholder='Enter Name'/>
        <input className='signup-inp' placeholder='Enter Email'/>
        <input className='signup-inp' type='password' placeholder='Enter Password'/>
        <input className='signup-inp'type='password' placeholder='Confirm your password'/>
        <div className='signup-button'>Sign Up</div>
        <div className='already-userdiv'><p>Already a user?</p><Link to="/login"><p className='already-user'>Login here</p></Link></div>
        </div>
        </div>
    )
}

export default Signup;