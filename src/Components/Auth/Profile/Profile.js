import axiosInstance from '../../api/axiosInstance';
import './Profile.css';
import { User, ArrowLeft } from 'lucide-react';
const Profile = ({ setOtpTimer, setCurrentView, currentView, setErrors, setAuthData, setIsLoading, setUser, errors, isLoading, authData }) => {
  const handleInputChange = (field, value) => {
    setAuthData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  // const formatPhoneNumber = (value) => {
  //   console.log("...............",value)
  //   const numbers = value.replace(/\D/g, '');
  //   if (numbers.length <= 5) return numbers;
  //   if (numbers.length <= 10) {
  //     return `${numbers.slice(0, 5)} ${numbers.slice(5)}`;
  //   }
  //   return `${numbers.slice(0, 5)} ${numbers.slice(5, 10)}`;
  // }; no longer needed this code

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

  const goBack = () => {
    if (currentView === 'otp') {
      setCurrentView('auth');
      setOtpTimer(0);
    } else if (currentView === 'profile') {
      setCurrentView('otp');
    }
  };

  const validateProfile = () => {
    const newErrors = {};
    if(authData.loginMethod=='phone'){
   if (!validatePhone()) return false;
    }
 
    if (!authData.name.trim()) newErrors.name = 'Name is required';
    if (!authData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(authData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const profileCompletion = async () => {


    try {
      const response = await axiosInstance.post('/user/profile-completion', { phone:authData.phone,name: authData.name,email:authData.email,isProfileComplete:true }, { withCredentials: true });
         console.log(response);
      if (response.data.success === true) {
        return true;
      } else {
        return false;
      }


    } catch (err) {

      console.log(err);
      return false;
    }

  }
  const handleProfileComplete = async () => {
    if (!validateProfile()) return;
    setIsLoading(true);
    const profileResponse = await profileCompletion();

    if (profileResponse) {

      const newUser = {
        name: authData.name,
        email: authData.email,
        phone: authData.phone,
        picture: authData.picture
      };
      setUser(newUser);
      setCurrentView('dashboard');
    }
    setIsLoading(false);
  };

  return (
    <div className="auth-profileContainer">
      <div className="auth-profileHeader">
        <div className="auth-profileIconWrapper">
          <User className="auth-profileIcon" />
        </div>
        <h2 className="auth-title">Complete Profile</h2>
        <p className="auth-subtitle">Please provide your details to continue</p>
      </div>

      <div className="auth-profileForm">
        <div>
          <label className="auth-profileLabel">Full Name</label>
          <input
            type="text"
            value={authData.name}
        disabled={authData.loginMethod=='google'}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`auth-profileInput ${errors.name ? 'auth-profileInputError' : ''}`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="auth-errorText">{errors.name}</p>}
        </div>

        <div>
          <label className="auth-profileLabel">Email Address</label>
          <input
            type="email"
            value={authData.email}
            disabled={authData.loginMethod=='google'}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`auth-profileInput ${errors.email ? 'auth-profileInputError' : ''}`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="auth-errorText">{errors.email}</p>}
        </div>

        <div>
          <label className="auth-profileLabel">Phone Number</label>
          <input
            type="text"
             onChange={(e) => handleInputChange('phone', e.target.value)}
            value={authData.phone}
       disabled={authData.loginMethod=='phone'}
            className={authData.loginMethod=='phone'?`auth-profileInputDisabled`:`auth-profileInput`}
            placeholder="Enter Phone Number"
          />
            {errors.phone && <p className="auth-errorText">{errors.phone}</p>}
        </div>

        <button
          onClick={handleProfileComplete}
          disabled={isLoading}
          className="auth-profileButton"
        >
          {isLoading ? (
            <div className="auth-buttonContent">
              <div className="auth-spinner" />
              Creating Profile...
            </div>
          ) : (
            <div className="auth-buttonContent">
              <User className="auth-iconSmall" />
              Complete Setup
            </div>
          )}
        </button>

        <div className="auth-backContainer">
          <button onClick={goBack} className="auth-backButton">
            <ArrowLeft className="auth-iconSmall" />
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
