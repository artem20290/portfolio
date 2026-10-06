import { X } from "../icons";
import { type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { cn } from "../utils/cn";

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline" | "danger" | "soft" }) {
  const styles = {
    primary: "bg-[#0a3d26] text-white hover:bg-[#0f5c38] shadow-sm",
    ghost: "bg-transparent text-emerald-900 hover:bg-emerald-50",
    outline: "border border-emerald-200 bg-white/70 text-emerald-950 hover:bg-white",
    danger: "bg-red-600 text-white hover:bg-red-700",
    soft: "bg-emerald-100 text-emerald-950 hover:bg-emerald-200",
  }[variant];
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        styles,
        className,
      )}
      {...props}
    />
  );
}

export function Field({ label, children, hint, error }: { label: string; children: ReactNode; hint?: string; error?: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      {children}
      {hint && !error && <span className="block text-xs text-slate-400">{hint}</span>}
      {error && <span className="block text-xs text-red-600">{error}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-2xl border border-emerald-100 bg-white/80 px-3.5 py-2.5 text-sm text-slate-800 outline-none ring-emerald-500/30 transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(inputCls, props.className)} {...props} />;
}
export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(inputCls, props.className)} {...props} />;
}
export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(inputCls, "min-h-[96px] resize-y", props.className)} {...props} />;
}

export function Badge({
  children,
  tone = "gray",
}: {
  children: ReactNode;
  tone?: "gray" | "green" | "amber" | "red" | "blue" | "teal";
}) {
  const map = {
    gray: "bg-slate-100 text-slate-700",
    green: "bg-emerald-100 text-emerald-800",
    amber: "bg-amber-100 text-amber-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-sky-100 text-sky-800",
    teal: "bg-teal-100 text-teal-800",
  }[tone];
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", map)}>{children}</span>;
}

export function statusTone(status: string): "gray" | "green" | "amber" | "red" | "blue" | "teal" {
  const s = status.toLowerCase();
  if (["закрыто", "закрыт", "закрыта", "выдана", "допущен", "действует", "подтверждено", "устранено", "принята"].includes(s))
    return "green";
  if (["просрочено", "просрочена", "заблокирован", "отклонено", "критическая", "пожар"].includes(s)) return "red";
  if (["меры", "расследование", "ограничен", "истекает", "на проверке", "в работе", "предписание"].includes(s)) return "amber";
  if (["черновик", "новая", "новые", "план", "назначена"].includes(s)) return "gray";
  return "teal";
}

export function GlassCard({ className, children, hover }: { className?: string; children: ReactNode; hover?: boolean }) {
  return (
    <div
      className={cn(
        "glass-strong shadow-card rounded-[28px] border border-white/70",
        hover && "transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-900/5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  crumbs,
  actions,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  crumbs?: { to?: string; label: string }[];
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        {crumbs && (
          <div className="mb-1 flex flex-wrap items-center gap-1 text-xs text-slate-500">
            <Link to="/" className="hover:text-emerald-800">
              Главная
            </Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                <span>/</span>
                {c.to ? (
                  <Link to={c.to} className="hover:text-emerald-800">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-slate-700">{c.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-[#0a3d26]">{title}</h1>
        {subtitle && <p className="mt-1 max-w-3xl text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Empty({ title, text }: { title: string; text?: string }) {
  return (
    <div className="rounded-[28px] border border-dashed border-emerald-200 bg-white/40 px-6 py-14 text-center">
      <div className="text-base font-semibold text-emerald-950">{title}</div>
      {text && <p className="mt-1 text-sm text-slate-500">{text}</p>}
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0a3d26]/40 p-3 backdrop-blur-sm sm:items-center">
      <div className={cn("glass-strong shadow-card max-h-[92vh] w-full overflow-hidden rounded-[28px] border border-white/70", wide ? "max-w-4xl" : "max-w-xl")}>
        <div className="flex items-center justify-between border-b border-emerald-100/80 px-5 py-4">
          <h3 className="text-lg font-bold text-[#0a3d26]">{title}</h3>
          <button onClick={onClose} className="rounded-xl p-1.5 text-slate-500 hover:bg-emerald-50">
            <X size={18} />
          </button>
        </div>
        <div className="scrollbar-thin max-h-[calc(92vh-64px)] overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

export function Tabs({
  tabs,
  value,
  onChange,
}: {
  tabs: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mb-5 flex flex-wrap gap-1 rounded-[22px] bg-white/60 p-1 ring-1 ring-emerald-100">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "rounded-2xl px-4 py-2 text-sm font-semibold transition",
            value === t.id ? "bg-[#0a3d26] text-white shadow" : "text-slate-600 hover:bg-white",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function GoLink({ to, children }: { to: string; children?: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 transition hover:gap-2 hover:text-emerald-950"
    >
      {children ?? "Перейти"}
      <span aria-hidden>→</span>
    </Link>
  );
}
