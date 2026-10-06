import { useMemo, useState } from "react";
import { Badge, Button, Empty, Field, GlassCard, Input, Modal, PageHeader, Select, Textarea, statusTone } from "../components/ui";
import { downloadCsv, formatDateTime, isOverdue, printHtml, uid } from "../lib";
import { useStore } from "../store";
import { INCIDENT_TYPES, SITES, WORKSHOPS, type Incident, type IncidentStatus, type IncidentType } from "../types";

const STATUSES: IncidentStatus[] = ["черновик", "расследование", "меры", "закрыто"];

export default function Incidents() {
  const { state, dispatch, user, guard, toast } = useStore();
  const [q, setQ] = useState("");
  const [type, setType] = useState("все");
  const [st, setSt] = useState("все");
  const [site, setSite] = useState("все");
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState<Incident | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const list = useMemo(() => {
    return state.incidents
      .filter((i) => (type === "все" ? true : i.type === type))
      .filter((i) => (st === "все" ? true : i.status === st))
      .filter((i) => (site === "все" ? true : i.site === site))
      .filter((i) => `${i.number} ${i.description} ${i.workshop} ${i.place}`.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => +new Date(b.datetime) - +new Date(a.datetime));
  }, [state.incidents, q, type, st, site]);

  const save = () => {
    if (!guard("incidents")) return;
    const e: Record<string, string> = {};
    if (!form.description.trim()) e.description = "Опишите событие";
    if (!form.place.trim()) e.place = "Укажите место";
    setErrors(e);
    if (Object.keys(e).length) return;
    const item: Incident = {
      id: uid("inc"),
      number: `НХТК-${new Date().getFullYear()}-${String(state.incidents.length + 13).padStart(3, "0")}`,
      datetime: form.datetime,
      site: form.site,
      workshop: form.workshop,
      place: form.place,
      type: form.type as IncidentType,
      severity: form.severity as Incident["severity"],
      injured: form.injured ? form.injured.split(",").map((s) => s.trim()) : [],
      description: form.description,
      causes: form.causes.split("\n").map((s) => s.trim()).filter(Boolean),
      witnesses: form.witnesses ? form.witnesses.split(",").map((s) => s.trim()) : [],
      attachments: [],
      status: "черновик",
      owner: user.id,
      due: form.due,
      capa: [],
      relatedAuditIds: [],
      confirmed: form.type === "с потерей времени",
    };
    dispatch({ type: "add", entity: "incidents", item });
    toast("Происшествие создано", "ok");
    setOpen(false);
    setForm(emptyForm());
  };

  const exportCsv = () =>
    downloadCsv(
      "proisshestviya.csv",
      list.map((i) => ({
        номер: i.number,
        дата: i.datetime,
        тип: i.type,
        статус: i.status,
        площадка: i.site,
        цех: i.workshop,
        описание: i.description,
      })),
    );

  return (
    <div>
      <PageHeader
        title="Происшествия"
        subtitle="Журнал инцидентов. Счётчик «дней без происшествий» зависит от подтверждённых LTI."
        crumbs={[{ label: "Происшествия" }]}
        actions={
          <>
            <Button variant="outline" onClick={exportCsv}>
              Excel
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                printHtml(
                  "Происшествия",
                  `<h1>Журнал происшествий НХТК</h1><table><tr><th>Номер</th><th>Тип</th><th>Статус</th><th>Описание</th></tr>${list
                    .map((i) => `<tr><td>${i.number}</td><td>${i.type}</td><td>${i.status}</td><td>${i.description}</td></tr>`)
                    .join("")}</table>`,
                )
              }
            >
              PDF
            </Button>
            <Button onClick={() => setOpen(true)}>Создать</Button>
          </>
        }
      />

      <GlassCard className="mb-4 p-4">
        <div className="grid gap-2 sm:grid-cols-4">
          <Input placeholder="Поиск…" value={q} onChange={(e) => setQ(e.target.value)} />
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="все">Все типы</option>
            {INCIDENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
          <Select value={st} onChange={(e) => setSt(e.target.value)}>
            <option value="все">Все статусы</option>
            {STATUSES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
          <Select value={site} onChange={(e) => setSite(e.target.value)}>
            <option value="все">Все площадки</option>
            {SITES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </div>
      </GlassCard>

      {list.length === 0 && <Empty title="Нет записей" text="Измените фильтры или создайте происшествие" />}

      <div className="space-y-3">
        {list.map((i) => (
          <button key={i.id} onClick={() => setCur(i)} className="block w-full text-left">
            <GlassCard hover className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-[#0a3d26]">{i.number}</div>
                  <div className="text-sm text-slate-600">{i.description}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    {formatDateTime(i.datetime)} · {i.workshop} · {i.place}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge tone={statusTone(i.type)}>{i.type}</Badge>
                  <Badge tone={statusTone(i.status)}>{i.status}</Badge>
                  <Badge tone={i.severity === "критическая" || i.severity === "высокая" ? "red" : "gray"}>{i.severity}</Badge>
                </div>
              </div>
            </GlassCard>
          </button>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Новое происшествие" wide>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Дата и время">
            <Input type="datetime-local" value={form.datetime} onChange={(e) => setForm({ ...form, datetime: e.target.value })} />
          </Field>
          <Field label="Тип">
            <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {INCIDENT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>
          <Field label="Площадка">
            <Select value={form.site} onChange={(e) => setForm({ ...form, site: e.target.value })}>
              {SITES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>
          <Field label="Цех">
            <Select value={form.workshop} onChange={(e) => setForm({ ...form, workshop: e.target.value })}>
              {WORKSHOPS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>
          <Field label="Место" error={errors.place}>
            <Input value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} />
          </Field>
          <Field label="Тяжесть">
            <Select value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })}>
              <option>низкая</option>
              <option>средняя</option>
              <option>высокая</option>
              <option>критическая</option>
            </Select>
          </Field>
          <Field label="Пострадавшие">
            <Input value={form.injured} onChange={(e) => setForm({ ...form, injured: e.target.value })} placeholder="ФИО через запятую" />
          </Field>
          <Field label="Срок мер">
            <Input type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Описание" error={errors.description}>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Причины (5 why, каждая с новой строки)">
              <Textarea value={form.causes} onChange={(e) => setForm({ ...form, causes: e.target.value })} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Свидетели">
              <Input value={form.witnesses} onChange={(e) => setForm({ ...form, witnesses: e.target.value })} />
            </Field>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Отмена
          </Button>
          <Button onClick={save}>Сохранить черновик</Button>
        </div>
      </Modal>

      <Modal open={!!cur} onClose={() => setCur(null)} title={cur?.number ?? ""} wide>
        {cur && (
          <IncidentCard
            inc={cur}
            onChange={(patch) => {
              if (!guard("incidents")) return;
              dispatch({ type: "update", entity: "incidents", id: cur.id, patch });
              setCur({ ...cur, ...patch } as Incident);
            }}
            audits={state.audits}
          />
        )}
      </Modal>
    </div>
  );
}

function emptyForm() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return {
    datetime: d.toISOString().slice(0, 16),
    type: "почти-событие",
    site: SITES[0],
    workshop: WORKSHOPS[0],
    place: "",
    severity: "средняя",
    injured: "",
    description: "",
    causes: "",
    witnesses: "",
    due: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 10),
  };
}

function IncidentCard({
  inc,
  onChange,
  audits,
}: {
  inc: Incident;
  onChange: (p: Partial<Incident>) => void;
  audits: { id: string; type: string; workshop: string }[];
}) {
  const [task, setTask] = useState("");
  const { dispatch, toast, guard } = useStore();
  return (
    <div className="space-y-4 text-sm">
      <div className="flex flex-wrap gap-2">
        <Badge tone={statusTone(inc.status)}>{inc.status}</Badge>
        <Badge>{inc.type}</Badge>
        {inc.confirmed && <Badge tone="green">подтверждено</Badge>}
      </div>
      <p>{inc.description}</p>
      <div className="grid gap-2 sm:grid-cols-2 text-slate-600">
        <div>Место: {inc.place}</div>
        <div>Цех: {inc.workshop}</div>
        <div>Пострадавшие: {inc.injured.join(", ") || "нет"}</div>
        <div>Свидетели: {inc.witnesses.join(", ") || "—"}</div>
        <div>Вложения: {inc.attachments.join(", ") || "нет"}</div>
        <div>Срок мер: {inc.due}</div>
      </div>
      {inc.causes.length > 0 && (
        <div>
          <div className="font-semibold">Дерево причин / 5 why</div>
          <ol className="mt-1 list-decimal pl-5">
            {inc.causes.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ol>
        </div>
      )}
      <div>
        <div className="mb-2 font-semibold">План корректирующих действий</div>
        <div className="space-y-2">
          {inc.capa.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 ring-1 ring-emerald-100">
              <div>
                <div className="font-medium">{c.task}</div>
                <div className="text-xs text-slate-500">
                  {c.owner} · до {c.due} {isOverdue(c.due, c.status === "закрыто") ? "· просрочено" : ""}
                </div>
              </div>
              <Select
                value={c.status}
                onChange={(e) =>
                  onChange({ capa: inc.capa.map((x) => (x.id === c.id ? { ...x, status: e.target.value as typeof c.status } : x)) })
                }
              >
                <option>открыто</option>
                <option>в работе</option>
                <option>закрыто</option>
              </Select>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <Input placeholder="Новая задача" value={task} onChange={(e) => setTask(e.target.value)} />
          <Button
            variant="soft"
            onClick={() => {
              if (!task.trim()) return;
              onChange({
                capa: [...inc.capa, { id: uid("capa"), task, owner: "Иванова А.С.", due: inc.due, status: "открыто" }],
              });
              setTask("");
            }}
          >
            Добавить
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-1 font-semibold">Связь с аудитами</div>
        <Select
          value={inc.relatedAuditIds[0] ?? ""}
          onChange={(e) => onChange({ relatedAuditIds: e.target.value ? [e.target.value] : [] })}
        >
          <option value="">нет</option>
          {audits.map((a) => (
            <option key={a.id} value={a.id}>
              {a.id} · {a.type} · {a.workshop}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <Button key={s} variant={inc.status === s ? "primary" : "outline"} onClick={() => onChange({ status: s, confirmed: s !== "черновик" ? inc.confirmed || inc.type === "с потерей времени" : inc.confirmed })}>
            {s}
          </Button>
        ))}
        <Button
          variant="danger"
          onClick={() => {
            if (!guard("incidents")) return;
            dispatch({ type: "remove", entity: "incidents", id: inc.id });
            toast("Удалено", "ok");
          }}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
}
