import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import authimg from "../../assets/authimg.png";
import icongoogle from "../../assets/icongoogle.png";
import imgrauth from "../../assets/imgrauth.png";
import line from "../../assets/Line.png";
import lineo from "../../assets/Lineo.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (exe) => {
    const { name, value } = exe.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (exe) => {
    exe.preventDefault();
    setError("");
    setSuccess("");

    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    console.log("Password: ", formData.password);
    console.log("Confirm Password: ", formData.confirmPassword);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      );
      setSuccess("Signup successful! You can now log in.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again"
      );
    }
    console.log(formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1>SIGN UP</h1>
        <h2>
          Join our community of home seekers and explore the possibilities that
          await.{" "}
        </h2>
        <p>Lets get started by filling out the information below</p>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="cf_lastname">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>

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

          <div className="cf_firstname">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="check">
            <input type="checkbox" id="checkbox" name="checkbox" />
            <label htmlFor="checkbox">
              I agree to <span>Terms of Service</span> and{" "}
              <span>Privacy Policies</span>
            </label>
          </div>

          <button type="submit" className="sub-mit">
            Sign Up
          </button>
        </form>

        <div className="ordiv">
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
          <Link to="/signin">Sign in</Link>
        </div>
      </div>

      {/* ======================== */}
      <div className="signup-right">
        <img className="betalogo" src={imgrauth} alt="" />
        <img className="homedemo" src={authimg} alt="homedemo" />
      </div>
    </div>
  );
};

export default SignUp;
