import type { Point } from '../types';
import { cvReady } from './opencv';
import { orderCorners, expandQuad } from './geometry';

/**
 * Attempt to detect card corners using OpenCV.js.
 * Placeholder implementation currently returns null.
 */
export async function detectCardCorners(_mat: any): Promise<{ pts: Point[] } | null> {
  await cvReady();
  // TODO: implement detection pipeline
  return null;
}

/**
 * Warp the source image to a normalized card rectangle.
 * This is a placeholder returning null.
 */
export async function warpToCard(_mat: any, _pts: Point[], _heightPx = 1000, _aspect = 85.6 / 53.98, _marginPct = 0.02): Promise<any> {
  await cvReady();
  // TODO: implement perspective transform
  return null;
}
