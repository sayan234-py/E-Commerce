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
      {/* Main Banner */}
      <div className="banner-carousel-main">
        <img
          src={banners[currentBanner]}
          alt={`Banner ${currentBanner + 1}`}
          className="banner-image"
        />

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
      </div>

      {/* Sliding Dots on the Left */}
      {banners.length > 1 && (
        <div className="banner-dots-container">
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
          <div className="banner-counter">
            <span>{currentBanner + 1}</span>
            <span>/</span>
            <span>{banners.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerCarousel;
