import React from 'react'
import './Footer.css'

const footer_logo = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888442/logo_big_g7dgwb.png"
const instagram_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888574/instagram_icon_t1v79v.png"
const pintester_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888585/pintester_icon_y7ltxp.png"
const whatsapp_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888601/whatsapp_icon_oehlpg.png"

const Footer = () => {
  return (
    <div className="genz-footer">
      <div className="footer-grid">
        
        {/* Left Info Panel */}
        <div className="footer-brand-panel">
          <div className="footer-logo-container">
            <img src={footer_logo} alt="Footer Logo" className="brutalist-logo" />
            <h2>NANDI FASHIONS</h2>
          </div>
          <p className="brand-manifesto">
            YOUR DESTINATION FOR CURATED STREETWEAR — HARD-HITTING PIECES FOR EVERY STYLE GRID.
          </p>
          
          {/* Social Icons inside a unified sticker block */}
          <div className="social-sticker-box">
            <span className="sticker-label">CONNECT //</span>
            <div className="icons-flex">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="icon-link">
                <img src={instagram_icon} alt="Instagram" />
              </a>
              <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer" className="icon-link">
                <img src={pintester_icon} alt="Pinterest" />
              </a>
              <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="icon-link">
                <img src={whatsapp_icon} alt="WhatsApp" />
              </a>
            </div>
          </div>
        </div>

        {/* Links Panel 1 */}
        <div className="footer-nav-panel">
          <div className="nav-header-badge">EXPLORE</div>
          <ul className="brutalist-links">
            <li><a href="/mens">MEN ↗</a></li>
            <li><a href="/womens">WOMEN ↗</a></li>
            <li><a href="/kids">KIDS ↗</a></li>
            <li><a href="/">NEW ARRIVALS ↗</a></li>
          </ul>
        </div>

        {/* Links Panel 2 */}
        <div className="footer-nav-panel support-panel">
          <div className="nav-header-badge support-badge">SUPPORT</div>
          <ul className="brutalist-links">
            <li><a href="/">ABOUT US</a></li>
            <li><a href="/">CONTACT</a></li>
            <li><a href="/">PRIVACY</a></li>
            <li><a href="/">TERMS</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Ticker/Copyright Row */}
      <div className="footer-meta-row">
        <p className="copyright-tag">© 2026 NANDI FASHIONS. OUT NOW.</p>
        <p className="location-tag">CRAFTED WITH CARE IN DURGAPUR, WB // DESIGNED OUTSIDE THE BOX</p>
      </div>
    </div>
  )
}

export default Footer
