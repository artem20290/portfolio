import { useState } from "react";
import { Badge, Button, Empty, Field, GlassCard, Input, Modal, PageHeader, Select, statusTone } from "../components/ui";
import { formatDate, uid } from "../lib";
import { useStore } from "../store";
import type { IndustrialItem } from "../types";

const KINDS: IndustrialItem["kind"][] = ["ОПО", "лицензия", "экспертиза", "ПЛАС", "инцидент на оборудовании", "наряд-допуск", "диагностика"];

export default function Industrial() {
  const { state, dispatch, user, guard, toast } = useStore();
  const [kind, setKind] = useState("все");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ kind: "ОПО" as IndustrialItem["kind"], title: "", number: "", validUntil: "", notes: "" });
  const list = state.industrial.filter((i) => kind === "все" || i.kind === kind);

  return (
    <div>
      <PageHeader
        title="Промышленная безопасность"
        crumbs={[{ label: "Промбезопасность" }]}
        subtitle="ОПО, лицензии, экспертизы, ПЛАС, наряды-допуски и график диагностик."
        actions={<Button onClick={() => setOpen(true)}>Добавить запись</Button>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {["все", ...KINDS].map((k) => (
          <button key={k} onClick={() => setKind(k)} className={`rounded-2xl px-3 py-1.5 text-sm font-semibold ${kind === k ? "bg-[#0a3d26] text-white" : "bg-white/70"}`}>
            {k}
          </button>
        ))}
      </div>
      {list.length === 0 && <Empty title="Нет записей" />}
      <div className="space-y-3">
        {list.map((i) => (
          <GlassCard key={i.id} className="p-4">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <div className="text-xs uppercase text-emerald-700">{i.kind}</div>
                <div className="font-bold text-[#0a3d26]">{i.title}</div>
                <div className="text-sm text-slate-500">
                  {i.number} · до {formatDate(i.validUntil)} · {i.owner}
                </div>
                {i.notes && <p className="mt-1 text-sm">{i.notes}</p>}
                <div className="text-xs text-slate-400">{i.file}</div>
              </div>
              <Badge tone={statusTone(i.status)}>{i.status}</Badge>
            </div>
          </GlassCard>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Запись ПБ">
        <div className="space-y-3">
          <Field label="Вид">
            <Select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value as IndustrialItem["kind"] })}>
              {KINDS.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </Select>
          </Field>
          <Field label="Название">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Номер">
            <Input value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
          </Field>
          <Field label="Действует до">
            <Input type="date" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })} />
          </Field>
          <Button
            onClick={() => {
              if (!guard("industrial") || !form.title) return toast("Заполните название", "err");
              const until = form.validUntil ? new Date(form.validUntil) : new Date();
              const days = (until.getTime() - Date.now()) / 86400000;
              const status: IndustrialItem["status"] = days < 0 ? "просрочено" : days < 45 ? "истекает" : "действует";
              dispatch({
                type: "add",
                entity: "industrial",
                item: { id: uid("is"), ...form, status, owner: user.shortName, file: `${form.number || "doc"}.pdf` },
              });
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
