import { useState, useRef } from "react";
import Draggable from "react-draggable";
import "./HPCAccess.css";

export default function HPCAccess({ onAccessGranted, username, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [terminalLines, setTerminalLines] = useState([
    `student@workstation:~$ `,
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCorruptedCommand, setShowCorruptedCommand] = useState(false);
  const draggableRef = useRef(null);

  const steps = [
    {
      title: "Step 1: Connect to Orion HPC Cluster",
      instruction: "Click below to establish SSH connection to the cluster",
      command: `ssh ${username}@orion.uncc.edu`,
      autoType: true,
    },
    {
      title: "Step 2: Load CUDA Module",
      instruction: "Load the CUDA toolkit for GPU acceleration",
      command: "module load cuda/11.8",
      autoType: true,
    },
    {
      title: "Step 3: Load Python Environment",
      instruction: "Activate the Python 3.10 environment",
      command: "module load python/3.10",
      autoType: true,
    },
    {
      title: "Step 4: Activate Virtual Environment",
      instruction: "Source the pre-configured machine learning environment",
      command: "source /shared/venvs/ml-lab/bin/activate",
      autoType: true,
    },
  ];

  const typeCommand = (command, callback) => {
    setIsTyping(true);
    let currentIndex = 0;
    const typingSpeed = 80;

    const typeInterval = setInterval(() => {
      if (currentIndex < command.length) {
        setTerminalLines(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = `student@workstation:~$ ${command.substring(0, currentIndex + 1)}`;
          return updated;
        });
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);

        // Add response after command completes
        setTimeout(() => {
          if (callback) callback();
        }, 500);
      }
    }, typingSpeed);
  };

  const executeStep = () => {
    const step = steps[currentStep];

    typeCommand(step.command, () => {
      // Add command output
      let output = [];

      if (currentStep === 0) {
        output = [
          `Connecting to orion.uncc.edu (152.46.17.89)...`,
          `Password: `,
          `Authenticated.`,
          `Welcome to Orion HPC Cluster`,
          `Last login: ${new Date().toLocaleDateString()} from 152.46.18.102`,
          ``,
        ];
      } else if (currentStep === 1) {
        output = [
          `Loading module: cuda/11.8`,
          `CUDA Toolkit 11.8 loaded successfully.`,
          ``,
        ];
      } else if (currentStep === 2) {
        output = [
          `Loading module: python/3.10`,
          `Python 3.10.4 loaded successfully.`,
          ``,
        ];
      } else if (currentStep === 3) {
        output = [
          `(ml-lab) Activating virtual environment...`,
          `Environment activated. PyTorch 2.0.1+cu118 available.`,
          ``,
        ];
      }

      setTerminalLines(prev => [...prev, ...output, `student@workstation:~$ `]);

      // Move to next step or show corrupted command
      if (currentStep < steps.length - 1) {
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
        }, 1000);
      } else {
        // After all steps, show corrupted SSH command
        setTimeout(() => {
          setShowCorruptedCommand(true);
          typeCorruptedCommand();
        }, 1500);
      }
    });
  };

  const typeCorruptedCommand = () => {
    const corruptedCmd = "ssh --jjdjd://█RESTRICTED_ACCESS█@node-∞∞∞.UNKNOWN";

    typeCommand(corruptedCmd, () => {
      setTerminalLines(prev => [
        ...prev,
        `ERROR: Connection hijacked`,
        `WARNING: Unauthorized protocol detected`,
        `Redirecting to secure channel...`,
        ``,
        `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`,
        ``,
      ]);

      setTimeout(() => {
        onAccessGranted(); // Trigger IntroOverlay
      }, 2000);
    });
  };

  return (
    <div className="hpc-overlay">
      {/* Canvas Dashboard in Background */}
      <div className="canvas-background">
        <div className="canvas-top-bar">
          <div className="canvas-logo-section">
            <svg width="30" height="30" viewBox="0 0 200 200">
              <rect width="200" height="200" fill="#E13F2B" rx="8"/>
              <circle cx="100" cy="100" r="70" fill="white"/>
              <path d="M100 40 L100 160 M40 100 L160 100" stroke="#E13F2B" strokeWidth="12" strokeLinecap="round"/>
            </svg>
            <span>Canvas</span>
          </div>
        </div>

        <div className="canvas-help-banner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0084D1" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          <span>Follow the instructions in the HPC Lab window to complete your assignment</span>
        </div>
      </div>

      {/* Draggable HPC Lab Window */}
      <Draggable handle=".hpc-window-header" defaultPosition={{ x: 100, y: 80 }} nodeRef={draggableRef}>
        <div ref={draggableRef} className="hpc-window">
          <div className="hpc-window-header">
            <div className="hpc-window-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
              </svg>
              <span>Lab 4: Neural Network Training on HPC Cluster - ITCS 3156</span>
            </div>
            <button className="hpc-close-btn" onClick={onClose}>×</button>
          </div>

          <div className="hpc-window-content">
            {/* Left Panel - Instructions */}
            <div className="hpc-instructions-panel">
              <div className="instruction-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <h2>Assignment Instructions</h2>
              </div>

              <div className="instruction-section">
                <h3>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D3B45" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  Current Step: {currentStep + 1} of {steps.length}
                </h3>
                <div className="current-step">
                  <h4>{steps[currentStep]?.title}</h4>
                  <p>{steps[currentStep]?.instruction}</p>
                </div>

                {!showCorruptedCommand && (
                  <button
                    className="execute-step-btn"
                    onClick={executeStep}
                    disabled={isTyping}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    {isTyping ? "Executing..." : "Execute Command"}
                  </button>
                )}

                <div className="step-progress">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`progress-dot ${index <= currentStep ? 'completed' : ''}`}
                    />
                  ))}
                </div>
              </div>

              <div className="assignment-details">
                <h3>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D3B45" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                  </svg>
                  Learning Objectives
                </h3>
                <ul>
                  <li>Connect to remote HPC clusters via SSH</li>
                  <li>Configure CUDA for GPU-accelerated computing</li>
                  <li>Manage Python virtual environments</li>
                  <li>Train deep learning models on distributed systems</li>
                </ul>
              </div>

              <div className="assignment-meta">
                <div className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7780" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  <span>Due: Nov 6 at 11:59pm</span>
                </div>
                <div className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7780" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>Student: {username}</span>
                </div>
                <div className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7780" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  <span>100 points</span>
                </div>
              </div>
            </div>

            {/* Right Panel - Terminal */}
            <div className="hpc-terminal-panel">
              <div className="terminal-header">
                <div className="terminal-controls">
                  <span className="terminal-dot red"></span>
                  <span className="terminal-dot yellow"></span>
                  <span className="terminal-dot green"></span>
                </div>
                <span className="terminal-title">orion.uncc.edu - Terminal</span>
              </div>
              <div className="terminal-body">
                {terminalLines.map((line, i) => (
                  <div key={i} className="terminal-line">
                    {line}
                  </div>
                ))}
                {isTyping && <span className="terminal-cursor">▊</span>}
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
