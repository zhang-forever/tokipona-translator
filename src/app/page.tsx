"use client";

import { useState } from "react";

function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputWords = wordCount(input);
  const outputWords = wordCount(output);
  const reduction =
    inputWords > 0 && outputWords > 0
      ? Math.round((1 - outputWords / inputWords) * 100)
      : null;

  const translate = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Translation failed. Please try again.");
        return;
      }

      setOutput(data.result);
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 40, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Toki Pona Translator</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Simplify any text into Toki Pona — a language with only ~120 words. Forces clarity.
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste any text here..."
        style={{
          width: "100%",
          height: 150,
          padding: 16,
          border: "2px solid #e0e0e0",
          borderRadius: 8,
          fontSize: 14,
          fontFamily: "system-ui",
          resize: "vertical",
          marginBottom: 8,
        }}
      />
      <div style={{ fontSize: 12, color: "#999", marginBottom: 16 }}>
        {inputWords} words · {input.length} characters
      </div>

      <button
        onClick={translate}
        disabled={loading || !input.trim()}
        style={{
          padding: "12px 32px",
          background: loading ? "#ccc" : "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: 24,
        }}
      >
        {loading ? "Translating…" : "Translate to Toki Pona"}
      </button>

      {error && (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 8,
            padding: 16,
            marginBottom: 24,
            color: "#991b1b",
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}

      {output && (
        <div style={{ background: "#f8fafc", border: "1px solid #e0e0e0", borderRadius: 8, padding: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 12, color: "#666" }}>
              Original: {inputWords} words
            </span>
            <span style={{ fontSize: 12, color: "#666" }}>
              Toki Pona: {outputWords} words
            </span>
            {reduction !== null && (
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: reduction > 0 ? "#16a34a" : "#ea580c",
                  background: reduction > 0 ? "#f0fdf4" : "#fff7ed",
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                {reduction > 0 ? `${reduction}% shorter` : `${Math.abs(reduction)}% longer`}
              </span>
            )}
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{output}</p>
        </div>
      )}
    </main>
  );
}
