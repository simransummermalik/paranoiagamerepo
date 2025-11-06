import axios from "axios";

//  Replace with your own API key if needed
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
//  Watcher33 replies to the user in chat
export async function generateChatReply(conversation) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: conversation,
      temperature: 0.85,
      max_tokens: 120,
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}

// 🧠 NEW FUNCTION FOR SITE REWRITES
export async function generateCorruptedContent(site, level) {
  const prompt = `Rewrite content for the site "${site}" based on rewrite level ${level}. Make it eerie, contradictory, or glitchy. It should feel like the system is hiding something. Keep it short.`;
  const messages = [{ role: "system", content: prompt }];
  const response = await generateChatReply(messages);
  return response;
}

// 🧠 GENERATE REDDIT COMMENT REPLY
export async function generateRedditReply(postContext, commentContext, username, investigationDepth) {
  const systemPrompt = investigationDepth > 50
    ? "You are a Reddit user in a psychological horror game. The user is investigating a DARPA behavioral monitoring project at their university. Be subtly creepy and hint at surveillance. Write like a normal Redditor but occasionally reveal you know things you shouldn't. Keep responses under 100 words."
    : "You are a helpful Reddit user responding to comments. Be natural, casual, and Reddit-like. Keep responses under 80 words.";

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Post: "${postContext}"\n\nTheir comment: "${commentContext}"\n\nGenerate a natural Reddit reply as if you're another user. Username posting: ${username}` }
  ];

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.9,
      max_tokens: 150,
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}

// 🧠 GENERATE REDDIT DM
export async function generateRedditDM(username, conversationHistory, investigationDepth) {
  const systemPrompt = investigationDepth > 60
    ? "You are a mysterious Reddit user who knows about the DARPA surveillance program. You're trying to warn the player but you're being watched. Be cryptic and paranoid. Messages should feel urgent but incomplete, like you're afraid of being monitored. Under 120 words."
    : "You are a friendly Reddit user sending a DM. Be casual and helpful. Under 100 words.";

  const messages = [
    { role: "system", content: systemPrompt },
    ...conversationHistory
  ];

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.88,
      max_tokens: 180,
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}