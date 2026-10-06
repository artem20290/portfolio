import { Button, GlassCard, PageHeader, Select } from "../components/ui";
import { ROLE_LABELS, type Role } from "../types";
import { useStore } from "../store";

export default function Settings() {
  const { state, dispatch, user, canDo, toast } = useStore();

  return (
    <div>
      <PageHeader title="Настройки" crumbs={[{ label: "Настройки" }]} subtitle="Демо: переключение пользователя и роли. Администратор управляет справочником." />
      <div className="grid gap-4 md:grid-cols-2">
        <GlassCard className="p-5">
          <div className="font-bold">Текущий пользователь</div>
          <div className="mt-2 text-2xl font-extrabold text-[#0a3d26]">{user.name}</div>
          <div className="text-sm text-slate-500">
            {user.position} · {user.workshop}
          </div>
          <div className="mt-4">
            <div className="text-xs font-semibold uppercase text-slate-400">Войти как</div>
            <Select className="mt-1" value={user.id} onChange={(e) => dispatch({ type: "setUser", id: e.target.value })}>
              {state.users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.shortName} — {ROLE_LABELS[u.role]}
                </option>
              ))}
            </Select>
          </div>
          <div className="mt-3">
            <div className="text-xs font-semibold uppercase text-slate-400">Роль для демо</div>
            <Select className="mt-1" value={user.role} onChange={(e) => dispatch({ type: "setRole", role: e.target.value as Role })}>
              {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              ))}
            </Select>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="font-bold">Данные демо</div>
          <p className="mt-2 text-sm text-slate-500">Сброс возвращает исходные журналы, чемпионат и документы.</p>
          <Button
            className="mt-4"
            variant="danger"
            onClick={() => {
              dispatch({ type: "reset" });
              toast("Демо-данные сброшены", "ok");
            }}
          >
            Сбросить демо-данные
          </Button>
        </GlassCard>
      </div>
      {canDo("users") && (
        <GlassCard className="mt-4 p-5">
          <div className="mb-3 font-bold">Пользователи и роли</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-slate-500">
                <tr>
                  <th className="py-1">ФИО</th>
                  <th>Цех</th>
                  <th>Роль</th>
                </tr>
              </thead>
              <tbody>
                {state.users.map((u) => (
                  <tr key={u.id} className="border-t border-emerald-50">
                    <td className="py-2">{u.name}</td>
                    <td>{u.workshop}</td>
                    <td>
                      <Select
                        value={u.role}
                        onChange={(e) => {
                          dispatch({ type: "update", entity: "users", id: u.id, patch: { role: e.target.value as Role } });
                        }}
                      >
                        {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
                          <option key={r} value={r}>
                            {ROLE_LABELS[r]}
                          </option>
                        ))}
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
