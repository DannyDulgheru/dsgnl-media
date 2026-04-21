# DSGNL Media - Redesign Specification

## Project Overview
- **Project**: DSGNL Studio Website Redesign
- **Type**: Single-page marketing website
- **Purpose**: Video production studio portfolio to generate leads
- **Style**: Claude.ai-inspired warm editorial aesthetic

---

## Design System

### Color Palette
```css
:root {
  /* Warm Editorial Palette - Claude.ai inspired */
  --bg: #FAF8F5;           /* Warm Ivory - background */
  --surface: #F2EEE8;       /* Clay - carduri, secțiuni */
  --surface-alt: #E8E3DB;   /* Hover states */
  --text: #1A1612;         /* Near-black cu tint cald */
  --text-2: #6B5F4E;       /* Warm brown-gray */
  --text-3: #9A8B78;      /* Muted text */
  --accent: #C75B3A;        /* Burnt Sienna - accent */
  --accent-hover: #A84829;
  --accent-dim: #E8D0C4;
  --border: #D4CFC6;
  --border-light: #E8E3DB;

  /* Semantic */
  --success: #4A7C59;
  --error: #C73E3A;
}
```

### Typography
```css
:root {
  /* Display & Headings - Editorial Serif */
  --font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;

  /* Body & UI - Refined Sans */
  --font-body: 'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;

  /* Code & Tags - Mono */
  --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;

  /* Scale */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;        /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 2rem;       /* 32px */
  --text-4xl: 2.5rem;     /* 40px */
  --text-5xl: 3.5rem;     /* 56px */
  --text-6xl: clamp(3rem, 8vw, 5rem);

  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.65;

  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;
  --tracking-widest: 0.2em;
}
```

### Spacing
```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
}
```

### Visual Effects
```css
:root {
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(26, 22, 18, 0.05);
  --shadow-md: 0 4px 12px rgba(26, 22, 18, 0.08);
  --shadow-lg: 0 8px 24px rgba(26, 22, 18, 0.12);
  --shadow-xl: 0 16px 48px rgba(26, 22, 18, 0.16);

  /* Transitions */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 800ms;
}
```

---

## Layout Structure

### Page Sections (in order)

1. **Navigation** - Fixed top, transparent → blur on scroll
2. **Hero** - Full viewport, centered content
3. **About** - Two column: image left, text right
4. **Work** - Grid portfolio with lightbox
5. **Services** - 4-column card grid
6. **Process** - Horizontal timeline
7. **Contact** - Two column: info + form
8. **Footer** - Minimal with links

### Container
- **Max width**: 1400px
- **Padding**: 40px (desktop), 24px (tablet), 16px (mobile)
- **Grid gap**: 24px (desktop), 16px (mobile)

### Responsive Breakpoints
```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

---

## Component Specifications

### 1. Navigation (`#nav`)
- **Layout**: Flex, space-between, align-center
- **Logo**: "DSGNL" text, font-mono, bold
- **Links**: Horizontal nav links with hover underline animation
- **Mobile**: Burger menu → full-screen overlay
- **Scroll state**: Background blur (12px), padding reduces
- **Transition**: 300ms ease-out

### 2. Hero Section (`#hero`)
- **Height**: 100vh min
- **Background**: CSS gradient (warm) + noise texture overlay
- **Content**:
  - Label: Small mono text, accent color
  - Headline: H1, Playfair Display, 5-6xl
  - Subtitle: Body text, text-2
  - CTAs: Two buttons (primary + outline)
- **Animation**:
  - Text stagger reveal on load (letter-by-letter or word-by-word)
  - Fade up, 800ms duration
- **Scroll indicator**: Animated line at bottom

### 3. About Section (`#about`)
- **Layout**: Grid 2 columns (1fr 1fr), gap 80px
- **Visual**: Large image with subtle shadow
- **Tag**: Floating "DSGNL STUDIO ®2026" badge on image
- **Text**:
  - Section number: "01 / ABOUT" mono
  - Heading: Display font, accent word
  - Body: 2 paragraphs, relaxed line-height
  - CTA button
- **Animation**: Fade-in on scroll

### 4. Work Section (`#work`)
- **Layout**: Grid, 3 columns, 20px gap
- **Cards**:
  - Aspect ratio: 16:10
  - Image/video thumbnail
  - Hover: scale(1.03) + info overlay fades in
  - Click: Opens lightbox
- **Featured**: Every 3rd item spans 2 columns
- **Load more**: Button toggles hidden items
- **Animation**: Staggered fade-in on scroll

### 5. Lightbox (`#lightbox`)
- **Background**: Semi-transparent warm overlay
- **Content**: Video player, title, type, close button
- **Animation**: Fade in/out (300ms)
- **Close**: Click outside or ESC key

