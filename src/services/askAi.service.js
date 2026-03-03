exports.tutorService = async (question, subject = "") => {
  const systemPrompt = `
You are an academic tutor.
Explain clearly, step-by-step.
Subject: ${subject}.
`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
        "X-Title": "AITutor",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
      }),
    }
  );

if (!response.ok) {
  const errorText = await response.text();
  console.log("OpenRouter error:", errorText);
  throw new Error(errorText);
}

  const data = await response.json();
  return data.choices[0].message.content;
};
