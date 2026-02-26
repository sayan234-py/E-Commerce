import React from 'react'
import './Footer.css'
// import footer_logo from '../Assets/logo_big.png'
// import instagram_icon from '../Assets/instagram_icon.png'
// import pintester_icon from '../Assets/pintester_icon.png'
// import whatsapp_icon from '../Assets/whatsapp_icon.png'

const footer_logo = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888442/logo_big_g7dgwb.png"
const instagram_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888574/instagram_icon_t1v79v.png"
const pintester_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888585/pintester_icon_y7ltxp.png"
const whatsapp_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888601/whatsapp_icon_oehlpg.png"
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="Footer Logo" />
        <p>E-COMMERCE</p>
      </div>
      <ul className="footer-links">
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
            <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <img src={instagram_icon} alt="Instagram Icon" />
            </a>
            <a href="https://www.pinterest.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <img src={pintester_icon} alt="Pinterest Icon" />
            </a>
            <a href="https://www.whatsapp.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <img src={whatsapp_icon} alt="WhatsApp Icon" />
            </a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>© 2023 E-COMMERCE. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer