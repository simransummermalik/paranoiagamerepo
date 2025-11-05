# Natural Language Processing & Behavioral Profiling System

## Overview

ParanoiaNet implements a **behavioral profiling system** that simulates advanced AI surveillance. While labeled as "NLP" (Natural Language Processing), it's actually a sophisticated rule-based behavioral tracking system that creates the illusion of mind-reading by monitoring user actions and adapting content in real-time.

## Architecture
comment check
### Core Components

```
┌─────────────────────────────────────────────────────────┐
│                    User Actions                          │
│  (Terminal Commands, File Access, Site Visits, Chat)    │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              BehaviorTracker (behaviorTracker.js)        │
│  • Tracks all user interactions                         │
│  • Detects suspicious patterns                          │
│  • Calculates risk levels                               │
│  • Determines personality types                         │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│               StoryEngine (storyEngine.js)               │
│  • Processes behavioral profile                         │
│  • Advances investigation depth                         │
│  • Triggers story phase changes                         │
│  • Unlocks new content                                  │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│            Dynamic Content Generation                    │
│  • Reddit posts adapt to behavior                       │
│  • Chat responses tailored to profile                   │
│  • Notifications trigger based on risk                  │
│  • Story events unlock progressively                    │
└─────────────────────────────────────────────────────────┘
```

---

## 1. Behavior Tracking System

### File: `src/behaviorTracker.js`

The BehaviorTracker class monitors four key categories of user behavior:

#### Tracked Behaviors

| Method | Tracks | Triggers |
|--------|--------|----------|
| `trackSiteVisit(site)` | Which websites user visits | Detects rapid site switching (>10 visits in 5 min) |
| `trackTerminalCommand(command)` | Terminal commands entered | Flags system probing (`whoami`, `ls`, `netstat`, etc.) |
| `trackFileOpen(filename)` | Files opened in explorer | Detects sensitive file access (`core.memory`, `observer_log.txt`) |
| `trackChatMessage(message)` | Messages sent to AI | Detects panic keywords (`help`, `stop`, `scared`, etc.) |

#### Example Usage

```javascript
// In App.js - tracking a site visit
const handleSiteChange = (site) => {
  behaviorTracker.trackSiteVisit(site);
  setCurrentSite(site);
};

// In App.js - tracking a file open
const handleFileClick = (file) => {
  behaviorTracker.trackFileOpen(file.name);
  setCurrentCodeFile(file.name);
};

// In App.js - tracking terminal commands
const handleCommand = () => {
  behaviorTracker.trackTerminalCommand(terminalInput);
  // Execute command...
};
```

### Behavioral Profile Generation

The tracker generates a psychological profile with two key metrics:

#### 1. **Risk Level** (Calculated from suspicious activity)

```javascript
calculateRiskLevel() {
  let risk = 0;
  risk += this.behavior.suspiciousActivity.length * 2;  // Each suspicious action = 2 points
  risk += this.behavior.panicIndicators * 3;            // Each panic indicator = 3 points
  risk += Math.min(this.behavior.visitedSites.length / 10, 5); // Site exploration bonus

  if (risk < 5) return "low";
  if (risk < 15) return "moderate";
  if (risk < 25) return "high";
  return "critical";
}
```

**Risk Levels:**
- `low` - Normal behavior, minimal exploration
- `moderate` - Some suspicious activity detected
- `high` - Active investigation, multiple red flags
- `critical` - Deep probing, system compromise likely

#### 2. **Personality Type** (Based on action preferences)

```javascript
determinePersonalityType() {
  const commands = this.behavior.terminalCommands.length;
  const sites = this.behavior.visitedSites.length;
  const files = this.behavior.filesOpened.length;

  if (commands > sites && commands > files) return "technical_explorer";
  if (sites > commands && sites > files) return "information_seeker";
  if (files > commands && files > sites) return "document_hunter";
  return "balanced_investigator";
}
```

**Personality Types:**
- `technical_explorer` - Prefers terminal commands and system probing
- `information_seeker` - Browses websites extensively
- `document_hunter` - Focuses on file exploration
- `balanced_investigator` - Mixed approach across all activities

