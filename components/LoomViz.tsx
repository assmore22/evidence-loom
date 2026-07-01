"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { scalePoint } from "d3-scale";
import { line, curveBasis } from "d3-shape";
import { STATUS_COLOR } from "@/lib/genlayer/types";
import type { Thread } from "@/lib/genlayer/types";

export function LoomViz({ threads, onSelect, height = 420 }: { threads: Thread[]; onSelect?: (id: number) => void; height?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(640);
  useLayoutEffect(() => {
    const el = wrap.current; if (!el) return;
    const ro = new ResizeObserver((e) => { const nw = Math.round(e[0]?.contentRect.width ?? 0); if (nw > 0) setW((p) => (Math.abs(p - nw) > 1 ? nw : p)); });
    ro.observe(el); return () => ro.disconnect();
  }, []);
  const pad = 24;
  const y = scalePoint<number>().domain(threads.map((t) => t.id)).range([pad, Math.max(height - pad, pad + 1)]).padding(0.6);
  const warpCount = 7;
  const mk = line<[number, number]>().x((d) => d[0]).y((d) => d[1]).curve(curveBasis);
  const pathFor = (tid: number, idx: number) => {
    const cy = y(tid) ?? pad;
    const pts: [number, number][] = [];
    for (let i = 0; i <= warpCount; i++) {
      const x = pad + (i / warpCount) * (w - pad * 2);
      const wobble = (i % 2 === 0 ? 1 : -1) * (6 + (idx % 3) * 2);
      pts.push([x, cy + (i === 0 || i === warpCount ? 0 : wobble)]);
    }
    return mk(pts) ?? "";
  };
  return (
    <figure ref={wrap} className="w-full">
      <svg viewBox={`0 0 ${w} ${height}`} width="100%" role="img" aria-labelledby="lt ld" className="overflow-visible">
        <title id="lt">Evidence weave</title>
        <desc id="ld">{threads.length} threads; upheld in indigo, frayed in madder, unassessed in ochre.</desc>
        {/* warp guide lines */}
        {Array.from({ length: warpCount + 1 }).map((_, i) => {
          const x = pad + (i / warpCount) * (w - pad * 2);
          return <line key={i} x1={x} y1={pad - 8} x2={x} y2={height - pad + 8} stroke="rgba(40,33,24,0.08)" strokeWidth={1} />;
        })}
        {threads.map((t, idx) => (
          <path key={t.id} d={pathFor(t.id, idx)} fill="none" stroke={STATUS_COLOR[t.status]} strokeWidth={t.status === 0 ? 2 : 4}
            strokeDasharray={t.status === 2 ? "8 5" : undefined} opacity={t.status === 0 ? 0.7 : 0.95}
            style={{ cursor: onSelect ? "pointer" : "default" }} onClick={() => onSelect && onSelect(t.id)}>
            <title>{t.claim}</title>
          </path>
        ))}
        {threads.map((t) => {
          const cy = y(t.id) ?? pad;
          return <text key={"l" + t.id} x={pad} y={cy - 8} fontSize={10} fill="#2A2118" className="mono">#{String(t.id + 1).padStart(2, "0")}</text>;
        })}
      </svg>
    </figure>
  );
}
