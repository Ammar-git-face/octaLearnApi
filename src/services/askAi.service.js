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
    throw new Error("LLM request failed");
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
