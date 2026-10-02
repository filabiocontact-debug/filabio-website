import { useMemo } from "react";

// Lightweight hand-rolled charts (no external chart dependency).

export function LineChart({
  data,
  height = 200,
  valueFormat = (v: number) => String(v),
}: {
  data: { label: string; value: number }[];
  height?: number;
  valueFormat?: (v: number) => string;
}) {
  const W = 640;
  const H = height;
  const padL = 46;
  const padR = 12;
  const padT = 14;
  const padB = 26;

  const { points, max, areaPath, linePath } = useMemo(() => {
    const max = Math.max(1, ...data.map((d) => d.value));
    const stepX = data.length > 1 ? (W - padL - padR) / (data.length - 1) : 0;
    const pts = data.map((d, i) => {
      const x = padL + i * stepX;
      const y = padT + (1 - d.value / max) * (H - padT - padB);
      return { x, y, ...d };
    });
    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const area =
      pts.length > 0
        ? `${line} L${pts[pts.length - 1]!.x.toFixed(1)},${H - padB} L${pts[0]!.x.toFixed(1)},${H - padB} Z`
        : "";
    return { points: pts, max, areaPath: area, linePath: line };
  }, [data, H]);

  if (data.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        Pas encore de données
      </div>
    );
  }

  const gridVals = [0, 0.5, 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Graphique des revenus">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {gridVals.map((g) => {
        const y = padT + g * (H - padT - padB);
        return (
          <g key={g}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="var(--border)" strokeWidth="1" />
            <text x={padL - 8} y={y + 4} textAnchor="end" className="fill-muted-foreground" fontSize="10">
              {valueFormat(Math.round(max * (1 - g)))}
            </text>
          </g>
        );
      })}
      {areaPath ? <path d={areaPath} fill="url(#areaFill)" /> : null}
      {linePath ? (
        <path d={linePath} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinejoin="round" />
      ) : null}
      {points.map((p, i) => (
        <g key={`${p.label}-${i}`}>
          <circle cx={p.x} cy={p.y} r="3.5" fill="var(--primary)" />
          {data.length <= 8 || i % Math.ceil(data.length / 7) === 0 ? (
            <text
              x={p.x}
              y={H - 8}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize="10"
            >
              {p.label}
            </text>
          ) : null}
        </g>
      ))}
      <title>{`Maximum ${valueFormat(max)}`}</title>
    </svg>
  );
}

export function BarList({
  data,
  valueFormat = (v: number) => String(v),
}: {
  data: { label: string; value: number }[];
  valueFormat?: (v: number) => string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  if (data.length === 0) {
    return <div className="py-8 text-center text-sm text-muted-foreground">Aucune donnée</div>;
  }
  return (
    <ul className="space-y-3">
      {data.map((d) => (
        <li key={d.label}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="truncate font-medium text-foreground">{d.label}</span>
            <span className="text-muted-foreground">{valueFormat(d.value)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-500"
              style={{ width: `${Math.max(3, (d.value / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Donut({
  data,
  size = 170,
}: {
  data: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 56;
  const c = 2 * Math.PI * r;

  if (total === 0) {
    return <div className="py-8 text-center text-sm text-muted-foreground">Aucune commande</div>;
  }

  let offset = 0;

  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <svg width={size} height={size} viewBox="0 0 140 140" role="img" aria-label="Répartition des statuts">
        <g transform="translate(70,70) rotate(-90)">
          {data.map((d) => {
            const frac = d.value / total;
            const dash = frac * c;
            const el = (
              <circle
                key={d.label}
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth="18"
                strokeDasharray={`${dash} ${c - dash}`}
                strokeDashoffset={-offset}
              />
            );
            offset += dash;
            return el;
          })}
        </g>
        <text
          x="70"
          y="66"
          textAnchor="middle"
          className="fill-foreground"
          fontSize="24"
          fontWeight="700"
        >
          {total}
        </text>
        <text x="70" y="84" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          commandes
        </text>
      </svg>
      <ul className="space-y-2 text-xs">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
            <span className="text-foreground">{d.label}</span>
            <span className="text-muted-foreground">({d.value})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
