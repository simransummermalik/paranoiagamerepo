import { useState } from "react";
import "./NinerNetLogin.css";

export default function NinerNetLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin(username);
    }, 1200);
  };

  return (
    <div className="ninernet-login-container">
      <div className="ninernet-login-box">
        {/* UNCC Header */}
        <div className="ninernet-header">
          <div className="uncc-logo-section">
            <svg className="uncc-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="80" height="80" fill="#00703C" />
              <text x="50" y="65" textAnchor="middle" fill="white" fontSize="40" fontFamily="Arial, sans-serif" fontWeight="bold">49</text>
            </svg>
            <div className="uncc-text">
              <h1>UNC Charlotte</h1>
              <p className="ninernet-subtitle">NinerNET Portal</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="ninernet-form-container">
          <h2 className="ninernet-form-title">Sign In</h2>
          <p className="ninernet-form-subtitle">Use your NinerNET credentials</p>

          <form onSubmit={handleSubmit} className="ninernet-form">
            <div className="ninernet-input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username@charlotte.edu"
                autoComplete="username"
                required
                className="ninernet-input"
              />
            </div>

            <div className="ninernet-input-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="ninernet-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="ninernet-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="ninernet-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner">Authenticating...</span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="ninernet-footer">
            <div className="footer-links">
              <a href="#">Need help signing in?</a>
              <span className="divider">|</span>
              <a href="#">Account Registration</a>
            </div>
            <p className="security-notice">
              🔒 This is a secure system. Unauthorized access is prohibited and will be logged.
            </p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="ninernet-bottom-info">
          <p>For technical support, contact:</p>
          <p><strong>ITS Help Desk:</strong> (704) 687-5500 | helpdesk@charlotte.edu</p>
          <p className="ninernet-version">NinerNET Portal v2.8.4 | © 2025 UNC Charlotte</p>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="ninernet-background-pattern"></div>
    </div>
  );
}
