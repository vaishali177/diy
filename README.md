# Loom & Craft

A digital sanctuary for soft toy and plushie crafters. Loom & Craft provides interactive pattern calculators, step-by-step tutorials, and a curated resource hub to help creators of all skill levels bring their plushie ideas to life.

## Features

- **Pattern Calculators** — Interactive tools for calculating exact fabric yardage and cut piece dimensions for plushie patterns (Teddy Bear, Bunny, Fish, and more). Outputs a printable PDF pattern layout.
- **Tutorial Guides** — Step-by-step cutting guides and beginner-friendly articles on topics like fabric selection, sewing curves, and more.
- **Saved Projects** *(coming soon)* — Log in with Google or email to save your calculations and bookmark tutorials.
- **Printable Patterns** — Download scaled vector PDFs formatted for A4 or US Letter paper.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with a custom Material You–inspired dark design system
- **Auth & Database**: [Supabase](https://supabase.com) (Auth + Postgres)
- **PDF Generation**: Custom SVG-to-PDF pipeline via `jspdf`

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (for auth features)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/loom-and-craft.git
cd loom-and-craft/frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Fill in your Supabase URL and anon key
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── login/              # Auth pages
│   ├── pattern-calculator/ # Calculator catalog + individual calculators
│   └── profile/            # User profile page
├── components/
│   ├── calculators/        # TeddyBearCalculator, BunnyCalculator, FishCalculator
│   ├── Header.tsx
│   └── ProfileMenu.tsx
└── utils/
    ├── pdfGenerator.ts     # SVG-to-PDF generation logic
    └── supabase/           # Supabase client helpers
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

## License

MIT
