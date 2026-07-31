// services/askAi.service.js
require('dotenv').config();

const OPENROUTER_KEY = process.env.OPENROUTER_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";
const FALLBACK_MARKDOWN = "## Response unavailable\n\nI couldn't generate a response at the moment. Please try again shortly.";

const normalizeMarkdownContent = (content) => {
  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part.trim();
        if (part && typeof part === "object") {
          if (typeof part.text === "string") return part.text.trim();
          if (typeof part.content === "string") return part.content.trim();
        }
        return "";
      })
      .filter(Boolean)
      .join("\n\n")
      .trim();
  }

  if (content && typeof content === "object") {
    if (typeof content.text === "string") return content.text.trim();
    if (typeof content.content === "string") return content.content.trim();
  }

  return "";
};

exports.tutorService = async (question, subject = "") => {
  if (!OPENROUTER_KEY) {
    throw new Error("OpenRouter API key is missing! Check your .env file.");
  }

  const systemPrompt = `
You are an academic tutor.
Explain clearly, step-by-step.
Subject: ${subject}.
Always respond using clean Markdown only:
- Use ## for section headings
- Use **bold** for key terms
- Use bullet points or numbered lists for steps
- Separate sections with blank lines for readability
- Do not include HTML tags or extra commentary outside the answer
`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "AITutor"
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        temperature: 0.3,
        max_tokens: 800,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", errorText);
      return FALLBACK_MARKDOWN;
    }

    const data = await response.json();
    const answer = normalizeMarkdownContent(data?.choices?.[0]?.message?.content);

    if (!answer) {
      return FALLBACK_MARKDOWN;
    }

    return answer;
  } catch (error) {
    console.error("OpenRouter request failed:", error.message);
    return FALLBACK_MARKDOWN;
  }
};