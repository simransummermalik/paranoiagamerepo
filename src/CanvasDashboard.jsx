import { useState } from "react";
import "./CanvasDashboard.css";

export default function CanvasDashboard({ onAssignmentClick, username }) {
  return (
    <div className="canvas-page">
      {/* Canvas Header */}
      <div className="canvas-header">
        <div className="canvas-header-left">
          <svg width="40" height="40" viewBox="0 0 200 200" style={{ marginRight: "16px" }}>
            <rect width="200" height="200" fill="#E13F2B" rx="8"/>
            <circle cx="100" cy="100" r="70" fill="white"/>
            <path d="M100 40 L100 160 M40 100 L160 100" stroke="#E13F2B" strokeWidth="12" strokeLinecap="round"/>
          </svg>
          <div className="canvas-logo">Dashboard</div>
        </div>
        <div className="canvas-header-right">
          <button className="canvas-header-btn">Today</button>
          <button className="canvas-header-btn">+</button>
          <button className="canvas-header-btn">📋</button>
          <button className="canvas-header-btn notification-btn">
            🔔
            <span className="notification-badge">1</span>
          </button>
          <button className="canvas-header-btn">⋮</button>
          <div className="canvas-new-activity">NEW ACTIVITY ↑</div>
        </div>
      </div>

      {/* Canvas Sidebar */}
      <div className="canvas-sidebar">
        <div className="canvas-sidebar-item">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23666'/%3E%3Ctext x='20' y='26' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3EU%3C/text%3E%3C/svg%3E" alt="User" className="sidebar-avatar"/>
          <span>Account</span>
        </div>
        <div className="canvas-sidebar-item active">
          <span>📊</span>
          <span>Dashboard</span>
        </div>
        <div className="canvas-sidebar-item">
          <span>📚</span>
          <span>Courses</span>
        </div>
        <div className="canvas-sidebar-item">
          <span>👥</span>
          <span>Groups</span>
        </div>
        <div className="canvas-sidebar-item">
          <span>📅</span>
          <span>Calendar</span>
        </div>
        <div className="canvas-sidebar-item">
          <span>📥</span>
          <span>Inbox</span>
          <span className="inbox-count">37</span>
        </div>
        <div className="canvas-sidebar-item">
          <span>🕐</span>
          <span>History</span>
        </div>
        <div className="canvas-sidebar-item">
          <span>🎬</span>
          <span>Studio</span>
        </div>
        <div className="canvas-sidebar-item">
          <span>❓</span>
          <span>Help</span>
          <span className="help-badge">10</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="canvas-main">
        <div className="canvas-content">
          <h1 className="canvas-title">Today</h1>
          <p className="canvas-date">November 6</p>

          {/* Course Cards */}
          <div className="canvas-courses">
            {/* BINF Course */}
            <div className="canvas-course-card">
              <div className="course-thumbnail" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%234a9eff'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='white' font-size='60' font-family='Arial'%3EDNA%3C/text%3E%3C/svg%3E')" }}>
                <div className="course-code">202580-FALL 2025-BINF-3101-001-SEQUENCE ANALYSIS</div>
              </div>
              <div className="course-assignments">
                <div className="assignment-item">
                  <input type="checkbox" />
                  <span className="assignment-icon">📝</span>
                  <div className="assignment-details">
                    <div className="assignment-course">202580-FALL 2025-BINF-3101-001-SEQUENCE ANALYSIS ASSIGNMENT</div>
                    <div className="assignment-title">RAQ #20</div>
                  </div>
                  <div className="assignment-meta">
                    <span className="assignment-status missing">Missing</span>
                    <span className="assignment-points">0.75 PTS</span>
                    <span className="assignment-due">DUE: 1:00 PM</span>
                  </div>
                </div>
                <div className="assignment-item">
                  <input type="checkbox" />
                  <span className="assignment-icon">📝</span>
                  <div className="assignment-details">
                    <div className="assignment-course">202580-FALL 2025-BINF-3101-001-SEQUENCE ANALYSIS ASSIGNMENT</div>
                    <div className="assignment-title">Lab 10 Worksheet: TFs</div>
                  </div>
                  <div className="assignment-meta">
                    <span className="assignment-points">3 PTS</span>
                    <span className="assignment-due">DUE: 11:59 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BIOL Course */}
            <div className="canvas-course-card">
              <div className="course-thumbnail" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%2328a745'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='white' font-size='50' font-family='Arial'%3EBIOLOGY%3C/text%3E%3C/svg%3E')" }}>
                <div className="course-code">202580-FALL 2025-BIOL-3166L_COMBINED</div>
              </div>
              <div className="course-assignments">
                <div className="assignment-item">
                  <input type="checkbox" />
                  <span className="assignment-icon">💬</span>
                  <div className="assignment-details">
                    <div className="assignment-course">202580-FALL 2025-BIOL-3166L_COMBINED ANNOUNCEMENT</div>
                    <div className="assignment-title">L04 and L06: Week 8 Intro</div>
                  </div>
                  <div className="assignment-meta">
                    <span className="assignment-status replies">Replies</span>
                    <span className="assignment-due">9:05 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MATH Course - THE SPECIAL ONE */}
            <div className="canvas-course-card" onClick={onAssignmentClick} style={{ cursor: "pointer" }}>
              <div className="course-thumbnail" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e91e63'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='white' font-size='40' font-family='Arial'%3EMATH%3C/text%3E%3C/svg%3E')" }}>
                <div className="course-code">202580-FALL 2025-MATH-2164-003-MATRICES & LINEAR ALGEBRA</div>
              </div>
              <div className="course-assignments">
                <div className="assignment-item" style={{ background: "#fef7e0", border: "2px solid #f0ad4e" }}>
                  <input type="checkbox" />
                  <span className="assignment-icon">📝</span>
                  <div className="assignment-details">
                    <div className="assignment-course">202580-FALL 2025-MATH-2164-003-MATRICES & LINEAR ALGEBRA ASSIGNMENT</div>
                    <div className="assignment-title" style={{ color: "#d97706", fontWeight: "600" }}>6.3 - HPC Cluster Access Required</div>
                  </div>
                  <div className="assignment-meta">
                    <span className="assignment-points">10 PTS</span>
                    <span className="assignment-due">DUE: 11:59 PM</span>
                  </div>
                </div>
                <div className="assignment-item">
                  <input type="checkbox" />
                  <span className="assignment-icon">📝</span>
                  <div className="assignment-details">
                    <div className="assignment-course">202580-FALL 2025-MATH-2164-003-MATRICES & LINEAR ALGEBRA PAGE</div>
                    <div className="assignment-title">nov5 6.2-3</div>
                  </div>
                  <div className="assignment-meta">
                    <span className="assignment-due">TO DO: 11:59 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card */}
            <div className="canvas-course-card">
              <div className="course-thumbnail" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%236c757d'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='white' font-size='40' font-family='Arial'%3EPROJECT%3C/text%3E%3C/svg%3E')" }}>
                <div className="course-code">PROJECT - PAL MATH 2164 RESOURCE PAGE - FALL 2025</div>
              </div>
              <div className="course-assignments">
                <div className="assignment-item">
                  <input type="checkbox" />
                  <span className="assignment-icon">📅</span>
                  <div className="assignment-details">
                    <div className="assignment-course">PROJECT - PAL MATH 2164 RESOURCE PAGE - FALL 2025 CALENDAR EVENT</div>
                    <div className="assignment-title">PAL SESSION - MATH 2164</div>
                    <div className="assignment-subtitle">DENNY 106</div>
                  </div>
                  <div className="assignment-meta">
                    <span className="assignment-due">5:00 PM to 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tomorrow Section */}
          <h2 className="canvas-section-title">Tomorrow, November 7</h2>
        </div>
      </div>
    </div>
  );
}
