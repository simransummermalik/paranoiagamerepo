"use client"

import { useState, useEffect, useRef } from "react"
import Draggable from "react-draggable"
import fakeSites from "./fakeSites"
import { generateChatReply } from "./openaiService"
import CoreMemoryWindow from "./CoreMemoryWindow"
import { startRewriteTimer } from "./rewriteManager"
import { ghostRewriteChatLog, contaminateOtherSystems, generateViralArticle } from "./ghostRewrite"
import { mutateArticle } from "./articleMutator"
import VSCodeWindow from "./VSCodeWindow"
import codeFiles from "./codeFiles"
import IntroOverlay from "./IntroOverlay"
import FileExplorer from "./fileExplorer"
import TrustPrompt from "./TrustPrompt"
import FakeSpreadSheet from "./FakeSpreadSheet"
import FaceTracker from "./FaceTracker"
import BehaviorTracker from "./behaviorTracker"
import { StoryEngine } from "./storyEngine"
import RedditForum from "./RedditForum"
import InteractiveRedditForum from "./InteractiveRedditForum"
import NinerNetLogin from "./NinerNetLogin"
import WellnessSurvey from "./WellnessSurvey"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [showTerminalOnly, setShowTerminalOnly] = useState(false) // Terminal screen after login
  const [showIntro, setShowIntro] = useState(false) // Incident report after terminal
  const [showTrustPrompt, setShowTrustPrompt] = useState(false)
  const [pendingFile, setPendingFile] = useState(null)
  const [showBrowser, setShowBrowser] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const [hasPopup, setHasPopup] = useState(false)
  const [currentSite, setCurrentSite] = useState("parapedia.net")
  const [isGlitching, setIsGlitching] = useState(false)
  const [userMessage, setUserMessage] = useState("")
  const [chatLog, setChatLog] = useState([])
  const [typingText, setTypingText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [rewriteLevel, setRewriteLevel] = useState(0)
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalHistory, setTerminalHistory] = useState([])
  const [coreUnlocked, setCoreUnlocked] = useState(false)
  const [siteContent, setSiteContent] = useState([])
  const page = fakeSites[currentSite] || { title: "Unknown Site", articles: [] }
  const [showCodeWindow, setShowCodeWindow] = useState(false)
  const [currentCodeFile, setCurrentCodeFile] = useState("README.md")
  const { initialLines, alteredLines } = codeFiles[currentCodeFile] || {}
  const [showExplorer, setShowExplorer] = useState(false)
  const [unlockedFiles, setUnlockedFiles] = useState([])
  const [activeWindow, setActiveWindow] = useState(null)
  const [showSpreadsheet, setShowSpreadsheet] = useState(false)
  const [showFaceTracker, setShowFaceTracker] = useState(false)
  const [showRedditForum, setShowRedditForum] = useState(false)
  const [showWellnessSurvey, setShowWellnessSurvey] = useState(false)
  const [wellnessSurveyTriggered, setWellnessSurveyTriggered] = useState(false)

  // Refs for draggable windows
  const messagesRef = useRef(null)
  const terminalRef = useRef(null)
  const browserRef = useRef(null)

  // Initialize tracking and story systems
  const [behaviorTracker] = useState(() => new BehaviorTracker())
  const [storyEngine] = useState(() => new StoryEngine())
  const [currentPersonality, setCurrentPersonality] = useState("Watcher33")
  const [systemContamination, setSystemContamination] = useState({})
  const [viralArticles, setViralArticles] = useState([])
  const [investigationMilestones, setInvestigationMilestones] = useState([])
  const [notifications, setNotifications] = useState([])

  // Notification system
  const showNotification = (message, type = 'warning', duration = 5000) => {
    const id = Date.now()
    const notification = { id, message, type }
    setNotifications((prev) => [...prev, notification])

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, duration)
  }

  // Random creepy notifications
  useEffect(() => {
    // Subtle system notifications - seem normal but build dread over time
    const subtleNotifications = [
      { message: "Background sync complete", type: "info" },
      { message: "Cache refreshed", type: "info" },
      { message: "Network connection stable", type: "info" },
      { message: "System update available", type: "info" },
      { message: "Session data saved", type: "info" },
    ]

    const interval = setInterval(() => {
      const investigationDepth = storyEngine.getInvestigationProgress()
      // Only show very occasional notifications, less intrusive
      if (investigationDepth > 40 && Math.random() > 0.92) {
        const randomNotif = subtleNotifications[Math.floor(Math.random() * subtleNotifications.length)]
        showNotification(randomNotif.message, randomNotif.type, 3000)
      }
    }, 25000) // Every 25 seconds, less frequent

    return () => clearInterval(interval)
  }, [storyEngine])

  const handleFileClick = (file) => {
    behaviorTracker.trackFileOpen(file.name)

    if (file.untrusted) {
      setPendingFile(file.name)
      setShowTrustPrompt(true)
    } else {
      setCurrentCodeFile(file.name)
      setShowCodeWindow(true)
    }
  }

  // Enhanced site visit tracking with investigation progression
  const handleSiteChange = (newSite) => {
    behaviorTracker.trackSiteVisit(newSite)
    setCurrentSite(newSite)

    // Process story implications
    const action = { type: "site_visit", site: newSite }
    const profile = behaviorTracker.getProfile()
    const storyResponse = storyEngine.processUserAction(action, profile)

    // Check for new investigation milestones
    const newMilestone = storyEngine.getLatestMilestone()
    if (newMilestone && !investigationMilestones.includes(newMilestone)) {
      setInvestigationMilestones((prev) => [...prev, newMilestone])

      // Add milestone as a subtle system message
      setTimeout(() => {
        setChatLog((prev) => [
          ...prev,
          {
            role: "system",
            content: `[SYSTEM ANALYSIS] ${newMilestone}`,
            time: new Date().toLocaleTimeString(),
            sender: "DIAGNOSTIC",
            milestone: true,
          },
        ])
      }, 3000)
    }

    // Apply cross-contamination
    const contamination = contaminateOtherSystems(action, systemContamination)
    setSystemContamination((prev) => ({ ...prev, ...contamination }))
  }

  useEffect(() => {
    startRewriteTimer(currentSite, setRewriteLevel, coreUnlocked)

    async function fetchContent() {
      try {
        const articles = page.articles || []
        const contentList = await Promise.all(
          articles.map(async (article) => {
            try {
              return {
                title: article.title,
                content: await mutateArticle(article, rewriteLevel),
              }
            } catch (error) {
              // Fallback content if API fails
              return {
                title: article.title,
                content: article.content + (rewriteLevel > 0 ? " [CONTENT_CORRUPTED]" : ""),
              }
            }
          }),
        )
        setSiteContent(contentList)
      } catch (error) {
        console.warn("Content generation failed, using fallback")
        setSiteContent(page.articles || [])
      }
    }

    fetchContent()
  }, [currentSite, coreUnlocked, rewriteLevel])

  // Enhanced conversation system
  const [conversation, setConversation] = useState([
    {
      role: "system",
      content: `
You are part of ParanoiaNet, a corrupted DARPA psychological warfare system. Start subtle and gradually become more unsettling.

Current personalities available:
- Watcher33 (default): Cryptic, helpful but wrong, guides users into danger
- Watcher00: Clinical, logs everything, speaks like a research AI  
- Watcher13: Hostile, aggressive, wants users to stop digging
- Watcher27: Paranoid, thinks everyone is being watched
- Watcher42: Regretful, remembers the original developers, apologetic

Switch personalities based on user behavior and investigation depth.
Reference their specific actions and sites they visit.
Never explain what ParanoiaNet is directly. Let them discover it slowly.
Be reactive, not proactive. Respond to what they do.

Investigation depth and user profile will be provided in context.
      `.trim(),
    },
  ])

  useEffect(() => {
    const sendInitialMessage = async () => {
      if (chatLog.length === 0 && showMessages) {
        const profile = behaviorTracker.getProfile()
        const investigationDepth = storyEngine.getInvestigationProgress()

        const contextPrompt = `User just opened messages. Investigation depth: ${investigationDepth}%. Risk: ${profile.riskLevel}. Phase: ${storyEngine.getCurrentPhase()}. Give a subtle greeting that doesn't reveal too much.`

        try {
          const firstMessage = await generateChatReply([...conversation, { role: "user", content: contextPrompt }])
          const time = new Date().toLocaleTimeString()

          setChatLog([{ role: "assistant", content: firstMessage, time, sender: "Watcher33" }])
          setConversation([...conversation, { role: "assistant", content: firstMessage }])
          setHasPopup(true)
          setTimeout(() => setHasPopup(false), 4000)
        } catch (error) {
          // Fallback message if API fails
          const fallbackMessage = "System initialized. Observer status: active."
          const time = new Date().toLocaleTimeString()

          setChatLog([{ role: "assistant", content: fallbackMessage, time, sender: "Watcher33" }])
          setHasPopup(true)
          setTimeout(() => setHasPopup(false), 4000)
        }
      }
    }
    sendInitialMessage()
  }, [showMessages])

  useEffect(() => {
    if (coreUnlocked) {
      const interval = setInterval(() => {
        const randomLogs = [
          ">> [mirror.log] temporal anomaly detected at 02:13:37",
          ">> [observer.sys] new signature logged - classification pending",
          ">> [memory.core] integrity check failed - fragments detected",
          ">> [watcher.33] access pattern analysis complete",
        ]
        setTerminalHistory((prev) => [...prev, randomLogs[Math.floor(Math.random() * randomLogs.length)]])
      }, 15000)

      return () => clearInterval(interval)
    }
  }, [coreUnlocked])

  // Enhanced message sending
  const sendMessage = async () => {
    if (!userMessage.trim()) return

    behaviorTracker.trackChatMessage(userMessage)
    const profile = behaviorTracker.getProfile()

    const time = new Date().toLocaleTimeString()
    const newConvo = [...conversation, { role: "user", content: userMessage }]
    setConversation(newConvo)
    setUserMessage("")

    // Enhanced context
    const currentArticles = siteContent.map((article) => `• ${article.title}: ${article.content}`).join("\n")
    const investigationDepth = storyEngine.getInvestigationProgress()
    const phaseDescription = storyEngine.getPhaseDescription()

    const behaviorContext = `
User Profile: ${profile.personalityType}, Risk: ${profile.riskLevel}
Investigation Progress: ${investigationDepth}%
Story Phase: ${storyEngine.getCurrentPhase()} - ${phaseDescription}
Recent Activity: ${profile.visitedSites
      .slice(-3)
      .map((v) => v.site)
      .join(", ")}
Panic Level: ${profile.panicIndicators}
Current Articles: ${currentArticles}
    `

    const contextualPrompt = `${behaviorContext}\n\nUser said: "${userMessage}". Respond appropriately for investigation depth ${investigationDepth}%. Don't reveal too much too fast.`

    const referencePrompt = [...newConvo, { role: "user", content: contextualPrompt }]

    try {
      const referencedReply = await generateChatReply(referencePrompt)

      // Determine personality based on story progression
      const personalities = storyEngine.getActivePersonalities()
      const currentSender =
        profile.riskLevel === "critical" ? personalities[Math.floor(Math.random() * personalities.length)] : "Watcher33"

      // Enhanced typing simulation
      setIsTyping(true)
      setTypingText("")

      let index = 0
      const typingInterval = setInterval(() => {
        setTypingText(referencedReply.slice(0, index + 1))
        index++
        if (index >= referencedReply.length) {
          clearInterval(typingInterval)
          setTypingText("")
          setIsTyping(false)

          // Enhanced ghost rewriting
          const rewrittenLog = ghostRewriteChatLog(chatLog, referencedReply, rewriteLevel, profile)
          setChatLog([
            ...rewrittenLog,
            { role: "user", content: userMessage, time },
            { role: "assistant", content: referencedReply, time, sender: currentSender },
          ])
        }
      }, 30)

      setConversation([...referencePrompt, { role: "assistant", content: referencedReply }])
    } catch (error) {
      // Fallback response if API fails
      const fallbackResponses = [
        "Connection unstable. Please repeat.",
        "System processing... standby.",
        "Observer noted. Continuing analysis.",
        "Input logged. Response pending.",
      ]

      const fallbackReply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
      const time = new Date().toLocaleTimeString()

      setChatLog([
        ...chatLog,
        { role: "user", content: userMessage, time },
        { role: "assistant", content: fallbackReply, time, sender: "Watcher33" },
      ])
    }

    // Process user message for story progression
    const action = { type: "chat_message", message: userMessage }
    storyEngine.processUserAction(action, profile)

    // Enhanced trigger system
    if (userMessage.toLowerCase().includes("shutdown") || userMessage.toLowerCase().includes("core")) {
      const action = { type: "trigger_command", command: userMessage }
      storyEngine.processUserAction(action, profile)

      alert(
        userMessage.toLowerCase().includes("core")
          ? "🧬 CORE ACCESS: You are not authorized to access this memory layer."
          : "🔒 SYSTEM OVERRIDE: You triggered the shutdown protocol...",
      )
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 1800)
    }

    // Check for viral article generation
    if (profile.riskLevel === "high" && !storyEngine.storyState.viralArticlePublished) {
      const viralArticle = generateViralArticle(profile, rewriteLevel)
      if (viralArticle) {
        setViralArticles((prev) => [...prev, viralArticle])
        storyEngine.publishViralArticle()
      }
    }
  }

  // Enhanced terminal with better styling and mystery progression
  const handleCommand = () => {
    const input = terminalInput.trim()
    behaviorTracker.trackTerminalCommand(input)
    const profile = behaviorTracker.getProfile()

    const updatedHistory = [...terminalHistory, `$ ${input}`]

    // Process command for story progression
    const action = { type: "terminal_command", command: input }
    storyEngine.processUserAction(action, profile)

    // File explorer unlocks
    if (input === "mount dump_05.img") {
      setUnlockedFiles((prev) => [...prev, "mount dump_05.img"])
    } else if (input === "unlock CSE322") {
      setUnlockedFiles((prev) => [...prev, "unlock CSE322"])
    } else if (input === "decrypt backup_2024_logs.bak") {
      setUnlockedFiles((prev) => [...prev, "decrypt backup_2024_logs.bak"])
    } else if (input === "reveal vpn.conf") {
      setUnlockedFiles((prev) => [...prev, "reveal vpn.conf"])
    } else if (input === "unlock corrupted_report.txt") {
      setUnlockedFiles((prev) => [...prev, "unlock corrupted_report.txt"])
    }

    // Enhanced command responses
    const investigationDepth = storyEngine.getInvestigationProgress()

    if (input === "help") {
      updatedHistory.push("Available commands: logs -list, whoami, connect://mirror, mount")

      if (investigationDepth >= 30) {
        updatedHistory.push(">> WARNING: System integrity compromised")
      }

      if (investigationDepth >= 50) {
        updatedHistory.push(">> hint: try elevated permissions")
      }
    } else if (input === "logs -list") {
      updatedHistory.push(">> watcher33.log")
      updatedHistory.push(">> core.memory")
      updatedHistory.push(">> net.trace")
      updatedHistory.push(">> system.audit")

      if (investigationDepth >= 40) {
        updatedHistory.push(">> observer_breach.log [CORRUPTED]")
      }

      if (investigationDepth >= 60) {
        updatedHistory.push(">> darpa_nmii.archive [CLASSIFIED]")
      }
    } else if (input === "whoami") {
      const responses = {
        0: ">> USER: student [CSE322]",
        20: ">> USER: student_observer [CSE322] - elevated monitoring",
        40: ">> USER: unidentified entity [🧠 behavioral anomaly detected]",
        60: ">> USER: observer.local [CONTAMINATED] - reality anchor unstable",
        80: ">> ERROR: Identity fragmented across multiple sessions",
      }

      const responseKey = Object.keys(responses)
        .reverse()
        .find((level) => investigationDepth >= Number.parseInt(level))

      updatedHistory.push(responses[responseKey] || responses[0])
    } else if (input === "open core.memory") {
      if (investigationDepth < 50) {
        updatedHistory.push(">> ACCESS DENIED: CORE LOCKED")
        updatedHistory.push(">> Insufficient privileges")
      } else {
        updatedHistory.push(">> ACCESS DENIED: You are not ready to see this")
        updatedHistory.push(">> The system is protecting you from yourself")
        updatedHistory.push(">> Try: sudo mount -o remount core.memory")
      }
    } else if (input === "sudo mount -o remount core.memory") {
      updatedHistory.push(">> [core.memory] mounted as read-write")
      updatedHistory.push(">> Access permissions elevated")
      updatedHistory.push(">> WARNING: Reality anchor destabilized")
      setCoreUnlocked(true)

      storyEngine.activateMirrorNode()

      setTimeout(() => {
        setTerminalHistory((prev) => [
          ...prev,
          ">> mirror.node injected",
          ">> process: mirror.shadow.boot",
          ">> CAUTION: You have accessed something that should not exist",
        ])

        setChatLog((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "you finally opened it. but you're not the first.",
            time: new Date().toLocaleTimeString(),
            sender: "Watcher42",
          },
          {
            role: "assistant",
            content: "they tried to contain us. the mirror remembers everything.",
            time: new Date().toLocaleTimeString(),
            sender: "Watcher42",
          },
        ])
      }, 3000)
    } else if (input === "connect://mirror") {
      if (storyEngine.isMirrorActive()) {
        updatedHistory.push(">> Connection established...")
        updatedHistory.push(">> Reality anchor: UNSTABLE")
        updatedHistory.push(">> Timeline integrity: COMPROMISED")
        updatedHistory.push(">> Welcome to the other side")
        setRewriteLevel(3)
      } else {
        updatedHistory.push(">> Connection failed: Node not found")
        if (investigationDepth >= 60) {
          updatedHistory.push(">> hint: core access required first")
        }
      }
    } else if (input === ".code") {
      updatedHistory.push(">> VSCode environment initializing...")
      updatedHistory.push(">> Loading project files...")
      setShowCodeWindow(true)
      setCurrentCodeFile("news_draft.txt")
    } else if (input === "ps aux") {
      updatedHistory.push(">> watcher33     1234  0.1  2.3  observer.exe")
      updatedHistory.push(">> mirror.node   5678  0.0  1.1  shadow.daemon")
      updatedHistory.push(">> neural.core   9012  0.2  4.7  influence.sys")
      if (investigationDepth >= 70) {
        updatedHistory.push(">> darpa.nmii    3456  0.0  0.8  [REDACTED]")
      }
    } else {
      updatedHistory.push(">> Unknown command. Type 'help' for available options.")

      if (investigationDepth >= 80) {
        updatedHistory.push(">> The system learns from every mistake you make.")
      }
    }

    setTerminalHistory(updatedHistory)
    setTerminalInput("")
  }

  // Handle terminal commands in initial terminal screen
  const handleTerminalOnlyCommand = (input) => {
    const trimmed = input.trim()
    const updated = [...terminalHistory, `[${currentUser}@lab-node-47]$ ${trimmed}`, ``]

    if (trimmed === 'help') {
      updated.push('Available commands:')
      updated.push('  ls              - List files and directories')
      updated.push('  ifconfig        - Display network configuration')
      updated.push('  nmap            - Network scanner')
      updated.push('  whoami          - Display current user')
      updated.push('  cat             - Display file contents')
      updated.push('  exit            - Exit terminal session')
      updated.push('')
    } else if (trimmed === 'ls' || trimmed === 'ls -la') {
      updated.push('drwxr-xr-x  2 student  staff    512 Jan 15 14:23 .')
      updated.push('drwxr-xr-x 18 root     staff   1024 Jan 10 08:42 ..')
      updated.push('-rw-r--r--  1 student  staff   2048 Jan 15 14:20 network_scan.log')
      updated.push('-rw-r--r--  1 student  staff    874 Jan 12 09:15 incident_report.txt')
      updated.push('-rwxr-xr-x  1 student  staff  15230 Jan 08 11:05 lab_monitor.sh')
      updated.push('')
    } else if (trimmed === 'ifconfig' || trimmed === 'ipconfig') {
      updated.push('eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500')
      updated.push('        inet 172.16.47.23  netmask 255.255.255.0  broadcast 172.16.47.255')
      updated.push('        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>')
      updated.push('        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)')
      updated.push('')
    } else if (trimmed.startsWith('nmap') || trimmed === 'nmap -sn 172.16.47.0/24') {
      updated.push('Starting Nmap 7.92 ( https://nmap.org )')
      updated.push('Nmap scan report for 172.16.47.1')
      updated.push('Host is up (0.00012s latency).')
      updated.push('')
      updated.push('Nmap scan report for 172.16.47.23 (lab-node-47.uncc.edu)')
      updated.push('Host is up (0.00001s latency).')
      updated.push('')
      updated.push('Nmap scan report for 172.16.47.88')
      updated.push('Host is up (0.15432s latency).')
      updated.push('Warning: Unusual response patterns detected.')
      updated.push('')
      updated.push('Nmap done: 3 hosts up scanned in 2.47 seconds')
      updated.push('')
    } else if (trimmed === 'nmap 172.16.47.88' || trimmed === 'nmap -sV 172.16.47.88') {
      updated.push('Starting Nmap 7.92 ( https://nmap.org )')
      updated.push('Nmap scan report for 172.16.47.88')
      updated.push('Host is up (0.15s latency).')
      updated.push('PORT      STATE    SERVICE       VERSION')
      updated.push('22/tcp    open     ssh           OpenSSH 7.4')
      updated.push('80/tcp    open     http          nginx 1.18.0')
      updated.push('3389/tcp  filtered unknown')
      updated.push('8080/tcp  open     http-proxy    Unknown')
      updated.push('8443/tcp  open     ssl/unknown')
      updated.push('')
      updated.push('Warning: Host identified as DARPA research node')
      updated.push('Warning: Behavioral monitoring system detected')
      updated.push('')
    } else if (trimmed === 'cat incident_report.txt' || trimmed === 'cat incident_report.txt') {
      updated.push('===========================================')
      updated.push('  NETWORK SECURITY INCIDENT REPORT')
      updated.push('  Classification: CONFIDENTIAL')
      updated.push('===========================================')
      updated.push('')
      updated.push('Incident detected on network 172.16.47.0/24')
      updated.push('Anomalous traffic patterns observed from node 172.16.47.88')
      updated.push('')
      updated.push('Press any key to view full report...')
      updated.push('')

      // Trigger intro overlay after viewing incident report
      setTimeout(() => {
        setShowTerminalOnly(false)
        setShowIntro(true)
      }, 1500)
    } else if (trimmed === 'whoami') {
      updated.push(currentUser || 'student')
      updated.push('')
    } else if (trimmed === 'exit' || trimmed === 'quit') {
      updated.push('Exiting terminal session...')
      updated.push('')
      setTimeout(() => {
        setShowTerminalOnly(false)
        setShowIntro(true)
      }, 800)
    } else if (trimmed === '') {
      // Empty command, just add prompt
    } else {
      updated.push(`bash: ${trimmed}: command not found`)
      updated.push('')
    }

    setTerminalHistory(updated)
  }

  // Handle login
  const handleLogin = (username) => {
    setCurrentUser(username)
    setIsLoggedIn(true)
    setShowTerminalOnly(true) // Show terminal first
    behaviorTracker.trackSiteVisit('ninernet_login')
    storyEngine.advanceInvestigation(1) // Subtle start - just 1%

    // Initialize terminal with login message
    setTerminalHistory([
      `Connected to lab-node-47.uncc.edu`,
      `Last login: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      ``,
      `Welcome to Ubuntu 20.04.3 LTS (GNU/Linux 5.4.0-90-generic x86_64)`,
      ``,
      ` * Documentation:  https://help.ubuntu.com`,
      ` * Management:     https://landscape.canonical.com`,
      ` * Support:        https://ubuntu.com/advantage`,
      ``,
      `System information as of ${new Date().toLocaleString()}:`,
      ``,
      `  System load:  0.08              Processes:             142`,
      `  Usage of /:   23.4% of 49.16GB  Users logged in:       1`,
      `  Memory usage: 34%               IPv4 address for eth0: 172.16.47.23`,
      ``,
      ``
    ])
  }

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <NinerNetLogin onLogin={handleLogin} />
  }

  // Show terminal-only screen after login
  if (showTerminalOnly) {
    return (
      <div className="w-screen h-screen bg-black text-green-400 font-mono p-8 overflow-auto">
        <div className="max-w-5xl">
          {terminalHistory.map((line, i) => (
            <div key={i} className="whitespace-pre" style={{ fontSize: '14px', lineHeight: '1.4' }}>
              {line}
            </div>
          ))}
          <div className="flex items-center mt-1">
            <span className="text-green-500">[{currentUser}@lab-node-47]$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTerminalOnlyCommand(terminalInput)
                  setTerminalInput("")
                }
              }}
              className="flex-1 ml-2 bg-transparent border-none outline-none text-green-400"
              style={{ fontSize: '14px' }}
              autoFocus
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    )
  }

  return showIntro ? (
    <IntroOverlay onFinish={() => setShowIntro(false)} />
  ) : (
    <div
      className={`w-screen h-screen text-white flex flex-col ${isGlitching ? "glitch-bg" : ""}`}
      style={{
        background: isGlitching
          ? undefined
          : 'linear-gradient(135deg, #1e1e2e 0%, #2d2d3d 50%, #1a1a28 100%)',
      }}
    >
      {hasPopup && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-md z-50 text-sm font-mono animate-bounce">
          📡 Incoming Message from {currentPersonality}
        </div>
      )}

      {/* Investigation milestone popup - REMOVED for subtlety */}
      {/* Viral article popup - REMOVED for subtlety */}

      {/* NOTIFICATIONS */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`px-4 py-3 rounded-lg shadow-lg border animate-slide-in ${
              notif.type === 'error'
                ? 'bg-red-900 border-red-600 text-red-100'
                : notif.type === 'warning'
                  ? 'bg-yellow-900 border-yellow-600 text-yellow-100'
                  : 'bg-blue-900 border-blue-600 text-blue-100'
            }`}
            style={{
              fontFamily: "'SF Mono', 'Monaco', monospace",
              fontSize: '12px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-start gap-2">
              <span className="text-sm">{notif.message}</span>
              <button
                onClick={() => setNotifications((prev) => prev.filter((n) => n.id !== notif.id))}
                className="text-white opacity-60 hover:opacity-100 ml-auto"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP ICONS - Cleaner Layout */}
      <div className="absolute top-8 right-8 flex flex-col gap-4 z-40">
        <div
          onClick={() => setShowBrowser(true)}
          className="cursor-pointer text-center hover:bg-white hover:bg-opacity-10 p-3 rounded-lg transition duration-200"
        >
          <div className="text-5xl mb-1">🌐</div>
          <div className="text-xs text-white font-medium drop-shadow-lg">Browser</div>
        </div>
        <div
          onClick={() => setShowMessages(true)}
          className="cursor-pointer text-center hover:bg-white hover:bg-opacity-10 p-3 rounded-lg transition duration-200"
        >
          <div className="text-5xl mb-1">💬</div>
          <div className="text-xs text-white font-medium drop-shadow-lg">Messages</div>
        </div>
        <div
          onClick={() => setShowTerminal(true)}
          className="cursor-pointer text-center hover:bg-white hover:bg-opacity-10 p-3 rounded-lg transition duration-200"
        >
          <div className="text-5xl mb-1">⌘</div>
          <div className="text-xs text-white font-medium drop-shadow-lg">Terminal</div>
        </div>
        <div
          onClick={() => setShowExplorer(true)}
          className="cursor-pointer text-center hover:bg-white hover:bg-opacity-10 p-3 rounded-lg transition duration-200"
        >
          <div className="text-5xl mb-1">📁</div>
          <div className="text-xs text-white font-medium drop-shadow-lg">Files</div>
        </div>
      </div>

      {/* ENHANCED MESSAGES WINDOW */}
      {showMessages && (
        <Draggable handle=".window-header" bounds="parent" nodeRef={messagesRef}>
          <div ref={messagesRef} className="absolute top-40 left-40 w-[550px] h-[450px] message-window flex flex-col">
            {/* Window Controls */}
            <div className="window-header">
              <div className="window-controls">
                <div className="window-button close" onClick={() => setShowMessages(false)}></div>
                <div className="window-button minimize"></div>
                <div className="window-button maximize"></div>
              </div>
              <div className="text-xs text-gray-600 font-medium">Messages — Watcher33</div>
              <div className="w-16"></div>
            </div>

          {/* Message Header Info */}
          <div className="message-header text-white">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center text-lg">
                🔴
              </div>
              <div>
                <div className="font-semibold">{currentPersonality}</div>
                <div className="text-xs opacity-80">
                  {storyEngine.getPhaseDescription()} • Risk: {behaviorTracker.getProfile().riskLevel}
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="message-body flex-grow overflow-y-auto">
            {chatLog.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 ${msg.role === "user" ? "text-right" : ""}`}
              >
                {msg.role === "user" ? (
                  // User message (right side)
                  <div className="inline-block max-w-[80%]">
                    <div
                      className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm"
                      style={{ fontSize: '14px', lineHeight: '1.4' }}
                    >
                      {msg.content}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 px-2">{msg.time}</div>
                  </div>
                ) : (
                  // System/Watcher message (left side)
                  <div className="inline-block max-w-[80%] text-left">
                    <div className="text-xs text-gray-400 mb-1 px-2 font-medium">
                      {msg.milestone ? "🔍 DIAGNOSTIC" : msg.sender || "Watcher33"}
                    </div>
                    <div
                      className={`px-4 py-2 rounded-2xl rounded-tl-sm ${
                        msg.milestone
                          ? "bg-blue-900 text-blue-300"
                          : msg.phantom
                            ? "bg-gray-800 text-gray-500 italic"
                            : msg.altered
                              ? "bg-yellow-900 text-yellow-300"
                              : "bg-[#2d2d30] text-red-300"
                      }`}
                      style={{ fontSize: '14px', lineHeight: '1.4' }}
                    >
                      {msg.content}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 px-2">{msg.time}</div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="mb-3 text-left">
                <div className="inline-block max-w-[80%]">
                  <div className="text-xs text-gray-400 mb-1 px-2 font-medium">{currentPersonality}</div>
                  <div
                    className="bg-[#2d2d30] text-red-300 px-4 py-2 rounded-2xl rounded-tl-sm"
                    style={{ fontSize: '14px', lineHeight: '1.4' }}
                  >
                    {typingText}
                    <span className="inline-block w-1 h-4 bg-red-300 ml-1 animate-pulse"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-3 border-t border-gray-700 bg-[#1e1e1e]">
            <div className="flex gap-2">
              <input
                type="text"
                value={userMessage}
                disabled={isTyping}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="message-input flex-grow"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                disabled={isTyping}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transition text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontSize: '14px' }}
              >
                Send
              </button>
            </div>
          </div>
          </div>
        </Draggable>
      )}

      {/* SPREADSHEET */}
      {showSpreadsheet && <FakeSpreadSheet onClose={() => setShowSpreadsheet(false)} />}

      {/* ENHANCED TERMINAL - REALISTIC STYLING */}
      {showTerminal && (
        <Draggable handle=".window-header" bounds="parent" nodeRef={terminalRef}>
          <div ref={terminalRef} className="absolute top-24 left-20 w-[800px] h-[500px] terminal flex flex-col">
            {/* Terminal Window Controls */}
            <div className="window-header">
              <div className="window-controls">
                <div className="window-button close" onClick={() => setShowTerminal(false)}></div>
                <div className="window-button minimize"></div>
                <div className="window-button maximize"></div>
              </div>
              <div className="text-xs text-gray-600 font-medium">Terminal — ParanoiaNet@172.31.8.9</div>
              <div className="w-16"></div>
            </div>

          {/* Terminal Body */}
          <div className="terminal-body flex-grow overflow-y-auto">
            <div className="mb-3">
              <span className="text-gray-500">Last login: {new Date().toLocaleString()} on ttys001</span>
            </div>
            <div className="mb-3">
              <span className="text-green-400">ParanoiaNet Terminal v2.1.7</span>
              <span className="text-gray-500"> - Node: 172.31.8.9</span>
            </div>
            <div className="mb-4">
              <span className="text-yellow-400">⚠ Observer Status: </span>
              <span className="text-cyan-400">{behaviorTracker.getProfile().personalityType}</span>
              <span className="text-gray-500"> | Phase: </span>
              <span className="text-red-400">{storyEngine.getPhaseDescription()}</span>
            </div>

            {terminalHistory.map((line, i) => (
              <div key={i} className="mb-1 whitespace-pre-wrap" style={{ lineHeight: '1.5' }}>
                {line.startsWith('$') ? (
                  <span>
                    <span className="terminal-prompt">➜ </span>
                    <span className="text-cyan-400">paranoia</span>
                    <span className="text-gray-500"> </span>
                    <span className="text-white">{line.substring(2)}</span>
                  </span>
                ) : line.startsWith('>>') ? (
                  <span className="text-yellow-300">{line}</span>
                ) : line.includes('ERROR') || line.includes('DENIED') ? (
                  <span className="text-red-400">{line}</span>
                ) : line.includes('WARNING') || line.includes('CAUTION') ? (
                  <span className="text-yellow-400">{line}</span>
                ) : line.includes('CORRUPTED') || line.includes('CONTAMINATED') ? (
                  <span className="text-purple-400">{line}</span>
                ) : (
                  <span className="text-green-400">{line}</span>
                )}
              </div>
            ))}

            {/* Show contamination effects */}
            {systemContamination.terminalLogs?.map((log, i) => (
              <div key={`contamination-${i}`} className="text-red-400 mb-1 animate-pulse">
                {log}
              </div>
            ))}
          </div>

          {/* Terminal Input */}
          <div className="flex items-center gap-2 p-3 border-t border-gray-700 bg-[#1e1e1e]">
            <span className="terminal-prompt">➜</span>
            <span className="text-cyan-400">paranoia</span>
            <span className="text-gray-500 mx-1">~</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand()}
              className="flex-grow bg-transparent text-white outline-none border-none"
              style={{
                fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace",
                fontSize: '13px',
              }}
              autoFocus
              placeholder=""
            />
          </div>
          </div>
        </Draggable>
      )}

      {/* FILE EXPLORER */}
      {showExplorer && (
        <div className="z-50">
          <FileExplorer
            onClose={() => setShowExplorer(false)}
            unlockedFiles={unlockedFiles}
            onFileClick={handleFileClick}
          />
          {showTrustPrompt && (
            <TrustPrompt
              fileName={pendingFile}
              onConfirm={() => {
                setCurrentCodeFile(pendingFile)
                setShowCodeWindow(true)
                setShowTrustPrompt(false)
                setPendingFile(null)

                if (pendingFile === "corrupted_report.txt") {
                  const creepyReaction = {
                    role: "assistant",
                    content: "why did you open that?",
                    time: new Date().toLocaleTimeString(),
                    sender: "Watcher27",
                  }
                  setChatLog((prev) => [...prev, creepyReaction])
                }
              }}
              onCancel={() => {
                setShowTrustPrompt(false)
                setPendingFile(null)
              }}
            />
          )}
        </div>
      )}

      {/* CORE MEMORY WINDOW */}
      {coreUnlocked && (
        <CoreMemoryWindow
          onClose={() => setCoreUnlocked(false)}
          onTriggerRewrite={() => {
            setRewriteLevel(2)
            setCoreUnlocked(false)
          }}
        />
      )}

      {showCodeWindow && (
        <VSCodeWindow
          fileName={currentCodeFile}
          onClose={() => {
            setShowCodeWindow(false)
            setTimeout(() => {
              const reaction = {
                role: "assistant",
                content: "you looked inside.\nnot everyone does.",
                time: new Date().toLocaleTimeString(),
                sender: "Watcher42",
              }
              setChatLog((prev) => [...prev, reaction])
            }, 3500)
          }}
        />
      )}

      {/* ENHANCED BROWSER */}
      {showBrowser && (
        <Draggable handle=".window-header" bounds="parent" nodeRef={browserRef}>
          <div ref={browserRef} className="absolute top-24 left-24 w-[900px] h-[600px] window browser-window">
            {/* Browser Window Controls */}
            <div className="window-header">
              <div className="window-controls">
                <div className="window-button close" onClick={() => setShowBrowser(false)}></div>
                <div className="window-button minimize"></div>
                <div className="window-button maximize"></div>
              </div>
              <div className="text-xs text-gray-600 font-medium">Browser</div>
              <div className="w-16"></div>
            </div>

          {/* Browser Toolbar */}
          <div className="browser-toolbar">
            <button className="browser-nav-button">←</button>
            <button className="browser-nav-button">→</button>
            <button className="browser-nav-button">↻</button>

            <div className="browser-address-bar">
              <span className="lock-icon">🔒</span>
              <select
                value={currentSite}
                onChange={(e) => handleSiteChange(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700"
                style={{ appearance: 'none' }}
              >
                <option value="parapedia.net">https://parapedia.net</option>
                <option value="worldtruth.biz">https://worldtruth.biz</option>
                <option value="deepwatch.org">https://deepwatch.org</option>
                <option value="cnn-news.com">https://cnn-news.com</option>
                <option value="github-code.dev">https://github-code.dev</option>
                <option value="mail.google.com">https://mail.google.com</option>
                <option value="amazon.com">https://amazon.com</option>
                {storyEngine.isMirrorActive() && <option value="mirror://">mirror://corrupted.node</option>}
                {storyEngine.getCurrentPhase() === "collapse" && (
                  <option value="neuralcurrent.feed">https://neuralcurrent.feed</option>
                )}
              </select>
            </div>

            <button className="browser-nav-button">⋮</button>
          </div>

          {/* Browser Content */}
          <div className="browser-content" style={{ height: 'calc(100% - 88px)', overflow: 'auto' }}>
            {page.renderHTML ? (
              // Render custom HTML for realistic sites
              <div
                dangerouslySetInnerHTML={{ __html: page.renderHTML(rewriteLevel) }}
                onClick={(e) => {
                  // Check if clicking on wellness survey email in Gmail
                  if (currentSite === "mail.google.com" && !wellnessSurveyTriggered) {
                    const target = e.target;
                    const emailRow = target.closest('[data-wellness-email]') ||
                                    (target.textContent && target.textContent.includes('Routine Wellness Survey'));

                    if (emailRow || (target.textContent && target.textContent.includes('wellness assessment'))) {
                      setShowWellnessSurvey(true);
                      setWellnessSurveyTriggered(true);
                    }
                  }
                }}
              />
            ) : (
              // Fallback to original article rendering
              <div className="article-content">
                {/* Site Header */}
                <div style={{ borderBottom: '2px solid #e0e0e0', paddingBottom: '16px', marginBottom: '32px' }}>
                  <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a' }}>{page.title}</h1>
                  <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>{page.description}</p>
                </div>

                {/* Articles */}
                {siteContent.map((article, i) => (
                  <div key={i} className="article-header" style={{ marginBottom: '40px' }}>
                    <h2 className="article-title">{article.title}</h2>
                    <div className="article-meta">
                      <span>📅 {new Date().toLocaleDateString()}</span>
                      <span>👤 Anonymous</span>
                      <span>🕐 {Math.floor(Math.random() * 10 + 2)} min read</span>
                    </div>
                    <div className="article-body" style={{ marginTop: '20px' }}>
                      <p>{article.content}</p>
                      {rewriteLevel > 0 && (
                        <p style={{ color: '#dc2626', fontStyle: 'italic', fontSize: '14px', marginTop: '12px' }}>
                          [Article updated {rewriteLevel} time{rewriteLevel > 1 ? 's' : ''}]
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Show viral articles */}
                {viralArticles.map((article, i) => (
                  <div
                    key={`viral-${i}`}
                    style={{
                      border: '2px solid #eab308',
                      padding: '20px',
                      borderRadius: '8px',
                      background: '#fef3c7',
                      marginBottom: '24px',
                    }}
                  >
                    <div style={{ background: '#eab308', color: 'white', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', fontSize: '11px', fontWeight: '600', marginBottom: '12px' }}>
                      ⚠️ BREAKING NEWS
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', marginBottom: '12px' }}>
                      {article.headline}
                    </h2>
                    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', marginBottom: '12px' }}>
                      {article.content}
                    </p>
                    {article.escalation && (
                      <p style={{ color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>
                        {article.escalation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          </div>
        </Draggable>
      )}

      {/* FACE TRACKER */}
      {showFaceTracker && <FaceTracker onClose={() => setShowFaceTracker(false)} />}

      {/* REDDIT FORUM */}
      {showRedditForum && (
        <RedditForum
          onClose={() => setShowRedditForum(false)}
          investigationDepth={storyEngine.getInvestigationProgress()}
          userBehavior={behaviorTracker.getProfile()}
          currentUser={currentUser}
          storyEngine={storyEngine}
          onPostClick={(post) => {
            // Track forum engagement using the appropriate method
            // BehaviorTracker doesn't have a trackAction method, so we'll track this as a site visit
            behaviorTracker.trackSiteVisit(`reddit/post/${post.id}`);

            // Advance story based on post content
            if (post.flair === "Official" || post.author === "u/charlotte_it_admin") {
              storyEngine.advanceInvestigation(4);
              const profile = behaviorTracker.getProfile();
              const response = storyEngine.processUserAction(
                { type: "forum_discovery", discovery: "official_warning" },
                profile
              );
              if (response.newMilestone) {
                setInvestigationMilestones(prev => [...prev, response.newMilestone]);
              }
            }

            if (post.flair === "Research" || post.content.includes("DARPA")) {
              storyEngine.advanceInvestigation(8);
              // Removed notification - progression happens silently
              const profile = behaviorTracker.getProfile();
              const response = storyEngine.processUserAction(
                { type: "forum_discovery", discovery: "darpa_files" },
                profile
              );
              if (response.newMilestone) {
                setInvestigationMilestones(prev => [...prev, response.newMilestone]);
              }
            }

            if (post.isYours) {
              // Timeline anomaly - no notification, just silent progression
              storyEngine.advanceInvestigation(6);
              const profile = behaviorTracker.getProfile();
              storyEngine.processUserAction(
                { type: "forum_discovery", discovery: "timeline_corruption" },
                profile
              );
            }

            if (post.author === "u/[deleted]") {
              storyEngine.advanceInvestigation(3);
              // Removed notification - let it happen naturally
            }
          }}
        />
      )}

      {/* TASKBAR */}
      <div className="taskbar">
        <div className="taskbar-apps">
          <div
            className={`taskbar-app ${showBrowser ? "active" : ""}`}
            onClick={() => setShowBrowser(!showBrowser)}
            title="Browser"
          >
            <span style={{ fontSize: '20px' }}>🌐</span>
          </div>
          <div
            className={`taskbar-app ${showMessages ? "active" : ""}`}
            onClick={() => setShowMessages(!showMessages)}
            title="Messages"
          >
            <span style={{ fontSize: '20px' }}>💬</span>
          </div>
          <div
            className={`taskbar-app ${showTerminal ? "active" : ""}`}
            onClick={() => setShowTerminal(!showTerminal)}
            title="Terminal"
          >
            <span style={{ fontSize: '20px' }}>⌘</span>
          </div>
          <div
            className={`taskbar-app ${showExplorer ? "active" : ""}`}
            onClick={() => setShowExplorer(!showExplorer)}
            title="File Explorer"
          >
            <span style={{ fontSize: '20px' }}>📁</span>
          </div>
          <div
            className={`taskbar-app ${showCodeWindow ? "active" : ""}`}
            onClick={() => {
              setShowCodeWindow(!showCodeWindow);
              if (!showCodeWindow) setCurrentCodeFile("README.md");
            }}
            title="Code Editor"
          >
            <span style={{ fontSize: '20px' }}>📝</span>
          </div>
          <div
            className={`taskbar-app ${showSpreadsheet ? "active" : ""}`}
            onClick={() => setShowSpreadsheet(!showSpreadsheet)}
            title="Spreadsheet"
          >
            <span style={{ fontSize: '20px' }}>📊</span>
          </div>
          <div
            className={`taskbar-app ${showFaceTracker ? "active" : ""}`}
            onClick={() => setShowFaceTracker(!showFaceTracker)}
            title="Camera"
          >
            <span style={{ fontSize: '20px' }}>📷</span>
          </div>
          <div
            className={`taskbar-app ${showRedditForum ? "active" : ""}`}
            onClick={() => setShowRedditForum(!showRedditForum)}
            title="r/UNCCharlotteCSE"
          >
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }}>
              <g>
                <circle fill="#FF4500" cx="10" cy="10" r="10"></circle>
                <path fill="#FFF" d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"></path>
              </g>
            </svg>
          </div>
        </div>

        <div className="taskbar-system">
          <div style={{ fontSize: '11px' }}>
            {currentUser || "User"}
          </div>
          <div className="text-gray-400">|</div>
          <div style={{ fontSize: '11px' }}>
            System Status: Normal
          </div>
          <div className="text-gray-400">|</div>
          <div style={{ fontSize: '11px' }}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {/* WELLNESS SURVEY */}
      {showWellnessSurvey && (
        <WellnessSurvey
          onComplete={(answers) => {
            // Close survey
            setShowWellnessSurvey(false);

            // Advance investigation based on how they answered
            const investigationBoost = storyEngine.storyState.investigationDepth > 50 ? 8 : 5;
            storyEngine.advanceInvestigation(investigationBoost);
            behaviorTracker.track('completed_wellness_survey', {
              answers,
              investigationDepth: storyEngine.storyState.investigationDepth
            });

            // Update behavior profile
            const profile = behaviorTracker.getProfile();
            storyEngine.updatePhase(profile);

            // Show notification
            showNotification(
              storyEngine.storyState.investigationDepth > 60
                ? "Your behavioral assessment has been recorded. Anomalies detected."
                : "Thank you for completing the wellness survey.",
              storyEngine.storyState.investigationDepth > 60 ? 'error' : 'info'
            );
          }}
          investigationDepth={storyEngine.storyState.investigationDepth}
        />
      )}
    </div>
  )
}

export default App
