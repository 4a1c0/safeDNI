import React from 'react';
import { saveAs } from 'file-saver';
import { exportPNG } from '../lib/export';
import type { FieldRegion } from '../types';

interface Props {
  image: string;
  fieldMap: FieldRegion[];
  masked: Record<string, { opacity?: number }>;
}

export default function ExportPanel({ image, fieldMap, masked }: Props) {
  const handleExport = async () => {
    const img = new Image();
    img.src = image;
    await new Promise((res) => (img.onload = res));

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    fieldMap
      .filter((f) => masked[f.id])
      .forEach((f) => {
        const pts = f.polygon.map((p) => ({ x: p.x * canvas.width, y: p.y * canvas.height }));
        ctx.fillStyle = 'black';
        ctx.globalAlpha = masked[f.id].opacity ?? 0.9;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.closePath();
        ctx.fill();
      });

    const blob = await exportPNG(canvas);
    saveAs(blob, 'dni.png');
  };

  return (
    <div className="rounded border p-4">
      <h2 className="mb-2 font-semibold">Export</h2>
      <button className="rounded bg-green-600 px-4 py-2 text-white" onClick={handleExport}>
        Download PNG
      </button>
    </div>
  );
}
