import { useMemo, useState } from "react";
import { images } from "../assets";
import { Badge, Button, Field, GlassCard, PageHeader, Select, Textarea, statusTone } from "../components/ui";
import { formatDate, uid } from "../lib";
import { useStore } from "../store";

export default function Championship() {
  const { state, dispatch, user, guard, toast } = useStore();
  const [taskId, setTaskId] = useState(state.champTasks[0]?.id ?? "");
  const [teamId, setTeamId] = useState(state.champTeams[0]?.id ?? "");
  const [comment, setComment] = useState("");

  const scores = useMemo(() => {
    return state.champTeams
      .map((t) => ({
        ...t,
        points: state.champSubmissions.filter((s) => s.teamId === t.id && s.status === "подтверждено").reduce((a, s) => a + s.points, 0),
      }))
      .sort((a, b) => b.points - a.points);
  }, [state.champTeams, state.champSubmissions]);

  return (
    <div>
      <PageHeader title="Чемпионат по Безопасности" crumbs={[{ label: "Чемпионат" }]} subtitle={state.champSeason} />
      <div className="relative mb-4 overflow-hidden rounded-[28px]">
        <img src={images.championship} alt="" className="h-48 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a3d26]/80 to-transparent p-6 text-white">
          <div className="text-sm uppercase tracking-widest text-emerald-200">Сезон 2026 · этап «Весна»</div>
          <div className="text-2xl font-extrabold">Геймификация HSE</div>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="p-4 lg:col-span-2">
          <div className="mb-2 font-bold">Таблица лидеров</div>
          {scores.map((t, i) => (
            <div key={t.id} className="flex items-center justify-between border-t border-emerald-50 py-2">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-100 text-sm font-bold">{i + 1}</div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.workshop}</div>
                </div>
              </div>
              <div className="text-lg font-extrabold text-[#0a3d26]">{t.points}</div>
            </div>
          ))}
        </GlassCard>
        <GlassCard className="p-4">
          <div className="font-bold">Призы этапа</div>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-600">
            <li>1 место — командный бонус и кубок «Территория безопасности»</li>
            <li>2 место — мерч HSE</li>
            <li>3 место — сертификаты и день vis-à-vis с руководителем</li>
          </ul>
        </GlassCard>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {state.champTasks.map((t) => (
          <GlassCard key={t.id} className="p-4">
            <Badge>{t.type}</Badge>
            <div className="mt-1 font-bold">{t.title}</div>
            <p className="text-sm text-slate-500">{t.description}</p>
            <div className="mt-1 text-sm font-semibold text-emerald-800">{t.points} баллов</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-4 p-4">
        <div className="mb-3 font-bold">Сдать результат</div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Команда">
            <Select value={teamId} onChange={(e) => setTeamId(e.target.value)}>
              {state.champTeams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Задание">
            <Select value={taskId} onChange={(e) => setTaskId(e.target.value)}>
              {state.champTasks.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </Select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Комментарий / фото (мок)">
              <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            </Field>
          </div>
        </div>
        <Button
          className="mt-3"
          onClick={() => {
            if (!comment.trim()) return toast("Добавьте комментарий", "err");
            const task = state.champTasks.find((t) => t.id === taskId);
            dispatch({
              type: "add",
              entity: "champSubmissions",
              item: {
                id: uid("cs"),
                teamId,
                taskId,
                userId: user.id,
                comment,
                photo: "safetyTeam",
                points: task?.points ?? 0,
                status: "на проверке",
                date: new Date().toISOString(),
              },
            });
            toast("Отправлено на подтверждение тренеру", "ok");
            setComment("");
          }}
        >
          Отправить
        </Button>
      </GlassCard>

      <GlassCard className="mt-4 p-4">
        <div className="mb-2 font-bold">Результаты на проверке</div>
        {state.champSubmissions.map((s) => (
          <div key={s.id} className="flex flex-wrap items-center justify-between gap-2 border-t border-emerald-50 py-2 text-sm">
            <div>
              {state.champTeams.find((t) => t.id === s.teamId)?.name} · {state.champTasks.find((t) => t.id === s.taskId)?.title}
              <div className="text-xs text-slate-500">
                {formatDate(s.date)} · {s.comment}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone={statusTone(s.status)}>{s.status}</Badge>
              {s.status === "на проверке" && (
                <>
                  <Button
                    variant="soft"
                    onClick={() => {
                      if (!guard("championship")) return;
                      dispatch({ type: "update", entity: "champSubmissions", id: s.id, patch: { status: "подтверждено" } });
                    }}
                  >
                    Подтвердить
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (!guard("championship")) return;
                      dispatch({ type: "update", entity: "champSubmissions", id: s.id, patch: { status: "отклонено" } });
                    }}
                  >
                    Отклонить
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </GlassCard>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <GlassCard className="p-4">
          <div className="font-bold">Правила</div>
          <p className="mt-2 text-sm text-slate-600">{state.champRules}</p>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="font-bold">Новости этапа</div>
          {state.champNews.map((n) => (
            <div key={n.id} className="mt-2 text-sm">
              <div className="font-semibold">{n.title}</div>
              <div className="text-xs text-slate-500">{formatDate(n.date)}</div>
              <p className="text-slate-600">{n.text}</p>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
