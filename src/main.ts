import { saveAs } from 'file-saver';
import './index.css';
import type { Point } from './types';
import { detectCardCorners, warpToCard } from './lib/detection';
import { cvReady } from './lib/opencv';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.error('Service worker registration failed', err);
    });
  });
}

const frontInput = document.getElementById('front-input') as HTMLInputElement | null;
const cardCanvas = document.getElementById('card-canvas') as HTMLCanvasElement | null;
const marginInput = document.getElementById('margin') as HTMLInputElement | null;
const controls = document.getElementById('controls');
const saveFront = document.getElementById('save-front') as HTMLButtonElement | null;

let originalMat: any | null = null;
let detectedPts: Point[] | null = null;

async function renderWarp() {
  if (!originalMat || !detectedPts || !cardCanvas || !marginInput) return;
  const margin = Number(marginInput.value);
  const warped = await warpToCard(originalMat, detectedPts, 1000, 85.6 / 53.98, margin);
  cardCanvas.width = warped.cols;
  cardCanvas.height = warped.rows;
  const cv = await cvReady();
  cv.imshow(cardCanvas, warped);
  cardCanvas.classList.remove('hidden');
  warped.delete();
}

frontInput?.addEventListener('change', () => {
  const file = frontInput.files?.[0];
  if (!file) return;
  const img = new Image();
  img.onload = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);
    const cv = await cvReady();
    if (originalMat) originalMat.delete();
    originalMat = cv.imread(canvas);
    const result = await detectCardCorners(originalMat);
    if (result) {
      detectedPts = result.pts;
      await renderWarp();
      controls?.classList.remove('hidden');
    }
  };
  img.src = URL.createObjectURL(file);
});

marginInput?.addEventListener('input', () => {
  renderWarp();
});

saveFront?.addEventListener('click', () => {
  if (!cardCanvas) return;
  cardCanvas.toBlob((blob) => {
    if (blob) saveAs(blob, 'dni-front.png');
  });
});
