# Scholarix Global Consultant - Interactive Website PRD

Scholarix Global Consultant is a premium international education consultancy platform that connects ambitious students with global study opportunities through innovative technology and sophisticated design.

**Experience Qualities:**
1. **Sophisticated** - Premium, polished interface that conveys expertise and trustworthiness
2. **Interactive** - Engaging animations and micro-interactions that guide users through their journey
3. **Global** - International perspective with visual connections between countries and opportunities

**Complexity Level**: Light Application (multiple features with basic state)
- Educational consultancy requires multiple interconnected features like program matching, timeline tracking, and consultation booking, but maintains simplicity in core user flows

## Essential Features

### Interactive Hero Section
- **Functionality**: Animated globe with destination highlights and floating educational elements
- **Purpose**: Immediately convey global reach and premium positioning
- **Trigger**: Page load with staggered animations
- **Progression**: Logo assembly → Globe materialization → Floating elements → Interactive state
- **Success criteria**: Users engage with destination points and understand global scope

### Service Showcase Cards
- **Functionality**: Hover-responsive cards with depth effects and service details
- **Purpose**: Clearly present core consulting services with premium feel
- **Trigger**: Scroll into viewport and hover interactions
- **Progression**: Card entrance → Hover elevation → Information reveal → CTA visibility
- **Success criteria**: High hover engagement and click-through to service details

### Student Journey Timeline
- **Functionality**: Interactive process visualization with progress tracking
- **Purpose**: Demystify the consulting process and set expectations
- **Trigger**: Scroll-based reveal with step-by-step progression
- **Progression**: Timeline appearance → Step highlighting → Detail expansion → Progress indication
- **Success criteria**: Users understand the full process and timeline

### University Program Matcher
- **Functionality**: Interactive tool to filter and match programs based on preferences
- **Purpose**: Provide immediate value and capture user interest
- **Trigger**: User input in preference forms
- **Progression**: Preference selection → Real-time filtering → Program cards → Match recommendations
- **Success criteria**: Users find relevant programs and request consultations

### Consultation Booking System
- **Functionality**: Calendar integration with consultant availability
- **Purpose**: Convert interest into booked consultations
- **Trigger**: CTA buttons throughout the site
- **Progression**: Service selection → Date/time picking → Contact details → Confirmation
- **Success criteria**: 40%+ conversion from program interest to booked consultation

## Edge Case Handling

- **No JavaScript Support**: Graceful degradation to static content with clear navigation
- **Slow Connections**: Progressive loading with content-first approach
- **Mobile Performance**: Reduced animations and touch-optimized interactions
- **Accessibility Needs**: Alt animations, keyboard navigation, screen reader support
- **Browser Compatibility**: Fallback styles for unsupported CSS features

## Design Direction

The design should evoke premium technology and global sophistication - imagine Apple's precision meets international education consulting. Modern minimalist interface with purposeful animations that enhance rather than distract from the core messaging and functionality.

## Color Selection

Complementary palette using sophisticated tech-inspired colors that convey trust and innovation.

- **Primary Color**: Aurora Teal (oklch(0.75 0.15 180)) - Innovation and trust, used for primary actions and key highlights
- **Secondary Colors**: Deep Space Navy (oklch(0.15 0.05 240)) for backgrounds and grounding elements, Pure White (oklch(1 0 0)) for content areas
- **Accent Color**: Cosmic Coral (oklch(0.70 0.15 15)) - Attention-grabbing highlight for CTAs and important interactive elements
- **Foreground/Background Pairings**:
  - Background (Deep Navy): White text (oklch(1 0 0)) - Ratio 8.5:1 ✓
  - Card (White): Navy text (oklch(0.15 0.05 240)) - Ratio 8.5:1 ✓
  - Primary (Aurora Teal): White text (oklch(1 0 0)) - Ratio 4.8:1 ✓
  - Accent (Cosmic Coral): White text (oklch(1 0 0)) - Ratio 5.2:1 ✓

## Font Selection

Typography should convey modern professionalism with excellent readability across cultures and languages, supporting international student audiences.

- **Typographic Hierarchy**:
  - H1 (Hero Title): Inter Bold/48px/tight letter spacing
  - H2 (Section Headers): Inter Semibold/32px/normal spacing
  - H3 (Card Titles): Inter Medium/24px/normal spacing
  - Body Text: Inter Regular/16px/relaxed line height
  - Small Text: Inter Regular/14px for captions and metadata

## Animations

Subtle yet purposeful motion that guides attention and reinforces the premium, tech-forward brand personality while maintaining fast performance and accessibility.

- **Purposeful Meaning**: Smooth transitions communicate sophistication, hover effects invite interaction, loading states maintain engagement
- **Hierarchy of Movement**: Hero elements get primary animation focus, secondary elements use subtle parallax, micro-interactions provide feedback

## Component Selection

- **Components**: Card components for services/programs, Dialog for detailed information, Form elements for program matcher, Calendar for booking, Button variants for different CTAs, Badge components for program features
- **Customizations**: Custom hover effects for cards, animated progress indicators, floating action buttons, interactive timeline component
- **States**: Buttons with loading states, cards with hover/active states, form inputs with validation feedback, calendar with availability indicators
- **Icon Selection**: Phosphor icons for consistency - Globe for international reach, GraduationCap for education, CalendarCheck for scheduling, Users for consulting
- **Spacing**: Consistent 4px spacing scale (4, 8, 16, 24, 32, 48, 64) using Tailwind's spacing system
- **Mobile**: Cards stack vertically, timeline becomes vertical scrolling, reduced animation complexity, touch-optimized button sizes, simplified navigation drawer