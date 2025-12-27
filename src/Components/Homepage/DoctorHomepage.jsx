import React, { useState, useEffect } from 'react';
// import './DoctorHomepage.css';

const DoctorHomepage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const specialties = [
    { icon: '🧠', title: 'Neurological Disorders', desc: 'Expert diagnosis and treatment of complex neurological conditions' },
    { icon: '💭', title: 'Mental Health', desc: 'Comprehensive psychiatric care for anxiety, depression, and mood disorders' },
    { icon: '🎯', title: 'Cognitive Therapy', desc: 'Evidence-based therapeutic approaches for lasting mental wellness' },
    { icon: '⚡', title: 'Stress Management', desc: 'Advanced techniques for managing stress and improving quality of life' }
  ];

  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '5000+', label: 'Patients Treated' },
    { number: '98%', label: 'Success Rate' },
    { number: '24/7', label: 'Support Available' }
  ];

  const testimonials = [
    { name: 'Sarah Johnson', text: 'Dr. Wase transformed my life. His compassionate approach and expertise helped me overcome years of anxiety.', rating: 5 },
    { name: 'Michael Chen', text: 'The best neuropsychiatrist I have ever consulted. Professional, caring, and truly committed to patient wellbeing.', rating: 5 },
    { name: 'Priya Sharma', text: 'Outstanding care and attention to detail. Dr. Wase takes time to understand each patient\'s unique needs.', rating: 5 }
  ];

  const appointments = [
    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', time: 'Closed' }
  ];

  return (
    <div className="doctor-homepage">
      {/* Navigation */}
      {/* <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-icon">⚕️</span>
            <span className="brand-name">Dr.Hashmi Abdul Wase</span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home" className="nav-link active">Home</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#treatments" className="nav-link">Treatments</a></li>
            <li><a href="#patients" className="nav-link">Patients</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
          <button className="nav-cta">Book Appointment</button>
          <div className="user-icon">👤</div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-left">
            <div className="caduceus-icon">
              <svg viewBox="0 0 200 300" className="caduceus">
                <path d="M100 20 L100 280" stroke="white" strokeWidth="8" fill="none"/>
                <circle cx="100" cy="30" r="15" fill="white"/>
                <path d="M70 280 L100 260 L130 280" stroke="white" strokeWidth="6" fill="none"/>
                <path d="M50 100 Q100 80 150 100 Q100 120 50 100" stroke="white" strokeWidth="4" fill="none"/>
                <path d="M50 180 Q100 160 150 180 Q100 200 50 180" stroke="white" strokeWidth="4" fill="none"/>
                <path d="M80 50 L80 250" stroke="white" strokeWidth="3" fill="none"/>
                <path d="M120 50 L120 250" stroke="white" strokeWidth="3" fill="none"/>
              </svg>
            </div>
            <div className="hero-text-content">
              <h1 className="hero-title">
                Dr.Hashmi Abdul Wase
                <span className="title-highlight"></span>
              </h1>
              <p className="hero-subtitle">Neuro-pyschiatrist</p>
              <p className="hero-description">
                Specialized in treating complex neurological and psychiatric conditions with 
                a patient-centered approach, combining cutting-edge medical knowledge with 
                compassionate care.
              </p>
              <div className="hero-cta-group">
                <button className="cta-primary">Schedule Consultation</button>
                <button className="cta-secondary">Learn More</button>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Secure Video Consultations</h3>
              <p>Connect with Dr. Wase from anywhere</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Easy Appointment Booking</h3>
              <p>Schedule your visit in minutes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Access Medical Records</h3>
              <p>Your health history at your fingertips</p>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <h2 className="stat-number">{stat.number}</h2>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specialties Section */}
      <section className="specialties-section" id="treatments">
        <div className="section-header">
          <h2 className="section-title">Areas of Expertise</h2>
          <p className="section-subtitle">Comprehensive care across multiple specializations</p>
        </div>
        <div className="specialties-grid">
          {specialties.map((specialty, index) => (
            <div className="specialty-card" key={index}>
              <div className="specialty-icon">{specialty.icon}</div>
              <h3 className="specialty-title">{specialty.title}</h3>
              <p className="specialty-desc">{specialty.desc}</p>
              <a href="#" className="specialty-link">Learn more →</a>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-image">
            <div className="image-placeholder">
              <div className="doctor-silhouette">👨‍⚕️</div>
            </div>
            <div className="experience-badge">
              <span className="badge-number">15+</span>
              <span className="badge-text">Years of Excellence</span>
            </div>
          </div>
          <div className="about-content">
            <h2 className="about-title">Dedicated to Your Mental & Neurological Health</h2>
            <p className="about-text">
              Dr. Hashmi Abdul Wase is a distinguished neuro-psychiatrist with over 15 years 
              of experience in treating complex neurological and psychiatric conditions. His 
              holistic approach combines advanced medical treatments with personalized care 
              strategies.
            </p>
            <div className="qualifications">
              <div className="qualification-item">
                <span className="qual-icon">🎓</span>
                <div>
                  <h4>Education</h4>
                  <p>MD Psychiatry, DM Neurology</p>
                </div>
              </div>
              <div className="qualification-item">
                <span className="qual-icon">🏆</span>
                <div>
                  <h4>Certifications</h4>
                  <p>Board Certified in Neuropsychiatry</p>
                </div>
              </div>
              <div className="qualification-item">
                <span className="qual-icon">💼</span>
                <div>
                  <h4>Experience</h4>
                  <p>Senior Consultant, Multiple Hospitals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="patients">
        <div className="section-header">
          <h2 className="section-title">What Our Patients Say</h2>
          <p className="section-subtitle">Real experiences from real people</p>
        </div>
        <div className="testimonials-carousel">
          {testimonials.map((testimonial, index) => (
            <div 
              className={`testimonial-card ${index === activeTestimonial ? 'active' : ''}`} 
              key={index}
            >
              <div className="testimonial-stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-author">— {testimonial.name}</p>
            </div>
          ))}
          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="appointment-section" id="contact">
        <div className="appointment-container">
          <div className="appointment-info">
            <h2>Schedule Your Consultation</h2>
            <p>Take the first step towards better mental and neurological health</p>
            <div className="appointment-hours">
              <h3>Consultation Hours</h3>
              {appointments.map((apt, index) => (
                <div className="hour-item" key={index}>
                  <span className="day">{apt.day}</span>
                  <span className="time">{apt.time}</span>
                </div>
              ))}
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>dr.wase@healthcare.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>123 Medical Center, Healthcare City</span>
              </div>
            </div>
          </div>
          <div className="appointment-form">
            <form>
              <h3>Book an Appointment</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="your.email@example.com" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="form-group">
                <label>Preferred Date</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Reason for Visit</label>
                <textarea rows="3" placeholder="Briefly describe your concern..."></textarea>
              </div>
              <button type="submit" className="form-submit">Book Appointment</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default DoctorHomepage;
