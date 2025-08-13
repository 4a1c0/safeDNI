import { describe, it, expect } from 'vitest';
import { orderCorners, expandQuad } from '../geometry';

describe('geometry utilities', () => {
  it('orders corners correctly', () => {
    const pts = [
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ];
    const ordered = orderCorners(pts);
    expect(ordered).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ]);
  });

  it('expands quad around center', () => {
    const pts = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    const expanded = expandQuad(pts, 0.1);
    expect(expanded[0].x).toBeLessThan(0);
    expect(expanded[0].y).toBeLessThan(0);
    expect(expanded[2].x).toBeGreaterThan(1);
    expect(expanded[2].y).toBeGreaterThan(1);
  });
});
