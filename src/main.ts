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
const sourceCanvas = document.getElementById('source-canvas') as HTMLCanvasElement | null;
const cardCanvas = document.getElementById('card-canvas') as HTMLCanvasElement | null;
const marginInput = document.getElementById('margin') as HTMLInputElement | null;
const controls = document.getElementById('controls');
const saveFront = document.getElementById('save-front') as HTMLButtonElement | null;

let originalMat: any | null = null;
let detectedPts: Point[] | null = null;
let dragIndex: number | null = null;

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

async function drawOverlay() {
  if (!sourceCanvas || !originalMat || !detectedPts) return;
  const cv = await cvReady();
  cv.imshow(sourceCanvas, originalMat);
  const ctx = sourceCanvas.getContext('2d');
  if (!ctx) return;
  ctx.strokeStyle = 'lime';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(0,255,0,0.4)';
  ctx.beginPath();
  detectedPts.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.closePath();
  ctx.stroke();
  detectedPts.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
  sourceCanvas.classList.remove('hidden');
}

frontInput?.addEventListener('change', () => {
  const file = frontInput.files?.[0];
  if (!file || !sourceCanvas) return;
  const img = new Image();
  img.onload = async () => {
    sourceCanvas.width = img.width;
    sourceCanvas.height = img.height;
    const ctx = sourceCanvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);
    const cv = await cvReady();
    if (originalMat) originalMat.delete();
    originalMat = cv.imread(sourceCanvas);
    const result = await detectCardCorners(originalMat);
    if (result) {
      detectedPts = result.pts;
      await drawOverlay();
      await renderWarp();
      controls?.classList.remove('hidden');
    }
  };
  img.src = URL.createObjectURL(file);
});

marginInput?.addEventListener('input', () => {
  renderWarp();
});

sourceCanvas?.addEventListener('mousedown', (e) => {
  if (!detectedPts) return;
  const rect = sourceCanvas.getBoundingClientRect();
  const scaleX = sourceCanvas.width / rect.width;
  const scaleY = sourceCanvas.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  detectedPts.forEach((p, i) => {
    if (Math.hypot(p.x - x, p.y - y) < 10) {
      dragIndex = i;
    }
  });
});

window.addEventListener('mousemove', (e) => {
  if (dragIndex === null || !detectedPts || !sourceCanvas) return;
  const rect = sourceCanvas.getBoundingClientRect();
  const scaleX = sourceCanvas.width / rect.width;
  const scaleY = sourceCanvas.height / rect.height;
  detectedPts[dragIndex] = {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
  void drawOverlay();
  void renderWarp();
});

window.addEventListener('mouseup', () => {
  dragIndex = null;
});

saveFront?.addEventListener('click', () => {
  if (!cardCanvas) return;
  cardCanvas.toBlob((blob) => {
    if (blob) saveAs(blob, 'dni-front.png');
  });
});
