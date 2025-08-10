import React from "react";
import "./Features.css";

const features = [
  {
    title: "Effortless Scheduling",
    text: "Our intuitive calendar design makes finding and booking your preferred date and time a breeze. No more endless phone calls!",
    svg: (
      <svg
        className="feature-svg feature-svg-blue"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Add Specific Details",
    text: "Provide important notes or questions in advance, ensuring your doctor is fully prepared for your consultation.",
    svg: (
      <svg
        className="feature-svg feature-svg-green"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
  {
    title: "Confidential & Secure",
    text: "Your personal and medical information is handled with the utmost care and secured with advanced encryption.",
    svg: (
      <svg
        className="feature-svg feature-svg-purple"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v3h8z"
        />
      </svg>
    ),
  },
  {
    title: "Immediate Confirmation",
    text: "Receive instant confirmation of your booking, giving you peace of mind and clarity on your appointment.",
    svg: (
      <svg
        className="feature-svg feature-svg-red"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Easy Modifications",
    text: "Need to change your appointment? Our system allows for easy rescheduling to fit your dynamic life.",
    svg: (
      <svg
        className="feature-svg feature-svg-yellow"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7h.01M12 7h.01M16 7h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5m-5 0h5a2 2 0 01-2 2H9a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    title: "Responsive Support",
    text: "Our support team is ready to assist you with any questions or issues regarding your booking.",
    svg: (
      <svg
        className="feature-svg feature-svg-teal"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18.364 5.636l-3.536 3.536m0 0A9.953 9.953 0 0112 5c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8c0-1.76-.57-3.38-1.536-4.74l3.536-3.536m-1.414 1.414L12 12m-8 0H4m16 0h-4m-4 4v4m0-16V4"
        />
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        <h2 className="features-heading">Why Book Your Appointment With Us?</h2>
        <div className="features-grid">
          {features.map((item, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{item.svg}</div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
