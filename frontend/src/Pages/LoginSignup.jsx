import { useState } from "react";
import "./CSS/LoginSignup.css";

const API_URL = "https://e-commerce-1-6kbc.onrender.com";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandelar = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.errors || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }
  };

  const signup = async () => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.errors || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server error");
    }
  };

  const goToSignUp = () => setState("Sign Up");
  const goToLogin = () => setState("Login");

  return (
    <div className="auth-wrapper">
      <div className={`auth-container ${state === "Sign Up" ? "right-panel-active" : ""}`}>

        {/* SIGN UP FORM */}
        <div className="auth-form signup-form">
          <div className="form-inner">
            <h1>Create Account</h1>
            <p className="auth-subtitle">Join Nandi Fashions for exclusive drops.</p>
            <input name="username" value={formData.username} onChange={changeHandelar} type="text" placeholder="Full Name" />
            <input name="email" value={formData.email} onChange={changeHandelar} type="email" placeholder="Email Address" />
            <input name="password" value={formData.password} onChange={changeHandelar} type="password" placeholder="Password" />
            <button className="auth-btn" onClick={signup}>Sign Up</button>
            <p className="auth-switch">Already have an account? <span onClick={goToLogin}>Sign In</span></p>
          </div>
        </div>

        {/* SIGN IN FORM */}
        <div className="auth-form signin-form">
          <div className="form-inner">
            <h1>Welcome Back</h1>
            <p className="auth-subtitle">Log in to access your curated collection.</p>
            <input name="email" value={formData.email} onChange={changeHandelar} type="email" placeholder="Email Address" />
            <input name="password" value={formData.password} onChange={changeHandelar} type="password" placeholder="Password" />
            <button className="auth-btn" onClick={login}>Sign In</button>
            <p className="auth-switch">Don't have an account? <span onClick={goToSignUp}>Sign Up</span></p>
          </div>
        </div>

        {/* SLIDING OVERLAY */}
        <div className="auth-overlay-container">
          <div className="auth-overlay">
            <div className="overlay-panel overlay-left">
              <h2>Already a Member?</h2>
              <p>Log in with your details to stay connected.</p>
              <button className="ghost-btn" onClick={goToLogin}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>New Here?</h2>
              <p>Start your fashion journey with Nandi Fashions.</p>
              <button className="ghost-btn" onClick={goToSignUp}>Sign Up</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginSignup;
