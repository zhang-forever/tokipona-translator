const MAX_INPUT_LENGTH = 5000;

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return Response.json({ error: "No text provided." }, { status: 400 });
    }

    const trimmed = text.trim();
    if (trimmed.length === 0) {
      return Response.json({ error: "Text cannot be empty." }, { status: 400 });
    }
    if (trimmed.length > MAX_INPUT_LENGTH) {
      return Response.json(
        { error: `Text exceeds maximum length of ${MAX_INPUT_LENGTH} characters.` },
        { status: 400 },
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "ANTHROPIC_API_KEY is not configured on the server." },
        { status: 500 },
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `Translate the following text into Toki Pona (a constructed language with ~120 words). Simplify radically but preserve the core meaning. Reply ONLY with the translation, no explanation:\n\n${trimmed}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Anthropic API error:", response.status, errBody);
      return Response.json(
        { error: `Upstream API error (${response.status}). Please try again.` },
        { status: 502 },
      );
    }

    const data = await response.json();
    const result = data.content?.[0]?.text;

    if (!result) {
      return Response.json(
        { error: "Received an empty translation from the API." },
        { status: 502 },
      );
    }

    return Response.json({ result });
  } catch (err) {
    console.error("Translation route error:", err);
    return Response.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
