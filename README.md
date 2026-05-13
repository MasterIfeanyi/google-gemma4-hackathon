# Buddy — Talk to Anyone

Have real conversations with the world's most iconic figures — athletes, billionaires, historical legends, and visionaries — powered by Google's Gemma 4 AI model.

**Live Demo:** [ifeanyi-buddy.netlify.app](https://ifeanyi-buddy.netlify.app)

---

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Google Gemma 4** via OpenRouter
- **Wikipedia REST API** — name resolution & portrait fetching
- **Netlify** — deployment

---

## Getting Started

### Prerequisites

- Node.js 18+
- An [OpenRouter](https://openrouter.ai) API key (free tier works)

### Installation

```bash
git clone https://github.com/your-username/buddy.git
cd buddy
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Creator

Built by **Ifeanyi**