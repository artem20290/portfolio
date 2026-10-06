import { images } from "../assets";
import { GlassCard, PageHeader } from "../components/ui";
import { useStore } from "../store";

export default function Territory() {
  const { state } = useStore();
  const hse = state.users.filter((u) => ["specialist", "manager", "trainer"].includes(u.role));
  return (
    <div>
      <PageHeader title="Территория Безопасности НХТК" crumbs={[{ label: "Территория безопасности" }]} />
      <div className="relative mb-6 overflow-hidden rounded-[32px]">
        <img src={images.heroPlant} alt="Площадки НХТК" className="h-64 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a3d26] to-transparent" />
        <div className="absolute bottom-5 left-5 text-white">
          <div className="text-sm uppercase tracking-widest text-emerald-200">Миссия</div>
          <h2 className="max-w-xl text-2xl font-extrabold">Каждый имеет право и обязанность остановить небезопасную работу</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <GlassCard className="p-5">
          <div className="font-bold text-[#0a3d26]">Правила территории</div>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
            <li>Каска, очки, обувь — с КПП до бытовки и обратно.</li>
            <li>Работы повышенной опасности — только по наряду.</li>
            <li>Подрядчик без допуска на площадку не работает.</li>
            <li>Почти-событие регистрируем в ту же смену.</li>
            <li>Телефоны экстренных служб — на каждом щите и в шапке портала.</li>
          </ol>
        </GlassCard>
        <GlassCard className="overflow-hidden">
          <img src={images.ecology} alt="" className="h-36 w-full object-cover" />
          <div className="p-5">
            <div className="font-bold text-[#0a3d26]">Карта площадок</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <b>Центральная</b> — полимеры, РМЦ, адм. корпус, склад ГСМ
              </li>
              <li>
                <b>Восточная</b> — пиролиз, мономеры, эстакада налива
              </li>
              <li>
                <b>Северная</b> — компрессорная, очистные сооружения
              </li>
            </ul>
          </div>
        </GlassCard>
      </div>
      <GlassCard className="mt-4 p-5">
        <div className="font-bold text-[#0a3d26]">Контакты HSE</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {hse.map((u) => (
            <div key={u.id} className="rounded-2xl bg-white/70 px-3 py-3">
              <div className="font-semibold">{u.name}</div>
              <div className="text-xs text-slate-500">{u.position}</div>
              <div className="mt-1 text-sm">
                {u.phone} · {u.email}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
