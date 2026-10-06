import {
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  ClipboardList,
  Factory,
  Flame,
  FolderOpen,
  GraduationCap,
  HardHat,
  Home,
  Landmark,
  Link2,
  ListChecks,
  Menu,
  Search,
  Settings,
  Trophy,
  UserCheck,
  X,
} from "../icons";
import { useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ShapeGrid } from "../components/ShapeGrid";
import { Input, Modal } from "../components/ui";
import { daysWithoutLTI, formatDate, MONTHS_RU, monthGrid, nextBirthday, sameDay, searchIndex, WEEKDAYS } from "../lib";
import { useStore } from "../store";
import { images } from "../assets";
import { cn } from "../utils/cn";
import { ROLE_LABELS } from "../types";

const MAIN = [
  { to: "/", label: "Главная", icon: Home, end: true },
  { to: "/incidents", label: "Происшествия", icon: AlertTriangle },
  { to: "/lna", label: "ЛНА по ОТ, ПБиЭ, шаблоны, база", icon: BookOpen },
  { to: "/ppe", label: "СИЗ, Оценка рисков, СОУТ", icon: HardHat },
  { to: "/reports", label: "Отчёты", icon: BarChart3 },
  { to: "/training", label: "Обучение", icon: GraduationCap },
  { to: "/briefings", label: "Инструктажи", icon: ClipboardList },
  { to: "/championship", label: "Чемпионат по Безопасности", icon: Trophy },
  { to: "/contractors", label: "Подрядные организации", icon: Building2 },
  { to: "/trainer", label: "Внутренний тренер по Безопасности", icon: UserCheck },
  { to: "/audits", label: "Аудиты, задачи", icon: ListChecks },
  { to: "/documents", label: "Общие документы", icon: FolderOpen },
];

const ECO = [
  { to: "/fire", label: "13. Журнал эксплуатации систем противопожарной защиты", icon: Flame },
  { to: "/industrial", label: "14. Промышленная безопасность", icon: Factory },
  { to: "/inspections", label: "15. Проверки надзорных органов", icon: Landmark },
  { to: "/links", label: "16. Полезные ссылки", icon: Link2 },
];

function LogoMark() {
  return (
    <div className="flex h-[56px] shrink-0 items-center rounded-2xl bg-white px-3 py-2 shadow-lg shadow-black/10 sm:h-[72px] sm:px-4">
      <img src={images.logo} alt="НХТК" className="h-8 w-auto max-w-[140px] object-contain sm:h-10 sm:max-w-[180px]" />
    </div>
  );
}

