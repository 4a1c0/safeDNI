# SafeDNI

Local web app to sanitize **Spanish DNI** images for safe sharing.

## What it does
- Load **front & back** photos/scans of a Spanish DNI.
- **Auto-detect** the card, crop & perspective-correct to its 4 corners (with adjustable margin).
- **Auto-redact** or **manually choose** sensitive fields to cover.
- Export clean **PNG/PDF** versions. 100% **client-side** (privacy by design).

## Tech
TypeScript + Vite + React, TailwindCSS, Zustand. PWA with offline cache. OpenCV.js and Tesseract.js will be lazy-loaded (all local).

## Status
This is a starter skeleton. See `spec.md` for the full implementation plan.

## Quick start
```bash
pnpm i   # or npm i / yarn
pnpm dev # or npm run dev / yarn dev
```

## Privacy
- No uploads, no analytics, no network calls (except local assets).
- Service worker blocks cross-origin fetch by default.