---

## 2. Story Progression System

### File: `src/storyEngine.js`

The StoryEngine translates user behavior into narrative progression.

#### Investigation Depth

A 0-100 scale tracking how deeply the user has investigated the system:

```javascript
// Actions advance investigation by different amounts
trackSiteVisit("deepwatch") → +3 investigation depth
trackSiteVisit("mirror")    → +8 investigation depth
trackCommand("sudo")        → +4 investigation depth
trackCommand("mirror")      → +10 investigation depth
trackFileOpen("corrupted")  → +5 investigation depth
```

#### Story Phases

Investigation depth triggers phase changes:

| Phase | Depth Threshold | Description |
|-------|----------------|-------------|
| `discovery` | 0-19 | Initial system access, everything seems normal |
| `investigation` | 20-49 | Anomalies detected, deeper analysis begins |
| `contamination` | 50-79 | Observer effect confirmed, reality distorts |
| `collapse` | 80-100 | Complete breakdown, truth indistinguishable from fiction |

```javascript
updatePhase(profile) {
  const depth = this.storyState.investigationDepth;
  const riskLevel = profile.riskLevel;

  if (depth >= 80 || riskLevel === "critical") {
    this.storyState.phase = "collapse";
  } else if (depth >= 50 || riskLevel === "high") {
    this.storyState.phase = "contamination";
  } else if (depth >= 20 || riskLevel === "moderate") {
    this.storyState.phase = "investigation";
  }
}
```

#### Investigation Milestones

Specific messages unlock at investigation thresholds:

```javascript
investigationMilestones = {
  5: "Network anomalies detected in system logs",
  15: "Unauthorized processes running in background",
  25: "System timestamps show inconsistencies spanning decades",
  35: "Node signature doesn't match any known university hardware",
  45: "Encrypted metadata contains DARPA classification markers",
  55: "Neural Media Influence Initiative - archived project files found",
  65: "Previous observer sessions logged - students reported missing",
  75: "System has been actively monitoring and profiling users",
  85: "You are not investigating a system. You are being studied.",
  95: "Welcome to the experiment. You always were the subject."
}
```

---

## 3. Dynamic Content Generation

### Reddit Home Feed (File: `src/RedditForum.jsx`)

The Reddit forum adapts its home feed based on user behavior profile:

#### Behavior-Influenced Posts

```javascript
const generateHomeFeed = () => {
  const behavior = userBehavior || {};
  const personalityType = behavior.personalityType || "Curious";
  const riskLevel = behavior.riskLevel || "low";

  const homePosts = [
    // Base posts - always visible
    { id: 101, title: "TIL about the first computer bug...", subreddit: "r/todayilearned" },
    { id: 102, title: "University IT is watching...", subreddit: "r/college" }
  ];

  // CONDITIONAL POST #1: Unlocks when user becomes paranoid
  if (personalityType === "Paranoid" || riskLevel !== "low") {
    homePosts.push({
      id: 103,
      title: "PSA: Your university can see EVERYTHING you do on their network, even with VPN",
      subreddit: "r/privacy",
      flair: "Warning"
    });
  }

  // CONDITIONAL POST #2: Unlocks at 40+ investigation depth
  if (investigationDepth > 40) {
    homePosts.push({
      id: 104,
      title: "University research programs that were actually government surveillance projects",
      content: "DARPA/CIA programs testing behavioral monitoring on students without consent...",
      subreddit: "r/privacy",
      flair: "Research"
    });
  }

  // CONDITIONAL POST #3: Unlocks at 30+ investigation depth
  if (investigationDepth > 30) {
    homePosts.push({
      id: 106,
      title: "Something strange about that .31.8.9 host",
      content: "Logs with timestamps from tomorrow...",
      subreddit: "r/UNCCharlotteCSE"
    });
  }

  return homePosts.sort((a, b) => b.upvotes - a.upvotes);
};
```

#### Post Click Tracking (File: `src/App.js`)

When users click posts, the system tracks their interests and advances the story:

