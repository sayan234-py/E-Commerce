import React, { useContext, useState } from "react";
import "./Navbar.css";
// import logo from "../Assets/logo.png";
// import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const logo = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770889885/logo_dsiqov.png"
const cart_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770888749/cart_icon_bhrfar.png"

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [mobileMenu, setMobileMenu] = useState(false);
  const { getTotalCartItmes } = useContext(ShopContext);

  return (
    <div className="navbar">
      {/* LOGO */}
      <div className="nav_logo">
        <img src={logo} alt="logo" />
        <p>E-Commerce</p>
      </div>

      {/* HAMBURGER */}
      <div
        className="hamburger"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        ☰
      </div>

      {/* MENU */}
      <ul className={`navmenu ${mobileMenu ? "active" : ""}`}>
        <li onClick={() => { setMenu("shop"); setMobileMenu(false); }}>
          <Link to="/">SHOP</Link>
          {menu === "shop" && <hr />}
        </li>

        <li onClick={() => { setMenu("men"); setMobileMenu(false); }}>
          <Link to="/mens">MEN</Link>
          {menu === "men" && <hr />}
        </li>

        <li onClick={() => { setMenu("women"); setMobileMenu(false); }}>
          <Link to="/womens">WOMEN</Link>
          {menu === "women" && <hr />}
        </li>

        <li onClick={() => { setMenu("kids"); setMobileMenu(false); }}>
          <Link to="/kids">KIDS</Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>

      {/* LOGIN + CART (ALWAYS VISIBLE) */}
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
          <img src={cart_icon} alt="Cart Icon" className="cart-icon" />
        </Link>

        <div className="nav-cart-count">{getTotalCartItmes()}</div>
      </div>
    </div>
  );
};

export default Navbar;
