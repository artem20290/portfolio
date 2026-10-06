import { Star } from "../icons";
import { useMemo, useState } from "react";
import { Badge, Button, Empty, Field, GlassCard, Input, Modal, PageHeader, Select, Textarea, statusTone } from "../components/ui";
import { formatDate, uid } from "../lib";
import { useStore } from "../store";
import type { DocItem } from "../types";

const FOLDERS = ["все", "политики", "стандарты", "инструкции", "шаблоны актов/нарядов", "чек-листы", "база знаний"];

export default function Lna() {
  const { state, dispatch, user, guard, toast } = useStore();
  const [folder, setFolder] = useState("все");
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");
  const [cur, setCur] = useState<DocItem | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", kind: "инструкция", folder: "инструкции", body: "", tags: "" });

  const tags = [...new Set(state.documents.flatMap((d) => d.tags))];
  const list = useMemo(
    () =>
      state.documents.filter((d) => {
        if (folder !== "все" && d.folder !== folder) return false;
        if (tag && !d.tags.includes(tag)) return false;
        return `${d.title} ${d.kind} ${d.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase());
      }),
    [state.documents, folder, q, tag],
  );

  const ack = (docId: string) => {
    if (state.acknowledgements.some((a) => a.docId === docId && a.userId === user.id)) {
      toast("Вы уже ознакомлены", "info");
      return;
    }
    dispatch({
      type: "add",
      entity: "acknowledgements",
      item: { id: uid("ack"), docId, userId: user.id, date: new Date().toISOString() },
    });
    toast("Ознакомление зафиксировано", "ok");
  };

  return (
    <div>
      <PageHeader
        title="ЛНА по ОТ, ПБиЭ, шаблоны, база"
        subtitle="Библиотека локальных нормативных актов, шаблонов и базы знаний."
        crumbs={[{ label: "ЛНА" }]}
        actions={<Button onClick={() => setOpen(true)}>Добавить документ</Button>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {FOLDERS.map((f) => (
          <button
            key={f}
            onClick={() => setFolder(f)}
            className={`rounded-2xl px-3 py-1.5 text-sm font-semibold ${folder === f ? "bg-[#0a3d26] text-white" : "bg-white/70 text-slate-600"}`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="mb-4 grid gap-2 sm:grid-cols-2">
        <Input placeholder="Поиск по названию и тегам" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">Все теги</option>
          {tags.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </div>
      {list.length === 0 && <Empty title="Документы не найдены" />}
      <div className="grid gap-3 md:grid-cols-2">
        {list.map((d) => {
          const fav = state.favorites.includes(d.id);
          return (
            <GlassCard key={d.id} hover className="p-4">
              <div className="flex items-start justify-between gap-2">
                <button className="text-left" onClick={() => setCur(d)}>
                  <div className="font-bold text-[#0a3d26]">{d.title}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    {d.kind} · v{d.version} · {formatDate(d.date)} · {d.owner}
                  </div>
                </button>
                <button onClick={() => dispatch({ type: "toggleFav", id: d.id })} className={fav ? "text-amber-500" : "text-slate-300"}>
                  <Star size={18} fill={fav ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                <Badge tone={statusTone(d.status)}>{d.status}</Badge>
                {d.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" onClick={() => setCur(d)}>
                  Карточка
                </Button>
                <Button variant="soft" onClick={() => ack(d.id)}>
                  Ознакомлен
                </Button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <Modal open={!!cur} onClose={() => setCur(null)} title={cur?.title ?? ""} wide>
        {cur && (
          <div className="space-y-3 text-sm">
            <p>{cur.body}</p>
            <div>
              Файл: <span className="font-semibold">{cur.file}</span> · площадка {cur.site}
            </div>
            <div className="font-semibold">История версий</div>
            <ul className="space-y-1">
              {cur.versions.map((v) => (
                <li key={v.version} className="rounded-xl bg-white px-3 py-2 ring-1 ring-emerald-50">
                  v{v.version} · {formatDate(v.date)} · {v.author} — {v.note}
                </li>
              ))}
            </ul>
            <div className="font-semibold">Журнал ознакомления</div>
            <ul>
              {state.acknowledgements
                .filter((a) => a.docId === cur.id)
                .map((a) => (
                  <li key={a.id}>
                    {state.users.find((u) => u.id === a.userId)?.name} — {formatDate(a.date)}
                  </li>
                ))}
              {state.acknowledgements.filter((a) => a.docId === cur.id).length === 0 && <li className="text-slate-500">Пока никто не ознакомился</li>}
            </ul>
            <Button onClick={() => ack(cur.id)}>Подписать «ознакомлен»</Button>
          </div>
        )}
      </Modal>

      <Modal open={open} onClose={() => setOpen(false)} title="Новый документ">
        <div className="space-y-3">
          <Field label="Название">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Вид">
            <Select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })}>
              <option>политика</option>
              <option>стандарт</option>
              <option>инструкция</option>
              <option>шаблон</option>
              <option>чек-лист</option>
              <option>база знаний</option>
            </Select>
          </Field>
          <Field label="Папка">
            <Select value={form.folder} onChange={(e) => setForm({ ...form, folder: e.target.value })}>
              {FOLDERS.filter((f) => f !== "все").map((f) => (
                <option key={f}>{f}</option>
              ))}
            </Select>
          </Field>
          <Field label="Текст">
            <Textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          </Field>
          <Field label="Теги">
            <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          </Field>
          <Button
            onClick={() => {
              if (!guard("lna")) return;
              if (!form.title.trim()) return toast("Укажите название", "err");
              dispatch({
                type: "add",
                entity: "documents",
                item: {
                  id: uid("d"),
                  title: form.title,
                  kind: form.kind,
                  folder: form.folder,
                  version: "1.0",
                  date: new Date().toISOString(),
                  owner: user.shortName,
                  site: "Все площадки",
                  file: `${form.title}.pdf`,
                  status: "действует",
                  tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
                  body: form.body,
                  versions: [{ version: "1.0", date: new Date().toISOString(), author: user.shortName, note: "Создание" }],
                } satisfies DocItem,
              });
              toast("Документ добавлен", "ok");
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
