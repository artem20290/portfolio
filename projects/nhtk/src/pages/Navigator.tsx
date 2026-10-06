import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GlassCard, Input, PageHeader } from "../components/ui";

const NODES = [
  { id: "inc", title: "Регистрация происшествия", role: "Сотрудник / специалист ОТ", lna: "СТ-ОТ-03 Расследование", to: "/incidents", text: "Смена фиксирует событие, специалист классифицирует и ведёт 5 why." },
  { id: "inv", title: "Расследование и CAPA", role: "Специалист ОТ, руководитель цеха", lna: "СТ-ОТ-03", to: "/incidents", text: "Комиссия, дерево причин, план мер со сроками." },
  { id: "ppe", title: "СИЗ и риски", role: "Кладовщик, специалист ОТ", lna: "СТ-СИЗ-04", to: "/ppe", text: "Нормы, склад, заявки, матрица рисков, карты СОУТ." },
  { id: "tr", title: "Обучение и инструктажи", role: "Внутренний тренер", lna: "Программа обучения 2026", to: "/training", text: "Назначение курсов, тесты, журнал инструктажей." },
  { id: "ch", title: "Чемпионат", role: "Тренер / специалист ОТ", lna: "Приказ о чемпионате", to: "/championship", text: "Геймификация практик безопасности." },
  { id: "au", title: "Аудиты и задачи", role: "Аудитор HSE, руководитель", lna: "Чек-лист BBS", to: "/audits", text: "Находка → задача → проверка закрытия." },
  { id: "co", title: "Подрядчики", role: "Специалист ОТ, владелец договора", lna: "Шаблон акта-допуска", to: "/contractors", text: "Допуск, входной контроль, нарушения." },
  { id: "ec", title: "Экология и ППЗ", role: "Инженер-эколог", lna: "ПЭК, журнал ППЗ", to: "/fire", text: "ТО систем ППЗ, сбросы, отходы." },
  { id: "pb", title: "Промбезопасность", role: "Инженер ПБ", lna: "ПЛАС, ЭПБ", to: "/industrial", text: "ОПО, лицензии, наряды-допуски." },
  { id: "ns", title: "Надзор", role: "Руководитель департамента", lna: "Реестр предписаний", to: "/inspections", text: "Ростехнадзор, ГИТ, МЧС, Росприроднадзор." },
];

export default function Navigator() {
  const [q, setQ] = useState("");
  const list = useMemo(() => NODES.filter((n) => `${n.title} ${n.role} ${n.lna} ${n.text}`.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div>
      <PageHeader title="Навигатор функции ОТ, ПБиЭ" crumbs={[{ label: "Навигатор" }]} subtitle="Интерактивная схема процессов: ответственность, регламенты, переход в раздел." />
      <Input className="mb-4" placeholder="Поиск по процессу" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="relative mb-6 overflow-hidden rounded-[28px] bg-gradient-to-r from-emerald-900 to-teal-700 p-5 text-white">
        <div className="text-sm text-emerald-100">Цепочка ценности HSE</div>
        <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
          {["Сигнал", "Расследование", "Меры", "Обучение", "Аудит", "Надзор"].map((s, i) => (
            <span key={s} className="rounded-full bg-white/15 px-3 py-1">
              {i + 1}. {s}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {list.map((n) => (
          <Link key={n.id} to={n.to}>
            <GlassCard hover className="h-full p-4">
              <div className="text-lg font-bold text-[#0a3d26]">{n.title}</div>
              <div className="mt-1 text-xs font-semibold uppercase text-emerald-700">{n.role}</div>
              <p className="mt-2 text-sm text-slate-600">{n.text}</p>
              <div className="mt-2 text-xs text-slate-500">Регламент: {n.lna}</div>
              <div className="mt-3 text-sm font-semibold text-emerald-800">Перейти →</div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
