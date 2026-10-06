import { useMemo, useState } from "react";
import { Badge, Button, Empty, Field, GlassCard, Input, Modal, PageHeader, Select, Textarea, statusTone } from "../components/ui";
import { formatDate, isOverdue, uid } from "../lib";
import { useStore } from "../store";
import type { Contractor } from "../types";

export default function Contractors() {
  const { state, dispatch, guard, toast } = useStore();
  const [q, setQ] = useState("");
  const [st, setSt] = useState("все");
  const [cur, setCur] = useState<Contractor | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", inn: "", contract: "", workType: "", siteAccess: "Площадка «Центральная»", owner: "" });
  const [viol, setViol] = useState("");

  const list = useMemo(
    () =>
      state.contractors.filter((c) => (st === "все" || c.status === st) && `${c.name} ${c.inn} ${c.workType}`.toLowerCase().includes(q.toLowerCase())),
    [state.contractors, q, st],
  );

  return (
    <div>
      <PageHeader
        title="Подрядные организации"
        crumbs={[{ label: "Подрядчики" }]}
        subtitle="Реестр, допуск на площадку, документы, нарушения и входной контроль."
        actions={<Button onClick={() => setOpen(true)}>Добавить подрядчика</Button>}
      />
      <div className="mb-4 grid gap-2 sm:grid-cols-2">
        <Input placeholder="Поиск по названию, ИНН, виду работ" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={st} onChange={(e) => setSt(e.target.value)}>
          <option value="все">Все статусы</option>
          <option>допущен</option>
          <option>ограничен</option>
          <option>заблокирован</option>
        </Select>
      </div>
      {list.length === 0 && <Empty title="Подрядчики не найдены" />}
      <div className="space-y-3">
        {list.map((c) => (
          <button key={c.id} className="block w-full text-left" onClick={() => setCur(c)}>
            <GlassCard hover className="p-4">
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <div className="font-bold text-[#0a3d26]">{c.name}</div>
                  <div className="text-sm text-slate-500">
                    ИНН {c.inn} · {c.contract} · {c.workType}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                  <span className="text-sm font-semibold">оценка {c.rating.toFixed(1)}</span>
                </div>
              </div>
            </GlassCard>
          </button>
        ))}
      </div>

      <Modal open={!!cur} onClose={() => setCur(null)} title={cur?.name ?? ""} wide>
        {cur && (
          <div className="space-y-3 text-sm">
            <div>
              Ответственный: {cur.owner} · допуск: {cur.siteAccess}
            </div>
            <div className="flex gap-2">
              {(["допущен", "ограничен", "заблокирован"] as const).map((s) => (
                <Button
                  key={s}
                  variant={cur.status === s ? "primary" : "outline"}
                  onClick={() => {
                    if (!guard("contractors")) return;
                    dispatch({ type: "update", entity: "contractors", id: cur.id, patch: { status: s } });
                    setCur({ ...cur, status: s });
                  }}
                >
                  {s}
                </Button>
              ))}
            </div>
            <div className="font-semibold">Документы и сроки допусков</div>
            {cur.docs.map((d, i) => (
              <div key={i} className="flex justify-between rounded-xl bg-white px-3 py-2 ring-1 ring-emerald-50">
                <span>{d.name}</span>
                <Badge tone={!d.ok || isOverdue(d.validUntil) ? "red" : "green"}>{formatDate(d.validUntil)}</Badge>
              </div>
            ))}
            <div className="font-semibold">Чек-лист входного контроля</div>
            <ul className="list-disc pl-5">
              <li>Вводный инструктаж — {cur.status === "заблокирован" ? "нет" : "да"}</li>
              <li>СИЗ — проверены</li>
              <li>Страховка — {cur.docs.find((d) => d.name.toLowerCase().includes("страх"))?.ok ? "да" : "нет"}</li>
              <li>Наряд-допуск — в комплекте</li>
            </ul>
            <div className="font-semibold">Журнал нарушений</div>
            {cur.violations.length === 0 && <p className="text-slate-500">Нарушений нет</p>}
            {cur.violations.map((v, i) => (
              <div key={i}>
                {formatDate(v.date)} · {v.severity}: {v.text}
              </div>
            ))}
            <Field label="Новое нарушение">
              <Textarea value={viol} onChange={(e) => setViol(e.target.value)} />
            </Field>
            <Button
              onClick={() => {
                if (!guard("contractors") || !viol.trim()) return;
                const violations = [...cur.violations, { date: new Date().toISOString(), text: viol, severity: "средняя" }];
                dispatch({ type: "update", entity: "contractors", id: cur.id, patch: { violations } });
                setCur({ ...cur, violations });
                setViol("");
              }}
            >
              Зафиксировать
            </Button>
          </div>
        )}
      </Modal>

      <Modal open={open} onClose={() => setOpen(false)} title="Новый подрядчик">
        <div className="space-y-3">
          <Field label="Название">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="ИНН">
            <Input value={form.inn} onChange={(e) => setForm({ ...form, inn: e.target.value })} />
          </Field>
          <Field label="Договор">
            <Input value={form.contract} onChange={(e) => setForm({ ...form, contract: e.target.value })} />
          </Field>
          <Field label="Вид работ">
            <Input value={form.workType} onChange={(e) => setForm({ ...form, workType: e.target.value })} />
          </Field>
          <Button
            onClick={() => {
              if (!guard("contractors")) return;
              if (!form.name || !form.inn) return toast("Название и ИНН обязательны", "err");
              dispatch({
                type: "add",
                entity: "contractors",
                item: {
                  id: uid("k"),
                  ...form,
                  owner: form.owner || "Иванова А.С.",
                  docs: [],
                  status: "ограничен",
                  violations: [],
                  rating: 3,
                },
              });
              toast("Подрядчик добавлен", "ok");
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
