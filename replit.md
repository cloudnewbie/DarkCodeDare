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

**Current Implementation**
- In-memory storage using Map data structure
- MemStorage class implementing IStorage interface for fortune persistence
- UUID generation for unique fortune identifiers

**Schema Design**
- Drizzle ORM schema defined with PostgreSQL dialect
- Fortune model with fields: id, cardName, fortuneText, timestamp
- Zod validation schemas derived from Drizzle schema for type safety

**Database Architecture**
- Prepared for PostgreSQL integration via Neon serverless database
- Migration system configured with Drizzle Kit
- Schema colocation in shared directory for type reusability across client/server

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