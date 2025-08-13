import type { Point } from '../types';

/**
 * Order a set of four points to [top-left, top-right, bottom-right, bottom-left]
 * based on their sums and differences.
 */
export function orderCorners(pts: Point[]): Point[] {
  if (pts.length !== 4) return pts;
  const sum = pts.map(p => p.x + p.y);
  const diff = pts.map(p => p.x - p.y);
  const tl = pts[sum.indexOf(Math.min(...sum))];
  const br = pts[sum.indexOf(Math.max(...sum))];
  const tr = pts[diff.indexOf(Math.max(...diff))];
  const bl = pts[diff.indexOf(Math.min(...diff))];
  return [tl, tr, br, bl];
}

/**
 * Expand a quadrilateral outward by a margin percentage relative to its center.
 */
export function expandQuad(pts: Point[], marginPct: number): Point[] {
  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
  return pts.map(p => ({
    x: p.x + (p.x - cx) * marginPct,
    y: p.y + (p.y - cy) * marginPct,
  }));
}
