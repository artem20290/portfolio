import { useState } from "react";
import { images, photoSrc } from "../assets";
import { Badge, Button, Field, GlassCard, Input, Modal, PageHeader, Select, Tabs, Textarea, statusTone } from "../components/ui";
import { formatDate, isOverdue, uid } from "../lib";
import { useStore } from "../store";
import { SITES, WORKSHOPS, type Audit, type TaskItem, type TaskStatus } from "../types";

const COLS: TaskStatus[] = ["новые", "в работе", "просрочено", "закрыто"];

export default function Audits() {
  const [tab, setTab] = useState("audits");
  return (
    <div>
      <PageHeader title="Аудиты, задачи" crumbs={[{ label: "Аудиты" }]} subtitle="Внутренние, BBS, обходы руководителя, аудиты подрядчика и канбан задач." />
      <Tabs
        tabs={[
          { id: "audits", label: "Аудиты" },
          { id: "kanban", label: "Канбан задач" },
        ]}
        value={tab}
        onChange={setTab}
      />
      {tab === "audits" ? <AuditList /> : <Kanban />}
    </div>
  );
}

function AuditList() {
  const { state, dispatch, user, guard, toast } = useStore();
  const [cur, setCur] = useState<Audit | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: "поведенческий" as Audit["type"], site: SITES[0], workshop: WORKSHOPS[0], date: new Date().toISOString().slice(0, 10) });
  const overdue = state.tasks.filter((t) => t.status !== "закрыто" && isOverdue(t.due)).length;

  return (
    <div>
      <img src={images.auditWalk} alt="" className="mb-4 h-40 w-full rounded-[28px] object-cover" />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <GlassCard className="px-4 py-3 text-sm">
          Просрочек по задачам: <b className="text-red-700">{overdue}</b>
        </GlassCard>
        <Button onClick={() => setOpen(true)}>Новый аудит</Button>
      </div>
      <div className="space-y-3">
        {state.audits.map((a) => (
          <button key={a.id} className="block w-full text-left" onClick={() => setCur(a)}>
            <GlassCard hover className="p-4">
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <div className="font-bold capitalize text-[#0a3d26]">{a.type}</div>
                  <div className="text-sm text-slate-500">
                    {formatDate(a.date)} · {a.workshop} · {a.auditor}
                  </div>
                </div>
                <Badge tone={statusTone(a.status)}>{a.status}</Badge>
              </div>
              <div className="mt-2 text-xs text-slate-500">Находок: {a.findings.length}</div>
            </GlassCard>
          </button>
        ))}
      </div>
      <Modal open={!!cur} onClose={() => setCur(null)} title={cur ? `${cur.type} · ${cur.workshop}` : ""} wide>
        {cur && (
          <div className="space-y-3 text-sm">
            <div className="font-semibold">Чек-лист</div>
            {cur.checklist.map((c, i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={c.ok}
                  onChange={() => {
                    const checklist = cur.checklist.map((x, j) => (j === i ? { ...x, ok: !x.ok } : x));
                    dispatch({ type: "update", entity: "audits", id: cur.id, patch: { checklist } });
                    setCur({ ...cur, checklist });
                  }}
                />
                {c.item}
              </label>
            ))}
            <div className="font-semibold">Находки</div>
            {cur.findings.map((f) => (
              <div key={f.id} className="rounded-2xl bg-white p-3 ring-1 ring-emerald-50">
                <div className="flex gap-2">
                  <Badge tone={f.result === "несоответствие" ? "red" : f.result === "наблюдение" ? "amber" : "green"}>{f.result}</Badge>
                  <Badge>{f.criticality}</Badge>
                </div>
                <p className="mt-1">{f.text}</p>
                {f.photo && <img src={photoSrc(f.photo)} alt="" className="mt-2 h-24 rounded-xl object-cover" />}
                {f.taskId && <div className="text-xs text-emerald-800">Задача {f.taskId}</div>}
                {!f.taskId && f.result !== "соответствует" && (
                  <Button
                    variant="soft"
                    className="mt-2"
                    onClick={() => {
                      if (!guard("audits")) return;
                      const id = uid("tk");
                      dispatch({
                        type: "add",
                        entity: "tasks",
                        item: {
                          id,
                          title: f.text,
                          description: `Из аудита ${cur.id}`,
                          owner: cur.auditor,
                          due: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 10),
                          status: "новые",
                          source: "аудит",
                          sourceId: cur.id,
                          verified: false,
                        } satisfies TaskItem,
                      });
                      const findings = cur.findings.map((x) => (x.id === f.id ? { ...x, taskId: id } : x));
                      dispatch({ type: "update", entity: "audits", id: cur.id, patch: { findings } });
                      setCur({ ...cur, findings });
                      toast("Задача создана", "ok");
                    }}
                  >
                    Создать задачу
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </Modal>
      <Modal open={open} onClose={() => setOpen(false)} title="Новый аудит">
        <div className="space-y-3">
          <Field label="Тип">
            <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Audit["type"] })}>
              <option>внутренний</option>
              <option>поведенческий</option>
              <option>обход руководителя</option>
              <option>аудит подрядчика</option>
            </Select>
          </Field>
          <Field label="Площадка">
            <Select value={form.site} onChange={(e) => setForm({ ...form, site: e.target.value })}>
              {SITES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Цех">
            <Select value={form.workshop} onChange={(e) => setForm({ ...form, workshop: e.target.value })}>
              {WORKSHOPS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Дата">
            <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </Field>
          <Button
            onClick={() => {
              if (!guard("audits")) return;
              dispatch({
                type: "add",
                entity: "audits",
                item: {
                  id: uid("a"),
                  ...form,
                  auditor: user.shortName,
                  checklist: [
                    { item: "СИЗ", ok: false },
                    { item: "Порядок", ok: false },
                    { item: "LOTO", ok: false },
                  ],
                  findings: [],
                  status: "план",
                },
              });
              toast("Аудит запланирован", "ok");
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

function Kanban() {
  const { state, dispatch, guard } = useStore();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const move = (t: TaskItem, status: TaskStatus) => {
    if (!guard("audits")) return;
    dispatch({ type: "update", entity: "tasks", id: t.id, patch: { status, verified: status === "закрыто" ? t.verified : false } });
  };

  return (
    <div>
      <div className="mb-3 flex justify-end">
        <Button onClick={() => setOpen(true)}>Новая задача</Button>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        {COLS.map((col) => (
          <div key={col} className="rounded-[24px] bg-white/50 p-2">
            <div className="px-2 py-1 text-sm font-bold capitalize">{col}</div>
            {state.tasks
              .filter((t) => (col === "просрочено" ? t.status !== "закрыто" && isOverdue(t.due) : col === "в работе" ? t.status === "в работе" && !isOverdue(t.due) : t.status === col))
              .map((t) => (
                <GlassCard key={t.id} className="mb-2 p-3">
                  <div className="text-sm font-semibold">{t.title}</div>
                  <div className="text-xs text-slate-500">
                    {t.owner} · {formatDate(t.due)}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {COLS.filter((c) => c !== t.status).map((c) => (
                      <button key={c} className="rounded-lg bg-emerald-50 px-2 py-0.5 text-[11px]" onClick={() => move(t, c)}>
                        → {c}
                      </button>
                    ))}
                  </div>
                </GlassCard>
              ))}
          </div>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Задача">
        <Field label="Название">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <div className="mt-2">
          <Field label="Описание">
            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
          </Field>
        </div>
        <Button
          className="mt-3"
          onClick={() => {
            if (!guard("audits") || !title.trim()) return;
            dispatch({
              type: "add",
              entity: "tasks",
              item: {
                id: uid("tk"),
                title,
                description: desc,
                owner: "Иванова А.С.",
                due: new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 10),
                status: "новые",
                source: "ручная",
                sourceId: "",
                verified: false,
              },
            });
            setOpen(false);
            setTitle("");
          }}
        >
          Создать
        </Button>
      </Modal>
    </div>
  );
}
