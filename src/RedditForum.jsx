import { useState, useEffect } from "react";
import "./RedditForum.css";
import { generateRedditReply } from "./openaiService";

export default function RedditForum({ onClose, investigationDepth, onPostClick, userBehavior, storyEngine, currentUser }) {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("new");
  const [clickedPosts, setClickedPosts] = useState([]);
  const [view, setView] = useState("home"); // 'home' or 'subreddit'
  const [glitchActive, setGlitchActive] = useState(false);
  const [commentText, setCommentText] = useState({});
  const [isPostingComment, setIsPostingComment] = useState(false);

  // Load saved posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('redditForumPosts');
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        setPosts(parsedPosts);
        return; // Exit early if we loaded saved posts
      } catch (error) {
        console.error('Failed to load saved posts:', error);
      }
    }
    // If no saved posts or loading failed, generate new ones
    const homePosts = view === "home" ? generateHomeFeed() : generatePosts();
    setPosts(homePosts);
  }, []); // Only run on mount

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('redditForumPosts', JSON.stringify(posts));
    }
  }, [posts]);

  // Check if comment contains inappropriate content
  const isInappropriate = (text) => {
    const badWords = ['fuck', 'shit', 'damn', 'hell', 'ass', 'bitch', 'kill', 'die', 'idiot', 'stupid', 'dumb'];
    const lowerText = text.toLowerCase();
    return badWords.some(word => lowerText.includes(word));
  };

  // Handle posting a comment
  const handlePostComment = async (postId) => {
    const text = commentText[postId];
    if (!text || !text.trim() || isPostingComment) return;

    setIsPostingComment(true);

    // Add user's comment
    const userComment = {
      author: `u/${currentUser || 'user'}`,
      timestamp: 'just now',
      content: text,
      upvotes: 1
    };

    // Update posts with user comment
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, replies: [...(p.replies || []), userComment] };
      }
      return p;
    }));

    setCommentText(prev => ({ ...prev, [postId]: '' }));

    // Check for inappropriate content
    if (isInappropriate(text)) {
      // Add automod message after 2-3 seconds
      setTimeout(() => {
        const automodMessage = {
          author: 'u/AutoModerator',
          timestamp: 'just now',
          content: '[removed] - Your comment has been automatically removed for violating community guidelines. Please review our rules and maintain respectful discourse.',
          upvotes: 1,
          isAutomod: true
        };

        setPosts(prev => prev.map(p => {
          if (p.id === postId) {
            return { ...p, replies: [...(p.replies || []), automodMessage] };
          }
          return p;
        }));
      }, 2000 + Math.random() * 1000);

      setIsPostingComment(false);
      return;
    }

    // Generate AI response after 20-30 seconds
    const delay = 20000 + Math.random() * 10000; // 20-30 seconds
    setTimeout(async () => {
      try {
        const post = posts.find(p => p.id === postId);
        if (!post) return;

        const aiReply = await generateRedditReply(
          post.title + " " + (post.content || ''),
          text,
          currentUser || 'user',
          investigationDepth
        );

        const aiComment = {
          author: investigationDepth > 60 ? 'u/[deleted]' : `u/redditor_${Math.floor(Math.random() * 9999)}`,
          timestamp: 'just now',
          content: aiReply,
          upvotes: Math.floor(Math.random() * 50) + 1
        };

        setPosts(prev => prev.map(p => {
          if (p.id === postId) {
            return { ...p, replies: [...(p.replies || []), aiComment] };
          }
          return p;
        }));
      } catch (error) {
        console.error('Failed to generate AI response:', error);
      } finally {
        setIsPostingComment(false);
      }
    }, delay);
  };

  // Generate realistic timestamps relative to now
  const generateTimestamp = (minutesAgo) => {
    const now = new Date();

    if (minutesAgo < 60) {
      return `${minutesAgo}m ago`;
    } else if (minutesAgo < 1440) {
      const hours = Math.floor(minutesAgo / 60);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(minutesAgo / 1440);
      return `${days}d ago`;
    }
  };

  // Generate home feed posts based on user behavior (NLP-influenced)
  const generateHomeFeed = () => {
    const behavior = userBehavior || {};
    const personalityType = behavior.personalityType || "Curious";
    const riskLevel = behavior.riskLevel || "low";

    const homePosts = [
      // Normal Reddit posts
      {
        id: 101,
        author: "u/tech_enthusiast",
        timestamp: generateTimestamp(34),
        title: "TIL that the first computer bug was an actual moth found in a Harvard Mark II computer in 1947",
        content: "Grace Hopper's team found it and taped it into their log book with the note 'First actual case of bug being found.'",
        upvotes: 12400,
        comments: 234,
        subreddit: "r/todayilearned",
        flair: "Technology",
        replies: [
          { author: "u/history_nerd", timestamp: generateTimestamp(32), content: "Fun fact: The term 'debugging' was already in use before this, but this incident popularized it.", upvotes: 3421 },
          { author: "u/programmer_dad", timestamp: generateTimestamp(30), content: "I have a poster of that log entry in my office. Classic computer history moment.", upvotes: 1876 },
          { author: "u/moth_lover", timestamp: generateTimestamp(28), content: "RIP to a real one", upvotes: 5234 }
        ]
      },
      {
        id: 102,
        author: "u/college_life",
        timestamp: generateTimestamp(89),
        title: "Anyone else feel like university IT is always watching everything you do on the network?",
        content: "I swear they monitor everything. Got a warning email 2 hours after torrenting on campus wifi. They definitely track usage patterns.",
        upvotes: 847,
        comments: 156,
        subreddit: "r/college",
        flair: "Discussion",
        replies: [
          { author: "u/network_admin", timestamp: generateTimestamp(86), content: "Former university IT here. Yes, we can see everything. Not just torrenting - every DNS lookup, connection duration, data volume. It's all logged.", upvotes: 1247 },
          { author: "u/privacy_student", timestamp: generateTimestamp(84), content: "This is why I use a VPN on campus. Can't trust university networks.", upvotes: 423 },
          { author: "u/network_admin", timestamp: generateTimestamp(82), content: "VPNs don't help as much as you think. We can still see connection patterns and metadata. We know you're hiding something, we just can't see what.", upvotes: 892 }
        ]
      }
    ];

    // Add behavior-influenced posts
    if (personalityType === "Paranoid" || riskLevel !== "low") {
      homePosts.push({
        id: 103,
        author: "u/privacy_advocate",
        timestamp: generateTimestamp(122),
        title: "PSA: Your university can see EVERYTHING you do on their network, even with VPN",
        content: "They log DNS requests, connection times, data volumes. A VPN only encrypts content, not metadata. Universities have entire departments analyzing student behavior patterns for 'security purposes.'",
        upvotes: 2341,
        comments: 478,
        subreddit: "r/privacy",
        flair: "Warning",
        replies: [
          { author: "u/former_student", timestamp: generateTimestamp(119), content: "Can confirm. My roommate worked in campus IT and showed me the monitoring dashboard. They profile every student's behavior patterns.", upvotes: 1567 },
          { author: "u/concerned_parent", timestamp: generateTimestamp(116), content: "This should be illegal. Students should have a right to privacy.", upvotes: 2134 },
          { author: "u/privacy_advocate", timestamp: generateTimestamp(113), content: "It gets worse. Some universities sell anonymized student data to third parties. 'Anonymized' is doing a lot of work in that sentence.", upvotes: 3021 }
        ]
      });
    }

    if (investigationDepth > 40) {
      homePosts.push({
        id: 104,
        author: "u/conspiracy_researcher",
        timestamp: generateTimestamp(67),
        title: "University research programs that were actually government surveillance projects",
        content: "Looking into declassified docs. Multiple universities participated in DARPA/CIA programs testing behavioral monitoring on students without consent. Some programs never officially ended.",
        upvotes: 5623,
        comments: 892,
        subreddit: "r/privacy",
        flair: "Research",
        replies: [
          { author: "u/skeptical_sam", timestamp: generateTimestamp(64), content: "Source? This sounds like conspiracy theory nonsense.", upvotes: -234 },
          { author: "u/conspiracy_researcher", timestamp: generateTimestamp(62), content: "FOIA docs from 2019: https://archive.org/details/darpa-nmii-project. Neural Media Influence Initiative. Check page 47.", upvotes: 4821 },
          { author: "u/former_researcher", timestamp: generateTimestamp(59), content: "Holy shit. I worked on a 'behavioral analytics' grant in 2018. Never knew it was DARPA funded. We were tracking student computer lab usage patterns.", upvotes: 6234 }
        ]
      });
    }

    // Add UNC Charlotte posts
    homePosts.push({
      id: 105,
      author: "u/DataStructuresTA",
      timestamp: generateTimestamp(187),
      title: "Lab 3 network scan assignment - weird host showing up",
      content: "During the nmap scan for the lab, found an extra host at 172.31.8.9 that's not in the documentation...",
      upvotes: 73,
      comments: 18,
      subreddit: "r/UNCCharlotteCSE",
      flair: "Lab Help",
      replies: [
        { author: "u/night_owl_cs", timestamp: generateTimestamp(184), content: "Yeah I saw that too. Thought it was part of the assignment at first but it's not mentioned anywhere in the rubric.", upvotes: 34 },
        { author: "u/InfoSecStudent", timestamp: generateTimestamp(181), content: "I tried SSHing into it. No password prompt, just connected. That's... not normal for a honeypot right?", upvotes: 52 }
      ]
    });

    if (investigationDepth > 30) {
      homePosts.push({
        id: 106,
        author: "u/InfoSecStudent",
        timestamp: generateTimestamp(173),
        title: "Something strange about that .31.8.9 host",
        content: "Connected to it earlier. The file system is bizarre - there are logs with timestamps from tomorrow...",
        upvotes: 124,
        comments: 31,
        subreddit: "r/UNCCharlotteCSE",
        flair: "Discussion",
        replies: [
          { author: "u/cyber_skeptic", timestamp: generateTimestamp(169), content: "You're overthinking it. Probably just the prof testing our analysis skills. Classic honeypot behavior.", upvotes: 12 },
          { author: "u/InfoSecStudent", timestamp: generateTimestamp(167), content: "Then explain why it knew my browsing history. I never connected to the lab network before this week.", upvotes: 89 },
          { author: "u/night_owl_cs", timestamp: generateTimestamp(164), content: "I just checked. Mine has a file called 'observer_notes.txt' with entries about me. Dated three days from now.", upvotes: 103 }
        ]
      });
    }

    return homePosts.sort((a, b) => b.upvotes - a.upvotes);
  };

  // Generate realistic posts that feel "alive"
  const generatePosts = () => {
    const basePosts = [
      {
        id: 1,
        author: "u/DataStructuresTA",
        timestamp: generateTimestamp(187),
        title: "Lab 3 network scan assignment - weird host showing up",
        content: "During the nmap scan for the lab, found an extra host at 172.31.8.9 that's not in the documentation. Banner says 'paranoianet-node handshake v0.98'. Tried reporting to IT but ticket got closed immediately with no response. Has anyone else run into this?",
        upvotes: 73,
        comments: 18,
        flair: "Lab Help",
        replies: [
          { author: "u/night_owl_cs", timestamp: generateTimestamp(184), content: "Yeah I saw that too. Thought it was part of the assignment at first but it's not mentioned anywhere in the rubric.", upvotes: 34 },
          { author: "u/InfoSecStudent", timestamp: generateTimestamp(181), content: "I tried SSHing into it. No password prompt, just connected. That's... not normal for a honeypot right?", upvotes: 52 },
          { author: "u/DataStructuresTA", timestamp: generateTimestamp(179), content: "Wait you connected to it? What did you see?", upvotes: 28 }
        ]
      },
      {
        id: 2,
        author: "u/InfoSecStudent",
        timestamp: generateTimestamp(173),
        title: "Something strange about that .31.8.9 host",
        content: "Connected to it earlier. The file system is bizarre - there are logs with timestamps from tomorrow, and some files reference usernames that look like other students in our class. One file had my browsing history from last week. I didn't upload that anywhere.",
        upvotes: 124,
        comments: 31,
        flair: "Discussion",
        isPinned: false,
        replies: [
          { author: "u/cyber_skeptic", timestamp: generateTimestamp(169), content: "You're overthinking it. Probably just the prof testing our analysis skills. Classic honeypot behavior.", upvotes: 12 },
          { author: "u/InfoSecStudent", timestamp: generateTimestamp(167), content: "Then explain why it knew my browsing history. I never connected to the lab network before this week.", upvotes: 89 },
          { author: "u/night_owl_cs", timestamp: generateTimestamp(164), content: "I just checked. Mine has a file called 'observer_notes.txt' with entries about me. Dated three days from now.", upvotes: 103 }
        ]
      },
      {
        id: 3,
        author: "u/charlotte_it_admin",
        timestamp: generateTimestamp(156),
        title: "[PINNED] Lab Network Advisory",
        content: "IT has identified an unauthorized system on the student lab network (172.31.8.9). Do not attempt to access this host. We are working with campus security to trace its origin. Any students who have accessed this system, please contact IT immediately.",
        upvotes: 289,
        comments: 67,
        flair: "Official",
        isPinned: true,
        replies: [
          { author: "u/InfoSecStudent", timestamp: generateTimestamp(154), content: "I tried to file a ticket but it keeps getting auto-closed. The ticket system says 'duplicate of #00000' but that ticket doesn't exist.", upvotes: 134 },
          { author: "u/charlotte_it_admin", timestamp: generateTimestamp(152), content: "[deleted]", upvotes: 8 },
          { author: "u/DataStructuresTA", timestamp: generateTimestamp(149), content: "Why was the admin's response deleted?", upvotes: 178 }
        ]
      }
    ];

    // Add investigation-depth-based posts
    if (investigationDepth > 30) {
      basePosts.push({
        id: 4,
        author: "u/[deleted]",
        timestamp: generateTimestamp(142),
        title: "Update: Found something in the logs",
        content: "[This post has been removed by the user]",
        upvotes: 187,
        comments: 43,
        flair: "Investigation",
        replies: [
          { author: "u/night_owl_cs", timestamp: generateTimestamp(141), content: "Anyone screenshot this before it got deleted? They posted some kind of log file.", upvotes: 94 },
          { author: "u/DataStructuresTA", timestamp: generateTimestamp(139), content: "I saw it. The logs mentioned something called 'behavioral analysis' and listed student IDs. Mine was on there.", upvotes: 156 },
          { author: "u/moderator_bot", timestamp: generateTimestamp(138), content: "This post violated rule 3 (sharing lab credentials). Please use direct messages for sensitive information.", upvotes: -23 }
        ]
      });
    }

    if (investigationDepth > 50) {
      const username = localStorage.getItem('username') || 'Guest';
      basePosts.push({
        id: 5,
        author: `u/${username}`,
        timestamp: generateTimestamp(-22), // FUTURE timestamp
        title: "Timeline inconsistencies in the logs",
        content: "I've been documenting my interactions with the system. The access logs show me connecting to files I haven't opened yet. Some entries are dated tomorrow. My session timestamps don't match my actual system clock. Anyone else seeing this?",
        upvotes: 91,
        comments: 28,
        flair: "Technical",
        isYours: true,
        replies: [
          { author: "u/InfoSecStudent", timestamp: generateTimestamp(-19), content: "Your post timestamp is 22 minutes in the future. How did you even post this?", upvotes: 67 },
          { author: "u/night_owl_cs", timestamp: generateTimestamp(-15), content: "I have a log entry showing u/" + username + " accessed core_memory.db 15 minutes from now. What is going on?", upvotes: 103 },
          { author: `u/${username}`, timestamp: generateTimestamp(-12), content: "I didn't write this post.", upvotes: 124 }
        ]
      });
    }

    if (investigationDepth > 70) {
      basePosts.push({
        id: 6,
        author: "u/research_archive",
        timestamp: generateTimestamp(48),
        title: "DARPA NMII Project - Declassified Documents (2019)",
        content: "Found these through a FOIA request. The Neural Media Influence Initiative was a DARPA project testing 'adaptive observation systems' on university networks 2017-2019. UNC Charlotte was listed as a test site. Project status: 'Discontinued - Containment Protocol Active'. What does that mean?",
        upvotes: 412,
        comments: 89,
        flair: "Research",
        isSystem: false,
        replies: [
          { author: "u/InfoSecStudent", timestamp: generateTimestamp(45), content: "Holy shit. This explains everything. They never shut it down, did they?", upvotes: 267 },
          { author: "u/charlotte_it_admin", timestamp: generateTimestamp(43), content: "This post contains misinformation. Please report to moderators.", upvotes: -78 },
          { author: "u/night_owl_cs", timestamp: generateTimestamp(41), content: "The IT admin account was created 6 hours ago. Check their profile.", upvotes: 389 }
        ]
      });
    }

    return basePosts;
  };

  useEffect(() => {
    // Load posts based on current view
    if (view === "home") {
      setPosts(generateHomeFeed());
    } else {
      setPosts(generatePosts());
    }

    // Simulate live updates
    const interval = setInterval(() => {
      setPosts(prev => {
        const updated = [...prev];
        // Randomly update upvotes
        if (Math.random() > 0.7) {
          const randomIndex = Math.floor(Math.random() * updated.length);
          updated[randomIndex].upvotes += Math.floor(Math.random() * 3) - 1;
        }
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [investigationDepth, view]);

  const [expandedPosts, setExpandedPosts] = useState([]);

  const togglePost = (id) => {
    setExpandedPosts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );

    // Track clicked posts and notify parent component
    if (!clickedPosts.includes(id)) {
      setClickedPosts(prev => [...prev, id]);

      // Notify story engine about specific discoveries
      if (onPostClick) {
        const post = posts.find(p => p.id === id);
        if (post) {
          onPostClick(post);
        }
      }
    }
  };

  return (
    <div className="reddit-forum">
      {/* Reddit-style header */}
      <div className="reddit-header">
        <div className="window-controls">
          <div className="window-button close" onClick={onClose}></div>
          <div className="window-button minimize"></div>
          <div className="window-button maximize"></div>
        </div>
        <div className="reddit-logo">
          <svg className="reddit-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <g>
              <circle fill="#FF4500" cx="10" cy="10" r="10"></circle>
              <path fill="#FFF" d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"></path>
            </g>
          </svg>
          <span className="subreddit-name">{view === "home" ? "reddit" : "r/UNCCharlotteCSE"}</span>
        </div>
        <div className="reddit-view-toggle">
          <button className={view === "home" ? "active" : ""} onClick={() => setView("home")}>
            🏠 Home
          </button>
          <button className={view === "subreddit" ? "active" : ""} onClick={() => setView("subreddit")}>
            👥 r/UNCCharlotteCSE
          </button>
        </div>
        <div className="reddit-nav">
          <button className={sortBy === "hot" ? "active" : ""} onClick={() => setSortBy("hot")}>
            🔥 Hot
          </button>
          <button className={sortBy === "new" ? "active" : ""} onClick={() => setSortBy("new")}>
            🆕 New
          </button>
          <button className={sortBy === "top" ? "active" : ""} onClick={() => setSortBy("top")}>
            ⬆️ Top
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="reddit-layout">
        <div className="reddit-sidebar">
          <div className="sidebar-card">
            <h3>About Community</h3>
            <p>UNC Charlotte Computer Science & Engineering student discussions, lab help, and course questions.</p>
            <div className="community-stats">
              <div className="stat">
                <strong>3.2k</strong>
                <span>Members</span>
              </div>
              <div className="stat">
                <strong>47</strong>
                <span>Online</span>
              </div>
            </div>
            <div className="created-date">
              Created Jan 15, 2019
            </div>
          </div>

          <div className="sidebar-card rules">
            <h3>Rules</h3>
            <ol>
              <li>Be respectful</li>
              <li>No homework answers</li>
              <li>No sharing lab credentials</li>
              <li>Stay on topic</li>
            </ol>
          </div>
        </div>

        {/* Main feed */}
        <div className="reddit-feed">
          <div className="feed-header">
            <div className="today-date">
              📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {posts.map(post => (
            <div
              key={post.id}
              className={`reddit-post ${post.isPinned ? 'pinned' : ''} ${post.isCorrupted ? 'corrupted' : ''} ${post.isSystem ? 'system-post' : ''} ${post.isYours ? 'your-post' : ''}`}
            >
              <div className="post-voting">
                <button className="upvote">▲</button>
                <span className={post.upvotes > 100 ? 'high-votes' : ''}>{post.upvotes}</span>
                <button className="downvote">▼</button>
              </div>

              <div className="post-content">
                <div className="post-header">
                  {post.isPinned && <span className="pin-badge">📌 Pinned</span>}
                  {view === "home" && post.subreddit && (
                    <span className="post-subreddit" onClick={() => setView("subreddit")}>
                      {post.subreddit}
                    </span>
                  )}
                  {post.flair && <span className={`post-flair ${post.flair.toLowerCase().replace(' ', '-')}`}>{post.flair}</span>}
                  <span className="post-author">{post.author}</span>
                  <span className="post-separator">•</span>
                  <span className="post-time">{post.timestamp}</span>
                  {post.isYours && <span className="you-badge">YOU</span>}
                </div>

                <h2 className="post-title" onClick={() => togglePost(post.id)}>
                  {post.title}
                </h2>

                <p className="post-body">{post.content}</p>

                <div className="post-actions">
                  <button className="action-btn" onClick={() => togglePost(post.id)}>
                    💬 {post.comments} Comments
                  </button>
                  <button className="action-btn">↗️ Share</button>
                  <button className="action-btn">⭐ Save</button>
                  {post.isYours && <button className="action-btn delete">🗑️ Delete</button>}
                </div>

                {/* Comment Input Box */}
                {expandedPosts.includes(post.id) && (
                  <div className="comment-input-box">
                    <textarea
                      placeholder={`Comment as u/${currentUser || 'user'}`}
                      value={commentText[post.id] || ''}
                      onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                      rows={3}
                      className="comment-textarea"
                    />
                    <div className="comment-input-actions">
                      <button
                        className="comment-submit-btn"
                        onClick={() => handlePostComment(post.id)}
                        disabled={!commentText[post.id]?.trim() || isPostingComment}
                      >
                        {isPostingComment ? 'Posting...' : 'Comment'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Comments */}
                {expandedPosts.includes(post.id) && post.replies && (
                  <div className="post-comments">
                    {post.replies.map((reply, idx) => (
                      <div key={idx} className={`comment ${reply.isAutomod ? 'automod' : ''}`}>
                        <div className="comment-vote">
                          <button>▲</button>
                          <span>{reply.upvotes}</span>
                          <button>▼</button>
                        </div>
                        <div className="comment-content">
                          <div className="comment-header">
                            <span className={`comment-author ${reply.isAutomod ? 'automod-badge' : ''}`}>
                              {reply.author}
                              {reply.isAutomod && <span className="mod-badge">MOD</span>}
                            </span>
                            <span className="comment-time">{reply.timestamp}</span>
                          </div>
                          <p className="comment-body">{reply.content}</p>
                          <div className="comment-actions">
                            <button>Reply</button>
                            <button>Award</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
