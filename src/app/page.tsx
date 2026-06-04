"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const translate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      setOutput(data.result);
    } catch {
      setOutput("Translation failed. Check your API key.");
    }
    setLoading(false);
  };

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 40, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Toki Pona Translator</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Simplify any text into Toki Pona — a language with only ~120 words. Forces clarity.
      </p>

      <textarea value={input} onChange={(e) => setInput(e.target.value)}
        placeholder="Paste any text here..."
        style={{ width: "100%", height: 150, padding: 16, border: "2px solid #e0e0e0", borderRadius: 8, fontSize: 14, fontFamily: "system-ui", resize: "vertical", marginBottom: 16 }} />

      <button onClick={translate} disabled={loading || !input.trim()}
        style={{ padding: "12px 32px", background: loading ? "#ccc" : "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", marginBottom: 24 }}>
        {loading ? "Translating..." : "Translate to Toki Pona"}
      </button>

      {output && (
        <div style={{ background: "#f8fafc", border: "1px solid #e0e0e0", borderRadius: 8, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: "#666" }}>Original: {input.split(/\s+/).length} words</span>
            <span style={{ fontSize: 12, color: "#666" }}>Toki Pona: {output.split(/\s+/).length} words</span>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{output}</p>
        </div>
      )}
    </main>
  );
}
