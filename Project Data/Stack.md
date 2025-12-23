This is a Powerhouse Stack. By late 2025 (current date), Next.js 16 is likely refining the stability of React 19 features, meaning we are looking at a Server-Component-First architecture with aggressive caching and incredible speed, paired with the visual fluidity of Framer Motion.

Here is the Deep Research & Technical Blueprint for building maghrib.digital on this specific stack.

1. The Core Architecture: Next.js 16 (App Router)
Since we are using version 16+, we are fully committed to the App Router.

Server Components by Default: All your layout shells, navbar logic, and initial data fetching (if you add a blog/CMS later) happen on the server. This ensures the "Lighthouse" score stays green despite heavy animations.

React 19 / Compiler: Next.js 16 likely utilizes the React Compiler (formerly React Forget). This means we don't need to manually useMemo or useCallback as much. The framework handles re-render optimization.

Turbopack: Your dev server will be instant.

The "Maghrib" Folder Structure
We need a structure that separates "Marketing Pages" (your landing) from "UI Components" (your animations).

Bash

/src
  /app
    layout.tsx       # Root layout (Fonts, SEO, Global Providers)
    page.tsx         # Your Hero/Landing Page
    /services
      page.tsx       # Services Grid
    /portfolio
      page.tsx       # Project Gallery
    global.css       # Tailwind directives
  /components
    /ui              # Reusable atoms (Buttons, Cards, Inputs)
    /sections        # Large blocks (Hero, Features, Footer)
    /animations      # Framer Motion Wrappers (CRITICAL for Next.js)
  /lib
    utils.ts         # Tailwind class merger (cn helper)
  tailwind.config.ts # Your Custom Neon Palette
2. The Styling Engine: Tailwind CSS (v4 or v3.4+)
We need to hard-code your Dark/Neon Brand Identity into the config so you never have to guess a hex code.

tailwind.config.ts Setup: We will extend the theme to include the colors we defined in the branding phase.

TypeScript

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maghrib: {
          navy: "#0A1128",    // Main Background
          violet: "#240046",  // Secondary Background
          cyan: "#00FFF5",    // Primary Neon Accent
          magenta: "#FF00C7", // Secondary Neon Accent
          gold: "#D4AF37",    // Trust/Premium Accent
        },
      },
      backgroundImage: {
        'hero-glow': "radial-gradient(circle at center, #240046 0%, #0A1128 100%)",
        'glass': "rgba(10, 17, 40, 0.7)", // For the frosted glass cards
      },
      fontFamily: {
        sans: ['var(--font-inter)'], // Use a clean sans for text
        display: ['var(--font-orbitron)'], // Use a tech font for headings
      }
    },
  },
  plugins: [],
};
export default config;
Usage Example: <div className="bg-maghrib-navy text-maghrib-cyan border-maghrib-gold">

3. The Animation Engine: Framer Motion
The Challenge: Framer Motion requires access to the window object and browser interactions, meaning it must run on the Client. The Solution: Isolate animations into "Client Component Wrappers." Do not make your entire page use client.

The "Motion Wrapper" Strategy
Create a reusable component called FadeIn.tsx or Reveal.tsx in your /components/animations folder.

TypeScript

// components/animations/Reveal.tsx
"use client"; // <--- Crucial

import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {children}
    </motion.div>
  );
};
Usage in a Server Page (app/page.tsx):

TypeScript

import { Reveal } from "@/components/animations/Reveal";

export default function Home() {
  return (
    <section className="bg-maghrib-navy">
      {/* This text is static SEO friendly */}
      <h1>Welcome to Maghrib Digital</h1> 
      
      {/* This image animates in */}
      <Reveal delay={0.2}>
        <div className="text-maghrib-cyan">Your Floating Laptop Component</div>
      </Reveal>
    </section>
  );
}
4. Component Implementation Plan
Based on our previous prompts, here are the 3 Key Components you need to build first:

A. The "Floating Device" Hero (3D Tilt)
Don't use expensive WebGL (Three.js) if you don't have to. You can achieve the "Floating Laptop" effect using Framer Motion 3D transforms or simple CSS perspective.

Tech: framer-motion (use useScroll and useTransform for parallax).

Effect: As the user scrolls down, the laptop (image) tilts slightly and moves upward slower than the text.

B. The "Frosted Glass" Card
This is for your Testimonials and Service boxes.

Tailwind Class:

CSS

.glass-card {
  @apply bg-maghrib-navy/60 backdrop-blur-md border border-white/10 shadow-xl;
}
Why: backdrop-blur-md creates that premium, modern "Apple/Cyberpunk" feel.

C. The Neon Glow Buttons
Effect: A button that glows when you hover.

Tailwind: hover:shadow-[0_0_20px_#00FFF5] transition-shadow duration-300.

5. Installation & Next Steps
Here is your immediate terminal command list to get the skeleton ready:

Initialize:

Bash

npx create-next-app@latest maghrib-digital --typescript --tailwind --eslint
Install Framer Motion & Icons:

Bash

npm install framer-motion lucide-react clsx tailwind-merge
(Note: lucide-react is the standard for clean icons in 2025; clsx and tailwind-merge are essential for combining dynamic classes).

Clean Up:

Delete the default page.tsx content.

Delete the default SVG logo.

Paste the tailwind.config.ts colors I provided above.

