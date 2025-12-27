import './Footer.css';

const Footer = () => {
 


  return (
   
     
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Dr. Hashmi Abdul Wase</h3>
            <p>Your trusted partner in neurological and mental health care</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#about">About</a>
            <a href="#treatments">Treatments</a>
            <a href="#patients">Testimonials</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <a href="#">Video Consultation</a>
            <a href="#">In-Person Visits</a>
            <a href="#">Emergency Care</a>
            <a href="#">Follow-up Care</a>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Dr. Hashmi Abdul Wase. All rights reserved.</p>
        </div>
      </footer>
 
  );
};

export default Footer;
