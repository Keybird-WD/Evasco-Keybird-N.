import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

function SignUpForm() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email validation function with provider restriction
  const validateEmail = (email) => {
    if (!email) return true; // Empty is not invalid until submission
    
    // Basic format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    
    // Email provider validation
    const validProviders = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const emailDomain = email.split('@')[1]?.toLowerCase();
    
    return validProviders.some(provider => emailDomain === provider);
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    setState(prevState => ({ ...prevState, [name]: value }));
    setError("");
    
    // Immediately validate email on each keystroke
    if (name === "email") {
      setIsEmailValid(validateEmail(value));
    }
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
    
    // Validate email on submission
    const emailValid = validateEmail(state.email);
    setIsEmailValid(emailValid);
    
    if (!emailValid) {
      setError("Please use a valid Email.");
      return;
    }
    
    // In a real app, you would call an API to create the user
    // For now, just simulate a successful registration
    localStorage.setItem("isAuthenticated", "true");
    window.location.href = "/dashboard"; // Force a full page reload to ensure App component rerenders
  };

  // Only apply error styling when email is invalid, otherwise don't specify any custom styling
  const getEmailInputStyle = () => {
    if (!isEmailValid) {
      return { 
        border: "1px solid red",
        backgroundColor: "rgba(255, 0, 0, 0.05)"
      };
    }
    return {}; // Return empty object for default styling
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        
        <div className="social-container">
          <a href="#" className="social"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="#" className="social"><FontAwesomeIcon icon={faGooglePlusG} /></a>
          <a href="#" className="social"><FontAwesomeIcon icon={faLinkedinIn} /></a>
        </div>
        
        <span>or use your email for registration</span>
        
        {error && (
          <div className="error-message" style={{ color: "red", margin: "10px 0" }}>
            {error}
          </div>
        )}
        
        <input 
          type="text" 
          name="name" 
          value={state.name} 
          onChange={handleChange} 
          placeholder="Name" 
          required 
        />
        
        <input 
          type="email" 
          name="email" 
          value={state.email} 
          onChange={handleChange} 
          placeholder="Email" 
          required 
          style={getEmailInputStyle()} 
        />
        
        <div style={{ position: "relative", width: "100%" }}>
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            value={state.password} 
            onChange={handleChange} 
            placeholder="Password" 
            required 
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
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;