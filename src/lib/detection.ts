import type { Point } from '../types';
import { cvReady } from './opencv';
import { orderCorners, expandQuad } from './geometry';

/**
 * Attempt to detect card corners using OpenCV.js.
 * Returns ordered points or null if detection fails.
 */
export async function detectCardCorners(mat: any): Promise<{ pts: Point[] } | null> {
  const cv = await cvReady();

  const gray = new cv.Mat();
  cv.cvtColor(mat, gray, cv.COLOR_RGBA2GRAY, 0);
  const blurred = new cv.Mat();
  cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);
  const edges = new cv.Mat();
  cv.Canny(blurred, edges, 50, 150);

  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

  let best: Point[] | null = null;
  let bestArea = 0;
  for (let i = 0; i < contours.size(); i++) {
    const cnt = contours.get(i);
    const peri = cv.arcLength(cnt, true);
    const approx = new cv.Mat();
    cv.approxPolyDP(cnt, approx, 0.02 * peri, true);
    if (approx.rows === 4) {
      const area = cv.contourArea(approx);
      if (area > bestArea) {
        bestArea = area;
        const pts: Point[] = [];
        const data = approx.data32S;
        for (let j = 0; j < data.length; j += 2) {
          pts.push({ x: data[j], y: data[j + 1] });
        }
        best = pts;
      }
    }
    cnt.delete();
    approx.delete();
  }

  gray.delete();
  blurred.delete();
  edges.delete();
  contours.delete();
  hierarchy.delete();

  if (!best) return null;
  return { pts: orderCorners(best) };
}

/**
 * Warp the source image to a normalized card rectangle.
 */
export async function warpToCard(
  mat: any,
  pts: Point[],
  heightPx = 1000,
  aspect = 85.6 / 53.98,
  marginPct = 0.02,
): Promise<any> {
  const cv = await cvReady();
  const expanded = expandQuad(pts, marginPct);
  const widthPx = Math.round(heightPx * aspect);

  const srcPts = cv.matFromArray(4, 1, cv.CV_32FC2, [
    expanded[0].x,
    expanded[0].y,
    expanded[1].x,
    expanded[1].y,
    expanded[2].x,
    expanded[2].y,
    expanded[3].x,
    expanded[3].y,
  ]);
  const dstPts = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, widthPx, 0, widthPx, heightPx, 0, heightPx]);
  const M = cv.getPerspectiveTransform(srcPts, dstPts);
  const dst = new cv.Mat();
  const size = new cv.Size(widthPx, heightPx);
  cv.warpPerspective(mat, dst, M, size, cv.INTER_LINEAR, cv.BORDER_REPLICATE, new cv.Scalar());

  srcPts.delete();
  dstPts.delete();
  M.delete();

  return dst;
}
