import { useState } from "react";
import { images } from "../assets";
import { Badge, Button, Empty, Field, GlassCard, Input, Modal, PageHeader, Select, Tabs, statusTone } from "../components/ui";
import { formatDate, riskLevel, uid } from "../lib";
import { useStore } from "../store";

export default function Ppe() {
  const [tab, setTab] = useState("ppe");
  return (
    <div>
      <PageHeader title="СИЗ, оценка рисков, СОУТ" crumbs={[{ label: "СИЗ, риски, СОУТ" }]} subtitle="Нормы выдачи, склад, заявки, реестр опасностей и карты СОУТ." />
      <Tabs
        tabs={[
          { id: "ppe", label: "СИЗ" },
          { id: "risk", label: "Оценка рисков" },
          { id: "sout", label: "СОУТ" },
        ]}
        value={tab}
        onChange={setTab}
      />
      {tab === "ppe" && <PpeTab />}
      {tab === "risk" && <RiskTab />}
      {tab === "sout" && <SoutTab />}
    </div>
  );
}

function PpeTab() {
  const { state, dispatch, user, guard, toast } = useStore();
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState(state.ppe[0]?.id ?? "");
  const [size, setSize] = useState("");
  const item = state.ppe.find((p) => p.id === itemId);

  return (
    <div className="space-y-4">
      <img src={images.ppeStill} alt="" className="h-40 w-full rounded-[28px] object-cover" />
      <div className="flex justify-end">
        <Button onClick={() => setOpen(true)}>Заявка на выдачу</Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {state.ppe.map((p) => (
          <GlassCard key={p.id} className="p-4">
            <div className="flex justify-between gap-2">
              <div className="font-bold text-[#0a3d26]">{p.name}</div>
              <Badge tone={p.stock < p.minStock ? "red" : "green"}>остаток {p.stock}</Badge>
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {p.sku} · {p.category} · замена раз в {p.lifeMonths} мес. · размеры: {p.sizes.join(", ")}
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, (p.stock / (p.minStock * 4)) * 100)}%` }} />
            </div>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="p-4">
        <div className="mb-2 font-bold">Нормы выдачи по профессии</div>
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-slate-500">
            <tr>
              <th className="py-1">Профессия</th>
              <th>СИЗ</th>
              <th>Кол-во</th>
              <th>Период</th>
            </tr>
          </thead>
          <tbody>
            {state.ppeNorms.map((n) => (
              <tr key={n.id} className="border-t border-emerald-50">
                <td className="py-2">{n.profession}</td>
                <td>{state.ppe.find((p) => p.id === n.itemId)?.name}</td>
                <td>{n.qty}</td>
                <td>{n.periodMonths} мес.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
      <GlassCard className="p-4">
        <div className="mb-2 font-bold">Заявки</div>
        {state.ppeRequests.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 border-t border-emerald-50 py-2 text-sm">
            <div>
              {state.users.find((u) => u.id === r.userId)?.shortName} · {state.ppe.find((p) => p.id === r.itemId)?.name} · {r.size} × {r.qty}
              <div className="text-xs text-slate-500">{r.comment}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone={statusTone(r.status)}>{r.status}</Badge>
              {r.status === "новая" && (
                <Button
                  variant="soft"
                  onClick={() => {
                    if (!guard("ppe")) return;
                    dispatch({ type: "update", entity: "ppeRequests", id: r.id, patch: { status: "одобрена" } });
                  }}
                >
                  Одобрить
                </Button>
              )}
              {r.status === "одобрена" && (
                <Button
                  onClick={() => {
                    if (!guard("ppe")) return;
                    dispatch({ type: "update", entity: "ppeRequests", id: r.id, patch: { status: "выдана" } });
                    const it = state.ppe.find((p) => p.id === r.itemId);
                    if (it) dispatch({ type: "update", entity: "ppe", id: it.id, patch: { stock: Math.max(0, it.stock - r.qty) } });
                    toast("Выдано со склада", "ok");
                  }}
                >
                  Выдать
                </Button>
              )}
            </div>
          </div>
        ))}
      </GlassCard>
      <Modal open={open} onClose={() => setOpen(false)} title="Заявка на СИЗ">
        <Field label="Номенклатура">
          <Select value={itemId} onChange={(e) => setItemId(e.target.value)}>
            {state.ppe.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>
        <div className="mt-3">
          <Field label="Размер">
            <Select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">выберите</option>
              {item?.sizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
        </div>
        <Button
          className="mt-4"
          onClick={() => {
            if (!size) return toast("Выберите размер", "err");
            dispatch({
              type: "add",
              entity: "ppeRequests",
              item: { id: uid("pr"), date: new Date().toISOString().slice(0, 10), userId: user.id, itemId, size, qty: 1, status: "новая", comment: "Заявка с портала" },
            });
            toast("Заявка отправлена", "ok");
            setOpen(false);
          }}
        >
          Отправить
        </Button>
      </Modal>
    </div>
  );
}

function RiskTab() {
  const { state, dispatch, guard, toast } = useStore();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ hazard: "", workplace: "", workshop: state.users[0].workshop, probability: 3, severity: 3, measures: "" });
  return (
    <div>
      <div className="mb-3 flex justify-end">
        <Button onClick={() => setOpen(true)}>Добавить опасность</Button>
      </div>
      <div className="mb-4 overflow-x-auto">
        <div className="text-xs text-slate-500">Матрица вероятность × тяжесть</div>
        <table className="mt-1 text-center text-xs">
          <tbody>
            {[5, 4, 3, 2, 1].map((p) => (
              <tr key={p}>
                { [1, 2, 3, 4, 5].map((s) => {
                  const score = p * s;
                  const bg = score >= 15 ? "bg-red-200" : score >= 8 ? "bg-amber-100" : "bg-emerald-100";
                  return (
                    <td key={s} className={`h-10 w-10 rounded-md ${bg}`}>
                      {score}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {state.risks.map((r) => {
        const score = r.probability * r.severity;
        const lvl = riskLevel(score);
        return (
          <GlassCard key={r.id} className="mb-2 p-4">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <div className="font-bold">{r.hazard}</div>
                <div className="text-xs text-slate-500">
                  {r.workplace} · {r.workshop} · меры: {r.measures}
                </div>
              </div>
              <div className="text-right text-sm">
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${lvl.color}`}>
                  {score} · {lvl.label}
                </span>
                <div className="text-xs text-slate-500">остаточный {r.residual}</div>
              </div>
            </div>
          </GlassCard>
        );
      })}
      <Modal open={open} onClose={() => setOpen(false)} title="Новая опасность">
        <div className="space-y-3">
          <Field label="Опасность">
            <Input value={f.hazard} onChange={(e) => setF({ ...f, hazard: e.target.value })} />
          </Field>
          <Field label="Рабочее место">
            <Input value={f.workplace} onChange={(e) => setF({ ...f, workplace: e.target.value })} />
          </Field>
          <Field label="Вероятность 1–5">
            <Input type="number" min={1} max={5} value={f.probability} onChange={(e) => setF({ ...f, probability: Number(e.target.value) })} />
          </Field>
          <Field label="Тяжесть 1–5">
            <Input type="number" min={1} max={5} value={f.severity} onChange={(e) => setF({ ...f, severity: Number(e.target.value) })} />
          </Field>
          <Field label="Меры">
            <Input value={f.measures} onChange={(e) => setF({ ...f, measures: e.target.value })} />
          </Field>
          <Button
            onClick={() => {
              if (!guard("ppe")) return;
              if (!f.hazard.trim()) return toast("Укажите опасность", "err");
              dispatch({
                type: "add",
                entity: "risks",
                item: { id: uid("r"), ...f, residual: Math.max(1, f.probability * f.severity - 4), owner: "Иванова А.С." },
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

function SoutTab() {
  const { state } = useStore();
  if (!state.sout.length) return <Empty title="Нет карт СОУТ" />;
  return (
    <div className="space-y-3">
      {state.sout.map((s) => (
        <GlassCard key={s.id} className="p-4">
          <div className="flex flex-wrap justify-between gap-2">
            <div>
              <div className="font-bold text-[#0a3d26]">{s.workplace}</div>
              <div className="text-sm text-slate-500">{s.workshop}</div>
            </div>
            <Badge tone={s.class.startsWith("3") ? "amber" : "green"}>класс {s.class}</Badge>
          </div>
          <div className="mt-2 text-sm">
            Срок: {formatDate(s.validUntil)} {new Date(s.validUntil) < new Date() ? "· истекла" : ""}
          </div>
          <div className="mt-1 text-sm">Вредные факторы: {s.factors.join(", ") || "нет"}</div>
          <div className="text-sm">Гарантии/компенсации: {s.guarantees.join(", ") || "—"}</div>
          <div className="mt-1 text-xs text-slate-500">Файл: {s.file}</div>
        </GlassCard>
      ))}
    </div>
  );
}
