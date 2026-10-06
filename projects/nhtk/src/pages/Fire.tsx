import { useState } from "react";
import { images } from "../assets";
import { Badge, Button, Field, Input, Modal, PageHeader, Select, Textarea } from "../components/ui";
import { formatDate, isOverdue, uid } from "../lib";
import { useStore } from "../store";
import type { FireAsset } from "../types";

export default function Fire() {
  const { state, dispatch, guard, toast } = useStore();
  const [cur, setCur] = useState<FireAsset | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: "огнетушитель" as FireAsset["type"], inventory: "", place: "", nextTo: "", notes: "" });
  const overdue = state.fire.filter((f) => isOverdue(f.nextTo));

  return (
    <div>
      <PageHeader
        title="Журнал эксплуатации систем противопожарной защиты"
        crumbs={[{ label: "Журнал ППЗ" }]}
        subtitle="АПС, АУПТ, огнетушители, гидранты, противопожарные двери. Просроченное ТО — красным."
        actions={<Button onClick={() => setOpen(true)}>Добавить оборудование</Button>}
      />
      <img src={images.fireSystem} alt="" className="mb-4 h-40 w-full rounded-[28px] object-cover" />
      <div className="mb-4 text-sm font-semibold text-red-700">Просроченные ТО: {overdue.length}</div>
      <div className="overflow-x-auto rounded-[28px] bg-white/70">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Тип</th>
              <th>Инв. №</th>
              <th>Место</th>
              <th>Последнее ТО</th>
              <th>Следующее ТО</th>
              <th>Замечания</th>
            </tr>
          </thead>
          <tbody>
            {state.fire.map((f) => (
              <tr key={f.id} className={`cursor-pointer border-t border-emerald-50 ${isOverdue(f.nextTo) ? "bg-red-50 text-red-800" : ""}`} onClick={() => setCur(f)}>
                <td className="px-3 py-2 font-semibold">{f.type}</td>
                <td>{f.inventory}</td>
                <td>{f.place}</td>
                <td>{formatDate(f.lastTo)}</td>
                <td className="font-semibold">{formatDate(f.nextTo)}</td>
                <td>{f.notes || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={!!cur} onClose={() => setCur(null)} title={cur ? `${cur.type} ${cur.inventory}` : ""}>
        {cur && (
          <div className="space-y-2 text-sm">
            <div>{cur.place}</div>
            <div>Акты: {cur.acts.join(", ") || "нет"}</div>
            {isOverdue(cur.nextTo) && <Badge tone="red">ТО просрочено</Badge>}
            <Field label="Замечания">
              <Textarea
                value={cur.notes}
                onChange={(e) => {
                  dispatch({ type: "update", entity: "fire", id: cur.id, patch: { notes: e.target.value } });
                  setCur({ ...cur, notes: e.target.value });
                }}
              />
            </Field>
            <Button
              onClick={() => {
                if (!guard("fire")) return;
                const lastTo = new Date().toISOString().slice(0, 10);
                const n = new Date();
                n.setMonth(n.getMonth() + 3);
                dispatch({ type: "update", entity: "fire", id: cur.id, patch: { lastTo, nextTo: n.toISOString().slice(0, 10), notes: "ТО выполнено" } });
                toast("ТО отмечено", "ok");
                setCur(null);
              }}
            >
              Отметить ТО сегодня
            </Button>
          </div>
        )}
      </Modal>
      <Modal open={open} onClose={() => setOpen(false)} title="Оборудование ППЗ">
        <div className="space-y-3">
          <Field label="Тип">
            <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as FireAsset["type"] })}>
              <option>АПС</option>
              <option>АУПТ</option>
              <option>огнетушитель</option>
              <option>гидрант</option>
              <option>противопожарная дверь</option>
            </Select>
          </Field>
          <Field label="Инв. номер">
            <Input value={form.inventory} onChange={(e) => setForm({ ...form, inventory: e.target.value })} />
          </Field>
          <Field label="Место">
            <Input value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} />
          </Field>
          <Field label="Следующее ТО">
            <Input type="date" value={form.nextTo} onChange={(e) => setForm({ ...form, nextTo: e.target.value })} />
          </Field>
          <Button
            onClick={() => {
              if (!guard("fire") || !form.inventory) return toast("Укажите номер", "err");
              dispatch({
                type: "add",
                entity: "fire",
                item: { id: uid("fi"), ...form, lastTo: new Date().toISOString().slice(0, 10), acts: [] },
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
