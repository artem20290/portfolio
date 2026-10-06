import { useState } from "react";
import { images } from "../assets";
import { Badge, Button, GlassCard, Modal, PageHeader, Select } from "../components/ui";
import { formatDate, printHtml, uid } from "../lib";
import { useStore } from "../store";
import type { Course } from "../types";

export default function Training() {
  const { state, dispatch, user, guard, toast } = useStore();
  const [cur, setCur] = useState<Course | null>(null);
  const [quiz, setQuiz] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [cert, setCert] = useState<string | null>(null);
  const my = state.enrollments.filter((e) => e.userId === user.id);

  const assign = (courseId: string, userId: string) => {
    if (!guard("training")) return;
    if (state.enrollments.some((e) => e.courseId === courseId && e.userId === userId)) return toast("Уже назначено", "info");
    dispatch({
      type: "add",
      entity: "enrollments",
      item: { id: uid("e"), courseId, userId, assignedAt: new Date().toISOString(), progress: 0 },
    });
    toast("Курс назначен", "ok");
  };

  const finish = (course: Course, score: number) => {
    const pass = score >= 80;
    const enr = state.enrollments.find((e) => e.courseId === course.id && e.userId === user.id);
    const exp = new Date();
    exp.setMonth(exp.getMonth() + course.validityMonths);
    const certNo = `НХТК-${course.category}-${Date.now().toString().slice(-6)}`;
    if (enr) {
      dispatch({
        type: "update",
        entity: "enrollments",
        id: enr.id,
        patch: pass
          ? { progress: 100, score, completedAt: new Date().toISOString(), certificateNo: certNo, expiresAt: exp.toISOString() }
          : { progress: 80, score },
      });
    }
    if (pass) {
      setCert(certNo);
      toast("Курс зачтён, сертификат сформирован", "ok");
    } else toast("Недостаточно баллов (нужно 80%)", "err");
    setQuiz(false);
  };

  return (
    <div>
      <PageHeader title="Обучение" crumbs={[{ label: "Обучение" }]} subtitle="Каталог курсов, назначение групп, тесты, протоколы и сертификаты." />
      <img src={images.training} alt="" className="mb-4 h-44 w-full rounded-[28px] object-cover" />
      <GlassCard className="mb-4 p-4">
        <div className="mb-2 font-bold">Журнал обученности — {user.shortName}</div>
        {my.length === 0 && <p className="text-sm text-slate-500">Нет назначенных курсов</p>}
        {my.map((e) => {
          const c = state.courses.find((x) => x.id === e.courseId);
          const expired = e.expiresAt && new Date(e.expiresAt) < new Date();
          return (
            <div key={e.id} className="flex flex-wrap items-center justify-between gap-2 border-t border-emerald-50 py-2 text-sm">
              <div>
                {c?.title}
                <div className="text-xs text-slate-500">
                  прогресс {e.progress}% {e.certificateNo ? `· ${e.certificateNo}` : ""} {expired ? "· допуск истёк" : e.expiresAt ? `· до ${formatDate(e.expiresAt)}` : ""}
                </div>
              </div>
              <Badge tone={expired ? "red" : e.progress === 100 ? "green" : "amber"}>{expired ? "истёк" : e.progress === 100 ? "зачтён" : "в процессе"}</Badge>
            </div>
          );
        })}
      </GlassCard>
      <div className="grid gap-3 md:grid-cols-2">
        {state.courses.map((c) => (
          <GlassCard key={c.id} className="p-4">
            <div className="text-xs font-semibold uppercase text-emerald-700">{c.category}</div>
            <div className="text-lg font-bold text-[#0a3d26]">{c.title}</div>
            <p className="mt-1 text-sm text-slate-500">{c.program}</p>
            <div className="mt-2 text-xs text-slate-500">
              {c.hours} ч · {c.format} · допуск {c.validityMonths} мес.
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setCur(c)}>
                Карточка
              </Button>
              <Button
                onClick={() => {
                  const enr = state.enrollments.find((e) => e.courseId === c.id && e.userId === user.id);
                  if (!enr) assign(c.id, user.id);
                  if (c.questions.length) {
                    setCur(c);
                    setAnswers(Array(c.questions.length).fill(-1));
                    setQuiz(true);
                  } else {
                    finish(c, 100);
                  }
                }}
              >
                Пройти
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      <Modal open={!!cur && !quiz} onClose={() => setCur(null)} title={cur?.title ?? ""}>
        {cur && (
          <div className="space-y-3 text-sm">
            <p>{cur.program}</p>
            <div>
              Назначить сотруднику:
              <Select
                className="mt-1"
                onChange={(e) => e.target.value && assign(cur.id, e.target.value)}
                defaultValue=""
              >
                <option value="">выберите</option>
                {state.users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={quiz && !!cur} onClose={() => setQuiz(false)} title="Тест" wide>
        {cur && (
          <div className="space-y-4">
            {cur.questions.map((q, i) => (
              <div key={i}>
                <div className="font-semibold">
                  {i + 1}. {q.q}
                </div>
                <div className="mt-1 space-y-1">
                  {q.options.map((o, j) => (
                    <label key={j} className="flex items-center gap-2 text-sm">
                      <input type="radio" name={`q${i}`} checked={answers[i] === j} onChange={() => setAnswers((a) => a.map((x, k) => (k === i ? j : x)))} />
                      {o}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <Button
              onClick={() => {
                if (answers.some((a) => a < 0)) return toast("Ответьте на все вопросы", "err");
                const ok = answers.filter((a, i) => a === cur.questions[i].answer).length;
                const score = Math.round((ok / cur.questions.length) * 100);
                finish(cur, score);
              }}
            >
              Отправить
            </Button>
          </div>
        )}
      </Modal>

      <Modal open={!!cert} onClose={() => setCert(null)} title="Сертификат">
        <div className="rounded-[24px] border-4 border-emerald-700 p-6 text-center">
          <div className="text-xs uppercase tracking-widest text-emerald-700">НХТК · Территория безопасности</div>
          <div className="mt-2 text-2xl font-extrabold text-[#0a3d26]">Сертификат</div>
          <p className="mt-3">
            {user.name}
            <br />
            успешно освоил(а) программу
            <br />
            <b>{cur?.title}</b>
          </p>
          <p className="mt-2 text-sm text-slate-500">№ {cert}</p>
          <Button
            className="mt-4"
            onClick={() => printHtml("Сертификат", `<h1>Сертификат ${cert}</h1><p>${user.name}</p><p>${cur?.title}</p>`)}
          >
            Печать / PDF
          </Button>
        </div>
      </Modal>
    </div>
  );
}
