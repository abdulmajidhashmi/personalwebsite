import React from "react";
import "./Pricing.css";

const Pricing = () => {
  return (
    <section id="pricing" className="pricing-section">
      <div className="pricingContainer">
        <h2 className="pricing-heading">
          Appointment Options & Pricing
        </h2>

        <div className="pricing-grid">
          {/* Card 1 */}
          <div className="pricing-card">
            <h3 className="pricing-title">Standard Consultation</h3>
            <p className="pricing-desc">
              For general check-ups and initial assessments.
            </p>
            <div className="pricing-price">
            ₹300 <span>/session</span>
            </div>
            <ul className="pricing-features">
              <li>
                <svg className="check-icon" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 
                    7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 
                    0 001.414 0l4-4z"
                  />
                </svg>
                30-minute session
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 
                    0 00-1.414-1.414L9 10.586 
                    7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 
                    1 0 001.414 0l4-4z"
                  />
                </svg>
                Initial diagnosis & advice
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 
                    1 0 00-1.414-1.414L9 10.586 
                    7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 
                    1 0 001.414 0l4-4z"
                  />
                </svg>
                Basic treatment plan
              </li>
            </ul>
            <button className="pricing-btn">Select Plan</button>
          </div>

          {/* Card 2 (Recommended) */}
          <div className="pricing-card recommended">
            <div className="recommended-badge">Recommended</div>
            <h3 className="pricing-title">Extended Consultation</h3>
            <p className="pricing-desc">
              For detailed discussions and comprehensive care.
            </p>
            <div className="pricing-price">
              ₹400 <span>/session</span>
            </div>
            <ul className="pricing-features">
              <li>
                <svg className="check-icon" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 
                    000 16zm3.707-9.293a1 1 0 
                    00-1.414-1.414L9 10.586 
                    7.707 9.293a1 1 0 
                    00-1.414 1.414l2 2a1 1 
                    0 001.414 0l4-4z"
                  />
                </svg>
                60-minute session
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 
                    000 16zm3.707-9.293a1 1 0 
                    00-1.414-1.414L9 10.586 
                    7.707 9.293a1 1 0 
                    00-1.414 1.414l2 2a1 1 
                    0 001.414 0l4-4z"
                  />
                </svg>
                In-depth assessment
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 
                    000 16zm3.707-9.293a1 1 0 
                    00-1.414-1.414L9 10.586 
                    7.707 9.293a1 1 0 
                    00-1.414 1.414l2 2a1 1 
                    0 001.414 0l4-4z"
                  />
                </svg>
                Personalized treatment plan
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 
                    000 16zm3.707-9.293a1 1 0 
                    00-1.414-1.414L9 10.586 
                    7.707 9.293a1 1 0 
                    00-1.414 1.414l2 2a1 1 
                    0 001.414 0l4-4z"
                  />
                </svg>
                Follow-up recommendations
              </li>
            </ul>
            <button className="pricing-btn">Select Plan</button>
          </div>

          {/* Card 3 */}
          <div className="pricing-card">
            <h3 className="pricing-title">Family/Group Session</h3>
            <p className="pricing-desc">
              For multiple family members or group therapy.
            </p>
            <div className="pricing-price">
              ₹500 <span>/session</span>
            </div>
            <ul className="pricing-features">
              <li>
                <svg className="check-icon" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 
                    000 16zm3.707-9.293a1 1 0 
                    00-1.414-1.414L9 10.586 
                    7.707 9.293a1 1 0 
                    00-1.414 1.414l2 2a1 1 
                    0 001.414 0l4-4z"
                  />
                </svg>
                90-minute session
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 
                    000 16zm3.707-9.293a1 1 0 
                    00-1.414-1.414L9 10.586 
                    7.707 9.293a1 1 0 
                    00-1.414 1.414l2 2a1 1 
                    0 001.414 0l4-4z"
                  />
                </svg>
                Group therapy focus
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 
                    000 16zm3.707-9.293a1 1 0 
                    00-1.414-1.414L9 10.586 
                    7.707 9.293a1 1 0 
                    00-1.414 1.414l2 2a1 1 
                    0 001.414 0l4-4z"
                  />
                </svg>
                Customized group plan
              </li>
            </ul>
            <button className="pricing-btn">Select Plan</button>
          </div>
        </div>

        <div className="pricing-note">
          <p>
            <strong>Note:</strong> All prices are subject to change. Please
            contact us for specific insurance inquiries.
          </p>
          <p>
            We believe in transparent pricing and providing value for your
            health and well-being.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
