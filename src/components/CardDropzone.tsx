import React, { useCallback } from 'react';
import { useAppStore } from '../state/store';
import { detectCardCorners, warpToCard } from '../lib/detection';
import { cvReady } from '../lib/opencv';

async function processFile(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

  const img = new Image();
  img.src = dataUrl;

  await new Promise((res) => (img.onload = res));

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);

  const cv = await cvReady();
  const mat = cv.imread(canvas);
  let warped = mat;
  try {
    const detected = await detectCardCorners(mat);
    if (detected) {
      warped = await warpToCard(mat, detected.pts);
    }
  } catch {
    // ignore detection errors, fall back to original image
  }
  const outCanvas = document.createElement('canvas');
  cv.imshow(outCanvas, warped);

  mat.delete();
  if (warped !== mat) warped.delete();

  return outCanvas.toDataURL('image/png');
}

interface Props {
  side?: 'front' | 'back';
}

export default function CardDropzone({ side = 'front' }: Props) {
  const setImage = useAppStore((s) => (side === 'front' ? s.setFront : s.setBack));

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
      const dataUrl = await processFile(files[0]);
      setImage(dataUrl);
    },
    [setImage],
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="flex h-40 w-full cursor-pointer items-center justify-center rounded border-2 border-dashed border-gray-400 text-gray-500"
    >
      <label className="flex h-full w-full items-center justify-center">
        <span>Drop DNI image here or click to select</span>
        <input type="file" accept="image/*" className="hidden" onChange={onChange} />
      </label>
    </div>
  );
}

