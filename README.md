# Kimi Haul

A modern moving and truck rental platform built with Next.js, Supabase, and Tailwind CSS.

## Features

- **User Authentication** - Email/password and OAuth (Google, GitHub) via Supabase Auth
- **Truck Fleet** - Browse and filter available trucks by size, location, and price
- **Booking System** - Book trucks with real-time price estimation
- **Dashboard** - Analytics, fleet management, and booking history
- **Dark Mode** - Full dark/light mode support
- **Responsive Design** - Works on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI, Lucide Icons
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Deployment**: Vercel

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/kimi-haul.git
cd kimi-haul
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Get your Supabase credentials from your [Supabase Dashboard](https://app.supabase.com):
- `NEXT_PUBLIC_SUPABASE_URL` - Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anonymous/public key

### 4. Set up the database

Run the migration file in your Supabase SQL Editor:

```sql
-- Run the contents of supabase/migrations/001_initial_schema.sql
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 6. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Connect your GitHub repository to Vercel for automatic deployments on push.

## Project Structure

```
kimi-haul/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Auth group (login, register)
│   ├── (dashboard)/        # Dashboard group
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── navbar.tsx          # Navigation
│   ├── footer.tsx          # Footer
│   └── theme-toggle.tsx    # Dark mode toggle
├── lib/                    # Utility functions
│   ├── utils.ts            # cn() helper
│   └── supabase.ts         # Supabase client
├── types/                  # TypeScript types
├── supabase/               # Database migrations
└── public/                 # Static assets
```

## Database Schema

### Tables
- **profiles** - User profiles (extends auth.users)
- **trucks** - Fleet vehicles with pricing and availability
- **bookings** - Move bookings with status tracking
- **reviews** - Customer reviews and ratings

## Authentication

The app uses Supabase Auth with:
- Email/password authentication
- OAuth providers (Google, GitHub)
- Row Level Security (RLS) policies for data protection

## API Routes

- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - List user bookings
- `GET /api/trucks` - List available trucks

## License

MIT License - feel free to use this for your own projects!
