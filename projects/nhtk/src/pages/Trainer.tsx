import { useState } from "react";
import { images } from "../assets";
import { Badge, Button, Field, GlassCard, PageHeader, Textarea, statusTone } from "../components/ui";
import { formatDate, uid } from "../lib";
import { useStore } from "../store";

export default function Trainer() {
  const { state, dispatch, user, toast } = useStore();
  const [mot, setMot] = useState("");
  const me = state.trainers.find((t) => t.userId === user.id) ?? state.trainers[0];
  const person = state.users.find((u) => u.id === me.userId);

  return (
    <div>
      <PageHeader title="Внутренний тренер по Безопасности" crumbs={[{ label: "Внутренний тренер" }]} subtitle="Профили, расписание, материалы, заявки и KPI." />
      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="overflow-hidden lg:col-span-1">
          <img src={images.training} alt="" className="h-32 w-full object-cover" />
          <div className="p-4">
            <div className="text-lg font-bold text-[#0a3d26]">{person?.name}</div>
            <div className="text-sm text-slate-500">{person?.position}</div>
            <div className="mt-3 flex flex-wrap gap-1">
              {me.competencies.map((c) => (
                <Badge key={c}>{c}</Badge>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xl font-extrabold">{me.hours}</div>
                <div className="text-[11px] text-slate-500">часов</div>
              </div>
              <div>
                <div className="text-xl font-extrabold">{me.coverage}</div>
                <div className="text-[11px] text-slate-500">охват</div>
              </div>
              <div>
                <div className="text-xl font-extrabold">{me.rating}</div>
                <div className="text-[11px] text-slate-500">оценка</div>
              </div>
            </div>
            <div className="mt-3 text-sm">
              Материалы:
              <ul className="list-disc pl-4 text-slate-600">
                {me.materials.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4 lg:col-span-2">
          <div className="mb-2 font-bold">Расписание занятий</div>
          {state.sessions.map((s) => {
            const tr = state.trainers.find((t) => t.id === s.trainerId);
            const tn = state.users.find((u) => u.id === tr?.userId)?.shortName;
            return (
              <div key={s.id} className="flex flex-wrap justify-between gap-2 border-t border-emerald-50 py-2 text-sm">
                <div>
                  <div className="font-semibold">{s.title}</div>
                  <div className="text-xs text-slate-500">
                    {formatDate(s.date)} {s.time} · {s.place} · {s.group} · {tn}
                  </div>
                </div>
                {s.relatedCourseId && <Badge tone="teal">курс</Badge>}
              </div>
            );
          })}
        </GlassCard>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <GlassCard className="p-4">
          <div className="font-bold">Заявка «стать тренером»</div>
          <p className="mt-1 text-sm text-slate-500">Линейные руководители могут вести инструктажи после согласования HSE.</p>
          <Field label="Мотивация">
            <Textarea value={mot} onChange={(e) => setMot(e.target.value)} />
          </Field>
          <Button
            className="mt-3"
            onClick={() => {
              if (!mot.trim()) return toast("Опишите мотивацию", "err");
              dispatch({
                type: "add",
                entity: "trainerApps",
                item: { id: uid("ta"), userId: user.id, motivation: mot, date: new Date().toISOString(), status: "новая" },
              });
              toast("Заявка отправлена", "ok");
              setMot("");
            }}
          >
            Подать заявку
          </Button>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="font-bold">Заявки</div>
          {state.trainerApps.map((a) => (
            <div key={a.id} className="border-t border-emerald-50 py-2 text-sm">
              <div className="flex justify-between">
                <span>{state.users.find((u) => u.id === a.userId)?.name}</span>
                <Badge tone={statusTone(a.status)}>{a.status}</Badge>
              </div>
              <p className="text-slate-600">{a.motivation}</p>
              {a.status === "новая" && (
                <div className="mt-2 flex gap-2">
                  <Button variant="soft" onClick={() => dispatch({ type: "update", entity: "trainerApps", id: a.id, patch: { status: "принята" } })}>
                    Принять
                  </Button>
                  <Button variant="outline" onClick={() => dispatch({ type: "update", entity: "trainerApps", id: a.id, patch: { status: "отклонена" } })}>
                    Отклонить
                  </Button>
                </div>
              )}
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
