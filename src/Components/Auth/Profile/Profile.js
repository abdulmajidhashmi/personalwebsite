import './Profile.css';
import { User, ArrowLeft } from 'lucide-react';
const Profile = ({setOtpTimer,setCurrentView,currentView,setErrors,setAuthData,setIsLoading,setUser,errors,isLoading,authData}) => {
  const handleInputChange = (field, value) => {
    setAuthData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    if (numbers.length <= 10) {
      return `${numbers.slice(0, 5)} ${numbers.slice(5)}`;
    }
    return `${numbers.slice(0, 5)} ${numbers.slice(5, 10)}`;
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
    if (!authData.name.trim()) newErrors.name = 'Name is required';
    if (!authData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(authData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleProfileComplete = async () => {
    if (!validateProfile()) return;

    setIsLoading(true);
    setTimeout(() => {
      const newUser = {
        name: authData.name,
        email: authData.email,
        phone: `+91 ${authData.phone}`,
        avatar: `https://ui-avatars.com/api/?name=${authData.name}&background=8b5cf6&color=fff`
      };
      setUser(newUser);
      setCurrentView('dashboard');
      setIsLoading(false);
    }, 1500);
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
            value={`+91 ${formatPhoneNumber(authData.phone)}`}
            disabled
            className="auth-profileInputDisabled"
          />
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
