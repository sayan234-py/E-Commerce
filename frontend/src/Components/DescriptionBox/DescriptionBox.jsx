import React, { useState } from 'react'
import '../DescriptionBox/DescriptionBox.css'

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description')

  return (
    <div className='descriptionbox'>
      
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </div>
        <div
          className={`descriptionbox-nav-box-fade ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews (122)
        </div>
      </div>

      {/* Content Section */}
      <div className="descriptionbox-description">
        {activeTab === 'description' ? (
          <>
            <p>
              Welcome to <strong>E-comarce</strong>, your ultimate online fashion
              destination where style meets affordability. We bring you
              the latest trends in clothing, footwear, and accessories for 
              everyone — men, women, and kids. Whether you're dressing for a
              casual day out, a special event, or simply upgrading your everyday wardrobe,
              E-comarce has something for every taste and occasion.
            </p>
            <p>
              At <strong>E-comarce</strong>, we believe fashion should be accessible to all.
              That's why we offer high-quality pieces, modern designs, and great deals — all
              in one easy-to-shop platform. Enjoy a seamless shopping experience with secure
              payments, fast delivery, and exceptional customer service.
            </p>
          </>
        ) : (
          <div className="reviews-section">
            <h3>Customer Reviews</h3>
            <p>⭐️⭐️⭐️⭐️☆ - "Great quality products and super fast delivery!"</p>
            <p>⭐️⭐️⭐️⭐️⭐️ - "Loved the designs! I'll definitely shop again."</p>
            <p>⭐️⭐️⭐️☆☆ - "Good overall, but delivery took a bit longer than expected."</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DescriptionBox
