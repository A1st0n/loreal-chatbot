// Cloudflare Worker: paste into the Worker editor, then add OPENAI_API_KEY
// under Settings → Variables and Secrets (type: Secret).
export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    const { messages } = await request.json();
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: "gpt-4o", messages, max_completion_tokens: 400 }),
    });

    return new Response(await response.text(), { status: response.status, headers: corsHeaders });
  },
};
