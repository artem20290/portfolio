import heroPlant from "../assets/hero-plant.jpg";
import safetyTeam from "../assets/safety-team.jpg";
import championship from "../assets/championship.jpg";
import ppeStill from "../assets/ppe-still.jpg";
import posterSafety from "../assets/poster-safety.jpg";
import ecology from "../assets/ecology.jpg";
import auditWalk from "../assets/audit-walk.jpg";
import fireSystem from "../assets/fire-system.jpg";
import training from "../assets/training.jpg";
import brandColors from "../assets/brand-colors.jpg";
import logo from "../assets/ЛОго.svg";
import finebi from "../assets/finebi.svg";
import telegram from "../assets/телеграам.svg";

export const images = {
  heroPlant,
  safetyTeam,
  championship,
  ppeStill,
  posterSafety,
  ecology,
  auditWalk,
  fireSystem,
  training,
  brandColors,
  logo,
  finebi,
  telegram,
};

export function photoSrc(key?: string): string | undefined {
  if (!key) return undefined;
  if (key in images) return images[key as keyof typeof images];
  if (key.startsWith("data:") || key.startsWith("blob:") || key.startsWith("http") || key.startsWith("/")) return key;
  return undefined;
}
