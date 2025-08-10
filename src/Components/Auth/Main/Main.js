import {  useState } from 'react';
import './Main.css'
import Profile from '../Profile/Profile';
import LoginOtp from '../LoginOtp/LoginOtp';
import Login from '../Login/Login';
import ProfileDashboard from '../ProfileDashboard/ProfileDashboard';

const Main = () => {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [otpTimer, setOtpTimer] = useState(0);
    const [currentView, setCurrentView] = useState('auth'); // 'auth', 'otp', 'profile', 'dashboard'
    const [isNewUser, setIsNewUser] = useState(false);
    const [authData, setAuthData] = useState({
        phone: '',
        otp: ['', '', '', '', '', ''],
        name: '',
        email: '',
        loginMethod: '' // 'phone', 'google', 'facebook'
    });



    return (

        <div className="auth-page">
            <div className="auth-wrapper">
                <div
                    className={`auth-card ${currentView === 'dashboard' ? 'auth-card-full' : 'auth-card-md'
                        }`}
                >
                    <div className="auth-content">
                        {currentView === 'auth' && <Login setCurrentView={setCurrentView} setOtpTimer={setOtpTimer} setAuthData={setAuthData} authData={authData} setUser={setUser} errors={errors} setErrors={setErrors} isLoading={isLoading} setIsLoading={setIsLoading} setIsNewUser={setIsNewUser} />}
                        {currentView === 'otp' && <LoginOtp setUser={setUser} otpTimer={otpTimer} setErrors={setErrors} errors={errors} setOtpTimer={setOtpTimer} authData={authData} setAuthData={setAuthData} isLoading={isLoading} setIsLoading={setIsLoading} isNewUser={isNewUser} currentView={currentView} setCurrentView={setCurrentView} />}
                        {currentView === 'profile' && <Profile setOtpTimer={setOtpTimer} setCurrentView={setCurrentView} currentView={currentView} setErrors={setErrors} setAuthData={setAuthData} setIsLoading={setIsLoading} setUser={setUser} errors={errors} isLoading={isLoading} authData={authData} />}
                        {currentView === 'dashboard' && <ProfileDashboard user={user} authData={authData} setIsNewUser={setIsNewUser} setErrors={setErrors} setAuthData={setAuthData} setCurrentView={setCurrentView} setUser={setUser} />}
                    </div>
                </div>
                {currentView !== 'dashboard' && (
                    <div className="auth-footer">
                        <p className="auth-footer-text">
                            🔒 Secure medical platform with multi-factor authentication
                        </p>
                    </div>
                )}
            </div>
        </div>

    );
}
export default Main;