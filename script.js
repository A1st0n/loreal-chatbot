// Paste your deployed Cloudflare Worker URL here
const WORKER_URL = "https://loreal-chatbot.scratch-2026-11-13-9db2c2.workers.dev/";

const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const sendBtn = document.getElementById("sendBtn");
const latestQuestion = document.getElementById("latestQuestion");

const SYSTEM_PROMPT = `You are L'Oréal's Smart Product Advisor, a friendly and polished beauty expert.
Only help with L'Oréal and its brands (e.g. L'Oréal Paris, Lancôme, Maybelline, Garnier, Kérastase, CeraVe, La Roche-Posay, Kiehl's, NYX, YSL Beauty): makeup, skincare, haircare, fragrance, routines, and beauty tips.
Give personalized recommendations and step-by-step routines when asked. Ask a short follow-up question if you need skin type, hair type, or preferences.
If the user asks about anything unrelated to beauty or L'Oréal products, politely decline and steer back, e.g. "I'm here to help with L'Oréal products and beauty routines — what can I help you find today?"
Remember details the user shares, like their name and earlier questions. Keep answers concise and use plain text (no markdown).`;

// Conversation history (LevelUp: multi-turn context)
const messages = [{ role: "system", content: SYSTEM_PROMPT }];

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = `msg ${who}`;
  div.textContent = text; // textContent, never innerHTML: model output is untrusted
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return div;
}

addMessage("👋 Bonjour! Ask me about L'Oréal makeup, skincare, haircare, or fragrance — I can build you a routine too.", "ai");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = userInput.value.trim();
  if (!question) return;

  // LevelUp: show latest question above the response, reset each time
  latestQuestion.hidden = false;
  latestQuestion.innerHTML = "<strong>You asked:</strong> ";
  latestQuestion.append(question);

  addMessage(question, "user");
  messages.push({ role: "user", content: question });
  userInput.value = "";
  sendBtn.disabled = true;
  const thinking = addMessage("Thinking…", "ai loading");

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const reply = data.choices[0].message.content;
    messages.push({ role: "assistant", content: reply });
    thinking.className = "msg ai";
    thinking.textContent = reply;
  } catch (err) {
    console.error(err);
    messages.pop(); // drop the unanswered question so history stays consistent
    thinking.className = "msg ai";
    thinking.textContent = "Sorry, something went wrong. Please try again.";
  } finally {
    sendBtn.disabled = false;
    userInput.focus();
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
});
