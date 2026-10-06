import { useMemo, useState } from "react";
import { Badge, Button, Empty, Field, GlassCard, Input, Modal, PageHeader, Select } from "../components/ui";
import { formatDate, isOverdue, uid } from "../lib";
import { useStore } from "../store";
import { WORKSHOPS, type BriefingType } from "../types";

const TYPES: BriefingType[] = ["вводный", "первичный", "повторный", "внеплановый", "целевой"];

export default function Briefings() {
  const { state, dispatch, user, guard, toast } = useStore();
  const [flt, setFlt] = useState("все");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: "повторный" as BriefingType, program: "", workshop: WORKSHOPS[0], date: new Date().toISOString().slice(0, 10), nextDate: "", workers: [] as string[] });

  const list = useMemo(() => {
    return state.briefings.filter((b) => {
      if (flt === "просрочен") return isOverdue(b.nextDate);
      if (flt === "скоро истечёт") {
        if (!b.nextDate) return false;
        const d = (new Date(b.nextDate).getTime() - Date.now()) / 86400000;
        return d >= 0 && d <= 14;
      }
      if (TYPES.includes(flt as BriefingType)) return b.type === flt;
      return true;
    });
  }, [state.briefings, flt]);

  return (
    <div>
      <PageHeader
        title="Инструктажи"
        crumbs={[{ label: "Инструктажи" }]}
        subtitle="Вводный, первичный, повторный, внеплановый, целевой. Журнал и массовое проведение."
        actions={<Button onClick={() => setOpen(true)}>Провести инструктаж</Button>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {["все", "просрочен", "скоро истечёт", ...TYPES].map((f) => (
          <button key={f} onClick={() => setFlt(f)} className={`rounded-2xl px-3 py-1.5 text-sm font-semibold ${flt === f ? "bg-[#0a3d26] text-white" : "bg-white/70"}`}>
            {f}
          </button>
        ))}
      </div>
      {list.length === 0 && <Empty title="Нет инструктажей по фильтру" />}
      <div className="space-y-3">
        {list.map((b) => (
          <GlassCard key={b.id} className="p-4">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <div className="font-bold text-[#0a3d26]">{b.program}</div>
                <div className="text-sm text-slate-500">
                  {formatDate(b.date)} · {b.workshop} · инструктирующий: {b.instructor}
                </div>
              </div>
              <div className="flex gap-1">
                <Badge>{b.type}</Badge>
                {isOverdue(b.nextDate) && <Badge tone="red">просрочен</Badge>}
              </div>
            </div>
            <div className="mt-2 text-sm">
              Работники:{" "}
              {b.workers.map((w) => {
                const name = state.users.find((u) => u.id === w.userId)?.shortName ?? w.userId;
                return (
                  <button
                    key={w.userId}
                    className="mr-2"
                    onClick={() => {
                      dispatch({
                        type: "update",
                        entity: "briefings",
                        id: b.id,
                        patch: { workers: b.workers.map((x) => (x.userId === w.userId ? { ...x, signed: !x.signed } : x)) },
                      });
                    }}
                  >
                    <Badge tone={w.signed ? "green" : "gray"}>{name} {w.signed ? "✓" : "подпись"}</Badge>
                  </button>
                );
              })}
            </div>
            {b.nextDate && <div className="mt-1 text-xs text-slate-500">Следующий: {formatDate(b.nextDate)}</div>}
            {b.attachments.length > 0 && <div className="text-xs text-slate-500">Вложения: {b.attachments.join(", ")}</div>}
          </GlassCard>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Массовое проведение" wide>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Вид">
            <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as BriefingType })}>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>
          <Field label="Дата">
            <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </Field>
          <Field label="Цех / смена">
            <Select value={form.workshop} onChange={(e) => setForm({ ...form, workshop: e.target.value })}>
              {WORKSHOPS.map((w) => (
                <option key={w}>{w}</option>
              ))}
            </Select>
          </Field>
          <Field label="Следующий срок">
            <Input type="date" value={form.nextDate} onChange={(e) => setForm({ ...form, nextDate: e.target.value })} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Программа">
              <Input value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} />
            </Field>
          </div>
        </div>
        <div className="mt-3 text-sm font-semibold">Список работников</div>
        <div className="mt-1 grid gap-1 sm:grid-cols-2">
          {state.users.map((u) => (
            <label key={u.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.workers.includes(u.id)}
                onChange={(e) =>
                  setForm({
                    ...form,
                    workers: e.target.checked ? [...form.workers, u.id] : form.workers.filter((id) => id !== u.id),
                  })
                }
              />
              {u.shortName} · {u.workshop}
            </label>
          ))}
        </div>
        <Button
          className="mt-4"
          onClick={() => {
            if (!guard("briefings")) return;
            if (!form.program.trim() || form.workers.length === 0) return toast("Укажите программу и работников", "err");
            dispatch({
              type: "add",
              entity: "briefings",
              item: {
                id: uid("b"),
                date: form.date,
                type: form.type,
                program: form.program,
                instructor: user.shortName,
                workers: form.workers.map((id) => ({ userId: id, signed: false })),
                attachments: [],
                workshop: form.workshop,
                nextDate: form.nextDate || undefined,
              },
            });
            toast("Инструктаж внесён в журнал", "ok");
            setOpen(false);
          }}
        >
          Сохранить
        </Button>
      </Modal>
    </div>
  );
}
