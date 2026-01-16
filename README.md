# Personal Portfolio

My portfolio site showcasing 10 years of experience as a Technical Program Manager across companies like Dave, Hulu/Disney+, and TrueCar.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **3D Graphics**: React Three Fiber + Three.js
- **Animations**: GSAP with ScrollTrigger
- **Smooth Scrolling**: Lenis
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form

## Design

Brutalist aesthetic with:
- Stark typography and hard shadows
- 3D architectural hero scene with mouse parallax
- Scroll-triggered animations throughout
- High contrast light mode

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

## Structure

```
src/
├── app/           # Next.js app router pages
├── components/    # React components
│   ├── layout/    # Navigation, Footer
│   ├── sections/  # Page sections (Hero, About, etc.)
│   ├── three/     # 3D scene components
│   └── providers/ # Context providers
└── lib/           # Utilities and animation presets
```
