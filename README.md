# SafeDNI

Local web app to sanitize **Spanish DNI** images for safe sharing.

## What it does
- Load **front & back** photos/scans of a Spanish DNI.
- **Auto-detect** the card, crop & perspective-correct to its 4 corners (with adjustable margin).
- Apply configurable **redactions** over sensitive fields via presets or manual masks.
- Export clean **PNG** or **PDF** files. Processing is 100% **client-side**.

## Features
- Detection & editing powered by **OpenCV.js** with draggable corner handles for manual tweaks.
- Redaction presets for common scenarios (hotel check‑in, car rental, age verification, KYC preview).
- Mask styles: solid block, blur, pixelate or hatch with adjustable opacity and color.
- Optional watermark and grayscale filter on export.
- PWA with offline cache and a service worker that blocks cross‑origin network requests.
- Settings persisted in `localStorage`; no analytics or uploads.

## Tech stack
TypeScript, Vite, React, Tailwind CSS, Zustand, jsPDF, FileSaver. OpenCV.js and Tesseract.js are lazy‑loaded from local assets.

## Status
This repository contains a starter skeleton. See [`spec.md`](./spec.md) for the full implementation plan.

## Development
```bash
npm install
npm run dev
```

### Tests
```bash
npm test
npm run typecheck
```

## Privacy
- No uploads, no analytics, no network calls (except local assets).
- Service worker blocks cross-origin fetch by default.
