import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const logo =
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770889885/logo_dsiqov.png";
const cart_icon =
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888749/cart_icon_bhrfar.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [mobileMenu, setMobileMenu] = useState(false);

  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className="navbar">
      {/* LOGO */}
      <div className="nav_logo">
        <img src={logo} alt="logo" />
        <p>E-Commerce</p>
      </div>

      {/* MENU BUTTON */}
      <div className="hamburger" onClick={() => setMobileMenu(!mobileMenu)}>
        ☰
      </div>

      {/* MENU */}
      <ul className={`navmenu ${mobileMenu ? "active" : ""}`}>
        <li onClick={() => setMenu("shop")}>
          <Link to="/">SHOP</Link>
        </li>

        <li onClick={() => setMenu("men")}>
          <Link to="/mens">MEN</Link>
        </li>

        <li onClick={() => setMenu("women")}>
          <Link to="/womens">WOMEN</Link>
        </li>

        <li onClick={() => setMenu("kids")}>
          <Link to="/kids">KIDS</Link>
        </li>
      </ul>

      {/* LOGIN + CART */}
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            LOGOUT
          </button>
        ) : (
          <Link to="/login">
            <button>LOGIN</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="cart" className="cart-icon" />
        </Link>

        <div className="nav-cart-count">
          {getTotalCartItems()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
