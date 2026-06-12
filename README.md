# Toki Pona Translator

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![AI SDK](https://img.shields.io/badge/AI%20SDK-4-6366f1)](https://sdk.vercel.ai)
[![License](https://img.shields.io/badge/license-MIT-purple)](./LICENSE)

🌍 **Translate complex text into Toki Pona** — a constructed language with only ~120 words. Uses LLM to preserve core meaning while radically simplifying.

## 🎯 Why

"Forced simplicity" reveals what you're actually trying to say. Great for clarifying thinking and writing. When you can only use 120 words, every word matters.

## ✨ Features

- **Real-time streaming** — Watch the translation appear word by word
- **Multi-language input** — English, Chinese, and any other language
- **Word count reduction** — See how much simpler your text becomes
- **Word usage display** — See which Toki Pona words were selected
- **Copy & share** — One-click copy for the simplified version
- **Side-by-side view** — Compare original and translation
- **No account required** — Just paste and translate

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set your Anthropic API key
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local

# Start dev server
npm run dev

# Open http://localhost:3000
```

## 📝 Example

**Original (English):**
> The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet.

**Toki Pona:**
> soweli selo loje li moli e waso selo. ni li kepeken ali pi toki Inli.

**Reduction:** 19 words → 14 words (26% simpler)

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **AI:** Vercel AI SDK + Anthropic Claude
- **Streaming:** Server-sent events for real-time output
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## 📦 Build

```bash
npm run build
# Output in .next/
```

## 🔑 API Key

This app requires an Anthropic API key. Get one at [console.anthropic.com](https://console.anthropic.com).

## 🌐 About Toki Pona

Toki Pona is a minimalist constructed language created by Sonja Lang. With only ~120 words, it forces speakers to express ideas in their most fundamental form. It's excellent for:

- **Clear thinking** — Distill complex ideas to their essence
- **Creative writing** — Constrained writing exercises
- **Language learning** — Understand how language shapes thought
- **Philosophy** — Explore minimalism in communication

## 📄 License

MIT
