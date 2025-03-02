
# CSS Directory

This directory contains all CSS files for the Art&You platform.

## Files

- `main.css` - Primary stylesheet that contains custom styles beyond what Tailwind provides

## Approach

The styling approach uses Tailwind CSS as the primary framework which is loaded via CDN. Custom styles in `main.css` extend Tailwind functionality when needed.

### Key Custom Components

- Loading animations
- Gallery item styling
- Auction card effects
- Modal designs
- Custom form elements
- Mobile menu animations

## Notes for Developers

- Always prioritize Tailwind utility classes when possible
- Use custom CSS only when Tailwind cannot easily accomplish the desired effect
- Mobile-first approach is used throughout
- Custom animations should be placed in main.css
