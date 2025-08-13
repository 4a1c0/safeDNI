import React from 'react';
import { PRESETS } from '../lib/redactions';

export default function PresetPicker() {
  return (
    <select className="rounded border p-2">
      <option value="">Choose preset</option>
      {PRESETS.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  );
}
