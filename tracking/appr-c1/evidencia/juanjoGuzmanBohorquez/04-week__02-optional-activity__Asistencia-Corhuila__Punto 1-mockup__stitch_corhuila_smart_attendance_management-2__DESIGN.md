---
name: CORHUILA Asistencia
colors:
  surface: '#faf9fd'
  surface-dim: '#dad9dd'
  surface-bright: '#faf9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f7'
  surface-container: '#efedf1'
  surface-container-high: '#e9e7eb'
  surface-container-highest: '#e3e2e6'
  on-surface: '#1a1c1e'
  on-surface-variant: '#43474e'
  inverse-surface: '#2f3033'
  inverse-on-surface: '#f1f0f4'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#455f88'
  primary: '#002045'
  on-primary: '#ffffff'
  primary-container: '#1a365d'
  on-primary-container: '#86a0cd'
  inverse-primary: '#adc7f7'
  secondary: '#555f71'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f6'
  on-secondary-container: '#596376'
  tertiary: '#321b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#4f2e00'
  on-tertiary-container: '#c6955e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#adc7f7'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#2d476f'
  secondary-fixed: '#d9e3f9'
  secondary-fixed-dim: '#bdc7dc'
  on-secondary-fixed: '#121c2c'
  on-secondary-fixed-variant: '#3d4759'
  tertiary-fixed: '#ffddba'
  tertiary-fixed-dim: '#f2bc82'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#633f0f'
  background: '#faf9fd'
  on-background: '#1a1c1e'
  surface-variant: '#e3e2e6'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  stat-number:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 1rem
  stack-gap: 1rem
  section-gap: 1.5rem
  card-padding: 1.25rem
  touch-target-min: 44px
---

## Brand & Style
The design system for CORHUILA Asistencia is built upon a foundation of institutional trust and modern academic excellence. The visual language is **Corporate / Modern**, prioritizing a dependable, safe-to-use interface that reduces cognitive load for students and faculty alike.

The brand personality is authoritative yet accessible. It avoids the complexity of traditional administrative software in favor of a clean, mobile-first experience. By utilizing a "Safe" visual identity, the system ensures that critical data—such as attendance thresholds—is communicated with maximum clarity and zero ambiguity. The emotional response should be one of confidence and reliability, ensuring users feel supported by their institution.

## Colors
The palette is led by a deep **University Blue (#1A365D)**, serving as the anchor for headers, primary actions, and brand identification. This is complemented by a neutral scale that favors a very light gray background to reduce screen glare and distinguish card surfaces.

A semantic color system is strictly applied to attendance tracking:
- **Success (Green):** Indicates normal attendance status.
- **Warning (Amber):** Triggered at a 20% absence threshold.
- **Alert (Orange):** Triggered at a 25% absence threshold, requiring immediate attention.
- **Critical (Red):** Triggered at the 30% limit, indicating failure or loss of credit.

## Typography
The system utilizes **Inter** for all roles to ensure maximum legibility and a systematic, utilitarian feel. The typographic hierarchy is designed to highlight key data points—such as percentage of attendance—using the `stat-number` style.

Headlines use a tighter letter-spacing and heavier weights to provide a sense of structure. Body text is optimized for reading clarity on mobile devices, maintaining a generous line height. For labels and metadata, a slightly tracked-out uppercase style is used to differentiate auxiliary information from primary content.

## Layout & Spacing
This design system employs a **Fluid Grid** model optimized for mobile viewports. Layouts are built on a consistent 4px baseline grid to ensure vertical rhythm.

- **Margins:** A standard 16px (1rem) safe area is maintained on the left and right edges of the screen.
- **Card-Based Architecture:** Information is grouped into cards rather than lists or tables to avoid a "spreadsheet" appearance. 
- **Touch Targets:** All interactive elements maintain a minimum size of 44x44px to ensure ease of use during high-mobility situations (e.g., walking to class).
- **Bottom Navigation:** Primary app destinations are anchored to the bottom for optimal thumb reach.

## Elevation & Depth
Depth is created through **Tonal Layers** and subtle **Ambient Shadows**. 

- **Level 0 (Background):** Light gray (#F7FAFC) flat surface.
- **Level 1 (Cards):** White (#FFFFFF) surfaces with a very soft, diffused shadow (Y: 2px, Blur: 8px, Opacity: 5% Black). This provides a gentle lift that distinguishes the card from the background without feeling heavy.
- **Level 2 (Active/Floating):** Used for primary buttons or active states, featuring a slightly more pronounced shadow to indicate interactivity.

Low-contrast outlines (1px border in a slightly darker gray) may be used on cards to ensure visibility on high-brightness screens.

## Shapes
Following the **Rounded** (Level 2) specification, the system utilizes a friendly yet professional geometric language. 

- **Primary Cards:** Use a 1rem (16px) corner radius to create a modern, approachable feel.
- **Buttons:** Match the 0.5rem (8px) standard radius for a sturdy, reliable appearance.
- **Status Badges & Dots:** Utilize full rounding (pill-shaped) to distinguish them from structural layout elements.
- **Progress Bars:** Feature fully rounded caps to emphasize a fluid, non-binary representation of attendance data.

## Components

### Buttons
- **Primary:** Solid Deep Blue background with White text. Minimum height of 48px for mobile accessibility.
- **Secondary:** Transparent with a Deep Blue border or a light gray tint.
- **Status-Specific:** Large, full-width buttons for "Check-In" should use the Primary brand color.

### Attendance Progress Bars
- **Track:** Light gray background.
- **Indicator:** The fill color dynamically changes based on the absence threshold (Success Green to Critical Red).
- **Labels:** Current percentage should be placed above or within the bar for immediate context.

### Cards
- **Dashboard Cards:** Contain course name, current attendance percentage, and a visual status indicator (colored dot).
- **Detail Cards:** Use nested rows with dividers to separate specific dates of absence.

### Bottom Navigation
- Consistent icon-plus-label format.
- Active state indicated by the Primary Deep Blue color and a subtle top-border or icon fill change.

### Status Indicators
- **Badges:** Small pill-shaped containers with low-opacity background fills of the semantic colors (e.g., light red background with dark red text) for high readability.
- **Dots:** Solid 8px circles used as rapid visual cues in list views.

### Input Fields
- Outlined style with a 1px border.
- Active state uses a 2px Deep Blue border. 
- Labels are persistent and placed above the field to ensure context is never lost during typing.