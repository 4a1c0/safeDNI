import React from 'react';
import { PRESETS } from '../lib/redactions';

interface Props {
  onSelect: (id: string) => void;
}

export default function PresetPicker({ onSelect }: Props) {
  return (
    <select
      className="rounded border p-2"
      onChange={(e) => onSelect(e.target.value)}
      defaultValue=""
    >
      <option value="" disabled>
        Choose preset
      </option>
      {PRESETS.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  );
}
