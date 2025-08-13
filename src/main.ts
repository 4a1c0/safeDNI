import { saveAs } from 'file-saver';
import './index.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.error('Service worker registration failed', err);
    });
  });
}

const frontInput = document.getElementById('front-input') as HTMLInputElement | null;
const frontPreview = document.getElementById('front-preview') as HTMLImageElement | null;
const saveFront = document.getElementById('save-front');

frontInput?.addEventListener('change', () => {
  const file = frontInput.files?.[0];
  if (file && frontPreview) {
    frontPreview.src = URL.createObjectURL(file);
    frontPreview.classList.remove('hidden');
  }
});

saveFront?.addEventListener('click', () => {
  if (frontPreview?.src) {
    fetch(frontPreview.src)
      .then(res => res.blob())
      .then(blob => saveAs(blob, 'dni-front.png'));
  }
});
