# Haunted Fortune Teller - Project Specification

## Project Goal
Build a Halloween-themed web application featuring AI-powered mystical tarot readings with atmospheric effects for the Kiroween hackathon.

## Core Requirements

### 1. AI-Powered Fortune Generation
- Use OpenAI GPT-5 for generating mystical, atmospheric tarot readings
- Pre-defined tarot card deck (The Moon, The Star, Death, etc.)
- Combine card symbolism with storytelling
- Each reading should be unique and personalized

### 2. Atmospheric User Experience
- **Visual Effects:**
  - Animated fog layers
  - Flickering candles
  - Floating spirits/ghosts
  - Cobwebs and vignette effects
  - Particle trail cursor effects
  
- **Audio Design:**
  - 5-layer ambient soundscape (drone, overtones, wind, whispers, chains)
  - Card flip sound effects
  - User-controlled sound toggle

- **Typography:**
  - Glowing text effects for mystical aesthetic
  - Custom Google Fonts (Cinzel, Spectral, Creepster)
  - Dripping animation for gothic horror

### 3. Data Persistence
- PostgreSQL database (Neon serverless)
- Fortune history gallery
- User account system with Replit Auth

### 4. Authentication System
- Replit Auth (OIDC) integration
- Support for multiple providers (Google, GitHub, X, Apple, email/password)
- Session management with PostgreSQL storage
- Fortunes linked to authenticated users

### 5. Responsive Design
- Mobile-first approach
- Dark mode default theme
- Responsive grid layouts
- Accessible UI components (shadcn/ui + Radix)

## Technical Stack

**Frontend:**
- React + TypeScript
- Vite build system
- Wouter routing
- TanStack Query for data fetching
- Framer Motion for animations
- Tailwind CSS + shadcn/ui

**Backend:**
- Express.js + TypeScript
- Passport.js authentication
- OpenID Connect (OIDC)
- Session management

**Database:**
- PostgreSQL (Neon)
- Drizzle ORM
- Three tables: users, fortunes, sessions

**AI Integration:**
- OpenAI GPT-5 via Replit AI Integrations
- Custom system prompts
- Token optimization (1000+ max_completion_tokens)

## Implementation Phases

### Phase 1: MVP Enhancement - Atmospheric Effects ✅
- Visual atmosphere components
- 5-layer audio system
- Interactive cursor effects
- Enhanced typography with glow effects

### Phase 2: Database Integration ✅
- PostgreSQL setup with Neon
- Schema design and migrations
- DatabaseStorage implementation
- Fortune history gallery with tombstone cards

### Phase 3: Replit Auth Integration ✅
- Backend authentication system (OpenID Connect)
- Frontend auth flow (Landing page, useAuth hook)
- Environment-aware configuration
- Session persistence
- User profile display

## Success Criteria
- ✅ Fully functional fortune generation with AI
- ✅ Immersive atmospheric effects (visual + audio)
- ✅ Database-backed persistence
- ✅ User authentication system
- ✅ Responsive design across devices
- ✅ No console errors or accessibility issues
- ✅ End-to-end tested authentication flow

## Future Enhancements
- Social sharing with custom fortune card graphics
- Multiple fortune-telling methods (3-card spread, runes, ouija)
- Curse level and streak tracking
- WebGL shader effects
- Protected fortune creation (login required)
