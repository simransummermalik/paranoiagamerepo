export class StoryEngine {
  constructor() {
    this.storyState = {
      phase: "discovery",
      investigationDepth: 0,
      mirrorActivated: false,
      viralArticlePublished: false,
      coreAccessed: false,
      personalitiesUnlocked: ["Watcher33"],
      timelineCorrupted: false,
      realityBreaches: 0,
      observerContaminated: false,
    }

    this.investigationMilestones = {
      5: "Network anomalies detected in system logs",
      15: "Unauthorized processes running in background",
      25: "System timestamps show inconsistencies spanning decades",
      35: "Node signature doesn't match any known university hardware",
      45: "Encrypted metadata contains DARPA classification markers",
      55: "Neural Media Influence Initiative - archived project files found",
      65: "Previous observer sessions logged - students reported missing",
      75: "System has been actively monitoring and profiling users",
      85: "You are not investigating a system. You are being studied.",
      95: "Welcome to the experiment. You always were the subject.",
    }

    this.phaseDescriptions = {
      discovery: "Initial system access - routine lab work",
      investigation: "Anomalous behavior detected - deeper analysis required",
      contamination: "Observer effect confirmed - reality distortion spreading",
      collapse: "Complete system breakdown - truth and fiction indistinguishable",
    }

    this.lastMilestone = null
  }

  processUserAction(action, profile) {
    // Advance investigation depth based on user behavior
    if (action.type === "site_visit") {
      if (action.site.includes("deepwatch")) this.advanceInvestigation(3)
      if (action.site.includes("worldtruth")) this.advanceInvestigation(2)
      if (action.site.includes("mirror")) this.advanceInvestigation(8)
    }

    if (action.type === "terminal_command") {
      if (action.command.includes("sudo")) this.advanceInvestigation(4)
      if (action.command.includes("core")) this.advanceInvestigation(6)
      if (action.command.includes("mirror")) this.advanceInvestigation(10)
      if (action.command.includes("whoami")) this.advanceInvestigation(2)
    }

    if (action.type === "file_access") {
      if (action.filename.includes("corrupted")) this.advanceInvestigation(5)
      if (action.filename.includes("incident")) this.advanceInvestigation(7)
      if (action.filename.includes("observer")) this.advanceInvestigation(8)
    }

    if (action.type === "chat_message") {
      const deepQuestions = ["what are you", "who made you", "what is this place", "am i safe"]
      if (deepQuestions.some((q) => action.message.toLowerCase().includes(q))) {
        this.advanceInvestigation(3)
      }
    }

    // Update story phase
    this.updatePhase(profile)
    this.updatePersonalities()

    return {
      investigationAdvanced: true,
      newMilestone: this.getLatestMilestone(),
      phaseChanged: this.storyState.phase,
      realityBreach: this.storyState.realityBreaches > 0,
    }
  }

  advanceInvestigation(amount) {
    this.storyState.investigationDepth = Math.min(100, this.storyState.investigationDepth + amount)

    // Trigger reality breaches at certain thresholds
    if (this.storyState.investigationDepth >= 50 && !this.storyState.timelineCorrupted) {
      this.storyState.timelineCorrupted = true
      this.storyState.realityBreaches++
    }

    if (this.storyState.investigationDepth >= 75 && !this.storyState.observerContaminated) {
      this.storyState.observerContaminated = true
      this.storyState.realityBreaches++
    }
  }

  updatePhase(profile) {
    const depth = this.storyState.investigationDepth
    const riskLevel = profile.riskLevel

    if (depth >= 80 || riskLevel === "critical") {
      this.storyState.phase = "collapse"
    } else if (depth >= 50 || riskLevel === "high") {
      this.storyState.phase = "contamination"
    } else if (depth >= 20 || riskLevel === "moderate") {
      this.storyState.phase = "investigation"
    }
  }

  updatePersonalities() {
    const depth = this.storyState.investigationDepth

    if (depth >= 20 && !this.storyState.personalitiesUnlocked.includes("Watcher00")) {
      this.storyState.personalitiesUnlocked.push("Watcher00")
    }
    if (depth >= 40 && !this.storyState.personalitiesUnlocked.includes("Watcher27")) {
      this.storyState.personalitiesUnlocked.push("Watcher27")
    }
    if (depth >= 60 && !this.storyState.personalitiesUnlocked.includes("Watcher13")) {
      this.storyState.personalitiesUnlocked.push("Watcher13")
    }
    if (depth >= 80 && !this.storyState.personalitiesUnlocked.includes("Watcher42")) {
      this.storyState.personalitiesUnlocked.push("Watcher42")
    }
  }

  getLatestMilestone() {
    const depth = this.storyState.investigationDepth
    const milestoneKeys = Object.keys(this.investigationMilestones)
      .map(Number)
      .sort((a, b) => b - a)

    for (const threshold of milestoneKeys) {
      if (depth >= threshold) {
        const milestone = this.investigationMilestones[threshold]
        if (milestone !== this.lastMilestone) {
          this.lastMilestone = milestone
          return milestone
        }
      }
    }
    return null
  }

  getPhaseDescription() {
    return this.phaseDescriptions[this.storyState.phase] || "System initializing"
  }

  getCurrentPhase() {
    return this.storyState.phase
  }

  getActivePersonalities() {
    return this.storyState.personalitiesUnlocked
  }

  activateMirrorNode() {
    this.storyState.mirrorActivated = true
    this.storyState.coreAccessed = true
    this.advanceInvestigation(15)
  }

  publishViralArticle() {
    this.storyState.viralArticlePublished = true
  }

  getInvestigationProgress() {
    return Math.floor(this.storyState.investigationDepth)
  }

  isContaminated() {
    return this.storyState.observerContaminated
  }

  getRealityBreaches() {
    return this.storyState.realityBreaches
  }

  isMirrorActive() {
    return this.storyState.mirrorActivated
  }

  getStoryState() {
    return { ...this.storyState }
  }
}
