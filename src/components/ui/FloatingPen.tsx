"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useSpring } from "framer-motion";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface PathPoint {
  x: number;
  y: number;
  lift?: boolean;
  travel?: boolean;
}

// Geometric stroke segments defining uppercase "NISHANT" in a technical blueprint/plotter style
const rawStrokes: PathPoint[][] = [
  // N
  [
    { x: 0, y: 0 },
    { x: 0, y: 40 },
    { x: 24, y: 0 },
    { x: 24, y: 40 }
  ],
  // I
  [
    { x: 38, y: 40 },
    { x: 38, y: 0 }
  ],
  // S
  [
    { x: 64, y: 40 },
    { x: 50, y: 40 },
    { x: 50, y: 20 },
    { x: 64, y: 20 },
    { x: 64, y: 0 },
    { x: 50, y: 0 }
  ],
  // H
  [
    { x: 76, y: 40 },
    { x: 76, y: 0 }
  ],
  [
    { x: 76, y: 20 },
    { x: 96, y: 20 }
  ],
  [
    { x: 96, y: 40 },
    { x: 96, y: 0 }
  ],
  // A
  [
    { x: 108, y: 0 },
    { x: 120, y: 40 },
    { x: 132, y: 0 }
  ],
  [
    { x: 114, y: 16 },
    { x: 126, y: 16 }
  ],
  // N
  [
    { x: 144, y: 0 },
    { x: 144, y: 40 },
    { x: 168, y: 0 },
    { x: 168, y: 40 }
  ],
  // T
  [
    { x: 180, y: 40 },
    { x: 204, y: 40 }
  ],
  [
    { x: 192, y: 40 },
    { x: 192, y: 0 }
  ]
];

