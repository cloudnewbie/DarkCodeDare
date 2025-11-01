# Haunted Fortune Teller - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from immersive digital experiences like mystical/occult web experiences, interactive storytelling platforms (The Boat, Every Noise at Once's visual density), and atmospheric game UIs (Inscryption, Cult of the Lamb). The design prioritizes emotional impact, atmospheric immersion, and theatrical presentation over utility.

## Core Design Principles
1. **Theatrical Staging**: Every interaction should feel like a ritual or ceremony
2. **Layered Depth**: Multiple visual planes create dimensional haunted space
3. **Controlled Revelation**: Progressive disclosure through atmospheric transitions
4. **Tactile Mysticism**: UI elements feel like physical occult objects

## Typography System

**Primary Font**: 'Cinzel' (Google Fonts) - Ornate serif for headings and mystical text
**Secondary Font**: 'Spectral' (Google Fonts) - Elegant serif for body fortune text  
**Accent Font**: 'Creepster' or 'Nosifer' (Google Fonts) - Dripping, distressed for special emphasis

**Scale & Hierarchy**:
- Hero Title: text-6xl md:text-8xl (96-128px) with letter-spacing tracking-wider
- Section Headers: text-4xl md:text-5xl with heavy font-weight
- Card Titles: text-2xl md:text-3xl 
- Fortune Text: text-lg md:text-xl with generous line-height (leading-relaxed)
- UI Labels: text-sm uppercase tracking-widest

**Special Typography Effects**:
- Glowing text treatment using multiple text-shadow layers for neon signs
- Distressed/eroded text edges for aged parchment feel
- Floating letter animations for mystical reveals

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, 24 for consistent rhythm (p-4, m-8, gap-12, py-16, my-24)

**Viewport Strategy**:
- Hero/Landing: Full viewport (min-h-screen) for immersive entry experience
- Fortune Reading Section: Natural content height with generous padding (py-24)
- Card Display: Centered focal area with breathing room
- Footer Atmosphere: py-16 for grounded presence

**Container Structure**:
```
Full-bleed backgrounds with atmospheric effects (fog, particles)
Inner content: max-w-6xl for main sections, max-w-3xl for reading text
Card grids: grid-cols-1 md:grid-cols-3 for tarot spreads
Asymmetric layouts for mystical chaos vs. centered precision for ceremony moments
```

## Component Library

### Hero Section - The Séance Chamber
- Full-screen immersive entry with layered fog/mist effects (CSS animations)
- Centered mystical symbol or crystal ball as focal point
- Title with glowing, pulsing treatment
- Subtitle in ethereal, fading text
- Primary CTA button with ghostly hover state (scale and glow)
- Floating particle system (subtle orbs or spirits) using CSS keyframe animations
- Parallax scroll depth on background elements

### Fortune Reading Interface
**Crystal Ball Activation Zone**:
- Large circular focal point (w-64 h-64 md:w-96 md:h-96)
- Rippling glass effect with radial gradients
- Pulsing glow animation (2-3s cycle)
- Click target with tactile feedback (scale down then up)

**Tarot Card Display**:
- Card dimensions: aspect-ratio 2/3, w-48 md:w-64
- Flip animation using transform rotateY (0.8s duration, preserve-3d)
- Card back: Ornate occult pattern with border-4 
- Card front: Illustration area + text panel below
- Hover state: Slight lift (translateY -2) and intensified glow
- Layout: Spread horizontally in ceremonial pattern (past-present-future) with gap-8

**Fortune Display Panel**:
- Vintage parchment aesthetic with torn edges (irregular borders)
- Scrolling reveal animation for text (typewriter effect, 50ms per character)
- Decorative flourishes at corners (SVG ornaments)
- Framed within max-w-2xl for readability
- Text shadow for embossed/engraved appearance

