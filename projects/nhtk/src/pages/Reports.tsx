import { useMemo, useState } from "react";
import { BarChartBlock, IncidentTypeChart, countBy, incidentTypeSeries } from "../charts";
import { Button, GlassCard, PageHeader, Select } from "../components/ui";
import { daysWithoutLTI, downloadCsv, formatDate, printHtml } from "../lib";
import { useStore } from "../store";
import { SITES } from "../types";
import { Link } from "react-router-dom";

const TEMPLATES = [
  { id: "t1", name: "Травматизм" },
  { id: "t2", name: "Дни без происшествий" },
  { id: "t3", name: "Выполнение аудитов" },
  { id: "t4", name: "Покрытие обучением/инструктажами" },
  { id: "t5", name: "СИЗ" },
  { id: "t6", name: "Подрядчики" },
  { id: "t7", name: "Надзор" },
  { id: "t8", name: "Экология" },
];

function inPeriod(iso: string | undefined, period: string) {
  if (!iso) return true;
  const y = new Date(iso).getFullYear();
  if (period === "2025") return y === 2025;
  if (period === "Q1 2026") return y === 2026 && new Date(iso).getMonth() < 3;
  return y === 2026 || Number.isNaN(y);
}

export default function Reports() {
  const { state } = useStore();
  const [tpl, setTpl] = useState("t1");
  const [site, setSite] = useState("все");
  const [period, setPeriod] = useState("2026");
  const { days } = daysWithoutLTI(state.incidents);

  const siteOk = (s?: string) => site === "все" || s === site;

  const incidents = state.incidents.filter((i) => siteOk(i.site) && inPeriod(i.datetime, period));
  const audits = state.audits.filter((a) => siteOk(a.site) && inPeriod(a.date, period));
  const tasks = state.tasks.filter((t) => inPeriod(t.due, period));
  const enrollments = state.enrollments.filter((e) => inPeriod(e.assignedAt, period));
  const briefings = state.briefings.filter((b) => inPeriod(b.date, period));
  const contractors = state.contractors;
  const inspections = state.inspections.filter((i) => inPeriod(i.start, period));
  const prescriptions = inspections.flatMap((i) => i.prescriptions);
  const fire = state.fire;
  const overdueFire = fire.filter((f) => f.nextTo && new Date(f.nextTo) < new Date()).length;

  const trainingCover = Math.round((enrollments.filter((e) => e.progress === 100).length / Math.max(1, enrollments.length)) * 100);
  const auditDone = audits.filter((a) => a.status !== "план").length;
  const ppeLow = state.ppe.filter((p) => p.stock < p.minStock).length;
  const eco = incidents.filter((i) => i.type === "экологический инцидент").length;

  const view = useMemo(() => {
    if (tpl === "t2") {
      return {
        title: "Накопитель дней без LTI по статусам журнала",
        chart: countBy(incidents, (i) => i.status),
        kpis: [
          { k: "Дни без LTI", v: days },
          { k: "Записей в журнале", v: incidents.length },
          { k: "LTI", v: incidents.filter((i) => i.type === "с потерей времени").length },
          { k: "Почти-события", v: incidents.filter((i) => i.type === "почти-событие").length },
        ],
        head: ["Номер", "Тип", "Статус", "Дата"],
        rows: incidents.map((i) => [i.number, i.type, i.status, formatDate(i.datetime)]),
      };
    }
    if (tpl === "t3") {
      return {
        title: "Аудиты по статусам",
        chart: countBy(audits, (a) => a.status),
        kpis: [
          { k: "Всего аудитов", v: audits.length },
          { k: "Проведены", v: auditDone },
          { k: "Задачи открыты", v: tasks.filter((t) => t.status !== "закрыто").length },
          { k: "Просрочено задач", v: tasks.filter((t) => t.status === "просрочено").length },
        ],
        head: ["Тип", "Цех", "Статус", "Дата"],
        rows: audits.map((a) => [a.type, a.workshop, a.status, formatDate(a.date)]),
      };
    }
    if (tpl === "t4") {
      const progress = countBy(enrollments, (e) => (e.progress >= 100 ? "курс закрыт" : e.progress >= 50 ? "в процессе" : "не начат"));
      const briefing = countBy(briefings, (b) => b.type);
      return {
        title: "Обучение и инструктажи",
        chart: [...progress, ...briefing],
        kpis: [
          { k: "Покрытие курсами", v: `${trainingCover}%` },
          { k: "Назначений", v: enrollments.length },
          { k: "Инструктажей", v: briefings.length },
          { k: "Подписей", v: briefings.reduce((n, b) => n + b.workers.filter((w) => w.signed).length, 0) },
        ],
        head: ["Курс / программа", "Тип", "Прогресс", "Дата"],
        rows: [
          ...enrollments.map((e) => {
            const c = state.courses.find((x) => x.id === e.courseId);
            return [c?.title ?? e.courseId, c?.format ?? "курс", `${e.progress}%`, formatDate(e.assignedAt)];
          }),
          ...briefings.map((b) => [b.program, b.type, `${b.workers.filter((w) => w.signed).length}/${b.workers.length}`, formatDate(b.date)]),
        ],
      };
    }
    if (tpl === "t5") {
      return {
        title: "Остатки СИЗ на складе",
        chart: state.ppe.map((p, i) => ({
          name: p.name,
          value: p.stock,
          color: p.stock < p.minStock ? "#be123c" : i % 2 ? "#10b959" : "#0a3d26",
        })),
        kpis: [
          { k: "Позиций СИЗ", v: state.ppe.length },
          { k: "Ниже min", v: ppeLow },
          { k: "Заявки открыты", v: state.ppeRequests.filter((r) => r.status === "новая" || r.status === "одобрена").length },
          { k: "Норм выдачи", v: state.ppeNorms.length },
        ],
        head: ["СИЗ", "Склад", "Min", "Срок, мес."],
        rows: state.ppe.map((p) => [p.name, String(p.stock), String(p.minStock), String(p.lifeMonths)]),
      };
    }
    if (tpl === "t6") {
      return {
        title: "Подрядчики по допуску",
        chart: countBy(contractors, (c) => c.status),
        kpis: [
          { k: "Всего", v: contractors.length },
          { k: "Допущены", v: contractors.filter((c) => c.status === "допущен").length },
          { k: "Ограничены", v: contractors.filter((c) => c.status === "ограничен").length },
          { k: "Заблокированы", v: contractors.filter((c) => c.status === "заблокирован").length },
        ],
        head: ["Организация", "Вид работ", "Статус", "Договор"],
        rows: contractors.map((c) => [c.name, c.workType, c.status, c.contract]),
      };
    }
    if (tpl === "t7") {
      return {
        title: "Предписания надзора",
        chart: countBy(prescriptions, (p) => p.status),
        kpis: [
          { k: "Проверок", v: inspections.length },
          { k: "Пунктов", v: prescriptions.length },
          { k: "Открыто", v: prescriptions.filter((p) => p.status === "открыто").length },
          { k: "Штрафы, ₽", v: inspections.reduce((n, i) => n + (i.fines || 0), 0).toLocaleString("ru-RU") },
        ],
        head: ["Орган", "Тип", "Статус проверки", "Период"],
        rows: inspections.map((i) => [i.body, i.type, i.status, i.period]),
      };
    }
    if (tpl === "t8") {
      return {
        title: "Экология и противопожарная защита",
        chart: [
          ...countBy(
            incidents.filter((i) => i.type === "экологический инцидент" || i.type === "пожар"),
            (i) => i.type,
          ),
          { name: "оборудование ППЗ", value: fire.length, color: "#b45309" },
          { name: "просроченное ТО", value: overdueFire, color: "#be123c" },
        ],
        kpis: [
          { k: "Эко-инциденты", v: eco },
          { k: "Пожары", v: incidents.filter((i) => i.type === "пожар").length },
          { k: "Единиц ППЗ", v: fire.length },
          { k: "Просроч. ТО", v: overdueFire },
        ],
        head: ["Объект", "Тип", "Место / цех", "След. ТО / дата"],
        rows: [
          ...fire.map((f) => [f.inventory, f.type, f.place, formatDate(f.nextTo)]),
          ...incidents
            .filter((i) => i.type === "экологический инцидент" || i.type === "пожар")
            .map((i) => [i.number, i.type, i.workshop, formatDate(i.datetime)]),
        ],
      };
    }
    return {
      title: "Происшествия по типам",
      chart: incidentTypeSeries(incidents),
      kpis: [
        { k: "Дни без LTI", v: days },
        { k: "Инциденты", v: incidents.length },
        { k: "Расследование", v: incidents.filter((i) => i.status === "расследование").length },
        { k: "Закрыто", v: incidents.filter((i) => i.status === "закрыто").length },
      ],
      head: ["Номер", "Тип", "Статус", "Цех"],
      rows: incidents.map((i) => [i.number, i.type, i.status, i.workshop]),
    };
  }, [tpl, incidents, audits, tasks, enrollments, briefings, contractors, inspections, prescriptions, fire, overdueFire, days, trainingCover, auditDone, ppeLow, eco, state.courses, state.ppe, state.ppeRequests, state.ppeNorms]);

  return (
    <div>
      <PageHeader
        title="Отчёты"
        subtitle="Конструктор и готовые шаблоны HSE. Выгрузка и переход в FineBI."
        crumbs={[{ label: "Отчёты" }]}
        actions={
          <>
            <Link to="/finebi" className="inline-flex items-center rounded-2xl bg-emerald-100 px-4 py-2.5 text-sm font-semibold text-emerald-950">
              Открыть в FineBI
            </Link>
            <Button
              variant="outline"
              onClick={() => downloadCsv("otchet.csv", view.kpis.map((s) => ({ показатель: s.k, значение: String(s.v) })))}
            >
              Excel
            </Button>
            <Button
              variant="outline"
              onClick={() => printHtml("Отчёт НХТК", `<h1>${TEMPLATES.find((t) => t.id === tpl)?.name}</h1><p>Период ${period}, ${site}</p>`)}
            >
              PDF
            </Button>
          </>
        }
      />
      <GlassCard className="mb-4 grid gap-3 p-4 sm:grid-cols-3">
        <Select value={tpl} onChange={(e) => setTpl(e.target.value)}>
          {TEMPLATES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </Select>
        <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option>2026</option>
          <option>2025</option>
          <option>Q1 2026</option>
        </Select>
        <Select value={site} onChange={(e) => setSite(e.target.value)}>
          <option value="все">Все площадки</option>
          {SITES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
      </GlassCard>
      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {view.kpis.map((s) => (
          <GlassCard key={s.k} className="p-4">
            <div className="text-xs text-slate-500">{s.k}</div>
            <div className="text-2xl font-extrabold text-[#0a3d26]">{s.v}</div>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="p-4">
        <div className="mb-3 font-bold">График: {view.title}</div>
        <div className={view.title === "Происшествия по типам" ? "rounded-[24px] bg-gradient-to-br from-white/80 to-emerald-50/70 p-4 ring-1 ring-emerald-100/80" : "min-h-[220px]"}>
          {view.title === "Происшествия по типам" ? <IncidentTypeChart data={view.chart} /> : <BarChartBlock data={view.chart} />}
        </div>
        <table className="mt-4 w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-slate-500">
              {view.head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {view.rows.map((row, i) => (
              <tr key={i} className="border-t border-emerald-50">
                {row.map((cell, j) => (
                  <td key={j} className="py-1 pr-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
