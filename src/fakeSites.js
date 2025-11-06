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
  }
};

export default fakeSites;

