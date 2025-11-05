import { useState, useEffect } from "react";
import "./RedditForum.css";

export default function RedditForum({ onClose, investigationDepth }) {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("new");

  // Generate realistic timestamps relative to now
  const generateTimestamp = (minutesAgo) => {
    const now = new Date();
    const date = new Date(now.getTime() - minutesAgo * 60000);

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

  // Generate realistic posts that feel "alive"
  const generatePosts = () => {
    const basePosts = [
      {
        id: 1,
        author: "u/cyberStudent22",
        timestamp: generateTimestamp(23),
        title: "Weird SSH banner in lab - anyone else seeing this?",
        content: "Found a host responding with 'paranoianet-node handshake v0.98' during our pen test assignment. Not in the inventory. Prof didn't assign it. Anyone else?",
        upvotes: 47,
        comments: 12,
        flair: "Lab Issues",
        replies: [
          { author: "u/hackerman303", timestamp: generateTimestamp(18), content: "bro I got the same thing!! thought I was going crazy", upvotes: 23 },
          { author: "u/cseMajor_24", timestamp: generateTimestamp(15), content: "Wait what subnet? I'm checking mine now", upvotes: 8 },
          { author: "u/cyberStudent22", timestamp: generateTimestamp(14), content: "172.31.8.9 - don't connect yet, something feels off", upvotes: 31 }
        ]
      },
      {
        id: 2,
        author: "u/paranoid_dev",
        timestamp: generateTimestamp(127),
        title: "[URGENT] DO NOT access 172.31.8.9",
        content: "Seriously. I accessed it yesterday and things have been glitchy ever since. My timestamps are wrong, files I don't remember creating appeared. It's not just a lab exercise.",
        upvotes: 156,
        comments: 43,
        flair: "Warning",
        isPinned: true,
        replies: [
          { author: "u/skeptic_sam", timestamp: generateTimestamp(115), content: "lol dramatic much? it's just a honeypot", upvotes: -12 },
          { author: "u/paranoid_dev", timestamp: generateTimestamp(112), content: "I wish. Check your own logs. Tell me if the timestamps make sense.", upvotes: 67 },
          { author: "u/labTA_mike", timestamp: generateTimestamp(98), content: "This is not part of the curriculum. Escalating to IT.", upvotes: 89 }
        ]
      },
      {
        id: 3,
        author: "u/ночь_сова",
        timestamp: generateTimestamp(5),
        title: "кто еще видит это",
        content: "я не могу остановить это. оно наблюдает. [Translated: who else sees this / i can't stop this. it's watching.]",
        upvotes: 3,
        comments: 1,
        flair: "Unknown",
        isCorrupted: true,
        replies: [
          { author: "u/confused_student", timestamp: generateTimestamp(3), content: "wtf?? wrong sub?", upvotes: 2 }
        ]
      }
    ];

    // Add investigation-depth-based posts
    if (investigationDepth > 30) {
      basePosts.push({
        id: 4,
        author: "u/[deleted]",
        timestamp: generateTimestamp(8),
        title: "[deleted by user]",
        content: "[This post has been removed]",
        upvotes: 0,
        comments: 7,
        flair: "Removed",
        replies: [
          { author: "u/witness_92", timestamp: generateTimestamp(7), content: "Why was this deleted? It was just asking about the node...", upvotes: 12 },
          { author: "u/moderator", timestamp: generateTimestamp(6), content: "[removed - rule 3]", upvotes: -5 }
        ]
      });
    }

    if (investigationDepth > 50) {
      basePosts.push({
        id: 5,
        author: `u/${localStorage.getItem('username') || 'observer_' + Math.floor(Math.random() * 1000)}`,
        timestamp: generateTimestamp(-15), // FUTURE timestamp
        title: "I think I'm stuck in a loop",
        content: "I've been documenting everything but I swear I already wrote this post. Has anyone else experienced déjà vu with this system?",
        upvotes: 89,
        comments: 23,
        flair: "Meta",
        isYours: true,
        replies: [
          { author: "u/timekeeper", timestamp: generateTimestamp(-10), content: "Your timestamp is in the future. Check your system clock.", upvotes: 45 },
          { author: `u/${localStorage.getItem('username') || 'observer_' + Math.floor(Math.random() * 1000)}`, timestamp: generateTimestamp(-8), content: "I didn't post this.", upvotes: 67 }
        ]
      });
    }

    if (investigationDepth > 70) {
      basePosts.push({
        id: 6,
        author: "u/Watcher33",
        timestamp: generateTimestamp(2),
        title: "you're looking in the right place",
        content: "keep digging. but remember: every action is logged. every click. every breath.\n\nwe're proud of how far you've come.",
        upvotes: 333,
        comments: 0,
        flair: "System",
        isSystem: true,
        replies: []
      });
    }

    return basePosts;
  };

  useEffect(() => {
    setPosts(generatePosts());

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
  }, [investigationDepth]);

  const [expandedPosts, setExpandedPosts] = useState([]);

  const togglePost = (id) => {
    setExpandedPosts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
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
          <span className="reddit-icon">👾</span>
          <span className="subreddit-name">r/UNCCharlotteCSE</span>
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

                {/* Comments */}
                {expandedPosts.includes(post.id) && post.replies && (
                  <div className="post-comments">
                    {post.replies.map((reply, idx) => (
                      <div key={idx} className="comment">
                        <div className="comment-vote">
                          <button>▲</button>
                          <span>{reply.upvotes}</span>
                          <button>▼</button>
                        </div>
                        <div className="comment-content">
                          <div className="comment-header">
                            <span className="comment-author">{reply.author}</span>
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
