#!/bin/bash

# Stage all changes
echo "📦 Staging changes..."
git add -A

# Commit dengan mesej yang descriptive
echo "💾 Creating commit..."
git commit -m "feat: add smooth animations and transitions

✨ Features:
- Added global CSS animations (fadeIn, slideUp, scaleIn, shimmer, spin)
- Implemented page transitions with fade effects
- Added card hover animations (lift & scale)
- Staggered list animations for better UX
- Loading skeletons with pulse & shimmer effects

🎨 UI Improvements:
- Replaced spinner divs with Loader2 icon from lucide-react
- Enhanced button hover effects with scale & shadow
- Improved dialog/modal animations
- Added backdrop blur to sticky header
- Professional stat card animations
- Activity feed with smooth hover transitions

🐛 Bug Fixes:
- Fixed missing closing parentheses in AllTables.tsx
- Fixed duplicate empty state section
- Added missing @keyframes spin animation
- Ensured all spinners rotate properly

📚 Documentation:
- Created docs/ANIMATIONS.md with full animation guide
- Updated README.md with animations documentation link
- Updated CLEANUP_SUMMARY.md with animation notes

♿ Accessibility:
- Added prefers-reduced-motion support
- Hardware accelerated animations (GPU)
- Smooth 60fps performance
- Graceful degradation for older browsers

Files modified:
- src/index.css
- src/App.tsx
- src/pages/AllTables.tsx
- src/pages/Overview.tsx
- src/pages/TableDetail.tsx
- docs/ANIMATIONS.md (new)
- README.md
- CLEANUP_SUMMARY.md"

echo ""
echo "✅ Commit created successfully!"
echo ""
git log -1 --oneline
