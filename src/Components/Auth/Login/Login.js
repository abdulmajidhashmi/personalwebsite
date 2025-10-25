import axiosInstance from '../../api/axiosInstance';
import './Login.css';
import { Phone, Stethoscope } from 'lucide-react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
const Login = ({ setAuthData, setErrors, setIsLoading, setUser, setCurrentView, setOtpTimer, isLoading, errors, authData, setIsNewUser }) => {

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const handleInputChange = (field, value) => {
        setAuthData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validatePhone = () => {
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!authData.phone.trim()) {
            setErrors({ phone: 'Phone number is required' });
            return false;
        }
        if (!phoneRegex.test(authData.phone.replace(/\D/g, ''))) {
            setErrors({ phone: 'Please enter a valid 10-digit Indian mobile number' });
            return false;
        }
        setErrors({});
        return true;
    };


    const callLoginApi = async (phoneNumber) => {
        console.log(phoneNumber)
        try {
            const loginData = await axiosInstance.post('/user/loginWithOtp', { phone: phoneNumber }, { withCredentials: true });
            console.log(loginData.data.success);
            if (loginData.data.success === true) {
                return true;
            } else {
                return false;
            }
        } catch (err) {

            console.log(err);
            return false;
        }
    }

    const formatPhoneNumber = (value) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 5) return numbers;
        if (numbers.length <= 10) {
            return `${numbers.slice(0, 5)} ${numbers.slice(5)}`;
        }
        return `${numbers.slice(0, 5)} ${numbers.slice(5, 10)}`;
    };

    const handlePhoneAuth = async () => {
        if (!validatePhone()) return;
        setIsLoading(true);
        const SendOTP = await callLoginApi(authData.phone);
        console.log(SendOTP)
        if (SendOTP === true) {


            setAuthData(prev => ({ ...prev, loginMethod: 'phone' }));
            // Simulate API call to send OTP

            setOtpTimer(60);
            setCurrentView('otp');

            // Simulate checking if user exists
            setIsNewUser(Math.random() > 0.5); // Random for demo

        }
        setIsLoading(false);
    };

    const googleApiCall = async (token) => {
        try {
            const response = await axiosInstance.post('/user/google-login', { token }, { withCredentials: true })
            console.log(response)
            return response;

        } catch (err) {

            console.log(err);
            return err;
        }
    }

    const handleGoogleAuth = async (data) => {
        setIsLoading(true);
        setAuthData(prev => ({ ...prev, loginMethod: 'google' }));
        const val = data.credential;
        const response = await googleApiCall(val);
        setAuthData(response.data.data);
        if (response.data.data.phone === null) {

            setCurrentView('profile');
        } else {
            setCurrentView('dashboard');
        }


        // Simulate Google OAuth

        setUser(response.data.data);
        //     setAuthData(prev => ({
        //         ...prev,
        //         name: mockGoogleUser.name,
        //         email: mockGoogleUser.email,
        //         phone: mockGoogleUser.phone
        //     }));

        setIsLoading(false);

    };

    const handleFacebookAuth = async () => {
        setIsLoading(true);
        setAuthData(prev => ({ ...prev, loginMethod: 'facebook' }));
        // Simulate Facebook OAuth
        setTimeout(() => {
            const mockFacebookUser = {
                name: 'Dr. Sarah Johnson',
                email: 'sarah.johnson@facebook.com',
                phone: authData.phone || '+91 87654 32109',
                avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=1877f2&color=fff'
            };

            setUser(mockFacebookUser);
            setAuthData(prev => ({
                ...prev,
                name: mockFacebookUser.name,
                email: mockFacebookUser.email,
                phone: mockFacebookUser.phone
            }));
            setCurrentView('dashboard');
            setIsLoading(false);
        }, 2000);
    };
    return (
        <div className="auth-container">
            <div className="auth-header">
                <div className="auth-iconWrapper">
                    <Stethoscope className="auth-icon" />
                </div>
                <h2 className="auth-title">Welcome to Dr.Abdul Wase</h2>
                <p className="auth-subtitle">
                    Sign in to access your medical dashboard
                </p>
            </div>

            <div className="auth-form">
                {/* Phone Number Input */}
                <div>
                    <label className="auth-label">Phone Number</label>
                    <div className="auth-inputGroup">
                        <div className="auth-inputPrefix">
                            <span className="auth-inputPrefixText">+91</span>
                            <div className="auth-separator"></div>
                        </div>
                        <input
                            type="tel"
                            value={formatPhoneNumber(authData.phone)}
                            onChange={(e) => {
                                const numbers = e.target.value.replace(/\D/g, '');
                                if (numbers.length <= 10) {
                                    handleInputChange('phone', numbers);
                                }
                            }}
                            className={`auth-input ${errors.phone ? 'auth-inputError' : ''}`}
                            placeholder="98765 43210"
                            maxLength={11}
                        />
                    </div>
                    {errors.phone && (
                        <p className="auth-errorText">{errors.phone}</p>
                    )}
                </div>

                {/* Phone Auth Button */}
                <button
                    onClick={handlePhoneAuth}
                    disabled={isLoading}
                    className="auth-buttonPrimary"
                >
                    {isLoading && authData.loginMethod === 'phone' ? (
                        <div className="auth-buttonContent">
                            <div className="auth-spinner"></div>
                            Sending OTP...
                        </div>
                    ) : (
                        <div className="auth-buttonContent">
                            <Phone className="auth-socialIcon" />
                            Continue with Phone
                        </div>
                    )}
                </button>

                {/* Divider */}
                <div className="auth-dividerContainer">
                    <div className="auth-dividerLine">
                        <div className="auth-dividerLineInner"></div>
                    </div>
                    <div className="auth-dividerTextWrapper">
                        <span className="auth-dividerText">or continue with</span>
                    </div>
                </div>

                {/* Social Auth Buttons */}
                <div className="auth-form">


                    <GoogleOAuthProvider clientId={CLIENT_ID}>
                        <GoogleLogin className="auth-socialButton" onSuccess={handleGoogleAuth} onError={handleGoogleAuth} />
                    </GoogleOAuthProvider>
                    {/* <button
                        onClick={handleFacebookAuth}
                        disabled={isLoading}
                        className="auth-socialButton">
                        {isLoading && authData.loginMethod === 'facebook' ? (
                            <div className="auth-buttonContent">
                                <div
                                    className="auth-spinner"
                                    style={{ borderBottomColor: '#4B5563' }}
                                ></div>
                                Connecting to Facebook...
                            </div>
                        ) : (
                            <>
                                <svg
                                    className="auth-socialIcon"
                                    fill="#1877F2"
                                    viewBox="0 0 24 24"
                                >
                                 

                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />

                                </svg>
                                <span className="auth-socialText">
                                    Continue with Facebook
                                </span>
                            </>
                        )}
                    </button> */}
                </div>

                <div className="auth-terms">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </div>
            </div>
        </div>
    );
}
export default Login;