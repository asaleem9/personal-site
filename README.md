# Personal Portfolio

My portfolio site showcasing 10 years of experience as a Technical Program Manager across companies like Dave, Hulu/Disney+, and TrueCar.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **3D Graphics**: React Three Fiber + Three.js
- **Animations**: GSAP with ScrollTrigger
- **Smooth Scrolling**: Lenis
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form
- **Email**: Resend

## Design

Brutalist aesthetic with:
- Stark typography and hard shadows
- 3D architectural hero scene with mouse parallax
- Scroll-triggered animations throughout
- High contrast light mode

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Required for contact form
RESEND_API_KEY=re_xxxxxxxxx
```

Get your Resend API key at https://resend.com/api-keys

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm run start
```

## Deployment

- **Platform**: Vercel
- **Production URL**: https://www.alisaleem.cloud
- **Auto-deploy**: Pushes to `main` branch trigger automatic deployments

### Environment Variables in Vercel

Set `RESEND_API_KEY` in Vercel project settings for the contact form to work.

## Privacy

This site is intentionally configured to be invisible to search engines:
- `robots.txt` blocks all crawlers
- Meta tags set to `noindex, nofollow`
- `X-Robots-Tag` HTTP header on all routes

The site is only accessible via direct link.

## Structure

```
src/
├── app/              # Next.js app router pages
│   └── api/          # API routes (contact, github, medium)
├── components/       # React components
│   ├── layout/       # Navigation, Footer
│   ├── sections/     # Page sections (Hero, About, etc.)
│   ├── three/        # 3D scene components
│   └── providers/    # Context providers (smooth scroll)
└── lib/              # Utilities and animation presets
```

## API Routes

- `/api/contact` - Contact form submission (sends email via Resend)
- `/api/github` - Fetches public repos from GitHub (cached 1 hour)
- `/api/medium` - Parses Medium RSS feed for blog posts (cached 1 hour)
