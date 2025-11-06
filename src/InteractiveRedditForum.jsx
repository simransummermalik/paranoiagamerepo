import { useState, useEffect } from "react";
import "./RedditForum.css";
import { generateRedditReply, generateRedditDM } from "./openaiService";

export default function InteractiveRedditForum({ onClose, investigationDepth, userBehavior, currentUser }) {
  const [view, setView] = useState("home"); // 'home', 'post', 'inbox', 'messages'
  const [selectedPost, setSelectedPost] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentDM, setCurrentDM] = useState(null);
  const [dmText, setDMText] = useState("");
  const [isLoadingReply, setIsLoadingReply] = useState(false);

  // Generate realistic timestamps
  const generateTimestamp = (minutesAgo) => {
    if (minutesAgo < 60) return `${minutesAgo}m ago`;
    if (minutesAgo < 1440) return `${Math.floor(minutesAgo / 60)}h ago`;
    return `${Math.floor(minutesAgo / 1440)}d ago`;
  };

  // Initialize posts
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const homePosts = generateHomeFeed();
    setPosts(homePosts);

    // Add initial notifications
    if (investigationDepth > 20) {
      setNotifications([
        { id: 1, type: "reply", from: "u/network_admin", post: "university IT monitoring", time: "5m ago", unread: true },
        { id: 2, type: "upvote", count: 3, post: "Lab 3 network scan", time: "1h ago", unread: true }
      ]);
    }

    // Add creepy DMs at higher investigation levels
    if (investigationDepth > 50) {
      setMessages([
        { id: 1, from: "u/deleted_user_947", preview: "you need to stop looking into this...", time: "12m ago", unread: true, conversation: [] }
      ]);
    }
  }, [investigationDepth, userBehavior]);

  const generateHomeFeed = () => {
    const behavior = userBehavior || {};
    const personalityType = behavior.personalityType || "Curious";
    const riskLevel = behavior.riskLevel || "low";

    const homePosts = [
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
          { id: 1, author: "u/history_nerd", timestamp: generateTimestamp(32), content: "Fun fact: The term 'debugging' was already in use before this, but this incident popularized it.", upvotes: 3421, replies: [] },
          { id: 2, author: "u/programmer_dad", timestamp: generateTimestamp(30), content: "I have a poster of that log entry in my office. Classic computer history moment.", upvotes: 1876, replies: [] },
          { id: 3, author: "u/moth_lover", timestamp: generateTimestamp(28), content: "RIP to a real one", upvotes: 5234, replies: [] }
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
          { id: 1, author: "u/network_admin", timestamp: generateTimestamp(86), content: "Former university IT here. Yes, we can see everything. Not just torrenting - every DNS lookup, connection duration, data volume. It's all logged.", upvotes: 1247, replies: [] },
          { id: 2, author: "u/privacy_student", timestamp: generateTimestamp(84), content: "This is why I use a VPN on campus. Can't trust university networks.", upvotes: 423, replies: [] },
          { id: 3, author: "u/network_admin", timestamp: generateTimestamp(82), content: "VPNs don't help as much as you think. We can still see connection patterns and metadata. We know you're hiding something, we just can't see what.", upvotes: 892, replies: [] }
        ]
      },
      {
        id: 105,
        author: "u/DataStructuresTA",
        timestamp: generateTimestamp(187),
        title: "Lab 3 network scan assignment - weird host showing up",
        content: "During the nmap scan for the lab, found an extra host at 172.31.8.9 that's not in the documentation. Anyone else seeing this?",
        upvotes: 73,
        comments: 18,
        subreddit: "r/UNCCharlotteCSE",
        flair: "Lab Help",
        replies: [
          { id: 1, author: "u/night_owl_cs", timestamp: generateTimestamp(184), content: "Yeah I saw that too. Thought it was part of the assignment at first but it's not mentioned anywhere in the rubric.", upvotes: 34, replies: [] },
          { id: 2, author: "u/InfoSecStudent", timestamp: generateTimestamp(181), content: "I tried SSHing into it. No password prompt, just connected. That's... not normal for a honeypot right?", upvotes: 52, replies: [] }
        ]
      }
    ];

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
          { id: 1, author: "u/skeptical_sam", timestamp: generateTimestamp(64), content: "Source? This sounds like conspiracy theory nonsense.", upvotes: -234, replies: [] },
          { id: 2, author: "u/conspiracy_researcher", timestamp: generateTimestamp(62), content: "FOIA docs from 2019: https://archive.org/details/darpa-nmii-project. Neural Media Influence Initiative. Check page 47.", upvotes: 4821, replies: [] },
          { id: 3, author: "u/former_researcher", timestamp: generateTimestamp(59), content: "Holy shit. I worked on a 'behavioral analytics' grant in 2018. Never knew it was DARPA funded. We were tracking student computer lab usage patterns.", upvotes: 6234, replies: [] }
        ]
      });
    }

    return homePosts.sort((a, b) => b.upvotes - a.upvotes);
  };

  // Handle upvote
  const handleUpvote = (postId, commentId = null) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        if (commentId === null) {
          return { ...post, upvotes: post.upvotes + 1 };
        } else {
          return {
            ...post,
            replies: post.replies.map(reply =>
              reply.id === commentId ? { ...reply, upvotes: reply.upvotes + 1 } : reply
            )
          };
        }
      }
      return post;
    }));
  };

  // Handle comment reply with AI
  const handleReply = async () => {
    if (!replyText.trim() || isLoadingReply) return;

    setIsLoadingReply(true);

    try {
      const post = posts.find(p => p.id === selectedPost.id);
      const contextComment = replyingTo ? post.replies.find(r => r.id === replyingTo) : null;

      // Add user's comment
      const userComment = {
        id: Date.now(),
        author: `u/${currentUser || 'user'}`,
        timestamp: "just now",
        content: replyText,
        upvotes: 1,
        replies: []
      };

      setPosts(prev => prev.map(p => {
        if (p.id === selectedPost.id) {
          return { ...p, replies: [...p.replies, userComment] };
        }
        return p;
      }));

      setReplyText("");
      setReplyingTo(null);

      // Generate AI response
      const aiReply = await generateRedditReply(
        post.title + " " + post.content,
        replyText,
        currentUser || 'user',
        investigationDepth
      );

      // Add AI response after delay
      setTimeout(() => {
        const aiComment = {
          id: Date.now() + 1,
          author: investigationDepth > 60 ? "u/[deleted]" : "u/reddit_user_" + Math.floor(Math.random() * 9999),
          timestamp: "just now",
          content: aiReply,
          upvotes: Math.floor(Math.random() * 50) + 1,
          replies: []
        };

        setPosts(prev => prev.map(p => {
          if (p.id === selectedPost.id) {
            return { ...p, replies: [...p.replies, aiComment] };
          }
          return p;
        }));

        // Add notification
        setNotifications(prev => [...prev, {
          id: Date.now(),
          type: "reply",
          from: aiComment.author,
          post: post.title.substring(0, 40) + "...",
          time: "just now",
          unread: true
        }]);
      }, 2000 + Math.random() * 3000); // Random delay 2-5 seconds

    } catch (error) {
      console.error("Failed to generate reply:", error);
    } finally {
      setIsLoadingReply(false);
    }
  };

  // Render post view
  const renderPostView = () => {
    if (!selectedPost) return null;

    return (
      <div className="reddit-post-view">
        <div className="post-header">
          <button onClick={() => setView("home")} className="back-button">← Back to r/all</button>
        </div>

        <div className="post-detail">
          <div className="post-vote">
            <button className="vote-btn" onClick={() => handleUpvote(selectedPost.id)}>▲</button>
            <span className="vote-count">{selectedPost.upvotes}</span>
            <button className="vote-btn">▼</button>
          </div>

          <div className="post-content-full">
            <div className="post-meta">
              <span className="post-subreddit">{selectedPost.subreddit}</span>
              <span className="post-author">Posted by {selectedPost.author}</span>
              <span className="post-time">{selectedPost.timestamp}</span>
            </div>
            <h2 className="post-title-full">{selectedPost.title}</h2>
            {selectedPost.flair && <span className="post-flair">{selectedPost.flair}</span>}
            <p className="post-body">{selectedPost.content}</p>

            <div className="post-actions">
              <button className="action-btn" onClick={() => setReplyingTo(null)}>💬 Comment</button>
              <button className="action-btn">🔗 Share</button>
              <button className="action-btn">💾 Save</button>
            </div>
          </div>
        </div>

        {/* Reply box */}
        {replyingTo === null && (
          <div className="reply-box">
            <textarea
              placeholder={`Comment as u/${currentUser || 'user'}`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={4}
            />
            <div className="reply-actions">
              <button onClick={handleReply} disabled={isLoadingReply || !replyText.trim()}>
                {isLoadingReply ? "Posting..." : "Comment"}
              </button>
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="post-comments">
          <div className="comments-header">
            <span>{selectedPost.replies.length} Comments</span>
          </div>

          {selectedPost.replies.map(reply => (
            <div key={reply.id} className="comment">
              <div className="comment-vote">
                <button className="vote-btn-small" onClick={() => handleUpvote(selectedPost.id, reply.id)}>▲</button>
                <span className="vote-count-small">{reply.upvotes}</span>
                <button className="vote-btn-small">▼</button>
              </div>

              <div className="comment-content">
                <div className="comment-meta">
                  <span className="comment-author">{reply.author}</span>
                  <span className="comment-time">{reply.timestamp}</span>
                </div>
                <p className="comment-text">{reply.content}</p>
                <div className="comment-actions">
                  <button className="comment-action-btn" onClick={() => setReplyingTo(reply.id)}>Reply</button>
                  <button className="comment-action-btn">Share</button>
                  <button className="comment-action-btn">Report</button>
                </div>

                {replyingTo === reply.id && (
                  <div className="reply-box-nested">
                    <textarea
                      placeholder={`Reply to ${reply.author}`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={3}
                    />
                    <div className="reply-actions">
                      <button onClick={handleReply} disabled={isLoadingReply || !replyText.trim()}>
                        {isLoadingReply ? "Posting..." : "Reply"}
                      </button>
                      <button onClick={() => { setReplyingTo(null); setReplyText(""); }}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render inbox
  const renderInbox = () => {
    return (
      <div className="reddit-inbox">
        <div className="inbox-header">
          <button onClick={() => setView("home")} className="back-button">← Back</button>
          <h2>Notifications</h2>
        </div>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <p className="empty-state">No notifications</p>
          ) : (
            notifications.map(notif => (
              <div key={notif.id} className={`notification ${notif.unread ? 'unread' : ''}`}>
                {notif.type === 'reply' && (
                  <>
                    <span className="notif-icon">💬</span>
                    <div className="notif-content">
                      <strong>{notif.from}</strong> replied to your comment in <strong>{notif.post}</strong>
                      <span className="notif-time">{notif.time}</span>
                    </div>
                  </>
                )}
                {notif.type === 'upvote' && (
                  <>
                    <span className="notif-icon">⬆️</span>
                    <div className="notif-content">
                      Your post <strong>{notif.post}</strong> received {notif.count} upvotes
                      <span className="notif-time">{notif.time}</span>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // Render home feed
  const renderHomeFeed = () => {
    return (
      <div className="reddit-home">
        {posts.map(post => (
          <div key={post.id} className="post-card" onClick={() => { setSelectedPost(post); setView("post"); }}>
            <div className="post-vote-mini">
              <button className="vote-btn-mini" onClick={(e) => { e.stopPropagation(); handleUpvote(post.id); }}>▲</button>
              <span className="vote-count-mini">{post.upvotes}</span>
              <button className="vote-btn-mini" onClick={(e) => e.stopPropagation()}>▼</button>
            </div>

            <div className="post-content-mini">
              <div className="post-meta-mini">
                <span className="post-subreddit-mini">{post.subreddit}</span>
                <span>•</span>
                <span className="post-author-mini">{post.author}</span>
                <span>•</span>
                <span className="post-time-mini">{post.timestamp}</span>
              </div>
              <h3 className="post-title-mini">{post.title}</h3>
              {post.flair && <span className="post-flair-mini">{post.flair}</span>}
              <div className="post-footer-mini">
                <span className="post-comments-mini">💬 {post.replies.length} comments</span>
                <span className="post-action-mini">🔗 Share</span>
                <span className="post-action-mini">💾 Save</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="reddit-window">
      <div className="reddit-header">
        <div className="reddit-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#FF4500"/>
            <circle cx="16" cy="16" r="14" fill="white"/>
            <circle cx="12" cy="14" r="2" fill="#FF4500"/>
            <circle cx="20" cy="14" r="2" fill="#FF4500"/>
            <path d="M 12 20 Q 16 23 20 20" stroke="#FF4500" strokeWidth="2" fill="none"/>
          </svg>
          <span className="reddit-logo-text">reddit</span>
        </div>

        <div className="reddit-nav">
          <button className={view === "home" ? "active" : ""} onClick={() => setView("home")}>Home</button>
          <button className={view === "inbox" ? "active" : ""} onClick={() => setView("inbox")}>
            🔔 {notifications.filter(n => n.unread).length > 0 && <span className="badge">{notifications.filter(n => n.unread).length}</span>}
          </button>
          <span className="reddit-user">u/{currentUser || 'user'}</span>
        </div>

        <button className="reddit-close" onClick={onClose}>✕</button>
      </div>

      <div className="reddit-content">
        {view === "home" && renderHomeFeed()}
        {view === "post" && renderPostView()}
        {view === "inbox" && renderInbox()}
      </div>
    </div>
  );
}
