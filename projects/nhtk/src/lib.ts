import type { AppState, Incident, Role } from "./types";

export function uid(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36).slice(-4)}`;
}

export function isoDays(offset: number, hour = 10, minute = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export function isoDateOnly(offset: number): string {
  return isoDays(offset).slice(0, 10);
}

export function formatDate(value?: string | null): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    const parts = value.split("-");
    if (parts.length === 3) return `${parts[2]}.${parts[1]}.${parts[0]}`;
    return value;
  }
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatDateTime(value?: string | null): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function daysBetween(from: string, to = new Date().toISOString()): number {
  const a = new Date(from);
  const b = new Date(to);
  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);
  return Math.floor((b.getTime() - a.getTime()) / 86400000);
}

export function daysLabel(n: number): string {
  const abs = Math.abs(n);
  const n10 = abs % 10;
  const n100 = abs % 100;
  if (n10 === 1 && n100 !== 11) return `${n} день`;
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return `${n} дня`;
  return `${n} дней`;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function isOverdue(date?: string, done = false): boolean {
  if (!date || done) return false;
  return new Date(date).getTime() < new Date().setHours(0, 0, 0, 0);
}

export function nextBirthday(mmdd: string, from = new Date()): Date {
  const [mm, dd] = mmdd.split("-").map(Number);
  const year = from.getFullYear();
  let d = new Date(year, mm - 1, dd);
  d.setHours(0, 0, 0, 0);
  const today = new Date(from);
  today.setHours(0, 0, 0, 0);
  if (d < today) d = new Date(year + 1, mm - 1, dd);
  return d;
}

export function daysWithoutLTI(incidents: Incident[]): { days: number; last?: Incident } {
  const lti = incidents
    .filter((i) => i.type === "с потерей времени" && i.confirmed && i.status !== "черновик")
    .sort((a, b) => +new Date(b.datetime) - +new Date(a.datetime));
  const last = lti[0];
  if (!last) return { days: 0 };
  return { days: Math.max(0, daysBetween(last.datetime)), last };
}

export function downloadCsv(filename: string, rows: Record<string, string | number | boolean>[]): void {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [headers.join(";"), ...rows.map((r) => headers.map((h) => esc(r[h])).join(";"))].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function downloadText(filename: string, content: string, mime = "text/plain"): void {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function printHtml(title: string, body: string): void {
  const w = window.open("", "_blank", "width=900,height=700");
  if (!w) return;
  w.document.write(`<!doctype html><html><head><title>${title}</title>
    <style>
      body{font-family:Inter,Arial,sans-serif;padding:32px;color:#1c2b24}
      h1{color:#0a3d26}
      table{border-collapse:collapse;width:100%}
      td,th{border:1px solid #c5d4cc;padding:6px 8px;text-align:left;font-size:12px}
      .muted{color:#667}
    </style></head><body>${body}</body></html>`);
  w.document.close();
  w.focus();
  w.print();
}

export type ActionKey =
  | "mutate"
  | "incidents"
  | "lna"
  | "ppe"
  | "training"
  | "briefings"
  | "championship"
  | "contractors"
  | "audits"
  | "fire"
  | "industrial"
  | "inspections"
  | "links"
  | "forum-mod"
  | "users"
  | "reports";

const matrix: Record<ActionKey, Role[]> = {
  mutate: ["specialist", "admin"],
  incidents: ["specialist", "admin"],
  lna: ["specialist", "admin"],
  ppe: ["specialist", "admin"],
  training: ["specialist", "trainer", "admin"],
  briefings: ["specialist", "trainer", "admin"],
  championship: ["specialist", "trainer", "admin"],
  contractors: ["specialist", "admin"],
  audits: ["specialist", "manager", "admin"],
  fire: ["specialist", "admin"],
  industrial: ["specialist", "admin"],
  inspections: ["specialist", "manager", "admin"],
  links: ["admin"],
  "forum-mod": ["specialist", "admin"],
  users: ["admin"],
  reports: ["specialist", "manager", "admin"],
};

export function can(role: Role, action: ActionKey): boolean {
  if (role === "admin") return true;
  return matrix[action].includes(role);
}



export function riskLevel(score: number): { label: string; color: string } {
  if (score >= 15) return { label: "высокий", color: "bg-red-100 text-red-800" };
  if (score >= 8) return { label: "средний", color: "bg-amber-100 text-amber-800" };
  return { label: "низкий", color: "bg-emerald-100 text-emerald-800" };
}

export function searchIndex(state: AppState, q: string) {
  const query = q.trim().toLowerCase();
  if (query.length < 2) return [];
  const hits: { href: string; title: string; meta: string; group: string }[] = [];
  const push = (href: string, title: string, meta: string, group: string) => {
    if (`${title} ${meta}`.toLowerCase().includes(query)) hits.push({ href, title, meta, group });
  };
  state.users.forEach((u) => push("/settings", u.name, `${u.position} · ${u.workshop}`, "Люди"));
  state.incidents.forEach((i) =>
    push(`/incidents`, `${i.number} · ${i.type}`, `${i.workshop} · ${i.description}`, "Происшествия"),
  );
  state.documents.forEach((d) => push("/lna", d.title, `${d.kind} · v${d.version}`, "ЛНА"));
  state.contractors.forEach((c) => push("/contractors", c.name, `ИНН ${c.inn} · ${c.workType}`, "Подрядчики"));
  state.courses.forEach((c) => push("/training", c.title, c.category, "Обучение"));
  state.generalDocs.forEach((d) => push("/documents", d.title, d.folder, "Документы"));
  state.industrial.forEach((i) => push("/industrial", i.title, `${i.kind} · ${i.number}`, "Промбезопасность"));
  state.fire.forEach((f) => push("/fire", `${f.type} ${f.inventory}`, f.place, "ППЗ"));
  state.forum.forEach((p) => push("/forum", p.title, p.body.slice(0, 80), "Обсуждения"));
  return hits.slice(0, 20);
}

export const MONTHS_RU = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const WEEKDAYS = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

export function monthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const start = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells: { date: Date | null }[] = [];
  for (let i = 0; i < start; i++) cells.push({ date: null });
  for (let d = 1; d <= days; d++) cells.push({ date: new Date(year, month, d) });
  while (cells.length % 7) cells.push({ date: null });
  return cells;
}

export function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
