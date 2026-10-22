# Sumit — Personal Portfolio

A responsive personal portfolio with project search/filter, light/dark mode and an API-powered AI chatbot that answers questions about me and my projects.

**Live website:** YOUR_VERCEL_LIVE_URL
**GitHub:** https://github.com/SumitSingh06

## Sections
Home • About Me • Skills • Projects • Contact Information • AI Chatbot

## Technologies
HTML5, CSS3, JavaScript (vanilla), Vercel Serverless Function (Node.js), Groq API, Git & GitHub, Vercel, Cursor AI

## Features
- Fully personalized, responsive layout (desktop + mobile menu)
- **My Projects** — 5 project cards (title, description, technologies, GitHub link, live link where available)
- **Search & filter** — search by name/technology (e.g. "Python", "Quiz", "Book") plus technology chips
- **Light / dark mode** toggle (remembers your choice)
- **AI chatbot** — answers using my portfolio data; shows a friendly error message if the API fails
- API key is kept secret in a serverless function (`/api/chat`) — never exposed in the source or GitHub

## Projects
1. Python Programs Collection
2. Messy Python Code Improvement
3. Bug Fixing Using Cursor AI
4. Interactive Quiz Application
5. Book Reading List Application

## Project structure
```
portfolio/
├── index.html      # page structure
├── style.css       # styles + themes
├── script.js       # render, search/filter, theme, chatbot UI
├── data.js         # all personal + project data (used by site AND chatbot)
├── api/chat.js     # serverless function that calls the chatbot API
├── assets/         # profile.jpg
└── .env.example
```

## Setup (run locally)
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/portfolio.git
cd portfolio
npm i -g vercel
cp .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 .env      # add your GROQ_API_KEY
vercel dev                # opens http://localhost:3000 (site + /api/chat)
```
(Opening `index.html` directly works for everything except the chatbot.)

## Deploy on Vercel
1. Push this repo to GitHub.
2. Vercel → **Add New Project** → import the repo → Framework preset: **Other**.
3. Settings → **Environment Variables** → add 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 → **Redeploy**.

## Author
Sumit — B.Tech CSE (AI/ML), JECRC University, Jaipur
