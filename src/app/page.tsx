"use client";

import { useState, useEffect } from "react";

const TOKI_PONA_WORDS: Record<string, string> = {
  "a": "ah, emphasis particle",
  "akesi": "reptile, amphibian, non-cute animal",
  "ala": "no, not, zero",
  "alasa": "hunt, gather, obtain",
  "ale": "all, everything, life, universe",
  "ali": "all, everything, life, universe (variant)",
  "ama": "love",
  "anpa": "down, below, floor, defeat",
  "ante": "different, other, change",
  "anu": "or",
  "awen": "stay, remain, wait, endure",
  "e": "direct object marker",
  "en": "and (linking nouns)",
  "esun": "shop, market, store, trade",
  "ijo": "thing, object, matter, abstract",
  "ike": "bad, negative, wrong, difficult",
  "ilo": "tool, machine, instrument, device",
  "insa": "inside, interior, stomach, center",
  "jaki": "dirty, gross, toxic, unclean",
  "jan": "person, human, being, somebody",
  "jelo": "yellow",
  "jo": "have, contain, hold",
  "kala": "fish, sea creature",
  "kalama": "sound, noise, voice, music",
  "kama": "come, arrive, become",
  "kasi": "plant, herb, vegetation, leaf",
  "ken": "can, able, possible, may",
  "kepeken": "use, with, using, by means of",
  "kijetesantakalu": "rodent, weasel, otter, mustelid",
  "kili": "fruit, vegetable, food from plants",
  "kin": "also, too, even, emphasis",
  "kipisi": "cut, slice, chop",
  "kiwen": "hard, solid, stone, metal, coin",
  "ko": "paste, semi-solid, goo, cream",
  "kon": "air, wind, spirit, essence, soul",
  "ku": "book",
  "kule": "color, paint, dye",
  "kulupu": "group, community, society, team",
  "kute": "hear, listen, ear, obey",
  "la": "context marker",
  "lape": "sleep, rest, nap, dream",
  "laso": "blue, green, teal",
  "lawa": "head, brain, leader, control, rule",
  "len": "clothing, cloth, fabric, garment",
  "lete": "cold, raw, uncooked, winter",
  "li": "predicate marker",
  "lili": "small, few, little, short",
  "linja": "string, rope, thread, chain",
  "lipu": "book, page, document, website",
  "loje": "red, pink",
  "lon": "at, in, on, present, real",
  "luka": "arm, hand, touch, grab",
  "lukin": "see, look, watch, eye, vision",
  "lupa": "hole, door, window, opening",
  "ma": "land, earth, country, place",
  "mama": "parent, mother, father, caretaker",
  "mani": "money, wealth, cash, currency",
  "meli": "woman, wife, female",
  "mi": "I, me, we, us",
  "mije": "man, husband, male",
  "mise": "mixture, mix",
  "mo": "question particle (informal)",
  "moku": "eat, drink, food, meal",
  "moli": "die, dead, death, kill",
  "moni": "money, wealth, valuable",
  "mu": "animal sound (moo, meow, etc.)",
  "mun": "moon, star, night sky, astronomical",
  "musi": "fun, game, art, play, entertainment",
  "mute": "many, much, very, more, quantity",
  "n": "and, nasal sound particle",
  "namako": "spice, flavor, decoration",
  "nanpa": "number, math, count, ordinal marker",
  "nasa": "strange, crazy, weird, drunk, silly",
  "nasin": "way, road, path, method, doctrine",
  "nena": "hill, mountain, bump, nose",
  "ni": "this, that, it",
  "nimi": "word, name, term",
  "no": "no (emphatic)",
  "noka": "foot, leg, bottom, floor",
  "o": "vocative, imperative marker",
  "oko": "eye",
  "olin": "love (romantic), dear",
  "ona": "he, she, it, they",
  "open": "open, begin, start",
  "pakala": "break, damage, destroy, mistake",
  "pali": "do, work, act, make, create",
  "palisa": "stick, rod, branch, long hard thing",
  "pan": "grain, cereal, bread, pasta, rice",
  "pana": "give, send, share, release",
  "pi": "of, about, particle for grouping",
  "pilin": "feel, heart, emotion, sense",
  "pimeja": "brown, black, dark",
  "pini": "finish, past, ago, done",
  "pipi": "bug, insect, spider, pest",
  "poka": "side, near, hip, beside",
  "poki": "container, box, bowl, cup, pot",
  "pu": "official, canon, canonical",
  "sama": "same, similar, equal, like, as",
  "seli": "fire, heat, hot, warm, cook",
  "selo": "outer, surface, shell, skin, bark",
  "seme": "what, which, why (question word)",
  "sewi": "up, above, top, sky, divine",
  "sijelo": "body, physical state, torso",
  "sike": "circle, wheel, ball, year, round",
  "sin": "new, another, extra, additional",
  "sina": "you",
  "sinpin": "front, face, chest, wall, foreground",
  "sitelen": "draw, picture, image, writing",
  "so": "social media particle",
  "soko": "mushroom, fungus",
  "sona": "know, knowledge, information, wise",
  "soweli": "animal, beast, pet, furry creature",
  "suli": "big, important, tall, long, adult",
  "suno": "sun, light, shine, day",
  "supa": "surface, table, platform, floor",
  "suwi": "sweet, candy, dessert, cute, fragrant",
  "tan": "from, because, cause, origin",
  "taso": "but, however, only, just",
  "tawa": "go, move, travel, walk, to, for",
  "tenpo": "time, moment, period, occasion",
  "toki": "talk, speak, language, word",
  "tomo": "house, building, room, home, shelter",
  "tosi": "logic, logic-related concept",
  "tu": "two, pair, divide, cut",
  "u": "interaction particle",
  "unpa": "sex, intimate, erogenous",
  "uta": "mouth, lip, lips, kiss",
  "utala": "fight, battle, struggle, compete",
  "wa": "wow, amazement particle",
  "walo": "white, pale, light-colored",
  "wan": "one, unite, together, sole, unique",
  "waso": "bird, winged creature",
  "weka": "absent, away, far, remove, ignore",
  "we": "we (inclusive variant)",
  "wile": "want, need, must, will, desire",
};

