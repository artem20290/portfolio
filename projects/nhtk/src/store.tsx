import { createContext, useContext, useEffect, useMemo, useReducer, useState, type Dispatch, type ReactNode } from "react";
import { can, type ActionKey } from "./lib";
import { createSeed, SEED_VERSION } from "./seed";
import type { AppState, EntityKey, Role, User } from "./types";

type Toast = { id: string; text: string; tone: "ok" | "err" | "info" };

type Action =
  | { type: "setUser"; id: string }
  | { type: "setRole"; role: Role }
  | { type: "add"; entity: EntityKey; item: unknown }
  | { type: "update"; entity: EntityKey; id: string; patch: Record<string, unknown> }
  | { type: "remove"; entity: EntityKey; id: string }
  | { type: "toggleFav"; id: string }
  | { type: "reset" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "setUser":
      return { ...state, currentUserId: action.id };
    case "setRole":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === state.currentUserId
            ? {
                ...u,
                role: action.role,
                position:
                  action.role === "employee"
                    ? u.profession
                    : action.role === "specialist"
                      ? "Специалист ОТ / ПБиЭ"
                      : action.role === "trainer"
                        ? "Внутренний тренер по безопасности"
                        : action.role === "manager"
                          ? "Руководитель департамента ОТ, ПБиЭ"
                          : "Администратор портала",
              }
            : u,
        ),
      };
    case "add":
      return { ...state, [action.entity]: [...(state[action.entity] as unknown[]), action.item] };
    case "update":
      return {
        ...state,
        [action.entity]: (state[action.entity] as { id: string }[]).map((row) =>
          row.id === action.id ? { ...row, ...action.patch } : row,
        ),
      };
    case "remove":
      return {
        ...state,
        [action.entity]: (state[action.entity] as { id: string }[]).filter((row) => row.id !== action.id),
      };
    case "toggleFav":
      return {
        ...state,
        favorites: state.favorites.includes(action.id)
          ? state.favorites.filter((x) => x !== action.id)
          : [...state.favorites, action.id],
      };
    case "reset":
      return createSeed();
    default:
      return state;
  }
}

function load(): AppState {
  try {
    const raw = localStorage.getItem(SEED_VERSION);
    if (raw) {
      const parsed = JSON.parse(raw) as AppState;
      if (parsed?.users?.length) return parsed;
    }
  } catch {
    /* ignore */
  }
  return createSeed();
}

interface StoreCtx {
  state: AppState;
  dispatch: Dispatch<Action>;
  user: User;
  toast: (text: string, tone?: Toast["tone"]) => void;
  toasts: Toast[];
  canDo: (action: ActionKey) => boolean;
  guard: (action: ActionKey) => boolean;
}

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem(SEED_VERSION, JSON.stringify(state));
  }, [state]);

  const user = state.users.find((u) => u.id === state.currentUserId) ?? state.users[0];

  const toast = (text: string, tone: Toast["tone"] = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, text, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };

  const canDo = (action: ActionKey) => can(user.role, action);
  const guard = (action: ActionKey) => {
    if (can(user.role, action)) return true;
    toast("Недостаточно прав. Переключите роль в настройках.", "err");
    return false;
  };

  const value = useMemo(
    () => ({ state, dispatch, user, toast, toasts, canDo, guard }),
    [state, user, toasts],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Store");
  return ctx;
}
