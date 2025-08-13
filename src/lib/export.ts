/**
 * Export a canvas as a PNG Blob.
 */
export async function exportPNG(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob as Blob), 'image/png');
  });
}

/**
 * Export a canvas into a jsPDF instance.
 */
export async function exportPDF(canvas: HTMLCanvasElement) {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [canvas.width, canvas.height],
  });
  const img = canvas.toDataURL('image/png');
  pdf.addImage(img, 'PNG', 0, 0, canvas.width, canvas.height);
  return pdf;
}
