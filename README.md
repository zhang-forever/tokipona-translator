# Toki Pona Translator

Translate complex text into Toki Pona — a constructed language with only ~120 words. Uses LLM to preserve core meaning while radically simplifying.

## Why
"Forced simplicity" reveals what you're actually trying to say. Great for clarifying thinking and writing.

## Tech
- Next.js + AI SDK
- Anthropic Claude (or any LLM provider)
- Streaming text output
- Side-by-side original vs. simplified view

## Features (MVP)
- Paste any text (English, Chinese, etc.)
- Real-time streaming translation
- Display word count reduction
- Show which Toki Pona words were used
- Copy / share simplified version

## Dev
```bash
npm install
# Set ANTHROPIC_API_KEY in .env.local
npm run dev
```