function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

interface HistoryEntry {
  id: number;
  input: string;
  output: string;
  direction: "en-tp" | "tp-en";
  timestamp: number;
}

function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("tokipona-history");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: HistoryEntry[]) {
  try {
    localStorage.setItem("tokipona-history", JSON.stringify(history));
  } catch {}
}

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [direction, setDirection] = useState<"en-tp" | "tp-en">("en-tp");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [dictFilter, setDictFilter] = useState("");

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

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
        body: JSON.stringify({ text: trimmed, direction }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Translation failed. Please try again.");
        return;
      }

      setOutput(data.result);

      // Save to history
      const entry: HistoryEntry = {
        id: Date.now(),
        input: trimmed,
        output: data.result,
        direction,
        timestamp: Date.now(),
      };
      const updated = [entry, ...history].slice(0, 50);
      setHistory(updated);
      saveHistory(updated);
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  const filteredDict = Object.entries(TOKI_PONA_WORDS).filter(
    ([word, def]) =>
      word.includes(dictFilter.toLowerCase()) ||
      def.toLowerCase().includes(dictFilter.toLowerCase())
  );

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: "8px 16px",
    background: active ? "#2563eb" : "#e5e7eb",
    color: active ? "#fff" : "#374151",
    border: "none",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  });

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 40, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Toki Pona Translator</h1>
      <p style={{ color: "#666", marginBottom: 16 }}>
        Simplify any text into Toki Pona — a language with only ~120 words. Forces clarity.
      </p>

      {/* Direction toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setDirection("en-tp")} style={btnStyle(direction === "en-tp")}>
          English → Toki Pona
        </button>
        <button onClick={() => setDirection("tp-en")} style={btnStyle(direction === "tp-en")}>
          Toki Pona → English
        </button>
        <button onClick={() => setShowHistory(!showHistory)} style={btnStyle(showHistory)}>
          📋 History ({history.length})
        </button>
        <button onClick={() => setShowDictionary(!showDictionary)} style={btnStyle(showDictionary)}>
          📖 Dictionary
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          direction === "en-tp"
            ? "Paste any text here..."
            : "Paste Toki Pona text here..."
        }
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
        {loading
          ? "Translating…"
          : direction === "en-tp"
          ? "Translate to Toki Pona"
          : "Translate to English"}
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
        <div style={{ background: "#f8fafc", border: "1px solid #e0e0e0", borderRadius: 8, padding: 20, marginBottom: 24 }}>
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
              Input: {inputWords} words
            </span>
            <span style={{ fontSize: 12, color: "#666" }}>
              Output: {outputWords} words
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

      {/* History Panel */}
      {showHistory && (
        <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: 20, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Translation History</h2>
            {history.length > 0 && (
              <button onClick={clearHistory} style={{ fontSize: 12, color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}>
                Clear all
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p style={{ color: "#999", fontSize: 14 }}>No translations yet.</p>
          ) : (
            history.map((entry) => (
              <div
                key={entry.id}
                style={{
                  borderBottom: "1px solid #f0f0f0",
                  padding: "12px 0",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setInput(entry.input);
                  setDirection(entry.direction);
                  setOutput(entry.output);
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: "#999", fontWeight: 600 }}>
                    {entry.direction === "en-tp" ? "EN → TP" : "TP → EN"}
                  </span>
                  <span style={{ fontSize: 11, color: "#999" }}>
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </div>
                <p style={{ fontSize: 13, margin: 0, color: "#555" }}>
                  <strong style={{ color: "#333" }}>{entry.input.slice(0, 60)}{entry.input.length > 60 ? "…" : ""}</strong>
                  {" → "}
                  <em>{entry.output.slice(0, 60)}{entry.output.length > 60 ? "…" : ""}</em>
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Dictionary Panel */}
      {showDictionary && (
        <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>📖 Toki Pona Dictionary ({filteredDict.length} words)</h2>
          <input
            value={dictFilter}
            onChange={(e) => setDictFilter(e.target.value)}
            placeholder="Filter words..."
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: 6,
              fontSize: 14,
              marginBottom: 12,
              boxSizing: "border-box",
            }}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
            {filteredDict.map(([word, def]) => (
              <div
                key={word}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
                onClick={() => setInput((prev) => (prev ? prev + " " + word : word))}
              >
                <div style={{ fontWeight: 700, fontSize: 14, color: "#2563eb" }}>{word}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{def}</div>
              </div>
            ))}
          </div>
          {filteredDict.length === 0 && (
            <p style={{ color: "#999", fontSize: 14 }}>No words match your filter.</p>
          )}
        </div>
      )}
    </main>
  );
}