### Navigation & Controls
**Header**:
- Fixed position with backdrop-blur for ghostly transparency
- Minimal height (h-16) to preserve atmosphere
- Logo: Small mystical symbol (h-10 w-10)
- Navigation links: Uppercase, tracking-widest, hover glow effect

**Interactive Buttons**:
- Primary CTA: px-8 py-4 rounded-lg with border-2
- Ghostly blur background (backdrop-blur-sm) when over images
- Hover: Scale 1.05 with glow intensification
- Active: Scale 0.95 with pulse
- Secondary actions: Outlined style with border-2

**Sound Toggle**:
- Positioned fixed bottom-8 right-8
- Icon-only button (w-12 h-12) rounded-full
- Animated waveform indicator when active
- Subtle bounce on interaction

### Atmospheric Elements
**Background Layers** (z-index hierarchy):
- Base: Haunted mansion or mystical chamber imagery (full-bleed)
- Layer 2: Animated fog/mist (opacity-30, slow drift animation)
- Layer 3: Floating particle orbs (20-30 elements, random float paths)
- Layer 4: Cobweb overlays in corners (opacity-20)
- Layer 5: Content

**Interactive Particles**:
- Ghost trails follow cursor (delayed position tracking)
- Particle burst on card reveal (15-20 particles radiating outward)
- Floating candle flames (flicker animation, 0.5-2s random)

**Visual Depth Techniques**:
- Multiple shadow layers for levitation effect (shadow-2xl + custom)
- Border treatments: Double borders with gap between (border-2 + inset shadow)
- Vignette overlay on full-screen sections (radial gradient from edges)

## Animation Strategy

**Core Animations** (minimal but impactful):

1. **Card Flip**: 3D rotation with stagger delay for multiple cards (0.2s offset)
2. **Text Reveal**: Character-by-character typewriter for fortunes
3. **Glow Pulse**: 2-3s breathing effect on mystical elements (opacity 0.5 to 1)
4. **Float**: Slow vertical drift for atmospheric particles (5-8s cycle)
5. **Flicker**: Candle flame randomness (rapid opacity shifts, 0.1-0.3s)

**Transition Timing**: 
- Quick interactions: 0.3s ease-out
- Ceremonial reveals: 0.8-1.2s ease-in-out
- Atmospheric loops: 3-8s linear infinite

**Scroll Animations**: Parallax on background layers (transform translateY at 0.5x scroll speed)

## Images

**Hero Background**: 
- Full-screen atmospheric image of mystical chamber/haunted mansion interior
- Should have depth: Candlelit table in foreground, mysterious darkness beyond
- Fog/mist layers overlay this base image
- Position: Center focal point with slight zoom on load

**Tarot Card Illustrations**:
- Custom illustrated cards or vintage occult imagery
- High contrast, detailed linework for mystical symbols
- Each card: Unique illustration (minimum 10 card designs)
- Aspect ratio: 2:3 portrait

**Crystal Ball**:
- Translucent sphere with inner galaxy/cosmic imagery
- Swirling nebula effects visible inside
- Positioned centrally as primary interaction point

**Decorative Elements**:
- Corner flourishes: Ornate Victorian borders
- Divider ornaments: Mystical symbols between sections
- Background texture: Aged parchment or weathered stone

## Accessibility Considerations
- Text maintains WCAG AAA contrast despite atmospheric treatment
- Animated elements respect `prefers-reduced-motion`
- Interactive zones minimum 44x44px touch targets
- Screen reader text for mystical symbols and decorative elements
- Keyboard navigation with visible focus states (glowing outline matching theme)
- ARIA labels for fortune reading progression

## Production Notes
- Use CSS Grid for card layouts with precise positioning
- Leverage CSS custom properties for animation timing synchronization
- Implement IntersectionObserver for scroll-triggered atmospheric effects
- Preload hero images and critical assets for instant atmospheric immersion
- Lazy load tarot card images after initial fortune request
- Use `will-change` sparingly on actively animating elements only