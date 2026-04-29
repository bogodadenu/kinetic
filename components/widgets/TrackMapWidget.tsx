"use client";

import React, { useEffect, useRef } from 'react';
import WidgetHeader from './WidgetHeader';
import { useF1Store } from '@/store/f1Store';

export default function TrackMapWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { trackName, drivers, selectedDriver } = useF1Store();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        drawMap(ctx, canvas.width, canvas.height);
      }
    };

    const drawMap = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw fake track (Bahrain shape approx)
      ctx.beginPath();
      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) / 300;
      
      ctx.moveTo(cx - 100*scale, cy - 80*scale);
      ctx.bezierCurveTo(cx + 80*scale, cy - 120*scale, cx + 120*scale, cy - 20*scale, cx + 50*scale, cy + 40*scale);
      ctx.bezierCurveTo(cx - 20*scale, cy + 100*scale, cx - 120*scale, cy + 120*scale, cx - 100*scale, cy - 80*scale);
      
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 15 * scale;
      ctx.stroke();
      
      // Draw cars on track (mock positions based on driver progress using current date ms for animation)
      const now = Date.now();
      drivers.forEach((driver, i) => {
        const progress = ((now / 10000) * (1 + (drivers.length - i)*0.01) + i * 0.1) % 1;
        // Super simple point on oval for demo purposes:
        const angle = progress * Math.PI * 2;
        const x = cx + Math.cos(angle) * 70 * scale - 20 * scale;
        const y = cy + Math.sin(angle) * 60 * scale;

        ctx.beginPath();
        ctx.arc(x, y, 6 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `#${driver.team_colour}`;
        ctx.fill();

        if (driver.driver_number === selectedDriver) {
          ctx.beginPath();
          ctx.arc(x, y, 10 * scale, 0, Math.PI * 2);
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    };

    window.addEventListener('resize', resize);
    resize();
    
    let animationId: number;
    const animate = () => {
      resize(); // redrawing on every frame for the dots moving
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [drivers, selectedDriver]);

  return (
    <>
      <div className="flex-1 w-full h-full relative overflow-hidden flex flex-col items-center justify-center -m-3">
         <div className="absolute top-4 left-4 z-10 pointer-events-none">
           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Track Position</span>
         </div>
         <canvas ref={canvasRef} className="absolute inset-0" />
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <p className="text-[9px] text-gray-600 font-mono">TELEMETRY OVERLAY ACTIVE</p>
         </div>
         <div className="absolute bottom-4 right-4 flex gap-4 text-xs font-mono z-10 pointer-events-none">
           <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> VER</div>
           <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-400"></span> MCL</div>
         </div>
      </div>
    </>
  );
}
