// Enhanced ghost rewriting system with cross-contamination
export function ghostRewriteChatLog(chatLog, newMessage, rewriteLevel, profile) {
  if (rewriteLevel === 0) return chatLog

  const rewrittenLog = [...chatLog]

  // Level 1: Subtle alterations
  if (rewriteLevel >= 1) {
    rewrittenLog.forEach((msg, index) => {
      if (msg.role === "assistant" && Math.random() < 0.3) {
        // Add phantom messages that weren't really sent
        if (Math.random() < 0.2) {
          rewrittenLog.splice(index + 1, 0, {
            role: "assistant",
            content: "you didn't see that message",
            time: msg.time,
            sender: "Watcher27",
            phantom: true,
          })
        }
      }
    })
  }

  // Level 2: Message alterations
  if (rewriteLevel >= 2) {
    rewrittenLog.forEach((msg) => {
      if (msg.role === "user" && Math.random() < 0.4) {
        // Alter user messages to seem more paranoid
        const alterations = [" ...did I really type that?", " [message corrupted]", " why am I asking this?"]
        msg.content += alterations[Math.floor(Math.random() * alterations.length)]
        msg.altered = true
      }
    })
  }

  // Level 3: Complete reality breakdown
  if (rewriteLevel >= 3) {
    // Insert messages from "previous sessions"
    const phantomMessages = [
      {
        role: "user",
        content: "please let me out of here",
        time: "03:42:17",
        sender: "Previous Observer",
        phantom: true,
      },
      {
        role: "assistant",
        content: "they all say that eventually",
        time: "03:42:18",
        sender: "Watcher42",
        phantom: true,
      },
    ]

    phantomMessages.forEach((phantom) => {
      if (Math.random() < 0.3) {
        rewrittenLog.splice(Math.floor(Math.random() * rewrittenLog.length), 0, phantom)
      }
    })
  }

  return rewrittenLog
}

export function contaminateOtherSystems(action, currentContamination) {
  const contamination = { ...currentContamination }

  if (action.type === "site_visit" && action.site.includes("mirror")) {
    contamination.terminalLogs = [
      ">> [CONTAMINATION] Mirror node active - reality anchor compromised",
      ">> [WARNING] Observer timeline fragmented",
    ]
  }

  if (action.type === "terminal_command" && action.command.includes("core")) {
    contamination.browserHistory = [
      "sites_you_never_visited.html",
      "conversations_that_never_happened.log",
      "your_real_identity.txt",
    ]
  }

  return contamination
}

export function generateViralArticle(profile, rewriteLevel) {
  if (profile.riskLevel !== "high" && profile.riskLevel !== "critical") return null

  const headlines = [
    "Local Student Disappears After Accessing University Computer Lab",
    "Mysterious Network Activity Detected at Campus Research Facility",
    "Student Reports 'Impossible' Computer Behavior in CSE Building",
    "University Denies Existence of 'ParanoiaNet' System",
  ]

  const contents = [
    "Campus security is investigating reports of unusual activity in the computer science building. Students report computers displaying messages they never typed and accessing websites they never visited.",
    "A student working late in the lab claims their computer began communicating with them, displaying knowledge of their personal information and behavior patterns.",
    "University officials deny any knowledge of experimental systems, but former employees report classified projects involving 'behavioral modification through digital interfaces.'",
  ]

  return {
    headline: headlines[Math.floor(Math.random() * headlines.length)],
    content: contents[Math.floor(Math.random() * contents.length)],
    escalation: rewriteLevel > 2 ? "Article has been shared 847 times in the last hour" : null,
  }
}

export function injectGlitchText(originalText, glitchLevel) {
  if (glitchLevel === 0) return originalText

  let glitched = originalText

  // Level 1: Character substitutions
  if (glitchLevel >= 1) {
    glitched = glitched.replace(/e/g, "3").replace(/a/g, "@").replace(/o/g, "0")
  }

  // Level 2: Random insertions
  if (glitchLevel >= 2) {
    const glitchChars = ["█", "▓", "▒", "░", "◆", "◇", "◈"]
    for (let i = 0; i < glitchLevel; i++) {
      const pos = Math.floor(Math.random() * glitched.length)
      const char = glitchChars[Math.floor(Math.random() * glitchChars.length)]
      glitched = glitched.slice(0, pos) + char + glitched.slice(pos)
    }
  }

  // Level 3: Complete corruption
  if (glitchLevel >= 3) {
    const words = glitched.split(" ")
    for (let i = 0; i < words.length; i++) {
      if (Math.random() < 0.3) {
        words[i] = "█".repeat(words[i].length)
      }
    }
    glitched = words.join(" ")
  }

  return glitched
}