export function Layout() {
  const { state, user, toasts } = useStore();
  const loc = useLocation();
  const nav = useNavigate();
  const isHome = loc.pathname === "/";
  const [menu, setMenu] = useState(false);
  const [bell, setBell] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const hits = searchIndex(state, q);

  const notes = useMemo(() => buildNotes(state), [state]);
  const unread = notes.filter((n) => n.fresh).length;

  return (
    <div className="min-h-screen">
      <header className="relative h-[132px] overflow-hidden bg-[#0a3d26] sm:h-[168px] lg:h-[200px]">
        <ShapeGrid speed={0.17} squareSize={40} direction="diagonal" borderColor="#29ae6b" hoverFillColor="#10b959" />
        <div className="relative z-10 flex h-full items-center gap-4 px-4 py-4 sm:px-6">
          <button className="rounded-xl bg-white/10 p-2 text-white lg:hidden" onClick={() => setMenu(true)} aria-label="Меню">
            <Menu size={20} />
          </button>
          <LogoMark />
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200/90">Территория безопасности</div>
            <h1 className="max-w-3xl text-base font-bold leading-tight text-white sm:text-xl lg:text-2xl">
              Департамент по охране труда, промышленной безопасности и экологии
            </h1>
            <p className="mt-1 hidden text-sm text-emerald-100/80 sm:block">Корпоративный HSE-портал НХТК</p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-2xl bg-white/10 p-2.5 text-white hover:bg-white/20"
              title="Поиск по порталу"
            >
              <Search size={18} />
            </button>
            <div className="relative">
              <button onClick={() => setBell((v) => !v)} className="relative rounded-2xl bg-white/10 p-2.5 text-white hover:bg-white/20">
                <Bell size={18} />
                {unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-emerald-400 px-1 text-[10px] font-bold text-[#0a3d26]">
                    {unread}
                  </span>
                )}
              </button>
              {bell && (
                <div className="absolute right-0 z-30 mt-2 w-[min(100vw-2rem,360px)] overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl">
                  <div className="border-b border-emerald-50 px-4 py-3 text-sm font-bold text-[#0a3d26]">Уведомления</div>
                  <div className="scrollbar-thin max-h-80 overflow-y-auto">
                    {notes.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => {
                          setBell(false);
                          nav(n.href);
                        }}
                        className="block w-full border-b border-slate-50 px-4 py-3 text-left hover:bg-emerald-50/60"
                      >
                        <div className="text-sm font-semibold text-slate-800">{n.title}</div>
                        <div className="text-xs text-slate-500">{n.text}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link to="/settings" className="rounded-2xl bg-white/10 p-2.5 text-white hover:bg-white/20" title="Настройки">
              <Settings size={18} />
            </Link>
            <Link to="/settings" className="hidden items-center gap-2 rounded-2xl bg-white/10 py-1.5 pl-1.5 pr-3 text-white hover:bg-white/20 sm:flex">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400 text-sm font-bold text-[#0a3d26]">
                {user.initials}
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold">{user.shortName}</span>
                <span className="block text-[11px] text-emerald-100">{ROLE_LABELS[user.role]}</span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={cn(
            "scrollbar-thin fixed inset-y-0 left-0 z-40 w-[260px] overflow-y-auto border-r border-emerald-100/80 bg-[#f7faf8]/95 p-3 pt-4 shadow-xl backdrop-blur-xl transition lg:static lg:translate-x-0 lg:shadow-none",
            menu ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
        >
          <div className="mb-3 flex items-center justify-between lg:hidden">
            <span className="px-2 text-sm font-bold text-[#0a3d26]">Навигация</span>
            <button onClick={() => setMenu(false)} className="rounded-lg p-1 text-slate-500">
              <X size={18} />
            </button>
          </div>
          <NavGroup title="Основное" items={MAIN} onClick={() => setMenu(false)} />
          <NavGroup title="Экология" items={ECO} onClick={() => setMenu(false)} />
        </aside>
        {menu && <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setMenu(false)} />}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">
          <Outlet />
        </main>

        {isHome && (
          <aside className="hidden w-[320px] shrink-0 border-l border-emerald-100/70 p-4 xl:block">
            <RightColumn />
          </aside>
        )}
      </div>

      {isHome && (
        <div className="px-4 pb-8 xl:hidden">
          <RightColumn />
        </div>
      )}

      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} title="Поиск по порталу">
        <Input autoFocus placeholder="Документы, инциденты, люди, подрядчики…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="mt-4 space-y-1">
          {q.trim().length >= 2 && hits.length === 0 && <p className="text-sm text-slate-500">Ничего не найдено</p>}
          {hits.map((h, i) => (
            <button
              key={i}
              className="w-full rounded-2xl px-3 py-2 text-left hover:bg-emerald-50"
              onClick={() => {
                setSearchOpen(false);
                nav(h.href);
              }}
            >
              <div className="text-xs font-semibold uppercase text-emerald-700">{h.group}</div>
              <div className="text-sm font-semibold">{h.title}</div>
              <div className="line-clamp-1 text-xs text-slate-500">{h.meta}</div>
            </button>
          ))}
        </div>
      </Modal>

      <div className="pointer-events-none fixed bottom-4 right-4 z-[90] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg",
              t.tone === "err" ? "bg-red-600 text-white" : t.tone === "ok" ? "bg-[#0a3d26] text-white" : "bg-white text-slate-800 ring-1 ring-emerald-100",
            )}
          >
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function NavGroup({
  title,
  items,
  onClick,
}: {
  title: string;
  items: { to: string; label: string; icon: typeof Home; end?: boolean }[];
  onClick: () => void;
}) {
  return (
    <div className="mb-4">
      <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">{title}</div>
      <nav className="space-y-0.5">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              onClick={onClick}
              className={({ isActive }) =>
                cn(
                  "flex items-start gap-2.5 rounded-2xl px-3 py-2 text-[13px] font-medium leading-snug transition",
                  isActive ? "bg-emerald-100 text-[#0a3d26] shadow-inner" : "text-slate-600 hover:bg-white hover:text-[#0a3d26]",
                )
              }
            >
              <Icon size={16} className="mt-0.5 shrink-0" />
              <span>{it.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

function RightColumn() {
  const { state } = useStore();
  const now = new Date();
  const [y, setY] = useState(now.getFullYear());
  const [m, setM] = useState(now.getMonth());
  const [sel, setSel] = useState<Date | null>(now);
  const cells = monthGrid(y, m);
  const events = useMemo(() => collectEvents(state), [state]);

  const dayEvents = sel
    ? events.filter((e) => sameDay(e.date, sel))
    : [];

  const bdays = state.users
    .map((u) => ({ u, d: nextBirthday(u.birthday) }))
    .filter(({ d }) => d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear())
    .sort((a, b) => a.d.getDate() - b.d.getDate());

  const marked = new Set(events.filter((e) => e.date.getMonth() === m && e.date.getFullYear() === y).map((e) => e.date.getDate()));

  return (
    <div className="space-y-4">
      <div className="glass-strong shadow-card rounded-[28px] border border-white/70 p-4">
        <div className="mb-3 flex items-center justify-between">
          <button className="rounded-xl px-2 text-lg text-emerald-800" onClick={() => (m === 0 ? (setM(11), setY(y - 1)) : setM(m - 1))}>
            ‹
          </button>
          <div className="text-center">
            <div className="text-sm font-bold text-[#0a3d26]">{MONTHS_RU[m]}</div>
            <div className="text-xs text-slate-500">{y}</div>
          </div>
          <button className="rounded-xl px-2 text-lg text-emerald-800" onClick={() => (m === 11 ? (setM(0), setY(y + 1)) : setM(m + 1))}>
            ›
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400">
          {WEEKDAYS.map((w) => (
            <div key={w}>{w}</div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((c, i) => {
            if (!c.date) return <div key={i} />;
            const isToday = sameDay(c.date, now);
            const isSel = sel && sameDay(c.date, sel);
            const has = marked.has(c.date.getDate());
            return (
              <button
                key={i}
                onClick={() => setSel(c.date)}
                className={cn(
                  "relative h-9 rounded-xl text-sm font-semibold",
                  isToday && "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow",
                  !isToday && isSel && "bg-emerald-100 text-emerald-950",
                  !isToday && !isSel && "text-slate-700 hover:bg-white",
                )}
              >
                {c.date.getDate()}
                {has && !isToday && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-500" />}
              </button>
            );
          })}
        </div>
        {sel && (
          <div className="mt-3 space-y-1.5 border-t border-emerald-50 pt-3">
            <div className="text-xs font-bold uppercase text-slate-400">События {formatDate(sel.toISOString())}</div>
            {dayEvents.length === 0 && <div className="text-xs text-slate-500">Нет событий</div>}
            {dayEvents.map((e, i) => (
              <div key={i} className="rounded-xl bg-white/70 px-2 py-1.5 text-xs">
                <span className="font-semibold text-emerald-800">{e.kind}: </span>
                {e.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="glass-strong shadow-card rounded-[28px] border border-white/70 p-4">
        <div className="mb-3 text-sm font-bold text-[#0a3d26]">Дни рождения</div>
        <div className="space-y-2">
          {bdays.length === 0 && <p className="text-xs text-slate-500">В этом месяце нет дней рождения в справочнике.</p>}
          {bdays.map(({ u, d }) => (
            <div key={u.id} className="flex items-center gap-2 rounded-2xl bg-white/70 px-2 py-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-xs font-bold text-emerald-900">
                {d.getDate().toString().padStart(2, "0")}.{String(d.getMonth() + 1).padStart(2, "0")}
              </div>
              <div className="text-sm">
                <div className="font-semibold text-slate-800">День рождения {u.shortName}</div>
                <div className="text-xs text-slate-500">{u.position}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function collectEvents(state: ReturnType<typeof useStore>["state"]) {
  const ev: { date: Date; kind: string; title: string }[] = [];
  const add = (iso: string | undefined, kind: string, title: string) => {
    if (!iso) return;
    const d = new Date(iso);
    if (!Number.isNaN(d.getTime())) ev.push({ date: d, kind, title });
  };
  state.users.forEach((u) => {
    const d = nextBirthday(u.birthday);
    ev.push({ date: d, kind: "ДР", title: u.shortName });
  });
  state.briefings.forEach((b) => add(b.nextDate || b.date, "Инструктаж", b.program));
  state.sessions.forEach((s) => add(s.date, "Обучение", s.title));
  state.audits.forEach((a) => add(a.date, "Аудит", a.type + " · " + a.workshop));
  state.tasks.forEach((t) => add(t.due, "Задача", t.title));
  state.fire.forEach((f) => add(f.nextTo, "ТО ППЗ", `${f.type} ${f.inventory}`));
  state.inspections.forEach((i) => add(i.start, "Надзор", i.body));
  state.incidents.forEach((i) => add(i.datetime, "Инцидент", i.number));
  return ev;
}

function buildNotes(state: ReturnType<typeof useStore>["state"]) {
  const { days } = daysWithoutLTI(state.incidents);
  const list = [
    { id: "n1", title: "Дни без происшествий", text: `${days} дн. без LTI`, href: "/incidents", fresh: true },
    { id: "n2", title: "Новое происшествие", text: [...state.incidents].sort((a, b) => +new Date(b.datetime) - +new Date(a.datetime))[0]?.number ?? "—", href: "/incidents", fresh: true },
    { id: "n3", title: "Задачи аудитов", text: `${state.tasks.filter((t) => t.status !== "закрыто").length} открытых`, href: "/audits", fresh: true },
    { id: "n4", title: "Проверки надзора", text: state.inspections.filter((i) => i.status !== "закрыта").map((i) => i.body).join(", "), href: "/inspections", fresh: true },
    { id: "n5", title: "Дедлайны инструктажей", text: "Есть истекающие и просроченные допуски", href: "/briefings", fresh: true },
  ];
  const soon = state.users.find((u) => {
    const d = nextBirthday(u.birthday);
    return (d.getTime() - Date.now()) / 86400000 < 7;
  });
  if (soon) list.unshift({ id: "nb", title: "День рождения", text: soon.name, href: "/", fresh: true });
  return list;
}


