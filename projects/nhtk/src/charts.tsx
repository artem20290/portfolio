export const INCIDENT_TYPES = [
  "микротравма",
  "без потери времени",
  "с потерей времени",
  "авария",
  "почти-событие",
  "экологический инцидент",
  "пожар",
] as const;

const INCIDENT_STYLE: Record<string, { color: string; from: string }> = {
  микротравма: { color: "#0f766e", from: "#5eead4" },
  "без потери времени": { color: "#1d4ed8", from: "#93c5fd" },
  "с потерей времени": { color: "#b91c1c", from: "#fca5a5" },
  авария: { color: "#7c2d12", from: "#fdba74" },
  "почти-событие": { color: "#b45309", from: "#fcd34d" },
  "экологический инцидент": { color: "#047857", from: "#6ee7b7" },
  пожар: { color: "#c2410c", from: "#fdba74" },
};

function wrapLabel(text: string, max = 16) {
  if (text.length <= max) return [text];
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > max && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

export type ChartRow = { name: string; value: number; color?: string };

const PALETTE = ["#0a3d26", "#10b959", "#0e7490", "#b45309", "#7c3aed", "#be123c", "#1d4ed8", "#64748b"];

export function countBy<T>(rows: T[], key: (row: T) => string): ChartRow[] {
  const map: Record<string, number> = {};
  rows.forEach((row) => {
    const k = key(row) || "—";
    map[k] = (map[k] || 0) + 1;
  });
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value], i) => ({ name, value, color: PALETTE[i % PALETTE.length] }));
}

export function BarChartBlock({
  data,
  color,
}: {
  data: ChartRow[];
  color?: string;
}) {
  if (!data.length) {
    return <div className="grid h-full min-h-[180px] place-items-center text-sm text-slate-400">Нет данных</div>;
  }

  const max = Math.max(1, ...data.map((d) => d.value));
  const labelW = 118;
  const valueW = 36;
  const rowH = 44;
  const padX = 8;
  const padTop = 8;
  const w = 640;
  const plotW = w - labelW - valueW - padX * 2;
  const h = padTop * 2 + data.length * rowH;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" role="img" aria-label="Столбчатый график">
      {data.map((d, i) => {
        const y = padTop + i * rowH;
        const fill = d.color || color || PALETTE[i % PALETTE.length];
        const barW = d.value <= 0 ? 0 : Math.max(6, (d.value / max) * plotW);
        const lines = wrapLabel(d.name);
        return (
          <g key={`${d.name}-${i}`}>
            {lines.map((line, li) => (
              <text
                key={line}
                x={labelW - 8}
                y={y + 22 + (li - (lines.length - 1) / 2) * 11}
                textAnchor="end"
                fontSize="11"
                fill="#475569"
              >
                {line}
              </text>
            ))}
            <rect x={labelW} y={y + 10} width={plotW} height={22} rx="11" fill="#e8f2ec" />
            {barW > 0 && (
              <rect x={labelW} y={y + 10} width={barW} height={22} rx="11" fill={fill}>
                <title>
                  {d.name}: {d.value}
                </title>
              </rect>
            )}
            <text x={labelW + plotW + 8} y={y + 26} fontSize="12" fontWeight="700" fill="#0a3d26">
              {d.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function LineChartBlock({ data, color = "#0a3d26" }: { data: { m: string; v: number }[]; color?: string }) {
  const w = 640;
  const h = 180;
  const pad = 28;
  const max = Math.max(1, ...data.map((d) => d.v));
  const min = Math.min(...data.map((d) => d.v), 0);
  const span = Math.max(1, max - min);
  const pts = data.map((d, i) => {
    const x = pad + (i / Math.max(1, data.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (d.v - min) / span) * (h - pad * 2);
    return { ...d, x, y };
  });
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full min-h-[160px]">
      {pts.map((p) => (
        <g key={p.m}>
          <line x1={p.x} x2={p.x} y1={pad} y2={h - pad} stroke="#e2eee8" />
          <text x={p.x} y={h - 6} textAnchor="middle" fontSize="11" fill="#64748b">
            {p.m}
          </text>
        </g>
      ))}
      <path d={path} fill="none" stroke={color} strokeWidth="3" />
      {pts.map((p) => (
        <circle key={p.m} cx={p.x} cy={p.y} r="4.5" fill="#fff" stroke={color} strokeWidth="2">
          <title>
            {p.m}: {p.v}
          </title>
        </circle>
      ))}
    </svg>
  );
}

export function incidentTypeSeries(incidents: { type: string }[]): ChartRow[] {
  return INCIDENT_TYPES.map((name) => ({
    name,
    value: incidents.filter((i) => i.type === name).length,
    color: INCIDENT_STYLE[name].color,
  }));
}

export function IncidentTypeChart({ data }: { data: ChartRow[] }) {
  const rows = data.map((d) => ({
    ...d,
    color: d.color || INCIDENT_STYLE[d.name]?.color || PALETTE[0],
    from: INCIDENT_STYLE[d.name]?.from || "#86efac",
  }));
  const total = rows.reduce((n, d) => n + d.value, 0);
  const max = Math.max(1, ...rows.map((d) => d.value));
  const r = 72;
  const circ = 2 * Math.PI * r;
  let acc = 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:items-center">
      <div className="relative mx-auto h-[220px] w-[220px]">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle cx="100" cy="100" r={r} fill="none" stroke="#e8f2ec" strokeWidth="22" />
          {rows.map((d) => {
            const len = total ? (d.value / total) * circ : 0;
            const dashoffset = -acc;
            acc += len;
            return (
              <circle
                key={d.name}
                cx="100"
                cy="100"
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth="22"
                strokeLinecap="butt"
                strokeDasharray={`${len} ${circ - len}`}
                strokeDashoffset={dashoffset}
              >
                <title>
                  {d.name}: {d.value}
                </title>
              </circle>
            );
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="text-4xl font-black tracking-tight text-[#0a3d26]">{total}</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">всего</div>
          </div>
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex h-[220px] items-end gap-2 sm:gap-3">
          {rows.map((d, i) => (
            <div key={d.name} className="flex min-w-0 flex-1 flex-col items-center justify-end">
              <div className="mb-1 text-sm font-bold text-[#0a3d26]">{d.value}</div>
              <div
                className="nhtk-col w-[70%] max-w-[52px] rounded-t-2xl shadow-[0_8px_18px_rgba(10,61,38,0.12)]"
                style={{
                  height: Math.max(d.value ? 18 : 6, (d.value / max) * 168),
                  background: `linear-gradient(180deg, ${d.from} 0%, ${d.color} 100%)`,
                  animationDelay: `${i * 70}ms`,
                }}
                title={`${d.name}: ${d.value}`}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
          {rows.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-xs text-slate-600">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.color }} />
              <span className="leading-tight">{d.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
