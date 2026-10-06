import { useState } from "react";
import { Badge, Button, Field, GlassCard, Input, Modal, PageHeader, Select, statusTone } from "../components/ui";
import { formatDate, uid } from "../lib";
import { useStore } from "../store";
import type { Inspection } from "../types";

const BODIES = ["Ростехнадзор", "ГИТ", "МЧС", "Росприроднадзор", "Роспотребнадзор"];

export default function Inspections() {
  const { state, dispatch, guard, toast } = useStore();
  const [cur, setCur] = useState<Inspection | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ body: "Ростехнадзор", type: "плановая", period: "", start: "", end: "" });
  const overduePts = state.inspections.flatMap((i) => i.prescriptions.filter((p) => p.status === "просрочено"));

  return (
    <div>
      <PageHeader
        title="Проверки надзорных органов"
        crumbs={[{ label: "Проверки надзора" }]}
        subtitle="Реестр проверок, предписания, сроки, штрафы и эскалация просроченных пунктов."
        actions={<Button onClick={() => setOpen(true)}>Зарегистрировать проверку</Button>}
      />
      {overduePts.length > 0 && (
        <GlassCard className="mb-4 border border-red-200 bg-red-50/70 p-4">
          <div className="font-bold text-red-800">Эскалация: {overduePts.length} просроченных пунктов</div>
          <ul className="mt-1 list-disc pl-5 text-sm text-red-900">
            {overduePts.map((p) => (
              <li key={p.id}>
                {p.text} · {p.owner} · до {formatDate(p.due)}
              </li>
            ))}
          </ul>
        </GlassCard>
      )}
      <div className="space-y-3">
        {state.inspections.map((i) => (
          <button key={i.id} className="block w-full text-left" onClick={() => setCur(i)}>
            <GlassCard hover className="p-4">
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <div className="font-bold text-[#0a3d26]">{i.body}</div>
                  <div className="text-sm text-slate-500">
                    {i.type} · {i.period}
                  </div>
                </div>
                <div className="text-right">
                  <Badge tone={statusTone(i.status)}>{i.status}</Badge>
                  {i.fines > 0 && <div className="mt-1 text-sm text-red-700">{i.fines.toLocaleString("ru-RU")} ₽</div>}
                </div>
              </div>
            </GlassCard>
          </button>
        ))}
      </div>
      <Modal open={!!cur} onClose={() => setCur(null)} title={cur?.body ?? ""} wide>
        {cur && (
          <div className="space-y-3 text-sm">
            <div>
              {cur.type} · {formatDate(cur.start)} — {formatDate(cur.end)}
            </div>
            <div>Вложения: {cur.attachments.join(", ")}</div>
            <div className="font-semibold">Пункты предписания</div>
            {cur.prescriptions.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white px-3 py-2 ring-1 ring-emerald-50">
                <div>
                  <div>{p.text}</div>
                  <div className="text-xs text-slate-500">
                    {p.owner} · {formatDate(p.due)}
                  </div>
                </div>
                <Select
                  value={p.status}
                  onChange={(e) => {
                    if (!guard("inspections")) return;
                    const prescriptions = cur.prescriptions.map((x) => (x.id === p.id ? { ...x, status: e.target.value as typeof p.status } : x));
                    dispatch({ type: "update", entity: "inspections", id: cur.id, patch: { prescriptions } });
                    setCur({ ...cur, prescriptions });
                  }}
                >
                  <option>открыто</option>
                  <option>устранено</option>
                  <option>просрочено</option>
                </Select>
              </div>
            ))}
          </div>
        )}
      </Modal>
      <Modal open={open} onClose={() => setOpen(false)} title="Новая проверка">
        <div className="space-y-3">
          <Field label="Орган">
            <Select value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })}>
              {BODIES.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </Select>
          </Field>
          <Field label="Тип">
            <Input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
          </Field>
          <Field label="Период (текст)">
            <Input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} />
          </Field>
          <Field label="Начало">
            <Input type="date" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
          </Field>
          <Field label="Окончание">
            <Input type="date" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} />
          </Field>
          <Button
            onClick={() => {
              if (!guard("inspections")) return;
              dispatch({
                type: "add",
                entity: "inspections",
                item: {
                  id: uid("insp"),
                  ...form,
                  prescriptions: [],
                  fines: 0,
                  attachments: [],
                  status: "назначена",
                },
              });
              toast("Проверка добавлена", "ok");
              setOpen(false);
            }}
          >
            Сохранить
          </Button>
        </div>
      </Modal>
    </div>
  );
}