### 6. Services Section (`#services`)
- **Layout**: Grid 4 columns, 20px gap
- **Cards**:
  - Padding: 32px
  - Border: 1px solid border
  - Number: "01", "02", mono accent
  - Icon: SVG, stroke style, accent color
  - Title: H3
  - Description: Body text, text-2
  - Tags: Small pills below
- **Hover**: Border-top accent (slide in), translateY(-4px)
- **Animation**: Fade-up on scroll, staggered

### 7. Process Section (`#process`)
- **Layout**: Grid 4 columns (timeline-style)
- **Step component**:
  - Number: Large, transparent/opacity 0.2
  - Line: Accent connector
  - Title: H4
  - Description: Body text
- **Animation**: Line fills on scroll (ScrollTrigger clip-path)

### 8. Contact Section (`#contact`)
- **Layout**: Grid 2 columns (info | form)
- **Info side**:
  - Section number
  - Heading
  - Description
  - Contact channels (phone, telegram)
- **Form side**:
  - Floating labels
  - Inputs: text, tel, select, textarea
  - Focus state: Accent border
  - Submit button
  - Success state: Checkmark animation

### 9. Footer (`footer`)
- **Layout**: Flex, space-between
- **Content**: Logo, copyright, links
- **Border**: Top, 1px border color

---

## Animation Specifications

### Global
```javascript
// GSAP configuration
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8
});
```

### Scroll-triggered Animations
```javascript
// Fade up pattern
gsap.from(element, {
  scrollTrigger: {
    trigger: element,
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 40,
  opacity: 0,
  duration: 0.8
});
```

### Hero Animation Sequence
```javascript
// On load
const tl = gsap.timeline();

tl.from('.hero-label', { opacity: 0, y: 20, duration: 0.6 })
  .from('.hero-title span', {
    opacity: 0,
    y: 60,
    stagger: 0.1,
    duration: 0.8
  }, '-=0.4')
  .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
  .from('.hero-cta', { opacity: 0, y: 20, duration: 0.6 }, '-=0.2')
  .from('.hero-stats', { opacity: 0, duration: 0.8 }, '-=0.2');
```

### Micro-interactions

#### Link Hover
```css
a {
  position: relative;
}

a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent);
  transition: width 0.3s var(--ease-out);
}

a:hover::after {
  width: 100%;
}
```

#### Button Hover
```css
.btn-primary {
  transition: transform 0.3s var(--ease-out), background 0.3s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  background: var(--accent-hover);
}

.btn-outline {
  transition: border-color 0.3s, color 0.3s;
}

.btn-outline:hover {
  border-color: var(--accent);
  color: var(--accent);
}
```

#### Card Hover
```css
.work-item,
.service-card {
  transition: transform 0.4s var(--ease-out), box-shadow 0.4s;
}

.work-item:hover {
  transform: scale(1.03);
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

---

## Functionality

### Scroll Behavior
- Smooth scroll between sections
- Active nav link highlighting
- Scroll progress indicator (optional)

### Work Grid
- Lazy load videos on scroll
- Lightbox open/close
- Load more button toggle

### Contact Form
- Floating label animation
- Form validation
- Submit with loading state
- Success message display
- Error handling

### Mobile Menu
- Burger animation to X
- Full-screen overlay
- Link scroll + close on click

---

## Assets Required

### Fonts (Google Fonts)
- Playfair Display (400, 500, 600, 700)
- DM Sans (400, 500, 600, 700)
- JetBrains Mono (400, 500)

### Libraries (CDN)
- GSAP 3.x core
- ScrollTrigger plugin

### Existing Assets
- `videos/` - All video files
- `img/img.avif` - About image
- YouTube thumbnails for showreel

---

## Acceptance Criteria

### Visual
- [ ] Warm ivory background, not dark
- [ ] Serif headings (Playfair Display)
- [ ] Sans body (DM Sans)
- [ ] Burnt sienna accent color
- [ ] Consistent spacing (8px grid)
- [ ] All sections visible and properly laid out

### Animations
- [ ] Hero text reveals on load
- [ ] Scroll-triggered fade-in for sections
- [ ] Hover effects on cards and buttons
- [ ] Smooth transitions (no jank)
- [ ] 60fps performance

### Responsive
- [ ] Mobile layout (single column)
- [ ] Tablet layout (2 columns)
- [ ] Desktop layout (full)
- [ ] Touch-friendly on mobile

### Functionality
- [ ] Navigation scroll works
- [ ] Mobile menu opens/closes
- [ ] Work lightbox works
- [ ] Contact form submits
- [ ] All external links work

### Performance
- [ ] Lighthouse score > 90
- [ ] No layout shift
- [ ] Images optimized
- [ ] Videos lazy-loaded