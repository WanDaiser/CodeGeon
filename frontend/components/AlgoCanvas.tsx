"use client";

import { useEffect, useRef } from "react";

export default function AlgoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let frame = 0;
    let animationId = 0;
    const bars = [42, 78, 24, 92, 58, 36, 70];

    const draw = () => {
      frame += 1;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#caf0f8";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#023047";
      ctx.fillRect(0, canvas.height - 18, canvas.width, 18);

      bars.forEach((height, index) => {
        const bounce = Math.sin((frame + index * 12) / 18) * 5;
        const x = 22 + index * 38;
        const y = canvas.height - 22 - height + bounce;
        ctx.fillStyle = index === Math.floor((frame / 35) % bars.length) ? "#f77f00" : "#48cae4";
        ctx.fillRect(x, y, 24, height);
        ctx.strokeStyle = "#023047";
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, 24, height);
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={180}
      className="h-full w-full border-4 border-ink bg-sky-100 image-pixelated shadow-pixel"
    />
  );
}
