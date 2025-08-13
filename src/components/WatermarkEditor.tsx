import React, { useState } from 'react';

export default function WatermarkEditor() {
  const [text, setText] = useState('');
  return (
    <div className="rounded border p-4">
      <label className="block text-sm font-medium" htmlFor="wm">
        Watermark
      </label>
      <input
        id="wm"
        className="mt-1 w-full rounded border p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Válido solo para..."
      />
    </div>
  );
}
