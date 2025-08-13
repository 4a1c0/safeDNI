import React, { useRef, useEffect } from 'react';

export default function CornerEditorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  }, []);
  return <canvas ref={canvasRef} className="w-full h-64 bg-gray-200" />;
}
