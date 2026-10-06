import { useEffect, useRef } from "react";

interface Props {
  speed?: number;
  squareSize?: number;
  direction?: "diagonal" | "right" | "left" | "up" | "down";
  borderColor?: string;
  hoverFillColor?: string;
}

export function ShapeGrid({
  speed = 0.17,
  squareSize = 40,
  direction = "diagonal",
  borderColor = "#29ae6b",
  hoverFillColor = "#10b959",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hover = useRef<{ x: number; y: number } | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const ox = offset.current.x % squareSize;
      const oy = offset.current.y % squareSize;

      for (let x = -squareSize; x < width + squareSize; x += squareSize) {
        for (let y = -squareSize; y < height + squareSize; y += squareSize) {
          const sx = x - ox;
          const sy = y - oy;
          const gx = Math.floor((x + ox) / squareSize);
          const gy = Math.floor((y + oy) / squareSize);
          if (hover.current && hover.current.x === gx && hover.current.y === gy) {
            ctx.fillStyle = hoverFillColor;
            ctx.globalAlpha = 0.35;
            ctx.fillRect(sx, sy, squareSize, squareSize);
            ctx.globalAlpha = 1;
          }
          ctx.strokeStyle = borderColor;
          ctx.globalAlpha = 0.35;
          ctx.lineWidth = 1;
          ctx.strokeRect(sx + 0.5, sy + 0.5, squareSize, squareSize);
          ctx.globalAlpha = 1;
        }
      }

      const g = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, Math.max(width, height) * 0.7);
      g.addColorStop(0, "rgba(10,61,38,0)");
      g.addColorStop(1, "rgba(10,61,38,0.55)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    };

    const tick = () => {
      const s = Math.max(speed, 0.05);
      if (direction === "diagonal" || direction === "right") offset.current.x += s;
      if (direction === "left") offset.current.x -= s;
      if (direction === "diagonal" || direction === "down") offset.current.y += s;
      if (direction === "up") offset.current.y -= s;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left + (offset.current.x % squareSize);
      const my = e.clientY - rect.top + (offset.current.y % squareSize);
      hover.current = { x: Math.floor(mx / squareSize), y: Math.floor(my / squareSize) };
    };
    const onLeave = () => {
      hover.current = null;
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [speed, squareSize, direction, borderColor, hoverFillColor]);

  return <canvas ref={canvasRef} className="pointer-events-auto absolute inset-0 h-full w-full" />;
}