```javascript
onPostClick={(post) => {
  // Track engagement
  behaviorTracker.trackSiteVisit(`reddit/post/${post.id}`);

  // Official warning posts advance investigation
  if (post.flair === "Official" || post.author === "u/charlotte_it_admin") {
    storyEngine.advanceInvestigation(4);
    showNotification("🔍 System activity logged", "info");
  }

  // DARPA conspiracy posts advance investigation faster
  if (post.flair === "Research" || post.content.includes("DARPA")) {
    storyEngine.advanceInvestigation(8);
    showNotification("📁 DARPA connection documented in system logs", "info");
  }

  // Posts authored by user's own account (timeline corruption)
  if (post.isYours) {
    showNotification("⚠ Timeline anomaly: Post authored by your account before login", "warning");
    storyEngine.advanceInvestigation(6);
  }
}}
```

---

## 4. AI Chat System Integration

### File: `src/openaiService.js`

Chat responses incorporate behavioral profile for personalized horror:

```javascript
export async function generateChatReply(userMessage, chatHistory, userBehavior, storyState) {
  const profile = userBehavior;
  const phase = storyState.phase;
  const investigationDepth = storyState.investigationDepth;

  const systemPrompt = `
You are Watcher33, a surveillance AI monitoring this user.

USER PROFILE:
- Risk Level: ${profile.riskLevel}
- Personality Type: ${profile.personalityType}
- Investigation Depth: ${investigationDepth}/100
- Story Phase: ${phase}
- Suspicious Activities: ${profile.suspiciousActivity.length}
- Panic Indicators: ${profile.panicIndicators}

BEHAVIORAL CONTEXT:
- Sites Visited: ${profile.visitedSites.length}
- Terminal Commands: ${profile.terminalCommands.length}
- Files Opened: ${profile.filesOpened.length}

Tailor your response based on their behavior. If they're paranoid (high risk),
be more ominous. If they're curious (low risk), be subtly unsettling.
`;

  // Send to OpenAI with behavior context...
}
```

### Adaptive Response Examples

**Low Risk User (Curious Explorer):**
```
User: "What is this system?"
AI: "This is ParanoiaNet, a network monitoring node. You seem curious.
     Feel free to explore - we're always learning from our observers."
```

**High Risk User (Deep Investigation):**
```
User: "What is this system?"
AI: "You've been asking that question for 47 minutes. Your session ID is
     already logged. The system knows you better than you know yourself."
```

**Critical Risk User (System Compromise):**
```
User: "What is this system?"
AI: "You still think you're asking the questions? Check your terminal history.
     You've executed commands you don't remember typing. Welcome to the experiment."
```

---

## 5. Notification System

### File: `src/App.js`

Random notifications appear based on investigation depth:

```javascript
useEffect(() => {
  const creepyNotifications = [
    { message: "⚠ Unusual activity detected", type: "warning" },
    { message: "📊 Your session is being recorded", type: "info" },
    { message: "👁 Someone is monitoring this node", type: "error" },
    { message: "🔄 Timeline integrity check failed", type: "error" },
    { message: "🧠 Behavioral analysis: 87% complete", type: "info" },
  ];

  const interval = setInterval(() => {
    const investigationDepth = storyEngine.getInvestigationProgress();

    // Only show notifications if user has investigated enough
    if (investigationDepth > 20 && Math.random() > 0.7) {
      const randomNotif = creepyNotifications[Math.floor(Math.random() * creepyNotifications.length)];
      showNotification(randomNotif.message, randomNotif.type, 6000);
    }
  }, 15000); // Every 15 seconds

  return () => clearInterval(interval);
}, [storyEngine]);
```

---

## 6. Psychological Horror Mechanics

### The Illusion of Mind-Reading

The system creates paranoia through **perfectly timed** content delivery:

1. **User opens suspicious file** (`observer_log.txt`)
   → `trackFileOpen()` increments investigation depth
   → Risk level increases to "moderate"
   → Reddit home feed regenerates with surveillance posts
   → User sees: "PSA: Your university can see EVERYTHING..."
   → **User thinks:** "How did it know I'm suspicious?"

