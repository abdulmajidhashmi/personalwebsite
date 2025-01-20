import { Link } from 'react-router-dom';
import './QuickActions.css';
const QuickActions = ()=>{



    return (

        <>

    <div class="custom-grid">
        <Link to="/book-appoinment">
        <button class="custom-button custom-emerald" id="appointments">
            <div class="icon-container emerald-icon2">
                <svg class="icon2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </div>
            <div class="text-container">
                <h3 class="heading">Book Appointment</h3>
                <p class="subtext">Schedule your next visit</p>
            </div>
        </button>
        </Link>
        <Link  className='no-style-link' to='/chat'>
        <button class="custom-button custom-blue">
        
            <div class="icon-container blue-icon2">
                <svg class="icon2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
            </div>
            
            <div class="text-container">
                <h3 class="heading">Message Doctor</h3>
                <p class="subtext">Start a consultation</p>
            </div>
            
            
        </button>
        </Link>

        <button class="custom-button custom-purple">
            <div class="icon-container purple-icon2">
                <svg class="icon2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
            </div>
            <div class="text-container">
                <h3 class="heading">View Records</h3>
                <p class="subtext">Access medical history</p>
            </div>
        </button>
    </div>


        </>
    )
}

export default QuickActions;