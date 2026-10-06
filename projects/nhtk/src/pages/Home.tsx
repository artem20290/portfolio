import { useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../assets";
import { Button, Field, GlassCard, GoLink, Input, Modal, Select, Textarea } from "../components/ui";
import { daysLabel, daysWithoutLTI, formatDate, todayISO, uid } from "../lib";
import { useStore } from "../store";
import { SHIFTS, WORKSHOPS } from "../types";

export default function Home() {
  const { state, dispatch, user, toast } = useStore();
  const { days } = daysWithoutLTI(state.incidents);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    date: todayISO(),
    shift: "Смена А",
    workshop: WORKSHOPS[0],
    topic: "",
    participants: "",
    observations: "",
    risk: "средний",
    measures: "",
  });
  const [err, setErr] = useState("");

  const submit = () => {
    if (!form.topic.trim() || !form.observations.trim() || !form.participants.trim()) {
      setErr("Заполните тему, участников и наблюдения");
      return;
    }
    dispatch({
      type: "add",
      entity: "contacts",
      item: {
        id: uid("sc"),
        date: form.date,
        shift: form.shift,
        workshop: form.workshop,
        topic: form.topic,
        participants: form.participants.split(",").map((s) => s.trim()).filter(Boolean),
        observations: form.observations,
        photo: "safetyTeam",
        risk: form.risk,
        measures: form.measures,
        authorId: user.id,
        createdAt: new Date().toISOString(),
      },
    });
    toast("Контакт по безопасности зарегистрирован", "ok");
    setOpen(false);
    setErr("");
    setForm({ ...form, topic: "", participants: "", observations: "", measures: "" });
  };

  return (
    <div className="mx-auto max-w-[900px] space-y-4">
      <Link to="/incidents" className="block">
        <GlassCard hover className="relative overflow-hidden p-6 sm:p-8">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-emerald-200/40 blur-2xl" />
          <div className="text-sm font-semibold uppercase tracking-wider text-emerald-800">Дни без происшествий</div>
          <div className="mt-2 flex flex-wrap items-end gap-4">
            <div className="text-6xl font-extrabold leading-none text-[#0a3d26] sm:text-7xl">{days}</div>
            <div className="pb-2 text-slate-500">{daysLabel(days).replace(String(days), "").trim() || "дней"} без LTI (с потерей времени)</div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-800">
            <span className="live-dot inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Безопасность на производстве
          </div>
          <p className="mt-2 text-sm text-slate-500">Счётчик считается от последней подтверждённой записи со статусом «с потерей времени».</p>
          <div className="mt-4">
            <GoLink to="/incidents">Журнал происшествий</GoLink>
          </div>
        </GlassCard>
      </Link>

      <div className="grid gap-4 sm:grid-cols-2">
        <GlassCard hover className="p-5">
          <div className="text-lg font-bold text-[#0a3d26]">Провести контакт по безопасности</div>
          <p className="mt-1 text-sm text-slate-500">Фиксация наблюдения на смене: тема, риск, меры, фото.</p>
          <Button className="mt-4" onClick={() => setOpen(true)}>
            Открыть форму
          </Button>
          <div className="mt-4 space-y-2">
            {state.contacts.slice(0, 3).map((c) => (
              <div key={c.id} className="rounded-2xl bg-white/70 px-3 py-2 text-sm">
                <div className="font-semibold">{c.topic}</div>
                <div className="text-xs text-slate-500">
                  {formatDate(c.date)} · {c.workshop} · риск {c.risk}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <Link to="/championship" className="block">
          <GlassCard hover className="h-full overflow-hidden">
            <img src={images.championship} alt="" className="h-36 w-full object-cover" />
            <div className="p-5">
              <div className="text-lg font-bold text-[#0a3d26]">Чемпионат по Безопасности</div>
              <p className="mt-1 text-sm text-slate-500">{state.champSeason}. Баллы, команды, задания этапа.</p>
              <div className="mt-3">
                <GoLink to="/championship" />
              </div>
            </div>
          </GlassCard>
        </Link>

        <Link to="/territory" className="block sm:col-span-2">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 p-6 text-white shadow-card transition hover:-translate-y-0.5">
            <img src={images.heroPlant} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="relative">
              <div className="text-xs font-bold uppercase tracking-widest text-sky-100">Intro</div>
              <div className="mt-1 text-2xl font-extrabold">Территория Безопасности НХТК</div>
              <p className="mt-2 max-w-xl text-sm text-sky-50">Миссия, правила, карта площадок и контакты HSE — единая точка входа в культуру безопасности.</p>
              <div className="mt-4 text-sm font-semibold">Перейти →</div>
            </div>
          </div>
        </Link>

        <Link to="/finebi" className="block">
          <div className="flex h-full flex-col justify-between rounded-[28px] bg-gradient-to-br from-emerald-700 to-teal-600 p-5 text-white shadow-card transition hover:-translate-y-0.5">
            <img src={images.finebi} alt="FineBI" className="h-10 w-auto self-start object-contain" />
            <div>
              <div className="mt-4 text-xs font-bold uppercase tracking-widest text-emerald-100">Аналитика</div>
              <div className="mt-1 text-xl font-extrabold">FineBI</div>
              <p className="mt-2 text-sm text-emerald-50">Травматизм, СИЗ, аудиты, экология, подрядчики. Фильтры периода и площадки.</p>
              <div className="mt-4 text-sm font-semibold">Перейти →</div>
            </div>
          </div>
        </Link>

        <Link to="/forum" className="block">
          <GlassCard hover className="h-full p-5">
            <div className="text-lg font-bold text-[#0a3d26]">Доска обсуждений</div>
            <p className="mt-1 text-sm text-slate-500">Темы, комментарии, лайки. Модерация — специалист ОТ.</p>
            <div className="mt-3 space-y-1 text-sm">
              {state.forum.filter((f) => !f.hidden).slice(0, 2).map((f) => (
                <div key={f.id} className="truncate text-slate-600">
                  • {f.title}
                </div>
              ))}
            </div>
            <div className="mt-3">
              <GoLink to="/forum" />
            </div>
          </GlassCard>
        </Link>

        <Link to="/navigator" className="block">
          <GlassCard hover className="h-full p-5">
            <div className="text-lg font-bold text-[#0a3d26]">Навигатор функции ОТ, ПБиЭ</div>
            <p className="mt-1 text-sm text-slate-500">Кто за что отвечает, регламенты и переходы в разделы.</p>
            <div className="mt-3">
              <GoLink to="/navigator" />
            </div>
          </GlassCard>
        </Link>

        <Link to="/brandbook" className="block">
          <GlassCard hover className="h-full overflow-hidden">
            <img src={images.brandColors} alt="" className="h-28 w-full object-cover" />
            <div className="p-5">
              <div className="text-lg font-bold text-[#0a3d26]">Брендбук по ОТ, ПБиЭ</div>
              <p className="mt-1 text-sm text-slate-500">Логотипы, цвета, плакаты, шаблоны презентаций.</p>
              <GoLink to="/brandbook" />
            </div>
          </GlassCard>
        </Link>

        <Link to="/links" className="block sm:col-span-2">
          <GlassCard hover className="flex flex-col items-center gap-4 p-5 sm:flex-row">
            <img src={images.telegram} alt="" className="h-24 w-24 shrink-0 object-contain" />
            <div className="flex-1">
              <div className="text-lg font-bold text-[#0a3d26]">Telegram HSE НХТК</div>
              <p className="mt-1 text-sm text-slate-500">Канал департамента: оперативные сообщения, контакты по безопасности и срочные оповещения.</p>
              <GoLink to="/links" />
            </div>
          </GlassCard>
        </Link>

        <Link to="/policy" className="block sm:col-span-2">
          <GlassCard hover className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <img src={images.posterSafety} alt="" className="h-28 w-full rounded-2xl object-cover sm:h-24 sm:w-40" />
            <div className="flex-1">
              <div className="text-lg font-bold text-[#0a3d26]">Политика в области ОТ, ПБ, БДиООС</div>
              <p className="mt-1 text-sm text-slate-500">Версия {state.policyVersion}. Ознакомление фиксируется в журнале.</p>
              <GoLink to="/policy" />
            </div>
          </GlassCard>
        </Link>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Контакт по безопасности" wide>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Дата">
            <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </Field>
          <Field label="Смена">
            <Select value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })}>
              {SHIFTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Участок">
            <Select value={form.workshop} onChange={(e) => setForm({ ...form, workshop: e.target.value })}>
              {WORKSHOPS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Риск">
            <Select value={form.risk} onChange={(e) => setForm({ ...form, risk: e.target.value })}>
              <option>низкий</option>
              <option>средний</option>
              <option>высокий</option>
            </Select>
          </Field>
          <Field label="Тема">
            <Input value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="Например, LOTO" />
          </Field>
          <Field label="Участники">
            <Input value={form.participants} onChange={(e) => setForm({ ...form, participants: e.target.value })} placeholder="ФИО через запятую" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Наблюдения">
              <Textarea value={form.observations} onChange={(e) => setForm({ ...form, observations: e.target.value })} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Меры">
              <Textarea value={form.measures} onChange={(e) => setForm({ ...form, measures: e.target.value })} />
            </Field>
          </div>
          <div className="sm:col-span-2 text-xs text-slate-500">Фото: после отправки будет прикреплено полевое фото смены (мок).</div>
        </div>
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Отмена
          </Button>
          <Button onClick={submit}>Отправить</Button>
        </div>
      </Modal>
    </div>
  );
}
