import { useState } from "react";
import "./NinerNetLogin.css";

export default function NinerNetLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin(username);
    }, 1400);
  };

  return (
    <div className="uncc-auth-page">
      {/* Top Green Banner */}
      <div className="uncc-top-banner">
        <div className="uncc-banner-content">
          <svg className="uncc-banner-logo" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="60" fill="white" rx="2"/>
            <text x="30" y="42" textAnchor="middle" fill="#00703C" fontSize="32" fontFamily="Arial, sans-serif" fontWeight="bold">49</text>
          </svg>
          <span className="uncc-banner-text">CHARLOTTE</span>
        </div>
        <h1 className="uncc-banner-title">Web Authentication @ Charlotte</h1>
      </div>

      {/* Main Container */}
      <div className="uncc-main-container">
        {/* Left Side - Campus Image */}
        <div className="uncc-image-side">
          <div className="campus-image"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="uncc-form-side">
          <div className="uncc-form-content">
            <div className="form-header">
              <label className="form-label">
                NinerNET ID:
                <span className="info-icon" title="Your NinerNET username">ⓘ</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="uncc-form-input"
                  required
                />
                <div className="input-icons">
                  <span className="duo-icon">🔐</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password:</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="uncc-form-input"
                  required
                />
                <div className="input-icons">
                  <span className="duo-icon">🔐</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="uncc-login-button"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Log In"}
            </button>

            <div className="form-links">
              <a href="#" className="form-link">› Forgot your password?</a>
              <a href="#" className="form-link">› Get Duo Code</a>
            </div>

            <div className="form-notice">
              <p>Use of this service is conditional on compliance with the University's <a href="#">Computing Network Policies</a>.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Green Banner */}
      <div className="uncc-bottom-banner">
        <p>NOTICE: You MUST close and exit your browser program after log-out to ensure security.</p>
      </div>

      {/* Footer */}
      <div className="uncc-footer">
        <p>oit-webauth34</p>
      </div>
    </div>
  );
}
