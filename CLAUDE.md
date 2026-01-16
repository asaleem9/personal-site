# CLAUDE.md - Project Guide for Claude Code

## Project Overview

This is a personal portfolio website for a Technical Program Manager with 10 years of software engineering experience. The site showcases both TPM career work and demonstrates advanced frontend development skills through a brutalist design aesthetic, 3D hero scene, and rich scroll-based animations.

## Commands

```bash
# Development
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 16 (App Router) | React framework with server components |
| Language | TypeScript | Type safety |
| 3D Graphics | React Three Fiber + Three.js | Architectural hero scene |
| Animations | GSAP + ScrollTrigger | Scroll-based animations |
| Smooth Scroll | Lenis | Silky-smooth scrolling (integrated with GSAP ticker) |
| Styling | Tailwind CSS v4 | CSS-based config with `@theme` blocks |
| Forms | React Hook Form | Contact form validation |

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, SmoothScrollProvider
│   ├── page.tsx            # Main single-page composition
│   ├── globals.css         # Design tokens & brutalist component styles
│   └── api/contact/route.ts # Contact form API endpoint
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx  # Fixed nav with section links
│   │   └── Footer.tsx      # Brutalist footer
│   ├── sections/
│   │   ├── Hero/Hero.tsx   # Hero with 3D background
│   │   ├── About.tsx       # Introduction & stats
│   │   ├── Expertise.tsx   # Skills grid
│   │   ├── Experience/Experience.tsx  # Narrative scroll career chapters
│   │   ├── Work.tsx        # Case studies
│   │   ├── Philosophy.tsx  # Approach/values
│   │   └── Contact/Contact.tsx # Contact form
│   ├── three/
│   │   └── BrutalistScene.tsx # 3D architectural scene
│   └── providers/
│       └── SmoothScrollProvider.tsx # Lenis smooth scroll context
└── lib/
    └── animations.ts       # GSAP animation presets
```

## Design System

### Color Palette (defined in globals.css)
- `--color-concrete`: #F5F5F0 (light background)
- `--color-ink`: #0A0A0A (primary text)
- `--color-accent-red`: #FF3D00 (brutalist accent)
- `--color-accent-blue`: #0066FF (secondary accent)
- `--color-muted`: #8A8A8A (secondary text)

### Key CSS Classes
- `.btn-brutal` - Chunky brutalist button with hard shadow
- `.btn-brutal--outline` - Outline variant
- `.card-brutal` - Card with thick border and offset shadow
- `.input-brutal` - Form input with thick border
- `.heading-xl/lg/md` - Typography scale
- `.body-lg/md` - Body text scale
- `.section-padding` - Consistent section spacing

### Design Aesthetic
- **Brutalist/Raw**: Exposed grid lines, stark typography, asymmetric layouts
- **Light mode primary**: Off-white backgrounds with high contrast
- **Monospace accents**: JetBrains Mono for tags and labels
- **Hard shadows**: No soft gradients, chunky 4px offset shadows

## Key Patterns

### 3D Scene (BrutalistScene.tsx)
- Uses `@react-three/fiber` Canvas with `@react-three/drei` helpers
- Mouse-follow camera rig for parallax effect
- Dynamic import with `ssr: false` to avoid SSR issues
- Architectural forms: concrete blocks, L-shapes, grid structures

### Scroll Animations
- GSAP ScrollTrigger for scroll-based reveals
- Common pattern: `gsap.fromTo()` with `scrollTrigger` config
- Register plugin: `gsap.registerPlugin(ScrollTrigger)` (only on client)
- Always clean up with `ctx.revert()` in useEffect return

### Smooth Scrolling
- Lenis instance created in SmoothScrollProvider
- Integrated with GSAP ticker for smooth ScrollTrigger sync
- Access via `useLenis()` hook if needed

## Content Placeholders

The following sections contain placeholder content to be replaced:
- `Experience.tsx`: Career chapters array (period, role, company, description, metrics)
- `Work.tsx`: Case studies array (title, description, tags, metrics)
- `About.tsx`: Bio text and stats
- `Hero.tsx`: Name/title/tagline

## Common Tasks

