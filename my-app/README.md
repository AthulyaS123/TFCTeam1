# Drift — Leave your debt in the dust

A React + TypeScript onboarding app for student loan payoff strategy.

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** for bundling & dev server
- **DM Sans** + **DM Serif Display** (Google Fonts)
- No external UI library — custom CSS

## Project Structure

```
src/
├── api/
│   └── drift.ts          # API layer (stubbed, ready to wire up to backend)
├── assets/               # Static assets (images, icons)
├── cleardebt/
│   ├── OnboardingFlow.tsx # Orchestrates all 6 onboarding questions
│   ├── QuestionCard.tsx   # Single question screen
│   ├── ResultScreen.tsx   # Personalized strategy result
│   ├── PlanCard.tsx       # Reusable plan comparison card
│   └── ProgressBar.tsx    # Animated step progress indicator
├── lib/
│   ├── types.ts           # Shared TypeScript types
│   ├── questions.ts       # Question definitions (text + options)
│   ├── planCalculator.ts  # Debt strategy calculation logic
│   ├── hooks.ts           # Custom React hooks
│   └── utils.ts           # Shared utility functions
├── App.tsx                # Root component + screen routing
├── Home.tsx               # Welcome / landing screen
├── SignIn.tsx             # Sign in screen
├── index.css              # All styles (Drift design system)
├── main.tsx               # React entry point
└── vite-env.d.ts
```

## Onboarding Questions

1. Are you currently pursuing your degree?
2. Do you have student loans?
3. Are you actively making payments?
4. How much do you owe? (ranges)
5. Do you know your interest rates?
6. How are you currently handling your loans?

Ends with an **instant personalized result screen** — current plan vs Drift's optimized plan, with interest saved and years saved.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

```bash
npm run build
npm run preview
```

## Wiring Up a Real Backend

The `src/api/drift.ts` file contains stub functions that simulate network calls. Replace the bodies of `fetchStrategy`, `signIn`, and `signUp` with real `fetch()` calls to your backend endpoints.

## Design System

| Token | Value |
|---|---|
| Primary font | DM Sans |
| Display font | DM Serif Display |
| Button rounding | 20px |
| Brand yellow | `#f5f2a8` |
| Dark | `#1a1a1a` |
| Accent green | `#a8d88a` |
