import { useEffect } from 'react';
import './LoginOtp.css';
import { Shield, ArrowLeft, RefreshCw } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
const LoginOtp = ({ setOtpTimer, setErrors, setCurrentView, setUser, authData, setAuthData, otpTimer, currentView, errors, isLoading, isNewUser, setIsLoading }) => {

  // OTP Timer effect
  useEffect(() => {
    let interval = null;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(timer => timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer, setOtpTimer]);

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    if (numbers.length <= 10) {
      return `${numbers.slice(0, 5)} ${numbers.slice(5)}`;
    }
    return `${numbers.slice(0, 5)} ${numbers.slice(5, 10)}`;
  };
  const handleOtpVerification = async () => {
    const otpString = authData.otp.join('');
    if (otpString.length !== 6) {
      setErrors({ otp: 'Please enter complete OTP' });
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification`

    const OTPresponse = await callLoginOtpApi(otpString);
    console.log(OTPresponse);
    if (OTPresponse.data.success === true) {
      if (OTPresponse.data.data?.name === null || OTPresponse.data.data?.email === null  ) {
        setAuthData(OTPresponse.data.data);
        setCurrentView('profile');
      } else {
        setUser(OTPresponse.data.data);
        setCurrentView('dashboard');
      }
    }
    setIsLoading(false);

  };


  const callLoginOtpApi = async (otpString ) => {
    try {
   
      const response = await axiosInstance.post('/user/loginVerifyWithOtp', { phone: authData.phone, otp: otpString ,loginMethod :'phone'}, { withCredentials: true });
      console.log(response);

     return response;

    } catch (err) {

      console.log(err);
      return false;
    }

  }
  const resendOtp = async() => {
    
     const loginData = await axiosInstance.post('/user/loginWithOtp', { phone: authData.phone}, { withCredentials: true });
    setOtpTimer(60);
    setAuthData(prev => ({ ...prev, otp: ['', '', '', '', '', ''] }));
    };

  const goBack = () => {
    if (currentView === 'otp') {
      setCurrentView('auth');
      setOtpTimer(0);
    } else if (currentView === 'profile') {
      setCurrentView('otp');
    }
  };
  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...authData.otp];
      newOtp[index] = value;
      setAuthData(prev => ({ ...prev, otp: newOtp }));

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }


    }

  };


  const handleKeyDown = (index, value, e) => {
    if (e.key === 'Backspace') {
      if (value === '') {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) prevInput.focus();
      }
    }
  };

  return (
    <div className="auth-otpContainer">
      <div className="auth-otpHeader">
        <div className="auth-otpIconWrapper">
          <Shield className="auth-otpIcon" />
        </div>
        <h2 className="auth-title">Verify Phone</h2>
        <p className="auth-otpInfo">
          We've sent a 6-digit code to<br />
          <span className="auth-otpInfoHighlight">
            +91 {formatPhoneNumber(authData.phone)}
          </span>
        </p>
      </div>

      <div className="auth-otpForm">
        <div>
          <label className="auth-otpLabel">
            Enter Verification Code
          </label>
          <div className="auth-otpInputs">
            {authData.otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e.target.value, e)}
                className="auth-otpInput"
                maxLength={1}
              />
            ))}
          </div>
          {errors.otp && (
            <p className="auth-errorTextCenter">
              {errors.otp}
            </p>
          )}
        </div>

        <button
          onClick={handleOtpVerification}
          disabled={isLoading}
          className="auth-otpButton"
        >
          {isLoading ? (
            <div className="auth-buttonContent">
              <div className="auth-spinner"></div>
              Verifying...
            </div>
          ) : (
            <div className="auth-buttonContent">
              <Shield className="auth-iconSmall" />
              Verify & Continue
            </div>
          )}
        </button>

        <div className="auth-otpTimer">
          {otpTimer > 0 ? (
            <p>
              Resend code in{' '}
              <span className="auth-otpInfoHighlight">
                {otpTimer}s
              </span>
            </p>
          ) : (
            <button
              onClick={resendOtp}
              className="auth-otpResend"
            >
              <RefreshCw className="auth-iconSmall" />
              Resend OTP
            </button>
          )}
        </div>

        <div>
          <button
            onClick={goBack}
            className="auth-backButton"
          >
            <ArrowLeft className="auth-iconSmall" />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
export default LoginOtp;
