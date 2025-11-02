# Kiro Steering Documentation

This document shows how `replit.md` and design guidelines were used to steer Kiro's development approach throughout the project.

## Primary Steering Document: replit.md

The `replit.md` file at the project root serves as the main steering mechanism for Kiro. It contains:

### Project Context
- **Overview:** High-level description of the Haunted Fortune Teller application
- **User Preferences:** Communication style (simple, everyday language)
- **System Architecture:** Complete technical stack documentation

### Architecture Decisions
The replit.md file guided Kiro to follow these patterns:

**Frontend Architecture:**
- React + TypeScript for type safety
- Wouter for lightweight routing
- TanStack Query for server state
- shadcn/ui component library
- Framer Motion for animations

**Backend Architecture:**
- Express.js with TypeScript
- RESTful API design
- Thin route handlers with storage abstraction
- Drizzle ORM for type-safe database operations

**Authentication Strategy:**
- Replit Auth (OpenID Connect)
- PostgreSQL session storage
- Environment-aware configuration (http in dev, https in production)
- Token caching with memoizee

### Development Guidelines Followed

1. **Database Schema First:**
   - Always define data models in `shared/schema.ts` before implementation
   - Use Drizzle ORM with Zod validation
   - Generate insert/select types for type safety across stack

2. **Storage Abstraction:**
   - IStorage interface in `server/storage.ts`
   - Separates data access from route logic
   - Easy migration from in-memory to database storage

3. **Frontend Patterns:**
   - Form validation with react-hook-form + Zod
   - Query invalidation after mutations
   - Loading states for better UX
   - Data-testid attributes for testing

4. **Testing Strategy:**
   - End-to-end testing with Playwright
   - Architect review before task completion
   - Browser-based validation for UI changes

## Secondary Steering: design_guidelines.md

The design guidelines file steered visual and UX decisions:

### Design System
- **Colors:** Dark Halloween theme with purple accents
- **Typography:** Cinzel (headings), Spectral (body), Creepster (accents)
- **Spacing:** 4px rhythm (4, 8, 12, 16, 24)
- **Components:** Consistent use of shadcn/ui primitives

### Visual Effects Guidelines
- Atmospheric layering (fog, spirits, particles)
- Subtle animations (avoid jarring movements)
- Performance-optimized particle systems
- Accessible sound controls

### Authentication UI
- Theatrical landing page for logged-out users
- Profile display with avatar for authenticated users
- Consistent navigation patterns
- Clear login/logout affordances

## Steering Impact on Development

### 1. Consistency Across Sessions
The replit.md file ensures Kiro maintains context across sessions:
- Database schema evolution tracked
- Critical fixes documented (secure cookies, port preservation)
- External dependencies cataloged

### 2. Architectural Coherence
Steering documents prevented common pitfalls:
- No mixing of storage patterns (stayed with DatabaseStorage)
- Consistent error handling (authUtils patterns)
- Type safety enforced throughout stack

### 3. User Experience Focus
Design guidelines ensured:
- Dark mode aesthetic maintained
- Glowing effects applied consistently
- Responsive layouts at all breakpoints
- Accessibility not sacrificed for style

### 4. Development Velocity
Clear specifications allowed Kiro to:
- Make confident technical decisions
- Avoid unnecessary back-and-forth
- Follow established patterns
- Complete complex features autonomously

## Key Steering Strategies That Worked

1. **Detailed Technical Context:**
   - Documenting database configuration (ws polyfill, pipelineConnect disabled)
   - Recording critical fixes (environment-aware auth configuration)
   - Tracking external dependencies with integration details

2. **Phase-Based Documentation:**
   - Clear completion markers for each phase
   - Success criteria defined upfront
   - Next steps always visible

3. **Pattern Documentation:**
   - Blueprint patterns referenced for Replit Auth
   - Component usage patterns (Button variants, Card nesting rules)
   - State management patterns (TanStack Query conventions)

4. **Constraint Clarity:**
   - Forbidden changes clearly marked (no vite.config.ts edits)
   - Package management via tools, not manual edits
   - Migration commands specified (npm run db:push --force)

## Result

The steering documentation enabled Kiro to build a complete, polished Halloween application with:
- Zero architectural inconsistencies
- Minimal refactoring needed
- Clear development progression
- Successful E2E test validation
