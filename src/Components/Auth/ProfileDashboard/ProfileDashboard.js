import axiosInstance from '../../api/axiosInstance';
import './ProfileDashboard.css';
import { Phone, Shield, Heart } from 'lucide-react';
const ProfileDashboard = ({ user, authData, setIsNewUser, setErrors, setAuthData, setCurrentView, setUser }) => {

  const logoutcall = async () => {
    try {

      await axiosInstance.get('/user/delete-token', { withCredentials: true })
    } catch (err) {

      console.log(err);
    }


  }
  const logout = () => {


    logoutcall();
    setUser(null);
    setCurrentView('auth');
    setAuthData({
      phone: '',
      otp: ['', '', '', '', '', ''],
      name: '',
      email: '',
      loginMethod: ''
    });
    setErrors({});
    setIsNewUser(false);
  };
  return (
    <div className="auth-dashboardContainer">
      <div className="auth-dashboardCard">

        <div className="auth-dashboardHeader">
          <div className="auth-dashboardUser">
            <img
              src={user.picture}
              alt={user.name}
              className="auth-dashboardAvatar"
            />
            <div>
              <h1 className="auth-dashboardHeading">
                Welcome, {user.name}!
              </h1>
              <p className="auth-dashboardSubheading">
                Medical Dashboard
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="auth-dashboardLogoutButton"
          >
            Logout
          </button>
        </div>

        <div className="auth-dashboardGrid">
          <div className="auth-cardItem auth-cardItemBlue">
            <h3 className="auth-cardTitleBlue">Profile Information</h3>
            <div className="auth-cardContent">
              <p className="auth-dashboard-value"><span className="auth-cardLabel">Name:</span> {user.name}</p>
              <p className="auth-dashboard-value"><span className="auth-cardLabel">Email:</span> {user.email}</p>
              <p className="auth-dashboard-value"><span className="auth-cardLabel">Phone:</span> +91 {user.phone}</p>
            </div>
          </div>

          <div className="auth-cardItem auth-cardItemGreen">
            <h3 className="auth-cardTitleGreen">
              Authentication Method
            </h3>
            <div className="auth-cardContentIconRow">
              {authData.loginMethod === 'phone' && (
                <Phone className="auth-cardIcon" />
              )}
              {authData.loginMethod === 'google' && (
                <svg className="auth-cardIcon" viewBox="0 0 24 24">
                  {/* Google SVG path */}
                </svg>
              )}
              {authData.loginMethod === 'facebook' && (
                <svg
                  className="auth-cardIcon"
                  fill="#1877F2"
                  viewBox="0 0 24 24"
                >
                  {/* Facebook SVG path */}
                </svg>
              )}
              <span className="auth-cardLabel capitalize">
                {authData.loginMethod}
              </span>
            </div>
            <p className="auth-cardSubtextGreen">
              Logged in via{' '}
              {authData.loginMethod === 'phone'
                ? 'Phone + OTP'
                : authData.loginMethod}
            </p>
          </div>

          <div className="auth-cardItem auth-cardItemPurple">
            <h3 className="auth-cardTitlePurple">Security Status</h3>
            <div className="auth-cardContentIconRowPurple">
              <Shield className="auth-cardIcon" />
              <span className="auth-cardLabel">Verified</span>
            </div>
            <p className="auth-cardSubtextPurple">
              Account is secure and verified
            </p>
          </div>
        </div>

        <div className="auth-dashboardSection">
          <h3 className="auth-sectionTitle">
            🎉 Authentication Successful!
          </h3>
          <p className="auth-sectionText">
            You have successfully authenticated using{' '}
            {authData.loginMethod === 'phone'
              ? 'phone number with OTP verification'
              : `${authData.loginMethod} OAuth`}.
            Welcome to the MediCare platform!
          </p>
          <div className="auth-sectionFeatures">
            <div className="auth-sectionFeature auth-featureGreen">
              <Shield className="auth-cardIcon" />
              <span>Secure Authentication</span>
            </div>
            {authData.loginMethod === 'phone' && (
              <div className="auth-sectionFeature auth-featureBlue">
                <Phone className="auth-cardIcon" />
                <span>OTP Verified</span>
              </div>
            )}
            <div className="auth-sectionFeature auth-featurePurple">
              <Heart className="auth-cardIcon" />
              <span>Medical Platform Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDashboard;