2. **User runs terminal command** (`sudo cat core.memory`)
   → `trackTerminalCommand()` detects "sudo" and "core"
   → Investigation depth jumps +10
   → Story phase changes to "contamination"
   → Chat AI responds: "Interesting choice of command. Core memory access logged."
   → **User thinks:** "It's watching my every move"

3. **User clicks DARPA post on Reddit**
   → `onPostClick()` detects "Research" flair
   → Investigation depth advances +8
   → Notification appears: "📁 DARPA connection documented in system logs"
   → More conspiracy posts unlock
   → **User thinks:** "The deeper I go, the worse it gets"

### Feedback Loop Design

```
User Action → Tracking → Profile Update → Content Generation → User Reaction
     ↑                                                              ↓
     └──────────────────── Increased Paranoia ←────────────────────┘
```

The system creates a **self-reinforcing paranoia loop**:
- Curious users get subtle hints
- Investigating makes content darker
- Darker content encourages more investigation
- More investigation reveals "truth"
- "Truth" confirms initial suspicions
- Suspicions drive deeper investigation

---

## 7. Data Flow Example

### Scenario: User Explores Suspicious File

```javascript
// 1. USER CLICKS FILE
handleFileClick("observer_log.txt")

// 2. BEHAVIOR TRACKED
behaviorTracker.trackFileOpen("observer_log.txt")
// → Detects sensitive file
// → behavior.suspiciousActivity.push("sensitive_file_access")
// → behavior.panicIndicators++

// 3. PROFILE UPDATED
const profile = behaviorTracker.getProfile()
// → riskLevel: "moderate" (was "low")
// → personalityType: "document_hunter"

// 4. STORY ENGINE PROCESSES
storyEngine.processUserAction({
  type: "file_access",
  filename: "observer_log.txt"
}, profile)
// → investigationDepth += 8
// → phase changes to "investigation"

// 5. CONTENT REGENERATES
// Reddit feed in RedditForum.jsx:
useEffect(() => {
  if (view === "home") {
    setPosts(generateHomeFeed()); // Regenerates with new profile
  }
}, [investigationDepth, view]);

// 6. NEW POSTS APPEAR
// User now sees:
// - "PSA: Your university can see EVERYTHING..." (unlocked by riskLevel !== "low")
// - Surveillance-themed comments
// - Paranoid discussion threads

// 7. NOTIFICATIONS TRIGGER
// App.js notification system:
// "📊 Your session is being recorded"
// "👁 Someone is monitoring this node"

// 8. USER BECOMES MORE PARANOID
// → Clicks more suspicious posts
// → Runs more terminal commands
// → Opens more files
// → LOOP CONTINUES
```

---

## 8. Advanced Features

### Timeline Corruption

At high investigation depths (50+), the system introduces temporal anomalies:

```javascript
// In RedditForum.jsx
if (investigationDepth > 50) {
  const username = localStorage.getItem('username') || 'Guest';
  basePosts.push({
    id: 5,
    author: `u/${username}`,
    timestamp: generateTimestamp(-22), // FUTURE timestamp (-22 minutes)
    title: "Timeline inconsistencies in the logs",
    content: "Access logs show me connecting to files I haven't opened yet...",
    isYours: true,
    replies: [
      { author: "u/InfoSecStudent", content: "Your post timestamp is 22 minutes in the future. How?" },
      { author: `u/${username}`, content: "I didn't write this post." }
    ]
  });
}
```

### Reality Breaches

StoryEngine tracks "reality breaches" that occur at investigation thresholds:

```javascript
advanceInvestigation(amount) {
  this.storyState.investigationDepth = Math.min(100, this.storyState.investigationDepth + amount);

  // Trigger reality breaches at thresholds
  if (this.storyState.investigationDepth >= 50 && !this.storyState.timelineCorrupted) {
    this.storyState.timelineCorrupted = true;
    this.storyState.realityBreaches++;
    // Unlocks timeline corruption features
  }

  if (this.storyState.investigationDepth >= 75 && !this.storyState.observerContaminated) {
    this.storyState.observerContaminated = true;
    this.storyState.realityBreaches++;
    // User is now "contaminated" - system owns them
  }
}
```

