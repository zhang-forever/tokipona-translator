export async function POST(req: Request) {
  const { text } = await req.json();
  if (!text) return Response.json({ error: "No text" }, { status: 400 });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: `Translate the following text into Toki Pona (a constructed language with ~120 words). Simplify radically but preserve the core meaning. Reply ONLY with the translation, no explanation:\n\n${text}`,
      }],
    }),
  });

  const data = await response.json();
  const result = data.content?.[0]?.text || "Translation unavailable.";
  return Response.json({ result });
}
