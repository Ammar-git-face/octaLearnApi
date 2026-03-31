// services/askAi.service.js
require('dotenv').config();

const OPENROUTER_KEY = process.env.OPENROUTER_KEY;

if (!OPENROUTER_KEY) {
  throw new Error("OpenRouter API key is missing! Check your .env file.");
}

exports.tutorService = async (question, subject = "") => {
  const systemPrompt = `
You are an academic tutor.
Explain clearly, step-by-step.
Subject: ${subject}.
`;
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_KEY}`,
      "Content-Type": "application/json",
      "X-Title": "AITutor"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log("OpenRouter error:", errorText);
    throw new Error(errorText);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};