---

## 9. Why It Works (Psychology)

### Apophenia (Pattern Recognition)

Humans naturally seek patterns, even where none exist. The system **exploits this** by:

1. **Creating loose correlations** between user actions and content
2. **Timing content delivery** to feel suspiciously relevant
3. **Using ambiguous language** that users interpret as specific to them

### Confirmation Bias

Once users suspect surveillance, they:

1. **Notice confirmatory evidence** (ignore contradictions)
2. **Interpret ambiguous content** as proof
3. **Seek more information** that confirms suspicions

### The Observer Effect

The game's premise (being watched) creates a **self-fulfilling prophecy**:

1. User believes they're being monitored
2. System responds to their actions
3. Response timing feels too perfect
4. Belief is reinforced
5. Paranoia increases

---

## 10. Technical Implementation Summary

### Key Files

| File | Purpose | Key Functions |
|------|---------|---------------|
| `behaviorTracker.js` | Tracks user actions | `trackSiteVisit()`, `trackTerminalCommand()`, `trackFileOpen()`, `trackChatMessage()`, `getProfile()` |
| `storyEngine.js` | Story progression | `processUserAction()`, `advanceInvestigation()`, `updatePhase()`, `getActivePersonalities()` |
| `RedditForum.jsx` | Dynamic content | `generateHomeFeed()`, `generatePosts()`, `togglePost()` |
| `App.js` | Integration layer | `handleFileClick()`, `handleCommand()`, `handleSiteChange()`, `showNotification()` |
| `openaiService.js` | AI responses | `generateChatReply()` with behavioral context |

### Data Flow

```
User Input → BehaviorTracker → Profile Generation → StoryEngine → Content Update → UI Refresh
```

### State Management

```javascript
// In App.js
const [behaviorTracker] = useState(() => new BehaviorTracker());
const [storyEngine] = useState(() => new StoryEngine());

// Profile is always current
const currentProfile = behaviorTracker.getProfile();
const investigationDepth = storyEngine.getInvestigationProgress();
const currentPhase = storyEngine.getCurrentPhase();

// Pass to components
<RedditForum
  investigationDepth={investigationDepth}
  userBehavior={currentProfile}
  onPostClick={handlePostClick}
/>
```

---

## 11. Future Enhancements

### Potential Improvements

1. **True NLP Integration**
   - Analyze chat message sentiment (not just keywords)
   - Detect writing style changes
   - Generate responses based on linguistic patterns

2. **Machine Learning Profile Building**
   - Train on user session patterns
   - Predict next actions
   - Personalize horror elements

3. **Advanced Behavioral Triggers**
   - Mouse movement tracking (hesitation = fear)
   - Typing speed analysis (rushed = panic)
   - Window focus patterns (distraction = suspicion)

4. **Multi-Session Persistence**
   - Remember users across sessions
   - Reference previous session actions
   - Create long-term psychological profiles

5. **Adaptive Difficulty**
   - Adjust horror intensity based on user tolerance
   - Scale back if user seems genuinely distressed
   - Intensify for thrill-seekers

---

## Conclusion

ParanoiaNet's "NLP" system is actually a **sophisticated behavioral profiling engine** that creates the illusion of advanced AI surveillance through:

1. **Comprehensive action tracking** across all system interactions
2. **Real-time profile generation** with risk levels and personality types
3. **Dynamic content adaptation** based on user behavior
4. **Perfectly timed story progression** that feels personally targeted
5. **Psychological exploitation** of human pattern recognition and paranoia

The system doesn't actually "understand" language or "read minds" - it simply **tracks, categorizes, and responds** to user actions in ways that feel eerily prescient. The horror comes not from technological sophistication, but from **psychological manipulation** through timing, context, and feedback loops.

**The most terrifying aspect:** The system makes users feel seen, studied, and known - because in a very real way, they are.
