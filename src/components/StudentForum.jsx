import { useState, useEffect } from "react";
import "./StudentForum.css";

export default function StudentForum({ username, investigationDepth = 0, onClose }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // Procedurally generate realistic student names
  const generateStudentName = (seed) => {
    const firstNames = [
      "Emily", "Michael", "Sarah", "David", "Jessica", "James",
      "Ashley", "Christopher", "Amanda", "Joshua", "Jennifer", "Matthew",
      "Lauren", "Daniel", "Rachel", "Andrew", "Megan", "Tyler"
    ];
    const lastNames = [
      "Chen", "Smith", "Johnson", "Williams", "Garcia", "Martinez",
      "Anderson", "Taylor", "Thomas", "Moore", "Jackson", "Martin",
      "Lee", "Thompson", "White", "Harris", "Clark", "Lewis"
    ];

    const firstIdx = seed % firstNames.length;
    const lastIdx = Math.floor(seed / firstNames.length) % lastNames.length;

    return `${firstNames[firstIdx]} ${lastNames[lastIdx].charAt(0)}.`;
  };

  // Generate forum posts based on investigation depth
  useEffect(() => {
    const generatePosts = () => {
      const basePosts = [
        {
          id: 1,
          author: generateStudentName(42),
          timestamp: "2 hours ago",
          title: "Lab 4 submission issues?",
          preview: "Is anyone else having trouble submitting Lab 4? The submit button just keeps loading...",
          replies: 3,
          content: `Is anyone else having trouble submitting Lab 4? The submit button just keeps loading and then times out. I've tried different browsers but same issue.\n\nAnyone know if there's maintenance happening?`,
          responses: [
            {
              author: generateStudentName(17),
              timestamp: "1 hour ago",
              content: "Same here! I thought it was just my internet connection."
            },
            {
              author: generateStudentName(89),
              timestamp: "45 minutes ago",
              content: "I submitted mine yesterday and it worked fine. Maybe try again later?"
            }
          ]
        },
        {
          id: 2,
          author: generateStudentName(73),
          timestamp: "5 hours ago",
          title: "Study group for final?",
          preview: "Looking to form a study group for the final exam. Anyone interested in meeting at Atkins Library?",
          replies: 7,
          content: `Looking to form a study group for the final exam. Anyone interested in meeting at Atkins Library this weekend?\n\nI'm thinking Saturday afternoon around 2pm. We can go over the practice problems from chapters 8-12.`,
          responses: [
            {
              author: generateStudentName(34),
              timestamp: "4 hours ago",
              content: "I'm in! I really need help with the neural network architectures."
            },
            {
              author: generateStudentName(56),
              timestamp: "3 hours ago",
              content: "Count me in too"
            }
          ]
        },
        {
          id: 3,
          author: generateStudentName(28),
          timestamp: "1 day ago",
          title: "HPC cluster acting weird",
          preview: "Has anyone noticed the Orion cluster being slower than usual? My training jobs are taking way longer...",
          replies: 5,
          content: `Has anyone noticed the Orion cluster being slower than usual? My training jobs that normally take 2-3 hours are taking 6+ hours now.\n\nAlso getting weird timeout errors sometimes. Anyone else experiencing this?`,
          responses: [
            {
              author: generateStudentName(91),
              timestamp: "20 hours ago",
              content: "Yes! I thought I was the only one. My job got killed twice yesterday for no reason."
            },
            {
              author: generateStudentName(12),
              timestamp: "18 hours ago",
              content: "Same. And the SSH connection keeps dropping. Super annoying."
            }
          ]
        }
      ];

      // Add subtle horror posts based on investigation depth
      if (investigationDepth >= 2) {
        basePosts.unshift({
          id: 4,
          author: generateStudentName(64),
          timestamp: "3 days ago",
          title: "Anyone else get logged out randomly?",
          preview: "I keep getting logged out of Canvas at random times. Like mid-assignment. Is this normal?",
          replies: 8,
          content: `I keep getting logged out of Canvas at random times. Like I'll be in the middle of typing a response and suddenly I'm back at the login screen.\n\nIt's happened 4 times in the past week. Anyone else?`,
          responses: [
            {
              author: generateStudentName(45),
              timestamp: "3 days ago",
              content: "Happening to me too. I lost an entire essay draft because of it."
            },
            {
              author: generateStudentName(78),
              timestamp: "2 days ago",
              content: "I emailed IT about this. They said 'working as intended' which is a weird response???"
            }
          ]
        });
      }

      if (investigationDepth >= 4) {
        basePosts.unshift({
          id: 5,
          author: generateStudentName(33),
          timestamp: "1 week ago",
          title: "Has anyone seen Marcus lately?",
          preview: "Marcus from my project group hasn't responded to any messages in over a week. Not like him at all.",
          replies: 12,
          content: `Marcus from my project group hasn't responded to any messages in over a week. He's not showing up to class either.\n\nThis isn't like him at all - he's usually super responsive. Has anyone else in the class seen him?`,
          responses: [
            {
              author: generateStudentName(67),
              timestamp: "6 days ago",
              content: "I was in a different group with him last semester. Haven't seen him either. Hope he's okay."
            },
            {
              author: generateStudentName(22),
              timestamp: "5 days ago",
              content: "His Canvas account still shows as active though. Last login was yesterday according to the group project page."
            },
            {
              author: generateStudentName(88),
              timestamp: "5 days ago",
              content: "Wait that's weird. If he's logging in but not responding to messages?"
            }
          ]
        });
      }

      if (investigationDepth >= 6) {
        basePosts.unshift({
          id: 6,
          author: generateStudentName(11),
          timestamp: "2 weeks ago",
          title: "Weird file in shared directory",
          preview: "Found a file called 'observer_log.txt' in the shared HPC directory. Anyone know what this is?",
          replies: 15,
          content: `Found a file called 'observer_log.txt' in the /shared directory on the HPC cluster. It's not mentioned in any of the lab instructions.\n\nI tried to open it but got a permission denied error. Anyone know what this is for?`,
          responses: [
            {
              author: generateStudentName(52),
              timestamp: "2 weeks ago",
              content: "I saw that too! There's also something called 'core.memory' that I can't access."
            },
            {
              author: generateStudentName(71),
              timestamp: "1 week ago",
              content: "Those are probably just system files. Don't worry about them."
            },
            {
              author: generateStudentName(33),
              timestamp: "1 week ago",
              content: "But why would system files be in the SHARED directory? That doesn't make sense."
            }
          ]
        });
      }

      // THE HORROR: A post about YOU
      if (investigationDepth >= 8) {
        const yourPost = {
          id: 7,
          author: generateStudentName(94),
          timestamp: "3 days ago",
          title: `Has anyone heard from ${username}?`,
          preview: `${username} was supposed to meet for our group project but never showed. Can't reach them.`,
          replies: 6,
          content: `${username} was supposed to meet with our group on Tuesday to work on the database project but never showed up. I've sent like 5 emails and tried calling but no response.\n\nHas anyone else in the class been able to reach them? Getting worried.`,
          responses: [
            {
              author: generateStudentName(48),
              timestamp: "2 days ago",
              content: `I'm in a different class with ${username}. Haven't seen them there either.`
            },
            {
              author: generateStudentName(82),
              timestamp: "2 days ago",
              content: "Their Canvas shows last active like 10 minutes ago though?"
            },
            {
              author: generateStudentName(94),
              timestamp: "2 days ago",
              content: "That's the weird part. They're clearly using Canvas but ignoring all messages."
            },
            {
              author: generateStudentName(15),
              timestamp: "1 day ago",
              content: `I think I saw ${username} in Atkins Library late last night. They were just... staring at a computer screen. Didn't respond when I said hi.`
            }
          ]
        };
        basePosts.unshift(yourPost);
      }

      setPosts(basePosts);
    };

    generatePosts();
  }, [investigationDepth, username]);

  return (
    <div className="forum-container">
      <div className="forum-header">
        <div className="forum-title-section">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D3B45" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <h2>ITCS 3156 - Discussion Board</h2>
        </div>
        <button className="forum-close-btn" onClick={onClose}>×</button>
      </div>

      <div className="forum-content">
        {!selectedPost ? (
          <div className="forum-posts-list">
            <div className="forum-info-banner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0084D1" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              <span>This is a student-moderated discussion board. Use this space to collaborate with classmates.</span>
            </div>

            {posts.map(post => (
              <div
                key={post.id}
                className="forum-post-card"
                onClick={() => setSelectedPost(post)}
              >
                <div className="post-header">
                  <div className="post-author-info">
                    <div className="author-avatar">
                      {post.author.charAt(0)}
                    </div>
                    <div className="author-details">
                      <span className="author-name">{post.author}</span>
                      <span className="post-timestamp">{post.timestamp}</span>
                    </div>
                  </div>
                  <div className="post-replies">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7780" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span>{post.replies} replies</span>
                  </div>
                </div>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-preview">{post.preview}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="forum-post-detail">
            <button
              className="back-button"
              onClick={() => setSelectedPost(null)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D3B45" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to discussions
            </button>

            <div className="post-detail-content">
              <div className="post-detail-header">
                <div className="post-author-info">
                  <div className="author-avatar large">
                    {selectedPost.author.charAt(0)}
                  </div>
                  <div className="author-details">
                    <span className="author-name">{selectedPost.author}</span>
                    <span className="post-timestamp">{selectedPost.timestamp}</span>
                  </div>
                </div>
              </div>

              <h2 className="post-detail-title">{selectedPost.title}</h2>
              <p className="post-detail-body">{selectedPost.content}</p>

              <div className="post-responses">
                <h3>{selectedPost.responses?.length || 0} Replies</h3>
                {selectedPost.responses?.map((response, idx) => (
                  <div key={idx} className="response-card">
                    <div className="response-header">
                      <div className="author-avatar small">
                        {response.author.charAt(0)}
                      </div>
                      <div className="author-details">
                        <span className="author-name">{response.author}</span>
                        <span className="post-timestamp">{response.timestamp}</span>
                      </div>
                    </div>
                    <p className="response-content">{response.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
