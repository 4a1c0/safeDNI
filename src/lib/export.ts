/**
 * Export a canvas as a PNG Blob.
 */
export async function exportPNG(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob as Blob), 'image/png');
  });
}

// PDF export removed in static build
