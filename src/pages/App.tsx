import React, { useRef, useState, useEffect } from 'react';
import CardDropzone from '../components/CardDropzone';
import PresetPicker from '../components/PresetPicker';
import RedactionOverlay from '../components/RedactionOverlay';
import ExportPanel from '../components/ExportPanel';
import { FIELD_MAP_FRONT, PRESETS } from '../lib/redactions';
import { useAppStore } from '../state/store';

export default function App() {
  const frontImage = useAppStore((s) => s.frontImage);
  const imgRef = useRef<HTMLImageElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [masked, setMasked] = useState<Record<string, { opacity?: number }>>({});

  useEffect(() => {
    if (frontImage && imgRef.current) {
      const img = imgRef.current;
      const update = () => setSize({ w: img.naturalWidth, h: img.naturalHeight });
      if (img.complete) update();
      else img.onload = update;
    }
  }, [frontImage]);

  const handlePreset = (id: string) => {
    const preset = PRESETS.find((p) => p.id === id);
    if (!preset) return;
    const m: Record<string, { opacity?: number }> = {};
    preset.fields.forEach((f) => {
      m[f] = { opacity: preset.defaults?.opacity };
    });
    setMasked(m);
  };

  return (
    <main className="min-h-screen p-4 text-gray-800 dark:text-gray-100">
      <h1 className="mb-4 text-center text-3xl font-bold">SafeDNI</h1>
      <div className="mx-auto max-w-xl space-y-4">
        <CardDropzone />
        {frontImage && (
          <div className="relative inline-block">
            <img ref={imgRef} src={frontImage} alt="DNI" className="max-w-full" />
            <RedactionOverlay fieldMap={FIELD_MAP_FRONT} masked={masked} width={size.w} height={size.h} />
          </div>
        )}
        <div className="flex gap-2">
          <PresetPicker onSelect={handlePreset} />
        </div>
        {frontImage && <ExportPanel image={frontImage} fieldMap={FIELD_MAP_FRONT} masked={masked} />}
      </div>
    </main>
  );
}
