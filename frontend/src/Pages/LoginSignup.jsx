import { useState } from "react";
import "./LoginSignup.css";

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
        headers: {
          "Content-Type": "application/json",
        },
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
        headers: {
          "Content-Type": "application/json",
        },
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

  return (
    <div className="sliding-auth-wrapper">
      {/* The "right-panel-active" class triggers the CSS sliding animation 
        based on your React state.
      */}
      <div className={`sliding-container ${state === "Sign Up" ? "right-panel-active" : ""}`}>
        
        {/* --- SIGN UP FORM (Left Side) --- */}
        <div className="form-container sign-up-container">
          <form onSubmit={(e) => { e.preventDefault(); signup(); }}>
            <h1>Create Account</h1>
            <p className="subtitle">Join Nandi Fashions for exclusive drops.</p>
            
            <input
              name="username"
              value={formData.username}
              onChange={changeHandelar}
              type="text"
              placeholder="Full Name"
              required={state === "Sign Up"}
            />
            <input
              name="email"
              value={formData.email}
              onChange={changeHandelar}
              type="email"
              placeholder="Email Address"
              required
            />
            <input
              name="password"
              value={formData.password}
              onChange={changeHandelar}
              type="password"
              placeholder="Password"
              required
            />
            
            <button type="submit" className="action-btn">Sign Up</button>
          </form>
        </div>

        {/* --- SIGN IN FORM (Right Side) --- */}
        <div className="form-container sign-in-container">
          <form onSubmit={(e) => { e.preventDefault(); login(); }}>
            <h1>Welcome Back</h1>
            <p className="subtitle">Log in to access your curated collection.</p>
            
            <input
              name="email"
              value={formData.email}
              onChange={changeHandelar}
              type="email"
              placeholder="Email Address"
              required
            />
            <input
              name="password"
              value={formData.password}
              onChange={changeHandelar}
              type="password"
              placeholder="Password"
              required
            />
            <a href="#forgot" className="forgot-link">Forgot your password?</a>
            
            <button type="submit" className="action-btn">Sign In</button>
          </form>
        </div>

        {/* --- THE SLIDING OVERLAY (Contains the Photos) --- */}
        <div className="overlay-container">
          <div className="overlay">
            
            {/* Left Photo Panel (Visible when Sign Up is active) */}
            <div className="overlay-panel overlay-left">
              <h2>Already a member?</h2>
              <p>Log in with your personal info to stay connected.</p>
              <button 
                type="button" 
                className="ghost-btn" 
                onClick={() => setState("Login")}
              >
                Sign In
              </button>
            </div>
            
            {/* Right Photo Panel (Visible when Login is active) */}
            <div className="overlay-panel overlay-right">
              <h2>New Here?</h2>
              <p>Enter your details and start your fashion journey with us.</p>
              <button 
                type="button" 
                className="ghost-btn" 
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginSignup;
