import { images } from "../assets";
import { Button, GlassCard, PageHeader } from "../components/ui";
import { downloadText } from "../lib";

const COLORS = [
  { name: "НХТК лес", hex: "#0a3d26" },
  { name: "Изумруд", hex: "#10b959" },
  { name: "Линия", hex: "#29ae6b" },
  { name: "Белый", hex: "#ffffff" },
  { name: "Серый 100", hex: "#f4f7f5" },
  { name: "Серый текст", hex: "#4b5563" },
];

export default function Brandbook() {
  return (
    <div>
      <PageHeader title="Брендбук по ОТ, ПБиЭ" crumbs={[{ label: "Брендбук" }]} subtitle="Логотипы, цвета, плакаты и шаблоны презентаций." />
      <div className="grid gap-4 md:grid-cols-2">
        <GlassCard className="p-5">
          <div className="font-bold">Логотип</div>
          <div className="mt-3 flex h-32 items-center justify-center rounded-3xl bg-white ring-1 ring-emerald-100">
            <img src={images.logo} alt="НХТК" className="h-12 w-auto max-w-[80%] object-contain" />
          </div>
          <a href={images.logo} download="logo-nhtk.svg" className="mt-3 inline-flex">
            <Button variant="outline" type="button">
              Скачать SVG
            </Button>
          </a>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="font-bold">Цвета</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {COLORS.map((c) => (
              <div key={c.hex} className="overflow-hidden rounded-2xl ring-1 ring-emerald-50">
                <div className="h-12" style={{ background: c.hex, border: c.hex === "#ffffff" ? "1px solid #ddd" : undefined }} />
                <div className="px-2 py-1 text-[11px]">
                  {c.name}
                  <br />
                  {c.hex}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {[images.posterSafety, images.brandColors, images.safetyTeam].map((src, i) => (
          <GlassCard key={i} className="overflow-hidden">
            <img src={src} alt="" className="h-40 w-full object-cover" />
            <div className="p-3 text-sm font-semibold">Плакат {i + 1}</div>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="mt-4 p-5">
        <div className="font-bold">Шаблоны презентаций</div>
        <p className="mt-1 text-sm text-slate-500">Титульный слайд HSE, отчёт об инциденте, обход руководителя.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => downloadText("шаблон_HSE.txt", "Титул: Департамент ОТ, ПБиЭ НХТК\nТема:\nДата:\nДокладчик:")}>
            Скачать титул
          </Button>
          <Button variant="outline" onClick={() => downloadText("шаблон_инцидент.txt", "Номер:\nТип:\n5 why:\nCAPA:")}>
            Скачать отчёт об инциденте
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
