import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import "./styles.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import Dashboard from "./Dashboard";

function AuthLayout() {
  const [type, setType] = useState("signIn");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Update type based on the URL path
    if (location.pathname === "/signup") {
      setType("signUp");
    } else if (location.pathname === "/signin") {
      setType("signIn");
    }
  }, [location.pathname]);

  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      navigate(text === "signUp" ? "/signup" : "/signin");
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      <h2></h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1a>Cadbury</h1a>
              <p>
              There are 36 squares of chocolate in a block of Cadbury Dairy Milk and there are unlimited ways you can share 
              them. We've designed 12 limited edition bars, to make sharing even easier.
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1a>Cadbury</h1a>
              <p>One of the world's chocolate giants, is based on the signature of William Cadbury, a grandson of the company's founder.</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount and whenever localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(authStatus === "true");
    };

    // Check immediately when component mounts
    checkAuth();

    // Set up event listener for storage changes (in case another tab changes auth)
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/signin" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <AuthLayout />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <AuthLayout />} 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} />} 
        />
      </Routes>
    </Router>
  );
}