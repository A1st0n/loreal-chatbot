# Project 8 – L'Oréal Chatbot: Submission Answers

**1. Project URL:** https://a1st0n.github.io/loreal-chatbot/

**1B. LevelUps completed:**
- Maintain Conversation History – the full `messages` array (system + every user/assistant turn) is sent with each request, so the bot remembers my name and earlier questions.
- Display User Question – a "You asked: …" line above the chat shows the latest question and resets on each new one.
- Chat Conversation UI – distinct bubbles: black right-aligned for me, gold left-aligned for the advisor.

**2. Reflection**
The part that took the most problem-solving was keeping the API key safe. Calling OpenAI straight from `script.js` works in a Codespace, but anyone could read the key in DevTools once the site is public. I moved the call into a Cloudflare Worker that stores the key as a secret and only forwards the messages, then pointed `script.js` at the Worker URL. Getting CORS headers right (including the OPTIONS preflight) was the tricky bit. What surprised me was how much the system prompt shapes the bot: a few clear sentences were enough to keep it on L'Oréal topics and politely turn down unrelated questions, and sending the whole conversation history is all it takes to make it "remember" things.

**3. Networking talking points**
- Built an AI beauty advisor for L'Oréal using vanilla JavaScript and OpenAI's Chat Completions API.
- Secured the API key with a serverless Cloudflare Worker proxy instead of exposing it in front-end code.
- Used prompt engineering to keep the assistant on-brand and on-topic, refusing unrelated requests gracefully.
- Added multi-turn memory and a familiar chat-bubble UI, responsive from phone to desktop.
- Shows I can take an AI model from API call to a safe, deployed, user-facing product.

**4. For a L'Oréal recruiter**
I'd highlight that the chatbot feels like L'Oréal: a black, white and gold palette, elegant serif headings paired with a clean sans-serif, and a warm "Bonjour" greeting. It knows the group's portfolio (L'Oréal Paris, Lancôme, Kérastase, CeraVe, and more) and builds personalized routines by asking about skin or hair type, which mirrors L'Oréal's push into Beauty Tech and personalized beauty. Technically, it shows secure API handling, prompt design for brand safety, and conversation state, all the pieces a real customer-facing beauty assistant needs.
