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
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>

        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandelar}
              type="text"
              placeholder="Your Name"
            />
          )}

          <input
            name="email"
            value={formData.email}
            onChange={changeHandelar}
            type="email"
            placeholder="Your Email"
          />

          <input
            name="password"
            value={formData.password}
            onChange={changeHandelar}
            type="password"
            placeholder="Your Password"
          />
        </div>

        <button onClick={() => (state === "Login" ? login() : signup())}>
          Continue
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login</span>
          </p>
        ) : (
          <p>
            Create an account{" "}
            <span onClick={() => setState("Sign Up")}>Sign Up</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
