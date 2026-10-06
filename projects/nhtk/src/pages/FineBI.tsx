import { useMemo, useState } from "react";
import { images } from "../assets";
import { BarChartBlock, IncidentTypeChart, LineChartBlock, countBy, incidentTypeSeries } from "../charts";
import { GlassCard, PageHeader, Select } from "../components/ui";
import { daysWithoutLTI } from "../lib";
import { useStore } from "../store";
import { SITES, WORKSHOPS } from "../types";

const REPORTS = [
  { id: "inj", name: "Травматизм", line: "Дни без LTI — тренд", color: "#0a3d26" },
  { id: "ppe", name: "СИЗ", line: "Остаток критичных СИЗ — тренд", color: "#0e7490" },
  { id: "aud", name: "Аудиты", line: "Закрытые аудиты — тренд", color: "#7c3aed" },
  { id: "eco", name: "Экология", line: "Эко-события — тренд", color: "#10b959" },
  { id: "con", name: "Подрядчики", line: "Допущенные подрядчики — тренд", color: "#b45309" },
] as const;

const MONTHS = ["Окт", "Ноя", "Дек", "Янв", "Фев", "Мар"];

function trendFrom(base: number, amp: number) {
  return MONTHS.map((m, i) => ({ m, v: Math.max(0, Math.round(base + Math.sin(i * 1.2) * amp + i * (amp / 6))) }));
}

export default function FineBI() {
  const { state } = useStore();
  const [rep, setRep] = useState<(typeof REPORTS)[number]["id"]>("inj");
  const [period, setPeriod] = useState("2026");
  const [site, setSite] = useState("все");
  const [shop, setShop] = useState("все");
  const { days } = daysWithoutLTI(state.incidents);
  const current = REPORTS.find((r) => r.id === rep) ?? REPORTS[0];

  const incidents = state.incidents.filter((i) => (site === "все" || i.site === site) && (shop === "все" || i.workshop === shop));

  const data = useMemo(() => {
    if (rep === "ppe") {
      return state.ppe.map((p, i) => ({
        name: p.name,
        value: p.stock,
        color: p.stock < p.minStock ? "#be123c" : i % 2 ? "#0e7490" : "#10b959",
      }));
    }
    if (rep === "aud") {
      const byType = countBy(
        state.audits.filter((a) => site === "все" || a.site === site),
        (a) => a.type,
      );
      const byStatus = countBy(
        state.audits.filter((a) => site === "все" || a.site === site),
        (a) => a.status,
      );
      return [...byType, ...byStatus];
    }
    if (rep === "eco") {
      const ecoInc = incidents.filter((i) => i.type === "экологический инцидент" || i.type === "пожар");
      const fireBy = countBy(state.fire, (f) => f.type);
      return [
        ...countBy(ecoInc, (i) => i.type),
        ...fireBy,
        { name: "просроч. ТО", value: state.fire.filter((f) => new Date(f.nextTo) < new Date()).length, color: "#be123c" },
      ];
    }
    if (rep === "con") {
      return [
        ...countBy(state.contractors, (c) => c.status),
        ...countBy(state.contractors, (c) => c.workType),
      ];
    }
    return incidentTypeSeries(incidents);
  }, [rep, state, incidents, site]);

  const line = useMemo(() => {
    if (rep === "ppe") return trendFrom(state.ppe.filter((p) => p.stock < p.minStock).length + 4, 3);
    if (rep === "aud") return trendFrom(state.audits.filter((a) => a.status === "закрыт").length + 1, 2);
    if (rep === "eco") return trendFrom(incidents.filter((i) => i.type === "экологический инцидент").length + 1, 2);
    if (rep === "con") return trendFrom(state.contractors.filter((c) => c.status === "допущен").length, 1);
    return trendFrom(Math.max(days - 40, 80), 35).map((p, i) => (i === 5 ? { ...p, v: days } : p));
  }, [rep, state, incidents, days]);

  return (
    <div>
      <PageHeader title="FineBI" crumbs={[{ label: "FineBI" }]} subtitle="Встраиваемые дашборды HSE. Фильтры периода, площадки и цеха." />
      <div className="mb-4 grid gap-2 sm:grid-cols-4">
        <Select value={rep} onChange={(e) => setRep(e.target.value as (typeof REPORTS)[number]["id"])}>
          {REPORTS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </Select>
        <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option>2026</option>
          <option>2025</option>
          <option>12 мес.</option>
        </Select>
        <Select value={site} onChange={(e) => setSite(e.target.value)}>
          <option value="все">Площадка: все</option>
          {SITES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
        <Select value={shop} onChange={(e) => setShop(e.target.value)}>
          <option value="все">Цех: все</option>
          {WORKSHOPS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
      </div>
      <div className="mb-4 overflow-hidden rounded-[28px] border border-emerald-100 bg-[#0a3d26]">
        <div className="flex items-center justify-between gap-3 px-4 py-2 text-xs text-emerald-100">
          <span className="flex items-center gap-2">
            <img src={images.finebi} alt="" className="h-6 w-auto object-contain" />
            iframe · FineBI / {current.name} · {period}
          </span>
          <span>
            {site} · {shop}
          </span>
        </div>
        <div className="m-3 rounded-2xl bg-white p-4">
          <div className="mb-2 text-sm font-bold text-[#0a3d26]">{current.name}: ключевые показатели</div>
          {rep === "inj" ? (
            <IncidentTypeChart data={data} />
          ) : (
            <div className="min-h-[200px]">
              <BarChartBlock data={data} />
            </div>
          )}
        </div>
      </div>
      <GlassCard className="p-4">
        <div className="mb-2 font-bold">{current.line}</div>
        <div className="h-48">
          <LineChartBlock data={line} color={current.color} />
        </div>
      </GlassCard>
    </div>
  );
}
