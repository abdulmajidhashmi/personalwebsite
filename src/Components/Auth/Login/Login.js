import axiosInstance from '../../api/axiosInstance';
import './Login.css';
import { Phone, Stethoscope } from 'lucide-react';
const Login = ({setAuthData,setErrors,setIsLoading,setUser,setCurrentView,setOtpTimer,isLoading,errors,authData,setIsNewUser}) => {

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
        console.log(authData)

       const val = callLoginApi(authData.phone);
       return val;
    };


    const callLoginApi = async (phoneNumber)=>{
console.log(phoneNumber)
       try{
       const loginData = await axiosInstance.post('/user/loginWithOtp',{number:phoneNumber},{withCredentials:true});
       console.log(loginData);
       return true;

       }catch(err){

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
        setAuthData(prev => ({ ...prev, loginMethod: 'phone' }));
        // Simulate API call to send OTP
        setTimeout(() => {
            setOtpTimer(60);
            setCurrentView('otp');
            setIsLoading(false);
            // Simulate checking if user exists
            setIsNewUser(Math.random() > 0.5); // Random for demo
        }, 1500);
    };

    const handleGoogleAuth = async () => {
        setIsLoading(true);
        setAuthData(prev => ({ ...prev, loginMethod: 'google' }));

        // Simulate Google OAuth
        setTimeout(() => {
            const mockGoogleUser = {
                name: 'Dr. John Smith',
                email: 'john.smith@gmail.com',
                phone: authData.phone || '+91 98765 43210',
                avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=4285f4&color=fff'
            };
            setUser(mockGoogleUser);
            setAuthData(prev => ({
                ...prev,
                name: mockGoogleUser.name,
                email: mockGoogleUser.email,
                phone: mockGoogleUser.phone
            }));
            setCurrentView('dashboard');
            setIsLoading(false);
        }, 2000);
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
                        <span className="auth-dividerText">Or continue with</span>
                    </div>
                </div>

                {/* Social Auth Buttons */}
                <div className="auth-form">
                    <button
                        onClick={handleGoogleAuth}
                        disabled={isLoading}
                        className="auth-socialButton"
                    >
                        {isLoading && authData.loginMethod === 'google' ? (
                            <div className="auth-buttonContent">
                                <div
                                    className="auth-spinner"
                                    style={{ borderBottomColor: '#4B5563' }}
                                ></div>
                                Connecting to Google...
                            </div>
                        ) : (
                            <>
                                <svg className="auth-socialIcon" viewBox="0 0 24 24">
                                    {/* Google SVG paths */}
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="auth-socialText">
                                    Continue with Google
                                </span>
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleFacebookAuth}
                        disabled={isLoading}
                        className="auth-socialButton"
                    >
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
                                    {/* Facebook SVG path */}

                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />

                                </svg>
                                <span className="auth-socialText">
                                    Continue with Facebook
                                </span>
                            </>
                        )}
                    </button>
                </div>

                <div className="auth-terms">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </div>
            </div>
        </div>
    );
}
export default Login;