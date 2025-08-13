import React from 'react';
import type { FieldRegion } from '../types';

interface Props {
  fieldMap: FieldRegion[];
  masked: Record<string, { opacity?: number }>;
  width: number;
  height: number;
}

export default function RedactionOverlay({ fieldMap, masked, width, height }: Props) {
  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      {fieldMap
        .filter((f) => masked[f.id])
        .map((f) => (
          <polygon
            key={f.id}
            points={f.polygon.map((p) => `${p.x * width},${p.y * height}`).join(' ')}
            fill="black"
            opacity={masked[f.id].opacity ?? 0.9}
          />
        ))}
    </svg>
  );
}

