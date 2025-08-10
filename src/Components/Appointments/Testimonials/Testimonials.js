import React, { useState, useEffect, useRef } from "react";
import "./Testimonials.css";

const testimonials = [
  {
    img: "https://source.unsplash.com/random/100x100/?person,face,smiling",
    text: `"Booking my appointment was incredibly simple and straightforward. The calendar design is very user-friendly, and I loved being able to add notes for my doctor. Highly recommend!"`,
    name: "Sarah M.",
  },
  {
    img: "https://source.unsplash.com/random/100x100/?man,face,happy",
    text: `"The online booking system is a game-changer. It's so convenient to pick a time that fits my schedule without any hassle. The confirmation was instant, which was great."`,
    name: "John D.",
  },
  {
    img: "https://source.unsplash.com/random/100x100/?woman,face,professional",
    text: `"I appreciate the ability to add specific details about my condition when booking. It makes me feel heard and ensures the doctor is prepared. A very thoughtful feature!"`,
    name: "Emily R.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false); // NEW lock state
  const carouselRef = useRef(null);

  const extendedTestimonials = [
    testimonials[testimonials.length - 1],
    ...testimonials,
    testimonials[0],
  ];

  const nextSlide = () => {
    if (isAnimating) return;   // stop spamming
    setIsAnimating(true);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isAnimating) return;   // stop spamming
    setIsAnimating(true);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentIndex === extendedTestimonials.length - 1) {
        setIsTransitioning(false);
        setCurrentIndex(1);
      } else if (currentIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(extendedTestimonials.length - 2);
      }
      setIsAnimating(false); // unlock after transition
    };

    const carousel = carouselRef.current;
    carousel.addEventListener("transitionend", handleTransitionEnd);

    return () => carousel.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex, extendedTestimonials.length]);


  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-heading">What Our Patients Say</h2>

        <div className="testimonials-wrapper">
          {/* Carousel */}
          <div
            className="testimonials-carousel"
            ref={carouselRef}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isTransitioning ? "transform 0.7s ease-in-out" : "none",
            }}
          >
            {extendedTestimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-content">
                  <img src={t.img} alt={t.name} className="testimonial-avatar" />
                  <p className="testimonial-text">{t.text}</p>
                  <p className="testimonial-name">- {t.name}</p>
                  <div className="testimonial-stars">
                    {Array(5)
                      .fill()
                      .map((_, j) => (
                        <svg key={j} className="star-icon" viewBox="0 0 24 24">
                          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 
                                   1.48 8.279L12 18.896l-7.416 3.817 
                                   1.48-8.279L.001 9.306l8.332-1.151L12 .587z" />
                        </svg>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button className="testimonial-btn prev-btn" onClick={prevSlide}>
            <svg
              className="btn-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="testimonial-btn next-btn" onClick={nextSlide}>
            <svg
              className="btn-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
