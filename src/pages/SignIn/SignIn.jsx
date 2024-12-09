import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import authimg from "../../assets/authimg.png";
import icongoogle from "../../assets/icongoogle.png";
import imgrauth from "../../assets/imgrauth.png";
import line from "../../assets/Line.png";
import lineo from "../../assets/Lineo.png";
import SignUp from "../SignUp/SignUp";
import "./SignIn.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      setSuccess("Login successful! Redirecting...");
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        navigate("/homepage");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again"
      );
    }
  };

  return (
    <div className="signin-container">
      <div className="signup-left">
        <h2>Sign In</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="cf_firstname">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="cf_firstname">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="checkk">
            <input type="checkbox" id="checkbox" name="checkbox" />
            <label htmlFor="checkbox">Remember me</label>
          </div>
          <button type="submit" className="sub-mitin">
            Sign In
          </button>
        </form>
        <div className="ordivin">
          <img src={lineo} alt="" />
          <h3>or</h3>
          <img src={line} alt="" />
        </div>
        <div className="google">
          <button>
            <img src={icongoogle} alt="" />
            <p>Continue with Google</p>
          </button>
        </div>
        <div className="already">
          <p>Already have an account?</p>
          <Link to="/">Sign up</Link>
        </div>
      </div>
      <div className="signup-rightt">
        <img className="betalogoo" src={imgrauth} alt="" />
        <img className="homedemoo" src={authimg} alt="homedemo" />
      </div>
    </div>
  );
};

export default SignIn;
