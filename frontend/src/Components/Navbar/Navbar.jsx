import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const logo = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770889885/logo_dsiqov.png";
const cart_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888749/cart_icon_bhrfar.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [mobileMenu, setMobileMenu] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className="navbar">
      <div className="nav_logo">
        <img src={logo} alt="logo" />
        <p>Nandi Fashions</p>
      </div>

      <button className="hamburger" onClick={() => setMobileMenu(!mobileMenu)}>☰</button>

      <ul className={`navmenu ${mobileMenu ? "active" : ""}`}>
        <li onClick={() => setMenu("shop")}><Link to="/">Shop</Link></li>
        <li onClick={() => setMenu("men")}><Link to="/mens">Men</Link></li>
        <li onClick={() => setMenu("women")}><Link to="/womens">Women</Link></li>
        <li onClick={() => setMenu("kids")}><Link to="/kids">Kids</Link></li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button onClick={() => { localStorage.removeItem("auth-token"); window.location.replace("/"); }}>
            Logout
          </button>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}

        <Link to="/cart">
          <div className="cart-wrapper">
            <img src={cart_icon} alt="cart" className="cart-icon" />
            {getTotalCartItems() > 0 && (
              <div className="nav-cart-count">{getTotalCartItems()}</div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
