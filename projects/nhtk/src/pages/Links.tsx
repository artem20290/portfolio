import { BookOpen, BarChart3, FolderOpen, GraduationCap, Phone, FileText } from "../icons";
import { useState } from "react";
import { images } from "../assets";
import { Button, Field, GlassCard, Input, Modal, PageHeader, Select, Textarea } from "../components/ui";
import { uid } from "../lib";
import { useStore } from "../store";

const ICONS: Record<string, typeof Phone> = {
  bar: BarChart3,
  folder: FolderOpen,
  file: FileText,
  grad: GraduationCap,
  book: BookOpen,
  phone: Phone,
};

const IMG_ICONS: Record<string, string> = {
  finebi: images.finebi,
  tg: images.telegram,
};

export default function Links() {
  const { state, dispatch, guard, toast, canDo } = useStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", url: "", description: "", group: "системы", icon: "link" });
  const groups = [...new Set(state.links.map((l) => l.group))];
  const visible = state.links.filter((l) => !l.hidden || canDo("links"));

  return (
    <div>
      <PageHeader
        title="Полезные ссылки"
        crumbs={[{ label: "Полезные ссылки" }]}
        subtitle="FineBI, SharePoint, ЭДО, обучение, НПА, Telegram и телефоны экстренных служб."
        actions={canDo("links") ? <Button onClick={() => setOpen(true)}>Добавить ссылку</Button> : undefined}
      />
      {groups.map((g) => (
        <div key={g} className="mb-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">{g}</div>
          <div className="grid gap-3 md:grid-cols-2">
            {visible
              .filter((l) => l.group === g)
              .map((l) => {
                const Icon = ICONS[l.icon] ?? FileText;
                const inner = (
                  <GlassCard hover className={`flex items-start gap-3 p-4 ${l.hidden ? "opacity-50" : ""}`}>
                    <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-emerald-100 text-emerald-800">
                      {IMG_ICONS[l.icon] ? (
                        <img src={IMG_ICONS[l.icon]} alt="" className="h-8 w-8 object-contain" />
                      ) : (
                        <Icon size={18} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[#0a3d26]">{l.title}</div>
                      <p className="text-sm text-slate-500">{l.description}</p>
                      <div className="truncate text-xs text-emerald-800">{l.url}</div>
                    </div>
                    {canDo("links") && (
                      <Button
                        variant="ghost"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch({ type: "update", entity: "links", id: l.id, patch: { hidden: !l.hidden } });
                        }}
                      >
                        {l.hidden ? "Показать" : "Скрыть"}
                      </Button>
                    )}
                  </GlassCard>
                );
                return l.url.startsWith("#") || l.url.startsWith("/") ? (
                  <a key={l.id} href={l.url}>
                    {inner}
                  </a>
                ) : (
                  <a key={l.id} href={l.url} target={l.url.startsWith("tel:") ? undefined : "_blank"} rel="noreferrer">
                    {inner}
                  </a>
                );
              })}
          </div>
        </div>
      ))}
      <Modal open={open} onClose={() => setOpen(false)} title="Ссылка">
        <div className="space-y-3">
          <Field label="Название">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="URL">
            <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          </Field>
          <Field label="Описание">
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <Field label="Группа">
            <Select value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })}>
              <option>системы</option>
              <option>обучение</option>
              <option>НПА</option>
              <option>экстренные</option>
            </Select>
          </Field>
          <Button
            onClick={() => {
              if (!guard("links") || !form.title || !form.url) return toast("Заполните название и URL", "err");
              dispatch({ type: "add", entity: "links", item: { id: uid("l"), ...form, hidden: false } });
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
