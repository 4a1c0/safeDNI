# SafeDNI — Implementation Spec

**Goal:** Offline web app to load front/back images of a Spanish DNI, auto-detect the card, crop & perspective-correct with adjustable margin, and apply configurable redactions over sensitive zones. Everything runs **locally** in the browser.

## Core features
- Card detection (OpenCV.js): grayscale → blur → Canny → findContours → select 4-sided polygon → order corners → homography → warp to ID-1 aspect (85.60×53.98 mm).
- Manual corner editor with draggable handles; margin slider.
- Normalized field maps (0..1) for front/back; presets for typical redaction scenarios (hotel check-in, car rental, age check, KYC preview).
- Redaction styles: block, blur, pixelate, hatch (canvas-based); per-field toggles.
- Export PNG + PDF (optional grayscale; watermark “Válido solo para X – YYYY-MM-DD”). Draw-to-canvas to strip EXIF.
- PWA; no external requests; settings & custom presets in localStorage.

## Structure
```
/src
  /components
    CardDropzone.tsx
    CornerEditorCanvas.tsx
    RedactionOverlay.tsx
    PresetPicker.tsx
    Toolbar.tsx
    ExportPanel.tsx
    WatermarkEditor.tsx
  /lib
    opencv.ts        # async loader + helpers
    geometry.ts      # perspective + margin + corner ordering
    detection.ts     # card detection
    redactions.ts    # field regions + presets
    export.ts        # PNG/PDF export
    sw-guard.ts      # service worker helpers
  /state/store.ts
  /pages/App.tsx
  /types.ts
public/
  manifest.webmanifest
  icons/
  opencv/           # place OpenCV wasm assets here later
```
This starter repo provides minimal placeholders for each file.

## Sensitive field IDs
Front: `photo`, `nif`, `full_name`, `signature`, `dob`, `sex`, `nationality`, `validity`, `issue`, `can`, `idesp_window`, `serial`  
Back: `address`, `place_of_birth`, `parents`, `issuing_office`, `chip_zone`, `mrz`

> Note: Include **MRZ** band and **CAN** (Card Access Number) in presets by default.

## Roadmap
1. Implement `opencv.ts` loader & `detection.ts` with basic four-corner detection.
2. Wire `CornerEditorCanvas` with manual handles + margin.
3. Add `redactions.ts` normalized polygons + `PresetPicker`.
4. Implement `RedactionOverlay` and `export.ts` (PNG/PDF).
5. Add optional OCR hints (Tesseract.js) for NIF/MRZ localization.