// Generates high-density interpolated points along the geometric strokes
const generateGeometricPath = (strokes: PathPoint[][], stepLength: number = 1.2): PathPoint[] => {
  const path: PathPoint[] = [];

  for (let s = 0; s < strokes.length; s++) {
    const stroke = strokes[s];
    if (stroke.length === 0) continue;

    // Air travel path from the end of the previous stroke to the start of this stroke
    if (s > 0) {
      const prevStroke = strokes[s - 1];
      const pStart = prevStroke[prevStroke.length - 1];
      const pEnd = stroke[0];
      
      const dx = pEnd.x - pStart.x;
      const dy = pEnd.y - pStart.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      
      const steps = Math.max(1, Math.floor(len / stepLength));
      for (let j = 1; j < steps; j++) {
        const ratio = j / steps;
        path.push({
          x: pStart.x + dx * ratio,
          y: pStart.y + dy * ratio,
          lift: true,
          travel: true
        });
      }
    }

    // Start of a new stroke (with lift = true, but travel = false so the pen tip touches)
    path.push({ ...stroke[0], lift: true, travel: false });

    // Interpolate segments within the stroke
    for (let i = 0; i < stroke.length - 1; i++) {
      const p1 = stroke[i];
      const p2 = stroke[i + 1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      
      const steps = Math.max(1, Math.floor(len / stepLength));
      for (let j = 1; j <= steps; j++) {
        const ratio = j / steps;
        path.push({
          x: p1.x + dx * ratio,
          y: p1.y + dy * ratio,
          lift: false,
          travel: false
        });
      }
    }
  }

  return path;
};

// Main Canvas floating stylus writing component
export default function FloatingPen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 18,
    restDelta: 0.0001
  });
  useEffect(() => {
    let active = true;
    const mountRafId = requestAnimationFrame(() => {
      if (active) setMounted(true);
    });

    return () => {
      active = false;
      cancelAnimationFrame(mountRafId);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let renderRequested = false;
    const requestRender = () => {
      if (!renderRequested) {
        renderRequested = true;
        requestAnimationFrame(() => {
          renderRequested = false;
          render();
        });
      }
    };

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      requestRender();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Pre-calculate full high-density geometric coordinate path
    const fullPath = generateGeometricPath(rawStrokes, 1.2);

    // Project 3D coordinate to 2D viewport coordinate
    const project = (pt: Point3D, rotX: number, rotY: number, rotZ: number, scale: number, center: { x: number; y: number }): Point3D => {
      // Y rotation
      let x1 = pt.x * Math.cos(rotY) - pt.z * Math.sin(rotY);
      let z1 = pt.x * Math.sin(rotY) + pt.z * Math.cos(rotY);
      let y1 = pt.y;

      // X rotation
      let y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
      let z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);
      let x2 = x1;

      // Z rotation
      let x3 = x2 * Math.cos(rotZ) - y2 * Math.sin(rotZ);
      let y3 = x2 * Math.sin(rotZ) + y2 * Math.cos(rotZ);
      let z3 = z2;

      const dist = 500;
      const f = dist / (dist + z3);
      
      return {
        x: center.x + x3 * scale * f,
        y: center.y + y3 * scale * f,
        z: z3
      };
    };

    interface Renderable {
      depth: number;
      draw: (c: CanvasRenderingContext2D) => void;
    }

    // Render loop
    const render = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, width, height);

      // Reset shadows to prevent offset rendering of signature path
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Skip rendering on small mobile viewports for performance
      if (width < 768) {
        return;
      }

      // Map progress to path array index
      const progress = smoothProgress.get();
      const currentIndex = Math.floor(progress * (fullPath.length - 1));

      // Calculate centering offset and signature scale
      const margin = 80;
      const pathWidth = 204;
      const pathHeight = 40;
      const pathCenterX = 102;
      const pathCenterY = 20;

      const scaleSignature = Math.min((width - margin * 2) / pathWidth, 1.45);
      const targetCenterX = width * 0.5;
      const targetCenterY = height * 0.32; // Align inside the Hero section

      // Map control points to current screen space coordinates
      const screenPath = fullPath.map((pt) => ({
        x: targetCenterX + (pt.x - pathCenterX) * scaleSignature,
        y: targetCenterY - (pt.y - pathCenterY) * scaleSignature,
        lift: pt.lift,
        travel: pt.travel
      }));

      // Draw the glowing neon text written so far
      if (currentIndex > 0) {
        // Render background blur aura for neon glow
        ctx.beginPath();
        let activePathStarted = false;
        for (let i = 0; i <= currentIndex; i++) {
          const pt = screenPath[i];
          if (pt.lift || !activePathStarted) {
            ctx.moveTo(pt.x, pt.y);
            activePathStarted = true;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.strokeStyle = "rgba(114, 9, 183, 0.16)";
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        // Render main glowing stroke
        ctx.beginPath();
        activePathStarted = false;
        for (let i = 0; i <= currentIndex; i++) {
          const pt = screenPath[i];
          if (pt.lift || !activePathStarted) {
            ctx.moveTo(pt.x, pt.y);
            activePathStarted = true;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        
        // Gradient color: Cyan to Purple over the text path
        const grad = ctx.createLinearGradient(
          targetCenterX - (pathWidth / 2) * scaleSignature,
          targetCenterY,
          targetCenterX + (pathWidth / 2) * scaleSignature,
          targetCenterY
        );
        grad.addColorStop(0, "#00b4d8"); // Neon Cyan
        grad.addColorStop(0.5, "#7209b7"); // Neon Purple
        grad.addColorStop(1, "#f72585"); // Neon Pink

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.8;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      // Render the 3D stylus writing at the current path point
      const currentPoint = screenPath[currentIndex];
      const isTraveling = !!currentPoint?.travel;
      
      const scalePen = 110;
      const penLength = 1.4;
      const penRadius = 0.085;
      const segments = 16;

      // Stylus constant writing posture rotations (slanted naturally for writing)
      const rotX = Math.PI / 4.5; // Tilted towards user screen (approx 40 degrees)
      const rotY = Math.PI / 3 + progress * Math.PI * 1.5; // Subtle Y roll to showcase metallic specular highlight
      const rotZ = Math.PI / 6.5; // Natural diagonal pen slant

      // Project the tip relative to local center (0, 0)
      const tipLength = 0.3;
      const tipPt = { x: 0, y: penLength / 2 + tipLength, z: 0 };
      const projectedTip = project(tipPt, rotX, rotY, rotZ, scalePen, { x: 0, y: 0 });

      // Height offset when traveling in the air
      const travelOffset = isTraveling ? -10 : 0;

      // Shift projection center so the projected tip lands exactly at currentPoint (with Y offset if traveling)
      const center = {
        x: currentPoint.x - projectedTip.x,
        y: currentPoint.y - projectedTip.y + travelOffset
      };

      const items: Renderable[] = [];

      // 1. Pen metallic cylinder bodies
      for (let i = 0; i < segments; i++) {
        const theta1 = (i / segments) * Math.PI * 2;
        const theta2 = ((i + 1) / segments) * Math.PI * 2;

        const ptA1 = { x: Math.cos(theta1) * penRadius, y: -penLength / 2, z: Math.sin(theta1) * penRadius };
        const ptB1 = { x: Math.cos(theta2) * penRadius, y: -penLength / 2, z: Math.sin(theta2) * penRadius };
        const ptA2 = { x: Math.cos(theta1) * penRadius, y: penLength / 2, z: Math.sin(theta1) * penRadius };
        const ptB2 = { x: Math.cos(theta2) * penRadius, y: penLength / 2, z: Math.sin(theta2) * penRadius };

        const a1 = project(ptA1, rotX, rotY, rotZ, scalePen, center);
        const b1 = project(ptB1, rotX, rotY, rotZ, scalePen, center);
        const a2 = project(ptA2, rotX, rotY, rotZ, scalePen, center);
        const b2 = project(ptB2, rotX, rotY, rotZ, scalePen, center);

        const avgZ = (a1.z + b1.z + a2.z + b2.z) / 4;

        // Dynamic culling condition based on exact camera-space normal sign
        const midTheta = (theta1 + theta2) / 2;
        const isFacingCamera = Math.sin(midTheta + rotY) * Math.cos(rotX) < 0;

        if (isFacingCamera) {
          const normalX = Math.cos(midTheta);
          const normalZ = Math.sin(midTheta);
          const lightIntensity = Math.max(0.1, (normalX * 0.65 + normalZ * 0.75 + 1) / 2);
          const spec = Math.pow(lightIntensity, 10) * 0.35;
          const r = Math.round(230 * lightIntensity + 25 * spec);
          const g = Math.round(235 * lightIntensity + 20 * spec);
          const b = Math.round(245 * lightIntensity + 10 * spec);

          items.push({
            depth: avgZ,
            draw: (c) => {
              c.beginPath();
              c.moveTo(a1.x, a1.y);
              c.lineTo(b1.x, b1.y);
              c.lineTo(b2.x, b2.y);
              c.lineTo(a2.x, a2.y);
              c.closePath();

              c.fillStyle = `rgba(${r}, ${g}, ${b}, 0.58)`;
              c.strokeStyle = `rgba(${r + 10}, ${g + 10}, ${b + 10}, 0.28)`;
              c.lineWidth = 0.5;
              c.fill();
              c.stroke();
            }
          });
        }
      }

      // 2. Stylus conical writing tip
      const tipProjected = project(tipPt, rotX, rotY, rotZ, scalePen, center);

      for (let i = 0; i < segments; i++) {
        const theta1 = (i / segments) * Math.PI * 2;
        const theta2 = ((i + 1) / segments) * Math.PI * 2;

        const ptA = { x: Math.cos(theta1) * penRadius, y: penLength / 2, z: Math.sin(theta1) * penRadius };
        const ptB = { x: Math.cos(theta2) * penRadius, y: penLength / 2, z: Math.sin(theta2) * penRadius };

        const a = project(ptA, rotX, rotY, rotZ, scalePen, center);
        const b = project(ptB, rotX, rotY, rotZ, scalePen, center);

        const avgZ = (a.z + b.z + tipProjected.z) / 3;
        
        const midTheta = (theta1 + theta2) / 2;
        const isFacingCamera = Math.sin(midTheta + rotY) * Math.cos(rotX) < 0;

        if (isFacingCamera) {
          items.push({
            depth: avgZ,
            draw: (c) => {
              c.beginPath();
              c.moveTo(a.x, a.y);
              c.lineTo(b.x, b.y);
              c.lineTo(tipProjected.x, tipProjected.y);
              c.closePath();

              c.fillStyle = "rgba(30, 41, 59, 0.65)"; // Dark carbon writing tip
              c.strokeStyle = "rgba(255, 255, 255, 0.15)";
              c.fill();
              c.stroke();
            }
          });
        }
      }

      // 3. Glowing LED ring
      const ringY = -penLength / 4;
      const ringRadius = penRadius + 0.002;

      for (let i = 0; i < segments; i++) {
        const theta1 = (i / segments) * Math.PI * 2;
        const theta2 = ((i + 1) / segments) * Math.PI * 2;

        const ptA = { x: Math.cos(theta1) * ringRadius, y: ringY, z: Math.sin(theta1) * ringRadius };
        const ptB = { x: Math.cos(theta2) * ringRadius, y: ringY, z: Math.sin(theta2) * ringRadius };

        const a = project(ptA, rotX, rotY, rotZ, scalePen, center);
        const b = project(ptB, rotX, rotY, rotZ, scalePen, center);

        const avgZ = (a.z + b.z) / 2;
        
        const midTheta = (theta1 + theta2) / 2;
        const isFacingCamera = Math.sin(midTheta + rotY) * Math.cos(rotX) < 0;

        if (isFacingCamera) {
          items.push({
            depth: avgZ,
            draw: (c) => {
              c.shadowColor = "rgba(0, 180, 216, 0.85)";
              c.shadowBlur = 18;
              c.shadowOffsetX = 0;
              c.shadowOffsetY = 0;
              
              c.beginPath();
              c.moveTo(a.x, a.y);
              c.lineTo(b.x, b.y);
              c.strokeStyle = `rgba(0, 180, 216, ${0.75 + Math.sin(rotY * 2) * 0.25})`;
              c.lineWidth = 3;
              c.stroke();
              
              c.shadowColor = "transparent";
              c.shadowBlur = 0;
            }
          });
        }
      }

      // Sort items back-to-front
      items.sort((a2_item, b2_item) => b2_item.depth - a2_item.depth);

      // Render shadows on canvas - adjust shadow size/blur/color when floating
      ctx.shadowColor = isTraveling ? "rgba(114, 9, 183, 0.03)" : "rgba(114, 9, 183, 0.06)";
      ctx.shadowBlur = isTraveling ? 60 : 40;
      ctx.shadowOffsetX = isTraveling ? 18 : 10;
      ctx.shadowOffsetY = isTraveling ? 50 : 40;

      items.forEach((item) => item.draw(ctx));
      
      // Reset shadows completely
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    };

    // Initial render call
    requestRender();

    // Re-render when scroll progress changes
    const unsubscribeProgress = smoothProgress.on("change", () => {
      requestRender();
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      unsubscribeProgress();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, smoothProgress]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="block w-full h-full opacity-65" />
    </div>
  );
}

