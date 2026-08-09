import React, { useState, useEffect } from 'react';
import './BannerCarousel.css';

const BannerCarousel = ({ banners = [] }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-slide banners every 5 seconds
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToBanner = (index) => {
    setCurrentBanner(index);
  };

  const goToPrevious = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  if (!banners || banners.length === 0) {
    return <div className="banner-carousel-empty">No banners available</div>;
  }

  return (
    <div className="banner-carousel-container">
      {/* Main Banner with Content */}
      <div className="banner-carousel-main">
        <div className="banner-content">
          {/* Left Section - Text Content */}
          <div className="banner-text-section">
            {/* Dots on the left */}
            {banners.length > 1 && (
              <div className="banner-dots">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    className={`banner-dot ${index === currentBanner ? 'active' : ''}`}
                    onClick={() => goToBanner(index)}
                    aria-label={`Go to banner ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Banner Text */}
            <div className="banner-text-content">
              <h2 className="banner-title">GET 50% OFF</h2>
              <p className="banner-offer">Valid till 20 Mins</p>
              <button className="banner-cta-button">Shop now</button>
            </div>
          </div>

          {/* Right Section - Product Image */}
          <div className="banner-image-section">
            <img
              src={banners[currentBanner]}
              alt={`Banner ${currentBanner + 1}`}
              className="banner-product-image"
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button className="banner-arrow banner-arrow-left" onClick={goToPrevious}>
              ❮
            </button>
            <button className="banner-arrow banner-arrow-right" onClick={goToNext}>
              ❯
            </button>
          </>
        )}

        {/* Counter */}
        {banners.length > 1 && (
          <div className="banner-counter">
            <span>{currentBanner + 1}</span>
            <span>/</span>
            <span>{banners.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerCarousel;
