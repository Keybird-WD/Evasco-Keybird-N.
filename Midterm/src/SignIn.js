import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

function SignInForm() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate();

  const handleChange = evt => {
    const { name, value } = evt.target;
    setState(prevState => ({ ...prevState, [name]: value }));
    setError("");
    
    if (name === "email") {
      // Only validate if email ends with @gmail.com
      const isValid = value.toLowerCase().endsWith('@gmail.com');
      setIsEmailValid(isValid);
    }
    
    if (name === "password") {
      setIsPasswordValid(true);
    }
  };

  const validCredentials = {
    email: "user@gmail.com",
    password: "password123"
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
    const { email, password } = state;

    // Check if email ends with @gmail.com
    if (!email.toLowerCase().endsWith('@gmail.com')) {
      setIsEmailValid(false);
      return;
    }
    
    if (email === validCredentials.email && password === validCredentials.password) {
      // Set authentication status and navigate to dashboard
      localStorage.setItem("isAuthenticated", "true");
      window.location.href = "/dashboard"; // Force a full page reload
    } else {
      setError("Invalid email or password. Please try again.");
      if (email !== validCredentials.email) setIsEmailValid(false);
      if (password !== validCredentials.password) setIsPasswordValid(false);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>WELCOME</h1>
        <div className="social-container">
          <a href="#" className="social"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="#" className="social"><FontAwesomeIcon icon={faGooglePlusG} /></a>
          <a href="#" className="social"><FontAwesomeIcon icon={faLinkedinIn} /></a>
        </div>
        <span>or use your Gmail account</span>
        {error && <div className="error-message" style={{ color: "red", margin: "10px 0" }}>{error}</div>}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          required
          style={{ border: isEmailValid ? "1px solid #ccc" : "1px solid red" }}
        />
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              border: isPasswordValid ? "1px solid #ccc" : "1px solid red"
            }}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer"
            }}
          />
        </div>
        <a href="#" className="forgot-password">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;