### Adding a new section
1. Create component in `src/components/sections/`
2. Import and add to `src/app/page.tsx`
3. Add nav link in `Navigation.tsx` if needed

### Modifying design tokens
Edit `src/app/globals.css` - look for `@theme` block at top

### Adjusting scroll animations
- Animation presets in `src/lib/animations.ts`
- Per-section animations defined in each section's useEffect

## Known Quirks

- **Next.js lock file**: If dev server crashes, may need to delete `.next/dev/lock`
- **Lenis package**: Use `lenis` not `@studio-freight/lenis` (deprecated)
- **3D performance**: Scene complexity may need reduction on mobile
- **Turbopack cache**: "Persisting failed" warnings in dev are harmless
- Resume: Ali Saleem Santa Monica, CA | 818-451-3942 | alisaleem4412@gmail.com
S T R E N G T H S
• Project & Program
management
• Developer
platform
• Developer
Education
• System design
• Infrastructure at
scale
• Large-scale software
projects
C E R T I FI C A T I O N S
• AWS Solutions
Architect Associate
• Project Management
Professional (PMP)
• Certified Scrum
Professional (III)
• JIRA Admin ACP-100
P R O F E S S I O N A L E X P E R I E N C E
HULU | SANTA MONICA, CA
Senior Technical Program Manager – Developer Experience (DevX) | June 2019 – Present
T E C H N I C A L S K I L L S
• Novice development
skills with Java Script,
Node.js, React.js,
Heroku, Git, Bash,
MySQL & MongoDB
• Understanding of big
data architecture
• Jira, Portfolio,
Confluence, MS
Project
• AWS
E D U C A T I O N
• Web Development –
Full Time Bootcamp,
UCLA, 2017 – 2018
• Product Management
Immersive, General
Assembly, 2015
• B.S., CSU Northridge,
2004-2008
• Launched an internal knowledge management system powered by AnswerHub, that aimed onboard
developers onto DevOps related concepts: build & deploy, orchestration, monitoring, logging, etc..
• Partnered with technical writers in building out the knowledgebase and developer education focused
on promoting the usage of self-service tooling
• Supported the launch of “DevX console” which provided a one stop console for a wide array of internal
tools focused on optimizing developers experience and ability to ship code quickly
• Launched Project Margaret, a web framework for developing and deploying internal web applications
that reduced the time of engineers building internal applications by 20%
• Owned the roadmap for our traffic management platform which abstracted capabilities around traffic
shaping and routing at the ingress layer of hulu’s public and private network
• Drove engagement with software engineering teams to breakdown product vision into technical
execution plans with measurable milestones, optimize scope and schedule, manage cross-
functional dependencies, and proactively manage risks
• Owned communication of roadmap, progress toward goals, and reporting status to stakeholders
TRUECAR | SANTA MONICA, CA
Senior Technical Program Manager – Data Platform | November 2015 – March 2019
• Oversaw a multi-year large technical program migrating TrueCar’s data engineering platform from on
premise data center to AWS
• Managed a project to develop a highly scalable ETL process to power core billing engine
• Led the development and program management of numerous internal tools for management of vehicle
configuration and inventory data
• Determined and communicated technical dependencies between engineering teams through a deep
understanding of TrueCar’s technology platform and architecture
• Led a program to coach 20+ teams on attaining higher levels of agile maturity & on scrum framework
HOVERSTATE | LOS ANGELES, CA
Technical Project Manager | October 2014 – November 2015
• Oversaw multi million dollar projects through their life cycle: discovery, UX/UI design, development, QA,
integration testing, consumer testing and launch
• Analyzed client needs and broke requirements down into user stories and technical tasks
• Tracked & communicated progress with clients, as well as internal development and creative teams
HARBOR FREIGHT | CALABASAS, CA
Product Manager | March 2013 – October 2014
• Managed the consumer journey of product research and discovery on HFT home & product page
• Launched a ratings and reviews feature on HFT.com and an associated internal moderation tool
• Supported the needs of the retail product category management team by ensuring promotions and sales
were properly supported on HFT’s ecommerce presence
INTERAMERICAN MOTOR CORP | CHATSWORTH, CA
Business Analyst | October 2009 – March 2013
• Translated business needs in requir