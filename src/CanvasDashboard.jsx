import "./CanvasDashboard.css";

export default function CanvasDashboard({ onAssignmentClick }) {
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
            {/* ITCS 3160 Course */}
            <div className="canvas-course-card">
              <div className="course-thumbnail" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%234a9eff'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='white' font-size='50' font-family='Arial'%3EDATABASE%3C/text%3E%3C/svg%3E')" }}>
                <div className="course-code">202580-FALL 2025-ITCS-3160-001-DATABASE DESIGN</div>
              </div>
              <div className="course-assignments">
                <div className="assignment-item">
                  <input type="checkbox" />
                  <span className="assignment-icon">📝</span>
                  <div className="assignment-details">
                    <div className="assignment-course">202580-FALL 2025-ITCS-3160-001-DATABASE DESIGN ASSIGNMENT</div>
                    <div className="assignment-title">SQL Query Optimization Lab</div>
                  </div>
                  <div className="assignment-meta">
                    <span className="assignment-status missing">Missing</span>
                    <span className="assignment-points">15 PTS</span>
                    <span className="assignment-due">DUE: 1:00 PM</span>
                  </div>
                </div>
                <div className="assignment-item">
                  <input type="checkbox" />
                  <span className="assignment-icon">📝</span>
                  <div className="assignment-details">
                    <div className="assignment-course">202580-FALL 2025-ITCS-3160-001-DATABASE DESIGN ASSIGNMENT</div>
                    <div className="assignment-title">ER Diagram Project</div>
                  </div>
                  <div className="assignment-meta">
                    <span className="assignment-points">25 PTS</span>
                    <span className="assignment-due">DUE: 11:59 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ITCS 4180 Course */}
            <div className="canvas-course-card">
              <div className="course-thumbnail" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%2328a745'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='white' font-size='50' font-family='Arial'%3EMOBILE%3C/text%3E%3C/svg%3E')" }}>
                <div className="course-code">202580-FALL 2025-ITCS-4180-002-MOBILE APP DEVELOPMENT</div>
              </div>
              <div className="course-assignments">
                <div className="assignment-item">
                  <input type="checkbox" />
                  <span className="assignment-icon">💬</span>
                  <div className="assignment-details">
                    <div className="assignment-course">202580-FALL 2025-ITCS-4180-002-MOBILE APP DEVELOPMENT ANNOUNCEMENT</div>
                    <div className="assignment-title">Week 8: React Native Navigation</div>
                  </div>
                  <div className="assignment-meta">
                    <span className="assignment-status replies">Replies</span>
                    <span className="assignment-due">9:05 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ITCS 3156 Course - THE SPECIAL ONE */}
            <div className="canvas-course-card" onClick={onAssignmentClick} style={{ cursor: "pointer" }}>
              <div className="course-thumbnail" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e91e63'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='white' font-size='40' font-family='Arial'%3EMACHINE%3C/text%3E%3Ctext x='200' y='200' text-anchor='middle' fill='white' font-size='40' font-family='Arial'%3ELEARNING%3C/text%3E%3C/svg%3E')" }}>
                <div className="course-code">202580-FALL 2025-ITCS-3156-001-MACHINE LEARNING</div>
              </div>
              <div className="course-assignments">
                <div className="assignment-item" style={{ background: "#fef7e0", border: "2px solid #f0ad4e" }}>
                  <input type="checkbox" />
                  <span className="assignment-icon">📝</span>
                  <div className="assignment-details">
                    <div className="assignment-course">202580-FALL 2025-ITCS-3156-001-MACHINE LEARNING ASSIGNMENT</div>
                    <div className="assignment-title" style={{ color: "#d97706", fontWeight: "600" }}>Lab 4: Neural Network Training on HPC Cluster</div>
                  </div>
                  <div className="assignment-meta">
                    <span className="assignment-points">100 PTS</span>
                    <span className="assignment-due">DUE: 11:59 PM</span>
                  </div>
                </div>
                <div className="assignment-item">
                  <input type="checkbox" />
                  <span className="assignment-icon">📝</span>
                  <div className="assignment-details">
                    <div className="assignment-course">202580-FALL 2025-ITCS-3156-001-MACHINE LEARNING PAGE</div>
                    <div className="assignment-title">Week 7: Gradient Descent</div>
                  </div>
                  <div className="assignment-meta">
                    <span className="assignment-due">TO DO: 11:59 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ITCS 3153 Course */}
            <div className="canvas-course-card">
              <div className="course-thumbnail" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%236c757d'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='white' font-size='35' font-family='Arial'%3EDATA%3C/text%3E%3Ctext x='200' y='190' text-anchor='middle' fill='white' font-size='35' font-family='Arial'%3ESTRUCTURES%3C/text%3E%3C/svg%3E')" }}>
                <div className="course-code">202580-FALL 2025-ITCS-3153-002-DATA STRUCTURES & ALGORITHMS</div>
              </div>
              <div className="course-assignments">
                <div className="assignment-item">
                  <input type="checkbox" />
                  <span className="assignment-icon">📅</span>
                  <div className="assignment-details">
                    <div className="assignment-course">202580-FALL 2025-ITCS-3153-002-DATA STRUCTURES & ALGORITHMS CALENDAR EVENT</div>
                    <div className="assignment-title">Office Hours - Graph Algorithms</div>
                    <div className="assignment-subtitle">WOODWARD 350</div>
                  </div>
                  <div className="assignment-meta">
                    <span className="assignment-due">3:00 PM to 4:30 PM</span>
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
