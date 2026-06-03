import React from 'react'
import './Footer.css'

const footer_logo = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888442/logo_big_g7dgwb.png"
const instagram_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888574/instagram_icon_t1v79v.png"
const pintester_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888585/pintester_icon_y7ltxp.png"
const whatsapp_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888601/whatsapp_icon_oehlpg.png"

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src={footer_logo} alt="Footer Logo" />
          <p>Nandi Fashions</p>
          <span className="footer-logo-desc">Your destination for curated fashion — quality pieces for every occasion, every style.</span>
          <div className="footer-social-icons">
            <div className="footer-icons-container">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <img src={instagram_icon} alt="Instagram" />
              </a>
              <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
                <img src={pintester_icon} alt="Pinterest" />
              </a>
              <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                <img src={whatsapp_icon} alt="WhatsApp" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><a href="/mens">Men</a></li>
            <li><a href="/womens">Women</a></li>
            <li><a href="/kids">Kids</a></li>
            <li><a href="/">New Arrivals</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul className="footer-links">
            <li><a href="/">About Us</a></li>
            <li><a href="/">Contact</a></li>
            <li><a href="/">Privacy Policy</a></li>
            <li><a href="/">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-copyright">
        <p>© 2025 Nandi Fashions. All rights reserved.</p>
        <p>Crafted with care in Durgapur, West Bengal</p>
      </div>
    </div>
  )
}

export default Footer
