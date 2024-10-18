// src/components/Signup.js
import "./CustomStyles.css";
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true); // State to toggle between Sign Up and Log In
  const navigate = useNavigate(); // Initialize navigate

  // Memoize user information for optimization
  const userInfo = useMemo(
    () => ({ name, email, password, confirmPassword }),
    [name, email, password, confirmPassword]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match for sign up
    if (isSignUp && userInfo.password !== userInfo.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Save the user info to localStorage (consider saving securely in real apps)
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ name: userInfo.name, email: userInfo.email })
    );

    // Add logic for signup (API call or any other logic)
    console.log("Name:", userInfo.name);
    console.log("Email:", userInfo.email);
    console.log("Password:", userInfo.password);

    if (isSignUp) {
      // Change to Log In after successful Sign Up
      setIsSignUp(false);
    } else {
      // Navigate to home page on Log In
      navigate("/home"); // Navigate to Home
    }
  };

  return (
    <div className="signup-container">
      <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          {isSignUp && (
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control" // Add the class for styling
              />
            </div>
          )}
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control" // Add the class for styling
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control" // Add the class for styling
            />
          </div>
          {isSignUp && (
            <div>
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-control" // Add the class for styling
              />
            </div>
          )}
          <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
