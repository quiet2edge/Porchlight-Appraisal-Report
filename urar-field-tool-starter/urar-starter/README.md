# URAR Field Tool Starter

This is a local-first starter for an iPad-friendly appraisal field app built around a flat URAR PDF overlay workflow.

## Included
- Next.js TypeScript starter
- Normalized URAR field definitions
- First-pass overlay coordinate map
- PDF overlay renderer with overflow addendum support
- Dexie local database schema
- Minimal dashboard and new-job screen
- Sample flat URAR template in `public/templates/urar-flat-template.pdf`

## Install
```bash
npm install
npm run dev
```

## Current status
This is a scaffold, not a finished product. The coordinate map is a first pass and should be tuned against real output renders.

## Next practical steps
1. Add more URAR fields to the overlay map.
2. Build the section-by-section job editor screens.
3. Add photo capture and photo addendum pages.
4. Add Apple Pencil signature capture.
5. Add sync queue and Supabase integration.
