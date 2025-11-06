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

    // Subtle environmental changes instead of obvious milestones
    this.investigationMilestones = {
      5: null, // Minor UI timing shifts start
      15: null, // Timestamps begin drifting
      25: null, // Color temperature shifts
      35: null, // Background processes multiply
      45: null, // Content inconsistencies appear
      55: null, // Temporal anomalies intensify
      65: null, // Reality anchors weaken
      75: null, // Observer effect manifests
      85: null, // Narrative coherence breaks
      95: null, // Complete environmental corruption
    }

    // Environmental corruption levels
    this.environmentalEffects = {
      uiGlitchIntensity: 0,
      timestampDrift: 0,
      colorCorruption: 0,
      contentInstability: 0,
      temporalAnomalies: 0,
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

    // Gradually increase environmental corruption
    const depth = this.storyState.investigationDepth

    // UI glitches intensify slowly
    this.environmentalEffects.uiGlitchIntensity = Math.min(100, depth * 0.8)

    // Timestamps start drifting after 15% investigation
    if (depth >= 15) {
      this.environmentalEffects.timestampDrift = Math.min(100, (depth - 15) * 1.2)
    }

    // Color temperature shifts after 25%
    if (depth >= 25) {
      this.environmentalEffects.colorCorruption = Math.min(100, (depth - 25) * 1.1)
    }

    // Content becomes unstable after 45%
    if (depth >= 45) {
      this.environmentalEffects.contentInstability = Math.min(100, (depth - 45) * 1.5)
    }

    // Temporal anomalies after 55%
    if (depth >= 55) {
      this.environmentalEffects.temporalAnomalies = Math.min(100, (depth - 55) * 1.8)
    }

    // Silent reality breaches (no notifications, just effects)
    if (depth >= 50 && !this.storyState.timelineCorrupted) {
      this.storyState.timelineCorrupted = true
      this.storyState.realityBreaches++
    }

    if (depth >= 75 && !this.storyState.observerContaminated) {
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
    // No more explicit milestones - everything happens through environmental effects
    return null
  }

  getEnvironmentalEffects() {
    return { ...this.environmentalEffects }
  }

  getTimestampDrift() {
    // Returns minutes to drift timestamps (can be negative for backwards drift)
    const drift = this.environmentalEffects.timestampDrift
    if (drift < 20) return 0
    if (drift < 40) return Math.floor(Math.random() * 10) - 5 // -5 to +5 minutes
    if (drift < 60) return Math.floor(Math.random() * 120) - 60 // -60 to +60 minutes
    return Math.floor(Math.random() * 1440) - 720 // -12 to +12 hours
  }

  getColorFilter() {
    const corruption = this.environmentalEffects.colorCorruption
    if (corruption < 20) return null
    if (corruption < 40) return `hue-rotate(${corruption * 0.5}deg)`
    if (corruption < 60) return `hue-rotate(${corruption}deg) saturate(${120 - corruption}%)`
    return `hue-rotate(${corruption * 1.5}deg) saturate(${150 - corruption}%) contrast(${100 + corruption * 0.3}%)`
  }

  shouldGlitch() {
    const intensity = this.environmentalEffects.uiGlitchIntensity
    return Math.random() * 100 < intensity
  }

  getContentCorruption() {
    // Returns probability (0-100) that content should be altered
    return this.environmentalEffects.contentInstability
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
