# 🎬 Movie Insight Builder

AI-powered movie analysis tool built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

Enter any IMDb movie ID to get detailed movie information and AI-powered audience sentiment analysis.

## Features

- 🔍 **Movie Lookup** — Fetch movie details (poster, cast, rating, plot) via OMDB API
- 📝 **Review Scraping** — Automatically scrapes audience reviews from IMDb
- 🤖 **AI Sentiment Analysis** — GPT-4o-mini analyzes reviews and provides:
  - Overall sentiment classification (Positive / Mixed / Negative)
  - Concise summary of audience opinion
  - Key recurring themes
- 🎨 **Premium UI** — Glass-morphism, gradients, smooth Framer Motion animations
- 📱 **Responsive** — Works on desktop and mobile

## Tech Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Framework | Next.js 15 (App Router)             |
| Language  | TypeScript                          |
| Styling   | Tailwind CSS v4                     |
| Animation | Framer Motion                       |
| AI        | OpenAI SDK (via OpenRouter)         |
| Scraping  | Cheerio                             |
| Validation| Zod                                 |

## Getting Started

### Prerequisites

- Node.js 18+
- An [OMDB API key](https://www.omdbapi.com/apikey.aspx)
- An [OpenRouter API key](https://openrouter.ai/keys)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
OMDB_API_KEY=your_omdb_api_key
OPENAI_API_KEY=your_openrouter_api_key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/movie/[imdbId]/route.ts   # API endpoint (replaces separate backend)
│   ├── globals.css                    # Global styles + Tailwind
│   ├── layout.tsx                     # Root layout with metadata
│   └── page.tsx                       # Main page
├── components/
│   ├── SearchBar.tsx                  # IMDb ID input with validation
│   ├── MovieCard.tsx                  # Movie details display
│   ├── SentimentCard.tsx              # AI sentiment results
│   ├── LoadingSpinner.tsx             # Animated loading state
│   └── ErrorMessage.tsx               # Error display with retry
├── hooks/
│   └── useMovieAnalysis.ts            # Main data-fetching hook
├── lib/
│   ├── omdb.ts                        # OMDB API service
│   ├── reviews.ts                     # IMDb review scraper
│   └── ai.ts                          # AI sentiment analysis
└── types/
    └── index.ts                       # Shared TypeScript interfaces
```

## Usage

1. Enter an IMDb movie ID (e.g., `tt0133093` for The Matrix)
2. Click **Analyze**
3. View movie details and AI-generated sentiment analysis

## License

MIT
