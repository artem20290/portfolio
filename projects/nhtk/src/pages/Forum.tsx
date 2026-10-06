import { useState } from "react";
import { Badge, Button, Field, GlassCard, Input, PageHeader, Textarea } from "../components/ui";
import { formatDateTime, uid } from "../lib";
import { useStore } from "../store";

export default function Forum() {
  const { state, dispatch, user, canDo, toast } = useStore();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [comment, setComment] = useState<Record<string, string>>({});
  const posts = state.forum.filter((p) => !p.hidden || canDo("forum-mod")).sort((a, b) => Number(b.pinned) - Number(a.pinned) || +new Date(b.date) - +new Date(a.date));

  return (
    <div>
      <PageHeader title="Доска обсуждений" crumbs={[{ label: "Доска обсуждений" }]} subtitle="Темы, комментарии, лайки и вложения. Модерация — специалист ОТ." />
      <GlassCard className="mb-4 p-4">
        <div className="font-bold">Новая тема</div>
        <div className="mt-2 grid gap-2">
          <Field label="Заголовок">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <Field label="Текст">
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
          </Field>
          <Button
            onClick={() => {
              if (!title.trim() || !body.trim()) return toast("Заполните тему и текст", "err");
              dispatch({
                type: "add",
                entity: "forum",
                item: {
                  id: uid("fo"),
                  title,
                  body,
                  authorId: user.id,
                  date: new Date().toISOString(),
                  tags: ["общее"],
                  likes: [],
                  hidden: false,
                  pinned: false,
                  comments: [],
                  attachments: [],
                },
              });
              setTitle("");
              setBody("");
              toast("Тема опубликована", "ok");
            }}
          >
            Опубликовать
          </Button>
        </div>
      </GlassCard>
      <div className="space-y-3">
        {posts.map((p) => {
          const author = state.users.find((u) => u.id === p.authorId);
          return (
            <GlassCard key={p.id} className="p-4">
              <div className="flex flex-wrap gap-2">
                {p.pinned && <Badge tone="green">закреплено</Badge>}
                {p.hidden && <Badge tone="red">скрыто</Badge>}
                {p.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <div className="mt-1 text-lg font-bold text-[#0a3d26]">{p.title}</div>
              <div className="text-xs text-slate-500">
                {author?.name} · {formatDateTime(p.date)}
              </div>
              <p className="mt-2 text-sm text-slate-700">{p.body}</p>
              {p.attachments.length > 0 && <div className="mt-1 text-xs">Вложения: {p.attachments.join(", ")}</div>}
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant="soft"
                  onClick={() => {
                    const likes = p.likes.includes(user.id) ? p.likes.filter((id) => id !== user.id) : [...p.likes, user.id];
                    dispatch({ type: "update", entity: "forum", id: p.id, patch: { likes } });
                  }}
                >
                  ❤ {p.likes.length}
                </Button>
                {canDo("forum-mod") && (
                  <>
                    <Button variant="outline" onClick={() => dispatch({ type: "update", entity: "forum", id: p.id, patch: { pinned: !p.pinned } })}>
                      {p.pinned ? "Открепить" : "Закрепить"}
                    </Button>
                    <Button variant="outline" onClick={() => dispatch({ type: "update", entity: "forum", id: p.id, patch: { hidden: !p.hidden } })}>
                      {p.hidden ? "Показать" : "Скрыть"}
                    </Button>
                  </>
                )}
              </div>
              <div className="mt-3 space-y-2">
                {p.comments.map((c) => (
                  <div key={c.id} className="rounded-2xl bg-white/80 px-3 py-2 text-sm">
                    <span className="font-semibold">{state.users.find((u) => u.id === c.authorId)?.shortName}: </span>
                    {c.text}
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder="Комментарий"
                    value={comment[p.id] ?? ""}
                    onChange={(e) => setComment({ ...comment, [p.id]: e.target.value })}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const text = (comment[p.id] ?? "").trim();
                      if (!text) return;
                      dispatch({
                        type: "update",
                        entity: "forum",
                        id: p.id,
                        patch: { comments: [...p.comments, { id: uid("fc"), authorId: user.id, date: new Date().toISOString(), text }] },
                      });
                      setComment({ ...comment, [p.id]: "" });
                    }}
                  >
                    Ответить
                  </Button>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
