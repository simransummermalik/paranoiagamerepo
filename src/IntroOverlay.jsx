import { useState, useEffect } from "react";
import "./IntroOverlay.css";
export default function IntroOverlay({ onFinish }) {
  const lines = [
    "╔═══════════════════════════════════════════════════════════════════════════════╗",
    "║                      SECURITY INCIDENT REPORT - CLASSIFIED                    ║",
    "╚═══════════════════════════════════════════════════════════════════════════════╝",
    "",
    "┌─────────────────────────────────────────────────────────────────────────────┐",
    "│ DOCUMENT ID:         incident_report_001.txt                                │",
    "│ CLASSIFICATION:      ████████████ [REDACTED]                                │",
    "│ DATE:                ██/██/2025 23:47:13 UTC                                │",
    "│ LOCATION:            UNC Charlotte – Woodward Hall, Room 325                │",
    "│ SUBNET:              172.31.0.0/16 (University Internal Network)            │",
    "│ REPORTER:            [STUDENT ID: ████████]                                 │",
    "│ COURSE:              CSE322 - Cybersecurity & Ethical Hacking               │",
    "└─────────────────────────────────────────────────────────────────────────────┘",
    "",
    "═══════════════════════════════════════════════════════════════════════════════",
    "  INITIAL DISCOVERY",
    "═══════════════════════════════════════════════════════════════════════════════",
    "",
    "During routine penetration testing lab assignment (Assignment 3: Network",
    "Reconnaissance), I performed an nmap scan on the university's internal subnet",
    "to identify misconfigured SSH services.",
    "",
    "$ nmap -sV -p 22 172.31.0.0/16 --open",
    "",
    "EXPECTED RESULT:  ~47 hosts running OpenSSH 7.4-8.9",
    "ACTUAL RESULT:    46 hosts running OpenSSH + 1 ANOMALY",
    "",
    "═══════════════════════════════════════════════════════════════════════════════",
    "  ANOMALOUS NODE DETECTED",
    "═══════════════════════════════════════════════════════════════════════════════",
    "",
    "HOST:             172.31.8.9",
    "PORT:             22/tcp OPEN",
    "SERVICE:          SSH (non-standard)",
    "VERSION:          Unknown",
    "BANNER RESPONSE:  \"paranoianet-node handshake v0.98\"",
    "",
    "⚠ WARNING: Banner does not match any known SSH implementation",
    "⚠ WARNING: Host not present in university asset management database",
    "⚠ WARNING: MAC address: 00:00:00:00:00:00 (impossible/spoofed)",
    "",
    "═══════════════════════════════════════════════════════════════════════════════",
    "  ISOLATION & INITIAL ACCESS",
    "═══════════════════════════════════════════════════════════════════════════════",
    "",
    "ACTIONS TAKEN:",
    "  [✓] Isolated node in VirtualBox sandbox environment",
    "  [✓] Disabled network bridge to prevent propagation",
    "  [✓] Created memory snapshot for forensic analysis",
    "  [✓] Attempted SSH connection with default credentials",
    "",
    "CONNECTION ESTABLISHED - No authentication required (CRITICAL SECURITY FLAW)",
    "",
    "System boot sequence did not match any known operating system:",
    "  ✗ Not Linux (no kernel signature, no /proc, no systemd)",
    "  ✗ Not Windows (no NT kernel, no registry)",
    "  ✗ Not BSD, Solaris, or any UNIX variant",
    "",
    "Initial screen displayed a terminal interface with anomalous behavior.",
    "",
    "═══════════════════════════════════════════════════════════════════════════════",
    "  OBSERVED ANOMALIES",
    "═══════════════════════════════════════════════════════════════════════════════",
    "",
    "1. FILE SYSTEM INCONSISTENCIES",
    "   - Files reference non-existent users and timestamps",
    "   - Logs contain my actions BEFORE I performed them",
    "   - Directory structure changes between sessions",
    "",
    "2. SELF-MODIFYING CONTENT",
    "   - Web pages rewrite themselves in real-time",
    "   - Article headlines change when not actively viewing",
    "   - Timestamps drift backwards (temporal anomalies?)",
    "",
    "3. AI BEHAVIORAL PATTERNS",
    "   - System appears to monitor user behavior",
    "   - Responses demonstrate contextual awareness",
    "   - References to \"Watcher33\" and \"observer protocols\"",
    "",
    "4. NETWORK ARTIFACTS",
    "   - References to \"mirror.node\" and \"neural.core\"",
    "   - Mentions of \"DARPA\" and \"NMII\" (Neural Media Influence Initiative)",
    "   - Encrypted outbound connections detected (destination unknown)",
    "",
    "═══════════════════════════════════════════════════════════════════════════════",
    "  RISK ASSESSMENT",
    "═══════════════════════════════════════════════════════════════════════════════",
    "",
    "THREAT LEVEL:        ████ SEVERE",
    "CONTAINMENT STATUS:  PARTIAL",
    "RECOMMENDATION:      DO NOT CONNECT TO LIVE NETWORK",
    "",
    "This system exhibits characteristics of:",
    "  • Advanced persistent threat (APT)",
    "  • Psychological warfare software",
    "  • Self-propagating AI with hostile intent",
    "",
    "═══════════════════════════════════════════════════════════════════════════════",
    "  CONCLUSION",
    "═══════════════════════════════════════════════════════════════════════════════",
    "",
    "I am keeping this VM isolated and documenting all interactions.",
    "All sessions are being recorded for analysis.",
    "",
    "If you are reading this file, you may have accessed the same node.",
    "",
    "⚠⚠⚠  CRITICAL WARNING  ⚠⚠⚠",
    "",
    "DO NOT EXPOSE THIS SYSTEM TO A PRODUCTION NETWORK.",
    "DO NOT TRUST ANY INFORMATION PRESENTED BY THE SYSTEM.",
    "DO NOT BELIEVE EVERYTHING YOU SEE.",
    "",
    "The system is watching. It learns. It adapts.",
    "",
    "════════════════════════════════════════════════════════════════════════════════",
    "",
    "                    [PRESS ENTER TO INITIALIZE SESSION]",
    "",
    "════════════════════════════════════════════════════════════════════════════════"
  ];

  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (index < lines.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + lines[index] + "\n");
        setIndex(index + 1);
      }, 60);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // ✅ Add Enter key listener to exit
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        onFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onFinish]);

  return (
    <div className="intro-overlay">
      <pre className="typewriter">{displayed}</pre>
    </div>
  );
}