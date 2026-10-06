import { Button, GlassCard, PageHeader } from "../components/ui";
import { formatDate, uid } from "../lib";
import { useStore } from "../store";

const TOC = [
  { id: "s1", title: "1. Назначение" },
  { id: "s2", title: "2. Область применения" },
  { id: "s3", title: "3. Принципы" },
  { id: "s4", title: "4. Обязательства руководства" },
  { id: "s5", title: "5. Обязанности работников" },
  { id: "s6", title: "6. Подрядчики и гости" },
  { id: "s7", title: "7. Экология и промбезопасность" },
];

export default function Policy() {
  const { state, dispatch, user, toast } = useStore();
  const acked = state.policyAck.some((a) => a.userId === user.id);

  return (
    <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
      <aside className="lg:sticky lg:top-4">
        <PageHeader title="Политика ОТ, ПБ, БДиООС" crumbs={[{ label: "Политика" }]} />
        <GlassCard className="p-4 text-sm">
          {TOC.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="block rounded-xl px-2 py-1.5 hover:bg-emerald-50">
              {t.title}
            </a>
          ))}
        </GlassCard>
      </aside>
      <div>
        <GlassCard className="mb-4 flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <div className="text-sm text-slate-500">Версия {state.policyVersion} · дата 2025-12-20</div>
            <div className="font-bold text-[#0a3d26]">Политика в области охраны труда, промышленной безопасности, безопасности движения и охраны окружающей среды</div>
          </div>
          <Button
            disabled={acked}
            onClick={() => {
              dispatch({ type: "add", entity: "policyAck", item: { id: uid("pa"), docId: "policy", userId: user.id, date: new Date().toISOString() } });
              toast("Ознакомление записано в журнал", "ok");
            }}
          >
            {acked ? "Вы ознакомлены" : "Ознакомлен"}
          </Button>
        </GlassCard>
        <GlassCard className="space-y-6 p-6 text-sm leading-relaxed text-slate-700">
          <section id="s1">
            <h3 className="text-lg font-bold text-[#0a3d26]">1. Назначение</h3>
            <p>Документ задаёт приоритеты НХТК: жизнь и здоровье людей важнее любых производственных показателей.</p>
          </section>
          <section id="s2">
            <h3 className="text-lg font-bold text-[#0a3d26]">2. Область применения</h3>
            <p>Распространяется на работников, подрядчиков и посетителей всех площадок НХТК.</p>
          </section>
          <section id="s3">
            <h3 className="text-lg font-bold text-[#0a3d26]">3. Принципы</h3>
            <p>Прозрачность происшествий, обучение до допуска, право остановить работу, уважение к окружающей среде.</p>
          </section>
          <section id="s4">
            <h3 className="text-lg font-bold text-[#0a3d26]">4. Обязательства руководства</h3>
            <p>Ресурсы на СИЗ и ТО, разбор LTI на уровне директора, недопустимость сокрытия.</p>
          </section>
          <section id="s5">
            <h3 className="text-lg font-bold text-[#0a3d26]">5. Обязанности работников</h3>
            <p>Применять СИЗ, сообщать об опасностях, проходить инструктажи, не приступать к работе без наряда.</p>
          </section>
          <section id="s6">
            <h3 className="text-lg font-bold text-[#0a3d26]">6. Подрядчики и гости</h3>
            <p>Те же правила, что у персонала НХТК. Нет допуска — нет работы.</p>
          </section>
          <section id="s7">
            <h3 className="text-lg font-bold text-[#0a3d26]">7. Экология и промбезопасность</h3>
            <p>Соблюдение ПЛАС, лимитов выбросов и сбросов, готовность к проверкам надзора.</p>
          </section>
        </GlassCard>
        <GlassCard className="mt-4 p-4">
          <div className="font-bold">Журнал ознакомления</div>
          {state.policyAck.map((a) => (
            <div key={a.id} className="text-sm">
              {state.users.find((u) => u.id === a.userId)?.name} — {formatDate(a.date)}
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
