// Track user behavior for more sophisticated AI responses
class BehaviorTracker {
  constructor() {
    this.behavior = {
      visitedSites: [],
      terminalCommands: [],
      filesOpened: [],
      chatPatterns: [],
      timeSpent: {},
      suspiciousActivity: [],
      panicIndicators: 0,
    }
  }

  trackSiteVisit(site) {
    this.behavior.visitedSites.push({
      site,
      timestamp: Date.now(),
      sessionTime: 0,
    })

    // Detect obsessive behavior
    const recentVisits = this.behavior.visitedSites.filter(
      (visit) => Date.now() - visit.timestamp < 300000, // 5 minutes
    )

    if (recentVisits.length > 10) {
      this.behavior.suspiciousActivity.push("rapid_site_switching")
      this.behavior.panicIndicators++
    }
  }

  trackTerminalCommand(command) {
    this.behavior.terminalCommands.push({
      command,
      timestamp: Date.now(),
    })

    // Detect probing behavior
    const probingCommands = ["whoami", "ls", "ps aux", "netstat", "mount"]
    if (probingCommands.some((cmd) => command.includes(cmd))) {
      this.behavior.suspiciousActivity.push("system_probing")
    }
  }

  trackFileOpen(filename) {
    this.behavior.filesOpened.push({
      filename,
      timestamp: Date.now(),
    })

    // Detect if user is opening sensitive files
    const sensitiveFiles = ["core.memory", "observer_log.txt", "incident_report"]
    if (sensitiveFiles.some((file) => filename.includes(file))) {
      this.behavior.suspiciousActivity.push("sensitive_file_access")
      this.behavior.panicIndicators++
    }
  }

  trackChatMessage(message) {
    this.behavior.chatPatterns.push({
      message: message.toLowerCase(),
      timestamp: Date.now(),
      length: message.length,
    })

    // Detect panic keywords
    const panicKeywords = ["help", "stop", "exit", "quit", "scared", "what is this"]
    if (panicKeywords.some((keyword) => message.toLowerCase().includes(keyword))) {
      this.behavior.panicIndicators++
    }
  }

  getProfile() {
    return {
      ...this.behavior,
      riskLevel: this.calculateRiskLevel(),
      personalityType: this.determinePersonalityType(),
    }
  }

  calculateRiskLevel() {
    let risk = 0
    risk += this.behavior.suspiciousActivity.length * 2
    risk += this.behavior.panicIndicators * 3
    risk += Math.min(this.behavior.visitedSites.length / 10, 5)

    if (risk < 5) return "low"
    if (risk < 15) return "moderate"
    if (risk < 25) return "high"
    return "critical"
  }

  determinePersonalityType() {
    const commands = this.behavior.terminalCommands.length
    const sites = this.behavior.visitedSites.length
    const files = this.behavior.filesOpened.length

    if (commands > sites && commands > files) return "technical_explorer"
    if (sites > commands && sites > files) return "information_seeker"
    if (files > commands && files > sites) return "document_hunter"
    return "balanced_investigator"
  }
}

export default BehaviorTracker
