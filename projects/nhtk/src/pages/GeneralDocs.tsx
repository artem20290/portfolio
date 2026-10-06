import { useMemo, useState } from "react";
import { Badge, Button, Empty, Field, GlassCard, Input, Modal, PageHeader } from "../components/ui";
import { downloadText, formatDate, uid } from "../lib";
import { useStore } from "../store";

export default function GeneralDocs() {
  const { state, dispatch, user, toast } = useStore();
  const [q, setQ] = useState("");
  const [folder, setFolder] = useState("все");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const folders = ["все", ...new Set(state.generalDocs.map((d) => d.folder))];
  const list = useMemo(
    () => state.generalDocs.filter((d) => (folder === "все" || d.folder === folder) && d.title.toLowerCase().includes(q.toLowerCase())),
    [state.generalDocs, folder, q],
  );

  return (
    <div>
      <PageHeader
        title="Общие документы"
        crumbs={[{ label: "Общие документы" }]}
        subtitle="Приказы, объявления, шаблоны писем, оргструктура и контакты — не ЛНА."
        actions={<Button onClick={() => setOpen(true)}>Добавить</Button>}
      />
      <div className="mb-3 flex flex-wrap gap-2">
        {folders.map((f) => (
          <button key={f} onClick={() => setFolder(f)} className={`rounded-2xl px-3 py-1.5 text-sm font-semibold ${folder === f ? "bg-[#0a3d26] text-white" : "bg-white/70"}`}>
            {f}
          </button>
        ))}
      </div>
      <Input className="mb-4" placeholder="Поиск" value={q} onChange={(e) => setQ(e.target.value)} />
      {list.length === 0 && <Empty title="Пусто" text="Измените папку или поисковый запрос" />}
      <div className="grid gap-3 md:grid-cols-2">
        {list.map((d) => (
          <GlassCard key={d.id} className="p-4">
            <Badge>{d.folder}</Badge>
            <div className="mt-1 font-bold text-[#0a3d26]">{d.title}</div>
            <div className="text-xs text-slate-500">
              {formatDate(d.date)} · {d.owner} · {d.file}
            </div>
            {d.downloadable ? (
              <Button variant="outline" className="mt-3" onClick={() => downloadText(d.file.replace(/\.\w+$/, ".txt"), `${d.title}\n${d.owner}\n${d.date}`)}>
                Скачать
              </Button>
            ) : (
              <p className="mt-2 text-xs text-red-600">Нет прав на скачивание</p>
            )}
          </GlassCard>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Документ">
        <Field label="Название">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <Button
          className="mt-3"
          onClick={() => {
            if (!title.trim()) return toast("Укажите название", "err");
            dispatch({
              type: "add",
              entity: "generalDocs",
              item: {
                id: uid("g"),
                title,
                folder: "объявления",
                date: new Date().toISOString(),
                owner: user.shortName,
                file: `${title}.pdf`,
                downloadable: true,
              },
            });
            setOpen(false);
            setTitle("");
          }}
        >
          Сохранить
        </Button>
      </Modal>
    </div>
  );
}
