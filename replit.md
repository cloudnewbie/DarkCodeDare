# Haunted Fortune Teller

## Overview

The Haunted Fortune Teller is a Halloween-themed web application that provides AI-powered tarot card readings with an immersive, mystical user experience. Users are greeted with a theatrical séance chamber interface where they can request personalized fortune readings. The application generates atmospheric tarot readings using OpenAI's GPT-5 model, presenting them through animated card reveals and typewriter-style text effects. The design emphasizes theatrical staging, layered depth, and controlled revelation to create an engaging supernatural experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing

**UI Component Strategy**
- shadcn/ui component library based on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Dark mode as the default theme to support the Halloween aesthetic
- Motion animations powered by Framer Motion for card flips, reveals, and atmospheric effects

**State Management**
- TanStack Query (React Query) for server state management and API data fetching
- Local React state for UI interactions and animation sequences
- Custom hooks for reusable logic (mobile detection, toast notifications)

**Design System**
- Custom typography using Google Fonts: Cinzel (ornate serif), Spectral (body text), and Creepster (accent)
- Tailwind configuration with custom color scheme using HSL values for theming
- Spacing primitives based on 4px rhythm (4, 8, 12, 16, 24)
- Component-specific styling patterns for cards, buttons, and interactive elements

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server
- TypeScript for type safety across the stack
- Custom middleware for request logging and JSON parsing

**API Design**
- RESTful endpoints for fortune generation and retrieval
- POST `/api/fortune` - Generates new tarot reading using OpenAI
- GET `/api/fortunes` - Retrieves fortune history

**AI Integration**
- OpenAI GPT-5 integration via Replit's AI Integrations service
- Custom prompting system that combines tarot card symbolism with atmospheric storytelling
- Pre-defined tarot card deck with thematic associations (The Moon, The Star, Death, etc.)

**Development Tooling**
- Hot module replacement (HMR) during development
- Vite plugins for runtime error overlays and development banners
- Source maps for debugging

### Data Storage

**Database Implementation**
- PostgreSQL database via Neon serverless (production-ready)
- DatabaseStorage class with full CRUD operations
- WebSocket polyfill configured for Replit environment compatibility
- Connection pooling via @neondatabase/serverless

**Schema Design**
- Drizzle ORM with two main tables: users and fortunes
- Fortune model fields: id (UUID), userId (nullable FK), cardName, fortuneText, cardImage, readingType, isShared, timestamp
- User model fields: id (UUID), username (unique), passwordHash, curseLevel, fortuneStreak, createdAt
- Zod validation schemas derived from Drizzle schema for type safety
- Foreign key relationship: fortunes.userId → users.id (nullable for anonymous fortunes)

**Database Architecture**
- Neon PostgreSQL database fully integrated and tested
- Migration system via Drizzle Kit (`npm run db:push`)
- Schema colocation in shared directory for type reusability across client/server
- Database client configured with ws polyfill and pipelineConnect disabled for Replit compatibility

### External Dependencies

**AI Services**
- OpenAI API (via Replit AI Integrations) - Fortune text generation using GPT-5 model
- Provides OpenAI-compatible endpoint without requiring direct API key management

**UI Libraries**
- Radix UI - Accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- Framer Motion - Animation library for card flips, particle effects, and transitions
- Lucide React - Icon library for UI elements

**Database & ORM**
- Drizzle ORM - Type-safe database operations and migrations
- @neondatabase/serverless - PostgreSQL client optimized for serverless environments
- connect-pg-simple - PostgreSQL session store (configured but not actively used)

**Development Tools**
- tsx - TypeScript execution for development server
- esbuild - Fast JavaScript bundler for production builds
- Replit-specific plugins - Cartographer (code mapping) and dev banner

**Type Safety & Validation**
- Zod - Runtime schema validation
- drizzle-zod - Automatic Zod schema generation from database models
- TypeScript with strict mode enabled

**Styling & Design**
- Tailwind CSS - Utility-first CSS framework
- PostCSS with Autoprefixer - CSS processing
- class-variance-authority - Type-safe variant management for components
- clsx & tailwind-merge - Conditional class name composition

**Google Fonts**
- Cinzel - Primary display font for mystical headings
- Spectral - Secondary serif for fortune text
- Creepster - Decorative font for special emphasis

## Recent Changes (November 2, 2025)

### Phase 1: MVP Enhancement - Atmospheric Effects (Completed)
1. **Visual Atmosphere**
   - Created AtmosphericEffects component with fog animations, flickering candles, cobwebs, and floating spirits
   - Added layered vignette shadows and depth effects
   - Integrated Framer Motion for smooth, performance-optimized animations

2. **Audio System**
   - Implemented 5-layer ambient soundscape: deep drone (55Hz), harmonic overtones (110/165/220Hz), wind texture, whispered noise filtering, and distant metallic chains
   - Created useCardFlipSound hook for synthesized creak sound on card flips
   - Proper audio cleanup with gain ramping and context management

3. **Interactive Cursor Effects**
   - Created CursorEffects component with crystal ball glow and ghostly particle trail
   - Particle system with proper state management and cleanup (max 15 particles, trimmed every 2s)
   - Performance-optimized with minimal CPU/GPU overhead

4. **Enhanced Typography**
   - Added text-glow-primary and text-glow-accent CSS utilities for glowing text effects
   - Implemented dripping animation for gothic horror aesthetic
   - Applied to hero titles and fortune display headers

### Phase 2: Database Integration & Fortune History (Completed)
1. **Database Setup**
   - Created PostgreSQL database with Neon serverless
   - Configured WebSocket polyfill (ws library) for Replit environment
   - Disabled pipelineConnect for compatibility
   - Successfully pushed schema migrations

2. **Schema Enhancement**
   - Extended fortunes table with: cardImage, readingType, isShared fields
   - Created users table with: curseLevel, fortuneStreak tracking
   - Nullable userId FK allows anonymous fortunes while supporting future user linkage

3. **Storage Layer**
   - Replaced MemStorage with DatabaseStorage implementation
   - Type-safe CRUD operations using Drizzle ORM
   - All fortunes now persist to PostgreSQL with complete metadata

4. **Fortune History Gallery**
   - Created /history route with FortuneHistory page component
   - Tombstone-styled fortune cards with card images, glowing titles, truncated text, timestamps
   - Responsive grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
   - Added navigation header with "Fortune Archive" link on homepage
   - Fixed accessibility: Button asChild pattern for Link+Button combinations
   - Image mapping system for tarot card identifiers → imported assets
   - Empty state with call-to-action when no fortunes exist
   - Hover elevation effects on cards

### Current Features
- ✅ AI-powered fortune generation using OpenAI GPT-5
- ✅ Atmospheric visual effects (fog, candles, spirits, particles)
- ✅ 5-layer ambient soundscape with card flip sound effects
- ✅ Interactive cursor effects with particle trail
- ✅ Glowing gothic typography with drip animations
- ✅ PostgreSQL database with fortune persistence
- ✅ Fortune history gallery with tombstone-styled cards
- ✅ Responsive navigation between home and history pages

### Next Phase Features (Pending)
- Shareable fortune cards with custom graphics for social media
- User authentication system (leveraging existing users table)
- Multiple fortune-telling methods (3-card tarot spread, rune casting, ouija board)
- Curse level and fortune streak tracking
- WebGL shader effects for otherworldly visual distortions