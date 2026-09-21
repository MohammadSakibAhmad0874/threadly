<div align="center">

# 🧵 THREADLY

### *Your Perfect Fit, Without Leaving Home*

**An On-Demand Bespoke Tailoring Platform — SDE Intern Assessment MVP**

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://aistudio.google.com/)

[🚀 Live Demo](https://threadly-ashy.vercel.app) · [📋 Features](#-features) · [🛠 Setup](#-local-development) · [🗄 Database](#-database-schema)

</div>

---

## 📌 About

**THREADLY** is a full-stack on-demand tailoring platform built for the OpenEnv SDE Internship Assignment. Customers can book a doorstep tailor visit, get measured at home, hand over their fabric, and track their order from "Booked" to "Delivered" — all from a mobile-first web interface.

> **Assignment requirements addressed:**
> - ✅ Booking flow with home measurement scheduling
> - ✅ Fabric handover tracking
> - ✅ Real-time order tracking (Live Stitch™ tracker)
> - ✅ Order detail view
> - ✅ Profile & saved addresses
> - ✅ AI feature (Gemini-powered style advisor with curated fallback)
> - ✅ Supabase PostgreSQL backend

---

## ✨ Features

### 🛍 Multi-Step Booking Wizard
6-step guided flow:
1. Garment selection (Shirt, Suit, Trousers, Kurta, Blouse, Dress)
2. Customisation (fit, collar, cuffs, pockets, monogram)
3. Measurement method (Doorstep Tailor / Video Call / Self-Measure)
4. Fabric choice (Provide Own / Browse Our Collection)
5. Scheduling (date + time slot picker)
6. Review & Confirm with live pricing

### 📦 Order Management (Backend-Powered)
- Orders persisted to **Supabase PostgreSQL**
- Optimistic local cache via **Zustand + localStorage** for instant UI
- `/orders/[id]` — full order detail with timeline
- `/dashboard` — all orders with status badges
- **Live Stitch™ Tracker** — step-by-step real-time status simulator

### 🤖 AI Style Advisor
- Powered by **Google Gemini 2.0 Flash** with structured JSON output
- Recommends fabric, fit profile, colour palette, and styling tips
- Full **curated fallback library** (6 garment types) — works without an API key
- `/ai` — interactive advisor page

### 👤 Profile & Addresses
- Saved measurement profile (14 anatomical points)
- Multiple saved addresses with default selection
- Profile synced to Supabase via `/api/profile`

### 💰 Live Pricing Calculator
- Interactive pricing on the landing page
- Factors: garment base fee + express surcharge + monogram fee + fabric cost

---

## 🛠 Local Development

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier)
- Optional: [Gemini API key](https://aistudio.google.com/app/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/MohammadSakibAhmad0874/threadly.git
cd threadly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GEMINI_API_KEY=your-gemini-key   # optional
```

### 4. Set up the database

1. Open your Supabase project → **SQL Editor**
2. Paste and run: [`supabase/migrations/001_initial_schema.sql`](./supabase/migrations/001_initial_schema.sql)

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗄 Database Schema

### `orders` table

| Column | Type | Description |
|---|---|---|
| `id` | `text PK` | Order ID (e.g. `THR-2026-XXXX`) |
| `user_id` | `text` | Phone number as anonymous user key |
| `garment_type` | `text` | shirt / suit / trousers / kurta / blouse / dress |
| `status` | `text` | ORDER_PLACED → BOOKED → ... → DELIVERED |
| `pickup_date` | `date` | Measurement appointment date |
| `address` | `jsonb` | Delivery address object |
| `measurements` | `jsonb` | Customisation details |
| `fabric` | `jsonb` | Fabric selection |
| `price` | `integer` | Amount in paise (INR × 100) |
| `timeline` | `jsonb` | Array of status events |

### `profiles` table

| Column | Type | Description |
|---|---|---|
| `phone` | `text PK` | User's phone number |
| `name` | `text` | Display name |
| `email` | `text` | Email address |
| `addresses` | `jsonb` | Array of saved addresses |

---

## 🔌 API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/orders` | Fetch all orders for user (header: `x-user-phone`) |
| `POST` | `/api/orders` | Create new order |
| `GET` | `/api/orders/[id]` | Fetch single order by ID |
| `PATCH` | `/api/orders/[id]` | Update order status |
| `GET` | `/api/profile` | Fetch user profile |
| `POST` | `/api/profile` | Upsert user profile |
| `POST` | `/api/ai/style` | Get AI style recommendation |

---

## 📁 Project Structure

```
threadly/
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── page.tsx           # Landing page (/)
│   │   ├── book/              # Booking wizard
│   │   ├── dashboard/         # Orders dashboard
│   │   ├── orders/            # Order tracking
│   │   ├── ai/                # AI Style Advisor
│   │   ├── profile/           # User profile
│   │   └── api/               # API routes
│   │       ├── orders/        # Order CRUD
│   │       ├── profile/       # Profile sync
│   │       └── ai/style/      # Gemini integration
│   ├── components/            # Reusable UI components
│   │   ├── layout/            # Navbar, Footer, BottomNav
│   │   ├── booking/           # 6-step wizard steps
│   │   └── landing/           # Landing page sections
│   ├── lib/
│   │   ├── supabase.ts        # Supabase client factory
│   │   ├── aiService.ts       # Gemini + curated fallback
│   │   └── orderUtils.ts      # Pricing, ETA, timeline logic
│   ├── store/                 # Zustand state management
│   │   ├── ordersStore.ts     # Orders + DB sync
│   │   ├── userStore.ts       # Profile + DB sync
│   │   └── bookingStore.ts    # Booking wizard state
│   └── types/                 # TypeScript interfaces
├── supabase/
│   └── migrations/            # SQL migration files
└── .env.local.example         # Environment variable template
```

---

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MohammadSakibAhmad0874/threadly)

1. Click the button above, or import from GitHub at [vercel.com/new](https://vercel.com/new)
2. Add environment variables in the Vercel dashboard
3. Deploy!

---

## 🧪 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **State** | Zustand + localStorage (optimistic cache) |
| **Database** | Supabase (PostgreSQL) |
| **AI** | Google Gemini 2.0 Flash |
| **Deployment** | Vercel |

---

## 📝 Product Thinking

**Problem:** India's urban tailoring market is fragmented — good tailors exist but are hard to discover, book, or trust without in-person visits. Customers lose fabric, can't track progress, and get no standardised quality guarantee.

**Solution:** THREADLY acts as a managed marketplace that:
- Brings the tailor *to you* (doorstep measurement)
- Provides RFID-tagged fabric handover with digital chain-of-custody
- Gives end-to-end order visibility with the Live Stitch™ tracker
- Uses AI to help customers who don't know what to order

**Key UX decisions:**
- Mobile-first layout with bottom navigation (dominant usage pattern in India)
- Step-by-step wizard prevents form overwhelm
- Optimistic UI updates — no loading spinners on order creation
- Curated AI fallbacks ensure the AI advisor always works, even offline

---

## 👨‍💻 Author

**Mohammad Sakib Ahmad**
SDE Intern Assessment — OpenEnv
[GitHub](https://github.com/MohammadSakibAhmad0874)

---

<div align="center">
Built with ❤️ for the OpenEnv SDE Internship Assessment
</div>
