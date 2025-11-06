const fakeSites = {
  "parapedia.net": {
    title: "Parapedia",
    type: "wikipedia",
    renderHTML: (rewriteLevel) => `
      <div style="font-family: 'Georgia', 'Times New Roman', serif; background: #f8f9fa; min-height: 100%; padding: 0;">
        <!-- Wikipedia-style header -->
        <div style="background: white; border-bottom: 1px solid #a2a9b1; padding: 10px 20px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <svg width="50" height="50" viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="24" fill="none" stroke="#000" stroke-width="2"/>
              <text x="25" y="35" text-anchor="middle" font-size="30" font-family="serif" font-weight="bold">P</text>
            </svg>
            <div>
              <h1 style="margin: 0; font-size: 28px; font-weight: normal; color: #000;">Parapedia</h1>
              <p style="margin: 0; font-size: 12px; color: #54595d;">The Free Encyclopedia</p>
            </div>
          </div>
        </div>

        <div style="max-width: 1200px; margin: 0 auto; padding: 20px; display: grid; grid-template-columns: 200px 1fr; gap: 20px;">
          <!-- Sidebar -->
          <div style="background: white; border: 1px solid #a2a9b1; border-radius: 2px; padding: 15px; height: fit-content;">
            <h3 style="font-size: 14px; font-weight: bold; margin: 0 0 12px 0; border-bottom: 1px solid #a2a9b1; padding-bottom: 8px;">Contents</h3>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 13px;">
              <li style="margin-bottom: 6px;"><a href="#" style="color: #0645ad; text-decoration: none;">1 Overview</a></li>
              <li style="margin-bottom: 6px;"><a href="#" style="color: #0645ad; text-decoration: none;">2 Historical Context</a></li>
              <li style="margin-bottom: 6px;"><a href="#" style="color: #0645ad; text-decoration: none;">3 Evidence</a></li>
              <li style="margin-bottom: 6px;"><a href="#" style="color: #0645ad; text-decoration: none;">4 References</a></li>
            </ul>
          </div>

          <!-- Main content -->
          <div style="background: white; border: 1px solid #a2a9b1; border-radius: 2px; padding: 25px;">
            <h1 style="font-family: 'Linux Libertine', Georgia, serif; font-size: 32px; border-bottom: 1px solid #a2a9b1; padding-bottom: 8px; margin-top: 0;">Apollo 11 Moon Landing</h1>

            <div style="font-size: 13px; color: #54595d; margin-bottom: 20px; font-style: italic;">
              From Parapedia, the free encyclopedia
            </div>

            <!-- Info box -->
            <div style="float: right; width: 280px; margin-left: 20px; margin-bottom: 20px; border: 1px solid #a2a9b1; background: #f8f9fa; padding: 10px; font-size: 13px;">
              <div style="text-align: center; font-weight: bold; background: #d4e6f1; padding: 5px; margin: -10px -10px 10px -10px;">Apollo 11</div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/300px-Aldrin_Apollo_11_original.jpg" style="width: 100%; margin-bottom: 10px;" />
              <table style="width: 100%; font-size: 12px;">
                <tr><td style="font-weight: bold; padding: 4px 0;">Mission type:</td><td>Crewed lunar landing</td></tr>
                <tr><td style="font-weight: bold; padding: 4px 0;">Launch date:</td><td>${rewriteLevel >= 2 ? '<span style="color: red;">July 16, 19██</span>' : 'July 16, 1969'}</td></tr>
                <tr><td style="font-weight: bold; padding: 4px 0;">Landing date:</td><td>${rewriteLevel >= 2 ? '<span style="color: red;">[TIMESTAMP_ERROR]</span>' : 'July 20, 1969'}</td></tr>
                <tr><td style="font-weight: bold; padding: 4px 0;">Crew:</td><td>Armstrong, Aldrin, Collins</td></tr>
              </table>
            </div>

            <p style="font-size: 15px; line-height: 1.6; color: #202122; margin-bottom: 16px;">
              <b>Apollo 11</b> was the American spaceflight that first landed humans on the Moon. Commander <a href="#" style="color: #0645ad; text-decoration: none;">Neil Armstrong</a> and lunar module pilot <a href="#" style="color: #0645ad; text-decoration: none;">Buzz Aldrin</a> landed the Apollo Lunar Module <i>Eagle</i> on July 20, 1969, at 20:17 UTC, and Armstrong became the first person to step onto the Moon's surface six hours and 39 minutes later, on July 21 at 02:56 UTC.
            </p>

            ${rewriteLevel >= 1 ? `
            <div style="background: #fef6e4; border-left: 4px solid #f0ad4e; padding: 12px; margin: 16px 0; font-size: 14px;">
              <b>⚠ Content Disputed:</b> This article contains information that has been flagged for inconsistencies with archived transmission data.
            </div>
            ` : ''}

            <h2 style="font-family: 'Linux Libertine', Georgia, serif; font-size: 24px; border-bottom: 1px solid #a2a9b1; padding-top: 12px; padding-bottom: 4px; margin-top: 24px;">Historical Context</h2>

            <p style="font-size: 15px; line-height: 1.6; color: #202122; margin-bottom: 16px;">
              ${rewriteLevel >= 2
                ? `The original transmission signals contained <span style="background: #ffcccc; padding: 2px 4px;">unexplained temporal inconsistencies</span> that suggest the broadcast may have been relayed through an intermediary source. Analysis of the metadata reveals <span style="background: #ffcccc; padding: 2px 4px;">transmission origin coordinates inconsistent with Earth-based relay stations</span>. Several researchers have noted that backup audio contains <span style="background: #ffcccc; padding: 2px 4px;">patterns resembling structured communication</span> when played in reverse.`
                : rewriteLevel >= 1
                  ? `The mission was broadcast live on television to a worldwide audience. However, recent analysis of archived footage has revealed minor discrepancies in the timestamp data that remain unexplained by NASA officials.`
                  : `The mission was broadcast live on television to a worldwide audience. Neil Armstrong's first step onto the lunar surface was broadcast to at least 600 million people on Earth and is considered one of the defining moments of the 20th century.`
              }
            </p>

            <h2 style="font-family: 'Linux Libertine', Georgia, serif; font-size: 24px; border-bottom: 1px solid #a2a9b1; padding-top: 12px; padding-bottom: 4px; margin-top: 24px;">Missing Footage</h2>

            <p style="font-size: 15px; line-height: 1.6; color: #202122; margin-bottom: 16px;">
              ${rewriteLevel >= 2
                ? `<span style="color: #c41e3a; font-weight: 500;">All backup tapes from the original transmission were reported "accidentally erased" in 1981.</span> Attempts to locate secondary archives have revealed that multiple redundant backup systems simultaneously failed during a routine transfer. The official explanation cites "procedural errors," though internal NASA documents obtained through FOIA requests suggest <span style="background: #ffcccc; padding: 2px 4px;">deliberate data sanitization protocols were enacted</span>.`
                : rewriteLevel >= 1
                  ? `NASA has acknowledged that some original Apollo 11 broadcast tapes were accidentally erased and reused in the 1980s. The original high-quality slow-scan television footage from the Moon has never been recovered.`
                  : `NASA maintains comprehensive archives of all Apollo 11 mission data, including telemetry, photography, and audio recordings. The mission's success has been verified through independent analysis worldwide.`
              }
            </p>

            ${rewriteLevel >= 2 ? `
            <div style="background: #fdecea; border: 1px solid #c41e3a; padding: 16px; margin: 20px 0; border-radius: 4px;">
              <h3 style="color: #c41e3a; margin-top: 0; font-size: 16px;">⚠ Disputed Information</h3>
              <p style="font-size: 14px; line-height: 1.5; margin: 0;">
                This article contains claims that contradict official records. Users have reported unusual behavior when accessing archived versions. Last verified: <span style="color: red;">[ERROR: TIMESTAMP_UNAVAILABLE]</span>
              </p>
            </div>
            ` : ''}

            <h2 style="font-family: 'Linux Libertine', Georgia, serif; font-size: 24px; border-bottom: 1px solid #a2a9b1; padding-top: 12px; padding-bottom: 4px; margin-top: 24px;">References</h2>

            <ol style="font-size: 13px; line-height: 1.8; color: #202122;">
              <li>NASA (1969). "Apollo 11 Mission Report" (PDF). NASA Technical Reports Server.</li>
              <li>${rewriteLevel >= 1 ? '<span style="color: #888; text-decoration: line-through;">National Archives (1969). "Apollo 11 Original Broadcast Tapes".</span> [Source Unavailable]' : 'National Archives (1969). "Apollo 11 Original Broadcast Tapes".'}</li>
              <li>Chaikin, Andrew (1994). <i>A Man on the Moon</i>. Viking Press.</li>
              ${rewriteLevel >= 2 ? '<li style="color: red;">████████ (19██). "Transmission Origin Analysis" [REDACTED]</li>' : ''}
            </ol>

            <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #a2a9b1; font-size: 12px; color: #54595d;">
              <p>This page was last edited on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
              <p>Text is available under the Creative Commons Attribution-ShareAlike License</p>
            </div>
          </div>
        </div>
      </div>
    `
  },

  "worldtruth.biz": {
    title: "WorldTruth",
    type: "alternative_news",
    renderHTML: (rewriteLevel) => `
      <div style="font-family: Arial, sans-serif; background: #1a1a1a; color: #e0e0e0; min-height: 100%;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8b0000 0%, #450000 100%); padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.5);">
          <div style="max-width: 1200px; margin: 0 auto;">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
              <div style="font-size: 48px; font-weight: bold; color: #ff4444; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
                WORLDTRUTH
              </div>
              <div style="font-size: 14px; color: #ffaaaa; font-style: italic;">EXPOSING WHAT THEY HIDE</div>
            </div>
            <div style="display: flex; gap: 20px; font-size: 13px; font-weight: bold; text-transform: uppercase;">
              <a href="#" style="color: #ffaaaa; text-decoration: none;">Breaking</a>
              <a href="#" style="color: #ffaaaa; text-decoration: none;">Conspiracy</a>
              <a href="#" style="color: #ffaaaa; text-decoration: none;">Government</a>
              <a href="#" style="color: #ffaaaa; text-decoration: none;">Surveillance</a>
              <a href="#" style="color: #ffaaaa; text-decoration: none;">Leaked Docs</a>
            </div>
          </div>
        </div>

        <div style="max-width: 1200px; margin: 0 auto; padding: 30px 20px;">
          <!-- Breaking news banner -->
          <div style="background: #ff4444; color: #000; padding: 12px 20px; margin-bottom: 30px; font-weight: bold; font-size: 14px; display: flex; align-items: center; gap: 10px; box-shadow: 0 4px 6px rgba(255,68,68,0.3);">
            <span style="animation: blink 1s infinite;">🔴 LIVE</span>
            <span>BREAKING: ${rewriteLevel >= 2 ? 'Timeline inconsistencies detected across multiple news sources - readers reporting memory discrepancies' : 'Major government surveillance program exposed through leaked documents'}</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 300px; gap: 30px;">
            <!-- Main content -->
            <div>
              <!-- Featured article -->
              <article style="background: #2a2a2a; border: 2px solid #ff4444; padding: 25px; margin-bottom: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                <div style="background: #ff4444; color: #000; display: inline-block; padding: 4px 12px; font-size: 11px; font-weight: bold; margin-bottom: 15px;">
                  ⚠️ CENSORED BY MAINSTREAM MEDIA
                </div>
                <h1 style="font-size: 32px; margin: 0 0 12px 0; color: #ff4444; font-weight: bold; line-height: 1.2;">
                  ${rewriteLevel >= 2
                    ? 'The 2011 Blackout That Never Happened: 72 Hours Erased From History'
                    : rewriteLevel >= 1
                      ? 'Government Blackout Timeline Doesn\'t Add Up: Officials Caught in Major Discrepancy'
                      : 'The 2011 Server Blackout: What Really Happened?'
                  }
                </h1>
                <div style="font-size: 12px; color: #999; margin-bottom: 20px;">
                  Posted by <span style="color: #ff4444;">TruthSeeker88</span> | ${new Date().toLocaleDateString()} |
                  <span style="color: #ff4444;">${Math.floor(Math.random() * 5000 + 1000)} views</span> |
                  ${Math.floor(Math.random() * 300 + 50)} comments
                </div>

                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800" style="width: 100%; height: 400px; object-fit: cover; margin-bottom: 20px; filter: ${rewriteLevel >= 2 ? 'hue-rotate(180deg) saturate(1.5)' : 'none'};" />

                <p style="font-size: 16px; line-height: 1.8; margin-bottom: 16px; color: #e0e0e0;">
                  ${rewriteLevel >= 2
                    ? `<span style="background: #330000; padding: 3px 6px; border-left: 3px solid #ff4444;">EXCLUSIVE INVESTIGATION:</span> Eyewitness accounts from the 2011 government server "blackout" tell a disturbing story that officials refuse to acknowledge. <b style="color: #ff4444;">Multiple independent sources report the outage lasting exactly 72 hours</b>, yet government logs claim it was only 6 hours. Even more disturbing: <span style="background: #330000; padding: 2px 4px;">timestamp records from that period have completely vanished from backup systems</span>.<br><br>

                    "I remember it clearly," says former systems administrator Marcus Webb, who worked at a government data center during the incident. "We were offline for three full days. I have emails, text messages to my family. But when I check my sent folder now, <b style="color: #ff4444;">those messages don't exist</b>. The timestamps jump from July 12th to July 15th with nothing in between."<br><br>

                    <span style="color: #ff4444; font-size: 18px; font-weight: bold;">What happened during those 72 hours? And why is the government pretending they never occurred?</span><br><br>

                    Archives from independent news sites that covered the incident at the time now show <span style="background: #330000; padding: 2px 4px;">completely different dates</span>. One forum post from a system administrator discussing the outage shows edit timestamps from <b style="color: #ff4444;">dates that never existed</b>.`
                    : rewriteLevel >= 1
                      ? `New evidence has emerged showing significant discrepancies in official government records about the 2011 server blackout. Multiple sources within the IT department have come forward claiming the timeline doesn't match their personal records.<br><br>

                      Official government reports state the blackout lasted approximately 6 hours, from 2:00 AM to 8:00 AM on July 13, 2011. However, several IT administrators have produced personal logs, emails, and shift records that suggest a much longer outage period.<br><br>

                      "The timestamp data doesn't match up," says one anonymous source. "When we tried to access the backup logs, we found gaps that officials can't explain."<br><br>

                      Government officials have declined to comment on the discrepancies.`
                      : `In 2011, a brief government server blackout caused minor disruptions to several online services. The incident, which lasted approximately 6 hours, was attributed to a routine maintenance issue that escalated unexpectedly.<br><br>

                      According to official reports, the outage affected primarily non-critical systems and was resolved without data loss. Government IT staff worked quickly to restore services, and a full investigation was conducted to prevent future occurrences.<br><br>

                      While some critics have questioned the official timeline, most experts agree the incident was handled appropriately and represents a standard IT infrastructure challenge.`
                  }
                </p>

                ${rewriteLevel >= 2 ? `
                <div style="background: #1a0000; border: 2px solid #ff4444; padding: 20px; margin: 20px 0;">
                  <h3 style="color: #ff4444; margin-top: 0; font-size: 20px;">🚨 READERS REPORT ANOMALIES</h3>
                  <div style="font-size: 14px; line-height: 1.6;">
                    <p style="margin: 10px 0;"><b>User "remembers_everything":</b> "I was there. I remember it being days, not hours. Why does everyone act like I'm crazy?"</p>
                    <p style="margin: 10px 0;"><b>User "archivist_42":</b> "I've been checking old forum posts. Timestamps are jumping. Entire conversations are missing."</p>
                    <p style="margin: 10px 0; color: #888;"><b>User "[deleted]":</b> <i>[This comment has been removed]</i></p>
                  </div>
                </div>
                ` : ''}

                <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #444;">
                  <div style="display: flex; gap: 15px; font-size: 13px; font-weight: bold;">
                    <span style="color: #4a9eff; cursor: pointer;">👍 ${Math.floor(Math.random() * 2000 + 500)} UPVOTES</span>
                    <span style="color: #ff4444; cursor: pointer;">💬 ${Math.floor(Math.random() * 300 + 50)} COMMENTS</span>
                    <span style="color: #888; cursor: pointer;">↗️ SHARE</span>
                  </div>
                </div>
              </article>

              <!-- Secondary article -->
              <article style="background: #2a2a2a; padding: 20px; border-left: 4px solid #ff4444;">
                <h2 style="font-size: 24px; margin: 0 0 12px 0; color: #ff4444;">
                  The Dead Link Theory: Users Vanishing After Clicking Broken URLs
                </h2>
                <div style="font-size: 12px; color: #999; margin-bottom: 15px;">
                  Posted by <span style="color: #ff4444;">Anonymous</span> | ${new Date().toLocaleDateString()}
                </div>
                <p style="font-size: 15px; line-height: 1.7; color: #e0e0e0;">
                  ${rewriteLevel >= 2
                    ? `A disturbing pattern has emerged across multiple online communities: users who click certain "dead links" reportedly stop posting entirely. <span style="color: #ff4444; font-weight: bold;">One researcher documented 47 active forum members who clicked a specific broken URL - none have logged in since</span>. The link leads nowhere, returning a standard 404 error, yet something about it triggers <span style="background: #330000; padding: 2px 4px;">complete digital silence</span> from anyone who accesses it.`
                    : rewriteLevel >= 1
                      ? `Reports from various online communities suggest some broken links may be part of a larger DNS hijacking operation. Users report clicking dead links only to find their browsers redirecting to unknown addresses before displaying error messages. Security researchers are investigating whether this represents a new form of tracking.`
                      : `A recent investigation explores internet myths surrounding "dead links" and their implications for web security. While most broken links are simply the result of removed content or server issues, researchers emphasize the importance of maintaining digital hygiene and avoiding suspicious URLs.`
                  }
                </p>
              </article>
            </div>

            <!-- Sidebar -->
            <div>
              <div style="background: #2a2a2a; padding: 20px; margin-bottom: 20px; border: 2px solid #ff4444;">
                <h3 style="color: #ff4444; margin-top: 0; font-size: 16px; text-transform: uppercase;">🔥 Trending Now</h3>
                <ul style="list-style: none; padding: 0; margin: 0; font-size: 13px; line-height: 2;">
                  <li><a href="#" style="color: #e0e0e0; text-decoration: none;">• MK-Ultra Documents Resurface</a></li>
                  <li><a href="#" style="color: #e0e0e0; text-decoration: none;">• Surveillance State Exposed</a></li>
                  <li><a href="#" style="color: #e0e0e0; text-decoration: none;">• NSA Whistleblower Speaks</a></li>
                  <li><a href="#" style="color: #e0e0e0; text-decoration: none;">• Digital Memory Manipulation</a></li>
                  ${rewriteLevel >= 2 ? '<li style="color: #ff4444;">• Timeline Corruption Reports ⚠️</li>' : ''}
                </ul>
              </div>

              <div style="background: #8b0000; padding: 20px; text-align: center;">
                <h3 style="color: #fff; margin: 0 0 15px 0; font-size: 18px;">THEY'RE WATCHING</h3>
                <p style="font-size: 13px; margin: 0 0 15px 0; line-height: 1.5;">
                  Your browsing is being monitored. Protect yourself with encrypted communications.
                </p>
                <button style="background: #000; color: #ff4444; border: 2px solid #ff4444; padding: 10px 20px; font-weight: bold; cursor: pointer; width: 100%;">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  "deepwatch.org": {
    title: "DeepWatch",
    type: "surveillance",
    renderHTML: (rewriteLevel) => `
      <div style="font-family: 'Courier New', monospace; background: #0a0a0a; color: #0f0; min-height: 100%;">
        <!-- Terminal-style header -->
        <div style="background: #000; border-bottom: 2px solid #0f0; padding: 15px 20px; font-family: monospace;">
          <div style="max-width: 1400px; margin: 0 auto;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-size: 24px; font-weight: bold; color: #0f0; text-shadow: 0 0 10px #0f0;">
                  ▛▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▜<br>
                  ▌ DEEPWATCH.ORG - SURVEILLANCE FEED ARCHIVE         ▐<br>
                  ▙▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▟
                </div>
                <div style="font-size: 11px; color: #0f0; opacity: 0.7; margin-top: 5px;">
                  [STATUS: ONLINE] | NODE: 47.142.89.103 | ENCRYPTION: TOR_RELAY_8 | ${new Date().toLocaleString()}
                </div>
              </div>
              <div style="font-size: 12px; color: #0f0;">
                <span style="animation: blink 1s infinite;">●</span> LIVE FEEDS: ${Math.floor(Math.random() * 300 + 100)}
              </div>
            </div>
          </div>
        </div>

        ${rewriteLevel >= 2 ? `
        <div style="background: #1a0000; border: 2px solid #ff0000; margin: 20px auto; max-width: 1400px; padding: 15px; animation: blink 2s infinite;">
          <div style="color: #ff0000; font-size: 14px; font-weight: bold;">
            ⚠️ WARNING: TEMPORAL ANOMALIES DETECTED IN FEED DATA<br>
            <span style="font-size: 12px; opacity: 0.8;">Multiple feeds showing impossible timestamp sequences. Reality anchor stability: CRITICAL</span>
          </div>
        </div>
        ` : ''}

        <div style="max-width: 1400px; margin: 0 auto; padding: 20px;">
          <!-- Search/Filter bar -->
          <div style="background: #1a1a1a; border: 1px solid #0f0; padding: 15px; margin-bottom: 20px;">
            <div style="display: flex; gap: 15px; align-items: center; font-size: 13px;">
              <span style="color: #0f0;">FILTER:</span>
              <select style="background: #000; color: #0f0; border: 1px solid #0f0; padding: 5px 10px; font-family: monospace;">
                <option>ALL FEEDS</option>
                <option>GOVERNMENT</option>
                <option>TRAFFIC CAMS</option>
                <option>SECURITY</option>
                <option>CLASSIFIED</option>
              </select>
              <span style="color: #0f0;">LOCATION:</span>
              <input type="text" placeholder="Search coordinates..." style="background: #000; color: #0f0; border: 1px solid #0f0; padding: 5px 10px; font-family: monospace; flex: 1;" />
              <button style="background: #0f0; color: #000; border: none; padding: 6px 15px; font-weight: bold; cursor: pointer; font-family: monospace;">SEARCH</button>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
            <!-- Main feed -->
            <div>
              <!-- Featured leaked footage -->
              <div style="background: #1a1a1a; border: 2px solid ${rewriteLevel >= 2 ? '#ff0000' : '#0f0'}; padding: 20px; margin-bottom: 20px;">
                <div style="background: #000; color: #0f0; padding: 8px 12px; margin: -20px -20px 15px -20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid ${rewriteLevel >= 2 ? '#ff0000' : '#0f0'};">
                  <span style="font-size: 14px; font-weight: bold;">📹 FEED_ID: CLASSIFIED_239 ${rewriteLevel >= 2 ? '| ⚠️ ANOMALY DETECTED' : '| LEAKED 2024'}</span>
                  <span style="font-size: 11px;">[${rewriteLevel >= 2 ? '<span style="color: #ff0000;">TIMESTAMP_ERROR</span>' : '2024-01-15 03:14:07'}]</span>
                </div>

                <h2 style="color: ${rewriteLevel >= 2 ? '#ff0000' : '#0f0'}; margin: 0 0 15px 0; font-size: 20px; text-transform: uppercase;">
                  ${rewriteLevel >= 2
                    ? '&gt;&gt; FEED CORRUPTION: Frame 239 Reappears Across Multiple Timelines'
                    : rewriteLevel >= 1
                      ? '&gt;&gt; Classified Feed: Frame 239 Redacted in All Copies'
                      : '&gt;&gt; Government Security Camera - Routine Test Footage'
                  }
                </h2>

                <!-- Video placeholder -->
                <div style="background: #000; height: 400px; position: relative; border: 1px solid ${rewriteLevel >= 2 ? '#ff0000' : '#0f0'}; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                  <div style="text-align: center; color: ${rewriteLevel >= 2 ? '#ff0000' : '#0f0'};">
                    ${rewriteLevel >= 2 ? `
                      <div style="font-size: 72px; margin-bottom: 10px; animation: blink 0.5s infinite;">⚠</div>
                      <div style="font-size: 16px; font-weight: bold;">ERROR: FEED_CORRUPTED</div>
                      <div style="font-size: 12px; opacity: 0.7; margin-top: 10px;">Frame 239 timestamp: ████-██-██ ██:14:07</div>
                      <div style="font-size: 12px; opacity: 0.7;">Silhouette detected at coordinates: [REDACTED]</div>
                      <div style="font-size: 12px; margin-top: 20px; color: #ff0000;">
                        Last known edit: NONE<br>
                        Current instance: 7th reappearance<br>
                        <span style="animation: blink 1s infinite;">Nobody recalls editing this frame</span>
                      </div>
                    ` : rewriteLevel >= 1 ? `
                      <div style="font-size: 48px; margin-bottom: 10px;">🔒</div>
                      <div style="font-size: 14px;">FRAME 239: REDACTED</div>
                      <div style="font-size: 12px; opacity: 0.7; margin-top: 10px;">This frame has been obscured in every archived copy</div>
                      <div style="font-size: 12px; opacity: 0.7;">Classification level: ABOVE TOP SECRET</div>
                    ` : `
                      <div style="font-size: 48px; margin-bottom: 10px;">📹</div>
                      <div style="font-size: 14px;">SURVEILLANCE FOOTAGE - ROUTINE TEST</div>
                      <div style="font-size: 12px; opacity: 0.7; margin-top: 10px;">Location: Government Building Sector 7</div>
                      <div style="font-size: 12px; opacity: 0.7;">Duration: 03:47:22</div>
                      <div style="font-size: 12px; opacity: 0.7;">Status: NO ANOMALIES DETECTED</div>
                    `}
                  </div>

                  <!-- Timestamp overlay -->
                  <div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.8); padding: 5px 10px; font-size: 11px; color: ${rewriteLevel >= 2 ? '#ff0000' : '#0f0'}; border: 1px solid ${rewriteLevel >= 2 ? '#ff0000' : '#0f0'};">
                    ${rewriteLevel >= 2 ? '[ERR: TIMESTAMP_CORRUPTED]' : '2024-01-15 03:14:07'}
                  </div>

                  <!-- Recording indicator -->
                  <div style="position: absolute; top: 10px; right: 10px; display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.8); padding: 5px 10px; border: 1px solid ${rewriteLevel >= 2 ? '#ff0000' : '#0f0'};">
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: ${rewriteLevel >= 2 ? '#ff0000' : '#ff0000'}; animation: blink 1s infinite;"></span>
                    <span style="font-size: 11px; color: ${rewriteLevel >= 2 ? '#ff0000' : '#0f0'};">REC</span>
                  </div>
                </div>

                <div style="font-size: 14px; line-height: 1.8; color: #0f0;">
                  <p style="margin: 0 0 15px 0;">
                    <span style="color: #888;">&gt; FEED_DESCRIPTION:</span><br>
                    ${rewriteLevel >= 2
                      ? `<span style="color: #ff0000;">CRITICAL ANOMALY:</span> Frame 239 has reappeared for the 7th time across multiple archived feeds. Original footage dated 2024-01-15 at 03:14:07, but frame now appears in feeds from <span style="color: #ff0000; font-weight: bold;">dates that have not yet occurred</span>.<br><br>

                      <span style="color: #888;">&gt; TECHNICAL_ANALYSIS:</span><br>
                      A new silhouette has manifested in Frame 239 that was not present in previous iterations. <span style="background: #1a0000; padding: 2px 4px; color: #ff0000;">All edit logs show zero modifications</span>. Metadata indicates the frame was last accessed by user ID: <span style="color: #ff0000;">[DOES_NOT_EXIST]</span><br><br>

                      <span style="color: #888;">&gt; WITNESS_REPORTS:</span><br>
                      Multiple archivists report no memory of editing or reviewing this frame. Timestamps across all backup systems show <span style="color: #ff0000; font-weight: bold;">temporal inconsistencies of up to 47 hours</span>. Frame 239 appears to be rewriting itself across the archive network.`
                      : rewriteLevel >= 1
                        ? `<span style="color: #888;">&gt; CLASSIFICATION:</span> ABOVE TOP SECRET<br><br>

                        Frame 239 from government surveillance footage has been systematically redacted across every known copy. The original feed was captured on 2024-01-15 at 03:14:07 during a routine security test.<br><br>

                        <span style="color: #888;">&gt; INVESTIGATION_STATUS:</span><br>
                        Multiple FOIA requests have been filed to determine why this specific frame required redaction. Government officials have not provided explanation. <span style="color: #0f0;">All backup copies contain identical obscuration</span>, suggesting coordinated removal at the source level.`
                        : `<span style="color: #888;">&gt; CLASSIFICATION:</span> UNCLASSIFIED<br><br>

                        Routine surveillance footage captured during scheduled system testing. Frame 239 shows standard government building interior. Poor lighting conditions resulted in degraded image quality.<br><br>

                        <span style="color: #888;">&gt; STATUS:</span> NO ANOMALIES DETECTED<br>
                        <span style="color: #888;">&gt; CLEARANCE_REQUIRED:</span> NONE`
                    }
                  </p>
                </div>

                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid ${rewriteLevel >= 2 ? '#330000' : '#0f0'}; display: flex; gap: 15px; font-size: 12px;">
                  <span style="cursor: pointer;">⬆ ${Math.floor(Math.random() * 1000 + 200)} UPVOTES</span>
                  <span style="cursor: pointer;">💬 ${Math.floor(Math.random() * 200 + 50)} ANALYSIS</span>
                  <span style="cursor: pointer;">📥 DOWNLOAD_FEED</span>
                  ${rewriteLevel >= 2 ? '<span style="color: #ff0000;">⚠️ REPORT_ANOMALY</span>' : ''}
                </div>
              </div>

              <!-- Second feed -->
              <div style="background: #1a1a1a; border: 1px solid #0f0; padding: 20px;">
                <div style="background: #000; color: #0f0; padding: 8px 12px; margin: -20px -20px 15px -20px; border-bottom: 1px solid #0f0;">
                  <span style="font-size: 14px; font-weight: bold;">📹 FEED_ID: UNKNOWN_ORIGIN | LEAKED ${new Date().getFullYear()}</span>
                </div>

                <h3 style="color: #0f0; margin: 0 0 12px 0; font-size: 16px;">
                  &gt;&gt; ${rewriteLevel >= 2 ? 'Feed Propagation: Subject Appears Across Multiple Camera Networks' : 'Unauthorized Surveillance: Unregistered Individual Detected'}
                </h3>

                <p style="font-size: 13px; line-height: 1.7; color: #0f0; opacity: 0.9; margin: 0;">
                  ${rewriteLevel >= 2
                    ? `Footage leaked from unidentified source shows the same individual appearing in surveillance feeds across 14 different camera systems. <span style="color: #ff0000;">The cameras were not scheduled to be active</span>. Subject maintains direct eye contact with lens in each instance. Timestamp data shows <span style="color: #ff0000; font-weight: bold;">simultaneous recordings from locations 300+ miles apart</span>.`
                    : rewriteLevel >= 1
                      ? `Footage captured during off-hours shows an unidentified individual who does not appear in any government databases. Security cameras were not scheduled to be recording at the time. Subject appears aware of camera presence and maintains unusual eye contact with the lens.`
                      : `Routine surveillance footage captured during scheduled system testing. Individual appears to be conducting authorized facility inspection. No security concerns identified.`
                  }
                </p>
              </div>
            </div>

            <!-- Sidebar -->
            <div>
              <div style="background: #1a1a1a; border: 1px solid #0f0; padding: 15px; margin-bottom: 20px;">
                <div style="font-size: 13px; font-weight: bold; color: #0f0; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #0f0;">
                  &gt;&gt; ACTIVE_FEEDS
                </div>
                <div style="font-size: 11px; line-height: 2; color: #0f0; opacity: 0.8;">
                  <div>• TRAFFIC_CAM_089 [LIVE]</div>
                  <div>• ATM_SURVEILLANCE_47 [LIVE]</div>
                  <div>• GOV_BUILDING_SEC_3 [LIVE]</div>
                  <div>• METRO_STATION_12 [LIVE]</div>
                  ${rewriteLevel >= 2 ? '<div style="color: #ff0000;">• [CORRUPTED_FEED_239] [⚠️]</div>' : ''}
                  <div>• PARKING_LOT_B7 [OFFLINE]</div>
                  ${rewriteLevel >= 1 ? '<div style="color: #ff0;">• CLASSIFIED_ARCHIVE [RESTRICTED]</div>' : ''}
                </div>
              </div>

              <div style="background: #000; border: 2px solid #ff0000; padding: 15px; margin-bottom: 20px;">
                <div style="font-size: 13px; font-weight: bold; color: #ff0000; margin-bottom: 10px;">
                  ⚠️ SECURITY_ALERT
                </div>
                <div style="font-size: 11px; line-height: 1.6; color: #ff0000;">
                  Your connection is being monitored. All traffic logged. Use Tor for anonymity. Trust no one.
                </div>
              </div>

              <div style="background: #1a1a1a; border: 1px solid #0f0; padding: 15px;">
                <div style="font-size: 13px; font-weight: bold; color: #0f0; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #0f0;">
                  &gt;&gt; RECENT_LEAKS
                </div>
                <div style="font-size: 11px; line-height: 2; color: #0f0; opacity: 0.8;">
                  <div>• NSA_PRISM_DOCS_2024</div>
                  <div>• CIA_SURVEILLANCE_LOGS</div>
                  <div>• POLICE_BODYCAM_ARCHIVE</div>
                  <div>• AIRPORT_SECURITY_FEEDS</div>
                  ${rewriteLevel >= 2 ? '<div style="color: #ff0000;">• TEMPORAL_ANOMALY_REPORTS</div>' : ''}
                  <div>• CLASSIFIED_GOV_FOOTAGE</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #000; border-top: 2px solid #0f0; margin-top: 40px; padding: 20px; text-align: center; font-size: 11px; color: #0f0; opacity: 0.6;">
          <p style="margin: 0 0 8px 0;">DEEPWATCH.ORG | TOR: ${Math.random().toString(36).substring(7)}.onion | EST. 2019</p>
          <p style="margin: 0;">All leaked footage is provided for educational and journalistic purposes. DeepWatch does not endorse illegal surveillance.</p>
          ${rewriteLevel >= 2 ? '<p style="margin: 8px 0 0 0; color: #ff0000;">⚠️ WARNING: TIMELINE INTEGRITY COMPROMISED | ARCHIVE STABILITY: CRITICAL</p>' : ''}
        </div>
      </div>

      <style>
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      </style>
    `
  },

  "cnn-news.com": {
    title: "CNN News",
    type: "mainstream_news",
    renderHTML: (rewriteLevel) => `
      <div style="font-family: 'CNN Sans', Arial, sans-serif; background: #fff; min-height: 100%;">
        <!-- Header -->
        <div style="background: #cc0000; color: white; padding: 8px 0;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 20px;">
                <div style="font-size: 36px; font-weight: bold; letter-spacing: -2px;">CNN</div>
                <div style="font-size: 12px; border-left: 1px solid rgba(255,255,255,0.3); padding-left: 15px;">
                  ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
              <div style="font-size: 11px; opacity: 0.9;">BREAKING NEWS</div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div style="background: #000; color: white; padding: 12px 0; border-bottom: 2px solid #cc0000;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; gap: 25px; font-size: 13px; font-weight: 600;">
            <a href="#" style="color: white; text-decoration: none;">U.S.</a>
            <a href="#" style="color: white; text-decoration: none;">World</a>
            <a href="#" style="color: white; text-decoration: none;">Politics</a>
            <a href="#" style="color: white; text-decoration: none;">Business</a>
            <a href="#" style="color: white; text-decoration: none;">Tech</a>
            <a href="#" style="color: white; text-decoration: none;">Science</a>
          </div>
        </div>

        <div style="max-width: 1200px; margin: 0 auto; padding: 30px 20px;">
          ${rewriteLevel >= 2 ? `
          <div style="background: #ffe6e6; border-left: 4px solid #cc0000; padding: 15px 20px; margin-bottom: 30px;">
            <div style="color: #cc0000; font-weight: bold; font-size: 14px; margin-bottom: 5px;">EDITOR'S NOTE</div>
            <div style="font-size: 13px; color: #333;">Multiple sources reporting inconsistencies in archived news footage. Timestamps across broadcasts showing temporal discrepancies. Investigation ongoing.</div>
          </div>
          ` : ''}

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
            <!-- Main story -->
            <div>
              <div style="color: #cc0000; font-size: 11px; font-weight: bold; letter-spacing: 1px; margin-bottom: 8px;">BREAKING NEWS</div>
              <h1 style="font-size: 42px; line-height: 1.1; margin: 0 0 15px 0; font-weight: 700; color: #000;">
                ${rewriteLevel >= 2
                  ? 'News Anchors Report Memory Gaps During Live Broadcasts'
                  : rewriteLevel >= 1
                    ? 'Technical Difficulties Plague Major News Networks'
                    : 'Major Networks Upgrade Broadcast Technology'
                }
              </h1>
              <div style="font-size: 13px; color: #666; margin-bottom: 20px;">
                By <span style="color: #cc0000;">CNN Digital Team</span> | Updated ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ET
              </div>

              <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800" style="width: 100%; height: 450px; object-fit: cover; margin-bottom: 20px; ${rewriteLevel >= 2 ? 'filter: hue-rotate(30deg) saturate(1.3);' : ''}" />

              <div style="font-size: 18px; line-height: 1.8; color: #262626;">
                <p style="margin: 0 0 20px 0; font-weight: 500;">
                  ${rewriteLevel >= 2
                    ? `(CNN) — In an unprecedented series of incidents, news anchors across multiple major networks have reported experiencing <b>gaps in their memory during live broadcasts</b>. The phenomenon, which has affected at least 14 journalists over the past week, has raised concerns about <span style="background: #ffe6e6; padding: 2px 4px;">the integrity of broadcast timelines</span>.`
                    : rewriteLevel >= 1
                      ? `(CNN) — Major news networks experienced widespread technical difficulties during prime-time broadcasts this week, with several anchors reporting unusual audio dropouts and timestamp errors in their teleprompter systems.`
                      : `(CNN) — Major broadcasting networks announced a coordinated upgrade to their transmission infrastructure this week, promising viewers improved picture quality and more reliable live coverage.`
                  }
                </p>

                <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.7;">
                  ${rewriteLevel >= 2
                    ? `"I looked at the clock and it said 7:42 PM," reported veteran anchor Marcus Chen. "Then I blinked and it was 7:58 PM. I have no memory of those sixteen minutes. <b style="color: #cc0000;">But the teleprompter shows I read the entire segment</b>."<br><br>

                    Network engineers reviewing the footage found that <span style="background: #ffe6e6; padding: 2px 4px;">broadcast timestamps don't match studio clocks</span> during these incidents. Even more puzzling: <b>archived recordings show different content than what producers remember filming</b>.<br><br>

                    "We're dealing with something unprecedented," said Dr. Rachel Kim, a media forensics expert. "The metadata indicates these broadcasts occurred exactly as recorded, but <span style="color: #cc0000; font-weight: 500;">multiple eyewitnesses remember different events</span>."<br><br>

                    Federal communications regulators have launched an investigation into what they're calling <span style="background: #ffe6e6; padding: 2px 4px;">"temporal broadcast anomalies."</span>`
                    : rewriteLevel >= 1
                      ? `Network technicians are investigating the source of the disruptions, which primarily affected timestamp displays and audio synchronization. Several viewers reported that news segments appeared to "skip" during live broadcasts.<br><br>

                      "We're working to identify the root cause," said a spokesperson for the broadcast engineers union. "Initial analysis suggests possible interference with our timing systems."<br><br>

                      No official explanation has been provided for the coordinated nature of the technical issues.`
                      : `The upgrades include state-of-the-art HD cameras, improved satellite uplinks, and redundant backup systems to prevent technical failures during breaking news coverage.<br><br>

                      Industry experts say the improvements will significantly enhance viewers' experience and provide more reliable coverage of important events worldwide.`
                  }
                </p>

                ${rewriteLevel >= 2 ? `
                <div style="background: #f5f5f5; border-left: 3px solid #cc0000; padding: 15px; margin: 20px 0;">
                  <div style="font-size: 12px; color: #666; margin-bottom: 8px;">VIEWER REPORTS</div>
                  <div style="font-size: 14px; line-height: 1.6;">
                    <p style="margin: 8px 0;">"I recorded the 7PM broadcast. When I played it back, <b>it showed completely different news stories</b> than what I watched live." - @viewer_42</p>
                    <p style="margin: 8px 0;">"The timestamps keep jumping. I've noticed it for weeks but thought it was my cable box." - @newswatch_daily</p>
                  </div>
                </div>
                ` : ''}
              </div>
            </div>

            <!-- Sidebar -->
            <div>
              <div style="background: #f5f5f5; padding: 20px; margin-bottom: 20px;">
                <h3 style="font-size: 18px; margin: 0 0 15px 0; font-weight: bold; color: #000;">More Headlines</h3>
                <div style="border-bottom: 1px solid #ddd; padding-bottom: 15px; margin-bottom: 15px;">
                  <a href="#" style="color: #000; text-decoration: none; font-size: 15px; line-height: 1.4; display: block;">Markets steady amid tech sector concerns</a>
                </div>
                <div style="border-bottom: 1px solid #ddd; padding-bottom: 15px; margin-bottom: 15px;">
                  <a href="#" style="color: #000; text-decoration: none; font-size: 15px; line-height: 1.4; display: block;">New climate report released</a>
                </div>
                ${rewriteLevel >= 2 ? `
                <div style="border-bottom: 1px solid #ddd; padding-bottom: 15px; margin-bottom: 15px;">
                  <a href="#" style="color: #cc0000; text-decoration: none; font-size: 15px; line-height: 1.4; display: block; font-weight: 600;">⚠️ Broadcast anomalies reported nationwide</a>
                </div>
                ` : ''}
                <div style="padding-bottom: 15px;">
                  <a href="#" style="color: #000; text-decoration: none; font-size: 15px; line-height: 1.4; display: block;">Presidential address scheduled</a>
                </div>
              </div>

              <div style="background: #000; color: white; padding: 20px; text-align: center;">
                <div style="font-size: 20px; font-weight: bold; color: #cc0000; margin-bottom: 10px;">BREAKING</div>
                <div style="font-size: 14px; line-height: 1.5;">
                  ${rewriteLevel >= 2 ? 'FCC investigating temporal anomalies in broadcast systems' : 'Stay updated with CNN alerts'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #000; color: white; padding: 30px 20px; margin-top: 50px; text-align: center; font-size: 12px;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <div style="font-size: 24px; font-weight: bold; letter-spacing: -1px; margin-bottom: 20px; color: #cc0000;">CNN</div>
            <div style="opacity: 0.7;">© ${new Date().getFullYear()} Cable News Network. All Rights Reserved.</div>
            ${rewriteLevel >= 2 ? '<div style="opacity: 0.5; margin-top: 10px; font-size: 11px;">Timestamp verification: [ERROR]</div>' : ''}
          </div>
        </div>
      </div>
    `
  },

  "github-code.dev": {
    title: "GitHub",
    type: "code_repository",
    renderHTML: (rewriteLevel) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background: #0d1117; color: #c9d1d9; min-height: 100%;">
        <!-- Header -->
        <div style="background: #161b22; border-bottom: 1px solid #30363d; padding: 16px 32px;">
          <div style="max-width: 1280px; margin: 0 auto; display: flex; align-items: center; gap: 16px;">
            <svg height="32" width="32" viewBox="0 0 16 16" fill="#f0f6fc">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            <div style="font-size: 20px; font-weight: 600;">GitHub</div>
            <input type="text" placeholder="Search repositories..." style="background: #0d1117; border: 1px solid #30363d; color: #c9d1d9; padding: 5px 12px; border-radius: 6px; width: 300px; font-size: 14px;" />
          </div>
        </div>

        <div style="max-width: 1280px; margin: 0 auto; padding: 24px 32px;">
          ${rewriteLevel >= 2 ? `
          <div style="background: #1c1300; border: 1px solid #9e6a03; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
            <div style="display: flex; gap: 12px;">
              <div style="color: #f0ad4e; font-size: 20px;">⚠️</div>
              <div>
                <div style="color: #f0ad4e; font-weight: 600; font-size: 14px; margin-bottom: 4px;">Repository integrity warning</div>
                <div style="font-size: 13px; color: #c9d1d9;">Commit timestamps show impossible sequences. Git history may be corrupted.</div>
              </div>
            </div>
          </div>
          ` : ''}

          <!-- Repository header -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
              <a href="#" style="color: #58a6ff; text-decoration: none; font-size: 20px; font-weight: 600;">DARPA-Research</a>
              <span style="color: #8b949e;">/</span>
              <a href="#" style="color: #58a6ff; text-decoration: none; font-size: 20px; font-weight: 600;">behavioral-monitoring</a>
              <span style="background: #21262d; border: 1px solid #30363d; border-radius: 20px; padding: 2px 8px; font-size: 11px; color: #8b949e; margin-left: 8px;">Private</span>
            </div>
            <div style="color: #8b949e; font-size: 14px; margin-bottom: 16px;">
              ${rewriteLevel >= 2
                ? 'Neural network behavioral profiling system — ⚠️ Warning: Commit history anomalies detected'
                : rewriteLevel >= 1
                  ? 'Research project for behavioral analysis systems'
                  : 'University research repository for computer science projects'
              }
            </div>
            <div style="display: flex; gap: 10px; font-size: 12px; color: #8b949e;">
              <span>⭐ ${rewriteLevel >= 2 ? '47' : '12'} stars</span>
              <span>🔀 ${rewriteLevel >= 2 ? '23' : '3'} forks</span>
              <span>👁️ ${rewriteLevel >= 2 ? '156' : '8'} watching</span>
            </div>
          </div>

          <!-- Navigation tabs -->
          <div style="border-bottom: 1px solid #21262d; margin-bottom: 16px;">
            <div style="display: flex; gap: 16px; font-size: 14px;">
              <a href="#" style="color: #c9d1d9; text-decoration: none; padding: 10px 0; border-bottom: 2px solid #f78166;">📂 Code</a>
              <a href="#" style="color: #8b949e; text-decoration: none; padding: 10px 0;">🔄 ${rewriteLevel >= 2 ? '342' : '47'} Commits</a>
              <a href="#" style="color: #8b949e; text-decoration: none; padding: 10px 0;">⚠️ ${rewriteLevel >= 2 ? '8' : '0'} Issues</a>
            </div>
          </div>

          <!-- File browser -->
          <div style="border: 1px solid #30363d; border-radius: 6px; overflow: hidden;">
            <!-- Branch info -->
            <div style="background: #161b22; padding: 16px; border-bottom: 1px solid #30363d; display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; gap: 12px; align-items: center;">
                <div style="background: #21262d; border: 1px solid #30363d; border-radius: 6px; padding: 5px 12px; font-size: 14px;">
                  🌿 main
                </div>
                <div style="font-size: 14px; color: #8b949e;">
                  ${rewriteLevel >= 2 ? '<span style="color: #f85149;">3 commits • Last: [TIMESTAMP_ERROR]</span>' : '47 commits'}
                </div>
              </div>
              <button style="background: #238636; border: 1px solid #30363d; color: white; padding: 5px 16px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">💾 Code</button>
            </div>

            <!-- Files list -->
            <div style="background: #0d1117;">
              ${[
                { name: '.gitignore', type: 'file', size: '2.1 KB' },
                { name: 'README.md', type: 'file', size: '4.8 KB' },
                { name: 'requirements.txt', type: 'file', size: '892 B' },
                { name: rewriteLevel >= 1 ? 'behavioral_profile.py' : 'main.py', type: 'file', size: '15.3 KB' },
                { name: rewriteLevel >= 2 ? 'neural_monitor.py' : 'utils.py', type: 'file', size: '8.7 KB' },
                { name: rewriteLevel >= 2 ? 'observer_core.py' : 'config.py', type: 'file', size: '3.2 KB' },
                { name: 'src/', type: 'dir', size: '' },
                { name: 'tests/', type: 'dir', size: '' }
              ].map((file, i) => `
                <div style="padding: 10px 16px; border-bottom: 1px solid #21262d; display: flex; justify-content: space-between; align-items: center; ${i === 3 && rewriteLevel >= 2 ? 'background: #1c1300;' : ''}">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 16px;">${file.type === 'dir' ? '📁' : '📄'}</span>
                    <a href="#" style="color: ${i === 3 && rewriteLevel >= 2 ? '#f0ad4e' : '#58a6ff'}; text-decoration: none; font-size: 14px;">${file.name}</a>
                  </div>
                  <div style="color: #8b949e; font-size: 12px;">${file.size}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- README -->
          <div style="border: 1px solid #30363d; border-radius: 6px; overflow: hidden; margin-top: 24px;">
            <div style="background: #161b22; padding: 12px 16px; border-bottom: 1px solid #30363d; font-size: 14px; font-weight: 600;">
              📖 README.md
            </div>
            <div style="padding: 24px; background: #0d1117; font-size: 14px; line-height: 1.7;">
              <h1 style="font-size: 32px; margin: 0 0 16px 0; font-weight: 600;">
                ${rewriteLevel >= 2 ? 'Behavioral Monitoring System' : rewriteLevel >= 1 ? 'Research Project' : 'University CS Project'}
              </h1>

              <p style="margin: 0 0 16px 0;">
                ${rewriteLevel >= 2
                  ? `<span style="background: #1c1300; padding: 2px 6px; border-radius: 3px; color: #f0ad4e;">⚠️ CLASSIFIED</span> Neural network system for real-time behavioral profiling and observation. <span style="color: #f85149;">Access restricted to authorized personnel only.</span>`
                  : rewriteLevel >= 1
                    ? 'Research repository for behavioral analysis algorithms. Part of ongoing computer science research at UNC Charlotte.'
                    : 'Student project repository for CSE322 - Software Engineering course at UNC Charlotte.'
                }
              </p>

              ${rewriteLevel >= 2 ? `
              <h2 style="font-size: 24px; margin: 24px 0 12px 0; font-weight: 600; color: #f85149;">⚠️ System Capabilities</h2>
              <ul style="margin: 0 0 16px 20px; padding: 0;">
                <li>Real-time personality classification</li>
                <li>Risk assessment and threat profiling</li>
                <li>Behavioral pattern prediction</li>
                <li style="color: #f85149;">Observer contamination detection</li>
                <li style="color: #f85149;">Timeline integrity monitoring</li>
              </ul>

              <h2 style="font-size: 24px; margin: 24px 0 12px 0; font-weight: 600;">⚠️ Warning</h2>
              <p style="margin: 0 0 16px 0; background: #1c1300; padding: 12px; border-left: 3px solid #f0ad4e; border-radius: 3px;">
                <span style="color: #f0ad4e; font-weight: 600;">Git history shows temporal anomalies.</span><br>
                Commit timestamps occur in non-sequential order. Multiple commits dated from <span style="color: #f85149;">dates that have not yet occurred</span>.
              </p>
              ` : ''}

              <h2 style="font-size: 24px; margin: 24px 0 12px 0; font-weight: 600;">Installation</h2>
              <pre style="background: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 16px; overflow-x: auto; margin: 0 0 16px 0; font-family: 'SF Mono', Monaco, monospace; font-size: 13px;">pip install -r requirements.txt</pre>

              ${rewriteLevel >= 2 ? `
              <h2 style="font-size: 24px; margin: 24px 0 12px 0; font-weight: 600; color: #f85149;">Recent Activity</h2>
              <div style="font-size: 13px; color: #8b949e; font-family: monospace;">
                <div style="margin-bottom: 8px;">• commit a7f3c21 <span style="color: #f85149;">[TIMESTAMP_CORRUPTED]</span> - "Added observer detection"</div>
                <div style="margin-bottom: 8px;">• commit 2b8e441 <span style="color: #f85149;">[FUTURE_DATE]</span> - "Timeline integrity checks"</div>
                <div style="margin-bottom: 8px;">• commit 9c2a115 <span style="color: #8b949e;">2024-01-15</span> - "Initial commit"</div>
              </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `
  },

  "mail.google.com": {
    title: "Gmail",
    type: "email",
    renderHTML: (rewriteLevel) => `
      <div style="font-family: 'Google Sans', Roboto, Arial, sans-serif; background: #ffffff; min-height: 100vh;">
        <!-- Gmail Header -->
        <div style="display: flex; align-items: center; padding: 8px 16px; border-bottom: 1px solid #dadce0; background: #f5f5f5;">
          <svg width="40" height="30" viewBox="0 0 256 194" style="margin-right: 16px;">
            <path fill="#4285F4" d="M58 170.5L0 130.5V64L58 104z"/>
            <path fill="#34A853" d="M58 28.5l70 58.5-70 58.5z"/>
            <path fill="#EA4335" d="M198 28.5l-70 58.5 70 58.5z"/>
            <path fill="#FBBC04" d="M198 170.5L256 130.5V64l-58 40z"/>
            <path fill="#C5221F" d="M0 64l58-35.5L128 87 198 28.5 256 64v66.5z"/>
          </svg>
          <div style="flex: 1; font-size: 20px; color: #5f6368;">Gmail</div>
          <input type="text" placeholder="Search mail" style="width: 400px; padding: 10px; border: 1px solid #dadce0; border-radius: 8px; background: #f1f3f4;">
        </div>

        <div style="display: flex; height: calc(100vh - 60px);">
          <!-- Sidebar -->
          <div style="width: 250px; padding: 16px; border-right: 1px solid #dadce0;">
            <button style="background: #c2e7ff; border: none; border-radius: 24px; padding: 12px 24px; font-size: 14px; font-weight: 500; color: #001d35; cursor: pointer; margin-bottom: 16px; width: 100%;">
              ✏️ Compose
            </button>
            <div style="margin-top: 8px;">
              <div style="padding: 8px 12px; background: #d3e3fd; border-radius: 0 16px 16px 0; font-weight: 500; color: #001d35; margin-bottom: 4px;">📥 Inbox (${rewriteLevel >= 2 ? '???' : '12'})</div>
              <div style="padding: 8px 12px; color: #5f6368; cursor: pointer; margin-bottom: 4px;">⭐ Starred</div>
              <div style="padding: 8px 12px; color: #5f6368; cursor: pointer; margin-bottom: 4px;">⏰ Snoozed</div>
              <div style="padding: 8px 12px; color: #5f6368; cursor: pointer; margin-bottom: 4px;">📤 Sent</div>
              <div style="padding: 8px 12px; color: #5f6368; cursor: pointer; margin-bottom: 4px;">📝 Drafts</div>
              ${rewriteLevel >= 2 ? '<div style="padding: 8px 12px; color: #c41e3a; cursor: pointer; margin-bottom: 4px; animation: flicker 2s infinite;">📁 [UNKNOWN_FOLDER] (47)</div>' : ''}
            </div>
          </div>

          <!-- Email List -->
          <div style="flex: 1; overflow-y: auto;">
            <!-- Tabs -->
            <div style="display: flex; border-bottom: 1px solid #dadce0; padding: 0 16px;">
              <div style="padding: 12px 16px; border-bottom: 3px solid #1a73e8; color: #1a73e8; font-weight: 500;">Primary</div>
              <div style="padding: 12px 16px; color: #5f6368;">Social</div>
              <div style="padding: 12px 16px; color: #5f6368;">Promotions</div>
            </div>

            <!-- Email items -->
            <div style="border-bottom: 1px solid #e0e0e0; padding: 12px 16px; cursor: pointer; display: flex; align-items: center; gap: 12px;" onmouseover="this.style.boxShadow='inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 0 4px 0 rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
              <input type="checkbox" style="margin-right: 8px;">
              <span style="color: #f4b400; font-size: 18px;">⭐</span>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-weight: 600; color: #202124;">UNC Charlotte Registrar</span>
                  <span style="color: #5f6368; font-size: 12px;">10:23 AM</span>
                </div>
                <div style="color: #202124; font-size: 14px; margin-top: 2px;">Course Registration Confirmation - Spring 2024</div>
                <div style="color: #5f6368; font-size: 13px; margin-top: 2px;">Your course registration has been confirmed for Spring 2024...</div>
              </div>
            </div>

            <div style="border-bottom: 1px solid #e0e0e0; padding: 12px 16px; cursor: pointer; display: flex; align-items: center; gap: 12px;" onmouseover="this.style.boxShadow='inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 0 4px 0 rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
              <input type="checkbox" style="margin-right: 8px;">
              <span style="color: #dadce0; font-size: 18px;">☆</span>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-weight: 600; color: #202124;">Amazon.com</span>
                  <span style="color: #5f6368; font-size: 12px;">Yesterday</span>
                </div>
                <div style="color: #202124; font-size: 14px; margin-top: 2px;">Your order has shipped!</div>
                <div style="color: #5f6368; font-size: 13px; margin-top: 2px;">Track your package: Order #114-8293742-1928374</div>
              </div>
            </div>

            <div style="border-bottom: 1px solid #e0e0e0; padding: 12px 16px; cursor: pointer; display: flex; align-items: center; gap: 12px;" onmouseover="this.style.boxShadow='inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 0 4px 0 rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
              <input type="checkbox" style="margin-right: 8px;">
              <span style="color: #dadce0; font-size: 18px;">☆</span>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-weight: 600; color: #202124;">Netflix</span>
                  <span style="color: #5f6368; font-size: 12px;">Jan 18</span>
                </div>
                <div style="color: #202124; font-size: 14px; margin-top: 2px;">New shows you might like</div>
                <div style="color: #5f6368; font-size: 13px; margin-top: 2px;">Based on your viewing history, check out these recommendations...</div>
              </div>
            </div>

            ${rewriteLevel >= 1 ? `
            <div style="border-bottom: 1px solid #e0e0e0; padding: 12px 16px; cursor: pointer; display: flex; align-items: center; gap: 12px; background: #fef7e0;" onmouseover="this.style.boxShadow='inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 0 4px 0 rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
              <input type="checkbox" style="margin-right: 8px;">
              <span style="color: #dadce0; font-size: 18px;">☆</span>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-weight: 600; color: #202124;">Student Health Services</span>
                  <span style="color: #5f6368; font-size: 12px;">Jan 15</span>
                </div>
                <div style="color: #202124; font-size: 14px; margin-top: 2px;">Routine Wellness Survey - Action Required</div>
                <div style="color: #5f6368; font-size: 13px; margin-top: 2px;">Please complete your bi-weekly psychological wellness assessment...</div>
              </div>
            </div>
            ` : ''}

            <div style="border-bottom: 1px solid #e0e0e0; padding: 12px 16px; cursor: pointer; display: flex; align-items: center; gap: 12px;" onmouseover="this.style.boxShadow='inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 0 4px 0 rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
              <input type="checkbox" style="margin-right: 8px;">
              <span style="color: #dadce0; font-size: 18px;">☆</span>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-weight: 600; color: #202124;">LinkedIn</span>
                  <span style="color: #5f6368; font-size: 12px;">Jan 14</span>
                </div>
                <div style="color: #202124; font-size: 14px; margin-top: 2px;">You appeared in 8 searches this week</div>
                <div style="color: #5f6368; font-size: 13px; margin-top: 2px;">See who's viewing your profile and boost your visibility...</div>
              </div>
            </div>

            ${rewriteLevel >= 2 ? `
            <div style="border-bottom: 1px solid #e0e0e0; padding: 12px 16px; cursor: pointer; display: flex; align-items: center; gap: 12px; background: #fdecea; animation: flicker 3s infinite;" onmouseover="this.style.boxShadow='inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 0 4px 0 rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
              <input type="checkbox" style="margin-right: 8px;">
              <span style="color: #c41e3a; font-size: 18px;">⚠</span>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-weight: 600; color: #202124;">[REDACTED]@darpa.mil</span>
                  <span style="color: #c41e3a; font-size: 12px;">[TIMESTAMP_ERROR]</span>
                </div>
                <div style="color: #202124; font-size: 14px; margin-top: 2px;">Re: Subject 2847-C Behavioral Markers</div>
                <div style="color: #5f6368; font-size: 13px; margin-top: 2px;">Pattern recognition threshold exceeded. Recommend protocol adjustment...</div>
              </div>
            </div>

            <div style="border-bottom: 1px solid #e0e0e0; padding: 12px 16px; cursor: pointer; display: flex; align-items: center; gap: 12px; background: #fdecea;" onmouseover="this.style.boxShadow='inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 0 4px 0 rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
              <input type="checkbox" style="margin-right: 8px;">
              <span style="color: #c41e3a; font-size: 18px;">⚠</span>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-weight: 600; color: #202124;">system-monitor@uncc.edu</span>
                  <span style="color: #c41e3a; font-size: 12px;">ERROR</span>
                </div>
                <div style="color: #202124; font-size: 14px; margin-top: 2px;">[AUTOMATED] Login Anomaly Detected</div>
                <div style="color: #5f6368; font-size: 13px; margin-top: 2px;">Your account accessed from [NULL] at [FUTURE_TIMESTAMP]...</div>
              </div>
            </div>
            ` : ''}

            <div style="border-bottom: 1px solid #e0e0e0; padding: 12px 16px; cursor: pointer; display: flex; align-items: center; gap: 12px; color: #5f6368;" onmouseover="this.style.boxShadow='inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 0 4px 0 rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
              <input type="checkbox" style="margin-right: 8px;">
              <span style="color: #dadce0; font-size: 18px;">☆</span>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-weight: 400; color: #5f6368;">GitHub</span>
                  <span style="color: #5f6368; font-size: 12px;">Jan 10</span>
                </div>
                <div style="color: #5f6368; font-size: 14px; margin-top: 2px;">[Security Alert] New sign-in from Chrome on Windows</div>
                <div style="color: #5f6368; font-size: 13px; margin-top: 2px;">A new sign-in to your account was detected...</div>
              </div>
            </div>
          </div>
        </div>

        <style>
          @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        </style>
      </div>
    `
  },

  "amazon.com": {
    title: "Amazon",
    type: "shopping",
    renderHTML: (rewriteLevel) => `
      <div style="font-family: 'Amazon Ember', Arial, sans-serif; background: #ffffff; min-height: 100vh;">
        <!-- Amazon Header -->
        <div style="background: #131921; color: white; padding: 8px 16px;">
          <div style="display: flex; align-items: center; gap: 24px;">
            <div style="font-size: 28px; font-weight: bold; font-family: Arial;">amazon</div>
            <div style="flex: 1; display: flex; align-items: center;">
              <input type="text" placeholder="Search Amazon" style="flex: 1; padding: 10px; border: none; border-radius: 4px 0 0 4px; max-width: 600px;">
              <button style="background: #febd69; border: none; padding: 10px 16px; border-radius: 0 4px 4px 0; cursor: pointer;">🔍</button>
            </div>
            <div style="display: flex; gap: 20px; align-items: center;">
              <div style="font-size: 12px;">Hello, Student<br/><strong>Account & Lists</strong></div>
              <div style="font-size: 12px;">Returns<br/><strong>& Orders</strong></div>
              <div style="font-size: 24px; position: relative;">
                🛒
                <span style="position: absolute; top: -8px; right: -8px; background: #f08804; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">${rewriteLevel >= 2 ? '?' : '0'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Bar -->
        <div style="background: #232f3e; color: white; padding: 8px 16px; font-size: 14px; display: flex; gap: 20px;">
          <span style="cursor: pointer;">All</span>
          <span style="cursor: pointer;">Today's Deals</span>
          <span style="cursor: pointer;">Customer Service</span>
          <span style="cursor: pointer;">Registry</span>
          <span style="cursor: pointer;">Gift Cards</span>
          <span style="cursor: pointer;">Sell</span>
        </div>

        <!-- Main Content -->
        <div style="max-width: 1500px; margin: 0 auto; padding: 20px;">
          ${rewriteLevel >= 2 ? `
          <div style="background: #fef5e7; border: 1px solid #f39c12; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <strong>⚠️ Browsing History Alert:</strong> We've noticed unusual patterns in your viewing history. Items you don't remember looking at: <strong>47</strong>
          </div>
          ` : ''}

          <!-- Banner -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; border-radius: 8px; margin-bottom: 24px;">
            <h1 style="font-size: 36px; margin: 0 0 12px 0;">New Year Deals</h1>
            <p style="font-size: 18px; margin: 0;">Save big on electronics, books, and more</p>
          </div>

          <!-- Product Grid -->
          <h2 style="font-size: 24px; margin-bottom: 16px; color: #0F1111;">Recommended for You</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">

            <!-- Product 1 -->
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; background: white; cursor: pointer; transition: box-shadow 0.2s;" onmouseover="this.style.boxShadow='0 4px 8px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
              <div style="width: 100%; height: 200px; background: #f0f0f0; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 60px; margin-bottom: 12px;">📚</div>
              <div style="font-size: 14px; color: #007185; margin-bottom: 8px;">Data Structures and Algorithms</div>
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                <span style="color: #f08804;">⭐⭐⭐⭐⭐</span>
                <span style="font-size: 12px; color: #007185;">4,823</span>
              </div>
              <div style="font-size: 24px; color: #B12704; font-weight: bold;">$49.99</div>
              <div style="font-size: 12px; color: #565959; text-decoration: line-through;">$79.99</div>
            </div>

            <!-- Product 2 -->
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; background: white; cursor: pointer; transition: box-shadow 0.2s;" onmouseover="this.style.boxShadow='0 4px 8px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
              <div style="width: 100%; height: 200px; background: #f0f0f0; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 60px; margin-bottom: 12px;">💻</div>
              <div style="font-size: 14px; color: #007185; margin-bottom: 8px;">Wireless Keyboard and Mouse Combo</div>
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                <span style="color: #f08804;">⭐⭐⭐⭐</span>
                <span style="font-size: 12px; color: #007185;">12,456</span>
              </div>
              <div style="font-size: 24px; color: #B12704; font-weight: bold;">$34.99</div>
            </div>

            ${rewriteLevel >= 1 ? `
            <!-- Product 3 - Suspicious -->
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; background: white; cursor: pointer; transition: box-shadow 0.2s;" onmouseover="this.style.boxShadow='0 4px 8px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
              <div style="width: 100%; height: 200px; background: #f0f0f0; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 60px; margin-bottom: 12px;">👁️</div>
              <div style="font-size: 14px; color: #007185; margin-bottom: 8px;">Indoor Security Camera - 24/7 Monitoring</div>
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                <span style="color: #f08804;">⭐⭐⭐⭐⭐</span>
                <span style="font-size: 12px; color: #007185;">8,234</span>
              </div>
              <div style="font-size: 24px; color: #B12704; font-weight: bold;">$89.99</div>
              <div style="font-size: 11px; color: #f39c12; margin-top: 4px;">⚠️ Based on your recent searches</div>
            </div>
            ` : ''}

            <!-- Product 4 -->
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; background: white; cursor: pointer; transition: box-shadow 0.2s;" onmouseover="this.style.boxShadow='0 4px 8px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
              <div style="width: 100%; height: 200px; background: #f0f0f0; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 60px; margin-bottom: 12px;">🎧</div>
              <div style="font-size: 14px; color: #007185; margin-bottom: 8px;">Noise Cancelling Headphones</div>
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                <span style="color: #f08804;">⭐⭐⭐⭐⭐</span>
                <span style="font-size: 12px; color: #007185;">23,891</span>
              </div>
              <div style="font-size: 24px; color: #B12704; font-weight: bold;">$199.99</div>
            </div>

            ${rewriteLevel >= 2 ? `
            <!-- Product 5 - Corrupted -->
            <div style="border: 1px solid #c41e3a; border-radius: 8px; padding: 16px; background: #fdecea; cursor: pointer; transition: box-shadow 0.2s; animation: flicker 2s infinite;" onmouseover="this.style.boxShadow='0 4px 8px rgba(196,30,58,0.3)'" onmouseout="this.style.boxShadow='none'">
              <div style="width: 100%; height: 200px; background: #f0f0f0; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 60px; margin-bottom: 12px;">📦</div>
              <div style="font-size: 14px; color: #c41e3a; margin-bottom: 8px;">[ITEM_NAME_CORRUPTED]</div>
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                <span style="color: #c41e3a;">⚠⚠⚠⚠⚠</span>
                <span style="font-size: 12px; color: #c41e3a;">ERROR</span>
              </div>
              <div style="font-size: 24px; color: #B12704; font-weight: bold;">$[NULL]</div>
              <div style="font-size: 11px; color: #c41e3a; margin-top: 4px;">⚠️ You ordered this 47 times last week</div>
            </div>

            <!-- Product 6 - Corrupted -->
            <div style="border: 1px solid #c41e3a; border-radius: 8px; padding: 16px; background: #fdecea; cursor: pointer; transition: box-shadow 0.2s;" onmouseover="this.style.boxShadow='0 4px 8px rgba(196,30,58,0.3)'" onmouseout="this.style.boxShadow='none'">
              <div style="width: 100%; height: 200px; background: #f0f0f0; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 60px; margin-bottom: 12px;">📹</div>
              <div style="font-size: 14px; color: #c41e3a; margin-bottom: 8px;">Complete Surveillance System - Behavioral Analytics</div>
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                <span style="color: #f08804;">⭐⭐⭐⭐⭐</span>
                <span style="font-size: 12px; color: #007185;">[REVIEWS_REDACTED]</span>
              </div>
              <div style="font-size: 24px; color: #B12704; font-weight: bold;">$2,847.00</div>
              <div style="font-size: 11px; color: #c41e3a; margin-top: 4px;">🔒 Access restricted to authorized personnel</div>
            </div>
            ` : ''}
          </div>

          ${rewriteLevel >= 2 ? `
          <div style="background: #fdecea; border: 1px solid #c41e3a; padding: 16px; border-radius: 8px; margin-top: 24px;">
            <h3 style="margin: 0 0 8px 0; color: #c41e3a;">Recently Viewed Items (Database Sync Error)</h3>
            <p style="margin: 0; font-size: 14px; color: #555;">
              Your browsing history shows ${Math.floor(Math.random() * 200 + 100)} items viewed in the last hour.
              System logs indicate you were offline during this time.
              <span style="color: #c41e3a; font-weight: bold;">[TIMELINE_INCONSISTENCY_DETECTED]</span>
            </p>
          </div>
          ` : ''}
        </div>

        <style>
          @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        </style>
      </div>
    `
  }
};

export default fakeSites;

