"use client";

import React, { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function GlowBackground() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    let active = true;
    const rafId = requestAnimationFrame(() => {
      if (active) setMounted(true);
    });

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      active = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: Node[] = [];

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      initNodes(width, height);
    };

    const initNodes = (width: number, height: number) => {
      // Reduce particle count on mobile screens for 60fps performance
      const isMobile = width < 768;
      const count = isMobile ? 18 : 45;
      nodes = [];

      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2 + 1
        });
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const draw = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const maxDistance = 120; // Distance to draw connecting lines

      // Update and draw nodes
      nodes.forEach((node) => {
        // Apply velocity
        node.x += node.vx;
        node.y += node.vy;

        // Wall collisions
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Push away from mouse slightly on close proximity
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            node.x += (dx / dist) * force * 1.5;
            node.y += (dy / dist) * force * 1.5;
          }
        }

        // Draw node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 180, 216, 0.15)";
        ctx.fill();
      });

      // Draw connecting lines between nodes
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Line opacity scales with proximity
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.strokeStyle = `rgba(114, 9, 183, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Dynamic Cursor Orb Follower */}
      <div
        className="glow-orb hidden md:block"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          position: "fixed",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
      />

      {/* Interactive Vertices Node Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none opacity-80"
      />

      {/* SVG Analog Noise Texture Overlay */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-[0.015] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.8" 
              numOctaves="3" 
              stitchTiles="stitch" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </>
  );
}
