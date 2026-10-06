export type Role = "employee" | "specialist" | "trainer" | "manager" | "admin";

export const ROLE_LABELS: Record<Role, string> = {
  employee: "Сотрудник",
  specialist: "Специалист ОТ / ПБиЭ",
  trainer: "Внутренний тренер",
  manager: "Руководитель",
  admin: "Администратор",
};

export interface User {
  id: string;
  name: string;
  shortName: string;
  role: Role;
  position: string;
  department: string;
  site: string;
  workshop: string;
  birthday: string;
  email: string;
  phone: string;
  initials: string;
  hired: string;
  profession: string;
}

export type IncidentType =
  | "микротравма"
  | "без потери времени"
  | "с потерей времени"
  | "авария"
  | "почти-событие"
  | "экологический инцидент"
  | "пожар";

export type IncidentStatus = "черновик" | "расследование" | "меры" | "закрыто";

export interface Capa {
  id: string;
  task: string;
  owner: string;
  due: string;
  status: "открыто" | "в работе" | "закрыто";
}

export interface Incident {
  id: string;
  number: string;
  datetime: string;
  site: string;
  workshop: string;
  place: string;
  type: IncidentType;
  severity: "низкая" | "средняя" | "высокая" | "критическая";
  injured: string[];
  description: string;
  causes: string[];
  witnesses: string[];
  attachments: string[];
  status: IncidentStatus;
  owner: string;
  due: string;
  capa: Capa[];
  relatedAuditIds: string[];
  confirmed: boolean;
}

export interface SafetyContact {
  id: string;
  date: string;
  shift: string;
  workshop: string;
  topic: string;
  participants: string[];
  observations: string;
  photo?: string;
  risk: string;
  measures: string;
  authorId: string;
  createdAt: string;
}

export interface DocVersion {
  version: string;
  date: string;
  author: string;
  note: string;
}

export interface DocItem {
  id: string;
  title: string;
  kind: string;
  folder: string;
  version: string;
  date: string;
  owner: string;
  site: string;
  file: string;
  status: "действует" | "архив";
  tags: string[];
  versions: DocVersion[];
  body: string;
}

export interface Acknowledgement {
  id: string;
  docId: string;
  userId: string;
  date: string;
}

export interface PPEItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  unit: string;
  stock: number;
  minStock: number;
  lifeMonths: number;
  sizes: string[];
}

export interface PPENorm {
  id: string;
  profession: string;
  itemId: string;
  qty: number;
  periodMonths: number;
}

export interface PPERequest {
  id: string;
  date: string;
  userId: string;
  itemId: string;
  size: string;
  qty: number;
  status: "новая" | "одобрена" | "выдана" | "отклонена";
  comment: string;
}

export interface Risk {
  id: string;
  hazard: string;
  workplace: string;
  workshop: string;
  probability: number;
  severity: number;
  measures: string;
  residual: number;
  owner: string;
}

export interface SOUTCard {
  id: string;
  workplace: string;
  workshop: string;
  class: string;
  validUntil: string;
  factors: string[];
  guarantees: string[];
  file: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  program: string;
  hours: number;
  format: "очно" | "электронно" | "смешанный";
  questions: QuizQuestion[];
  validityMonths: number;
}

export interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  assignedAt: string;
  progress: number;
  score?: number;
  completedAt?: string;
  certificateNo?: string;
  expiresAt?: string;
}

export type BriefingType = "вводный" | "первичный" | "повторный" | "внеплановый" | "целевой";

export interface Briefing {
  id: string;
  date: string;
  type: BriefingType;
  program: string;
  instructor: string;
  workers: { userId: string; signed: boolean }[];
  attachments: string[];
  workshop: string;
  nextDate?: string;
}

export interface ChampTask {
  id: string;
  title: string;
  points: number;
  description: string;
  type: string;
}

export interface ChampSubmission {
  id: string;
  teamId: string;
  taskId: string;
  userId: string;
  comment: string;
  photo?: string;
  points: number;
  status: "на проверке" | "подтверждено" | "отклонено";
  date: string;
}

export interface ChampTeam {
  id: string;
  name: string;
  workshop: string;
  members: string[];
}

export interface ChampNews {
  id: string;
  date: string;
  title: string;
  text: string;
}

export interface ContractorDoc {
  name: string;
  validUntil: string;
  ok: boolean;
}

export interface Contractor {
  id: string;
  name: string;
  inn: string;
  contract: string;
  workType: string;
  siteAccess: string;
  owner: string;
  docs: ContractorDoc[];
  status: "допущен" | "ограничен" | "заблокирован";
  violations: { date: string; text: string; severity: string }[];
  rating: number;
}

export interface TrainerProfile {
  id: string;
  userId: string;
  competencies: string[];
  hours: number;
  coverage: number;
  rating: number;
  materials: string[];
}

export interface TrainingSession {
  id: string;
  trainerId: string;
  title: string;
  date: string;
  time: string;
  place: string;
  group: string;
  relatedCourseId?: string;
}

export interface TrainerApplication {
  id: string;
  userId: string;
  motivation: string;
  date: string;
  status: "новая" | "принята" | "отклонена";
}

export interface AuditFinding {
  id: string;
  text: string;
  result: "соответствует" | "несоответствие" | "наблюдение";
  criticality: "низкая" | "средняя" | "высокая";
  photo?: string;
  taskId?: string;
}

export interface Audit {
  id: string;
  type: "внутренний" | "поведенческий" | "обход руководителя" | "аудит подрядчика";
  date: string;
  site: string;
  workshop: string;
  auditor: string;
  checklist: { item: string; ok: boolean }[];
  findings: AuditFinding[];
  status: "план" | "проведён" | "закрыт";
}

export type TaskStatus = "новые" | "в работе" | "просрочено" | "закрыто";

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  owner: string;
  due: string;
  status: TaskStatus;
  source: string;
  sourceId: string;
  verified: boolean;
}

export interface FireAsset {
  id: string;
  type: "АПС" | "АУПТ" | "огнетушитель" | "гидрант" | "противопожарная дверь";
  inventory: string;
  place: string;
  lastTo: string;
  nextTo: string;
  notes: string;
  acts: string[];
}

export interface IndustrialItem {
  id: string;
  kind: "ОПО" | "лицензия" | "экспертиза" | "ПЛАС" | "инцидент на оборудовании" | "наряд-допуск" | "диагностика";
  title: string;
  number: string;
  validUntil: string;
  status: "действует" | "истекает" | "просрочено" | "архив";
  owner: string;
  file: string;
  notes: string;
}

export interface Prescription {
  id: string;
  text: string;
  due: string;
  owner: string;
  status: "открыто" | "устранено" | "просрочено";
}

export interface Inspection {
  id: string;
  body: string;
  type: string;
  period: string;
  start: string;
  end: string;
  prescriptions: Prescription[];
  fines: number;
  attachments: string[];
  status: "назначена" | "идёт" | "предписание" | "закрыта";
}

export interface UsefulLink {
  id: string;
  title: string;
  url: string;
  description: string;
  group: string;
  icon: string;
  hidden: boolean;
}

export interface ForumComment {
  id: string;
  authorId: string;
  date: string;
  text: string;
}

export interface ForumPost {
  id: string;
  title: string;
  body: string;
  authorId: string;
  date: string;
  tags: string[];
  likes: string[];
  hidden: boolean;
  pinned: boolean;
  comments: ForumComment[];
  attachments: string[];
}

export interface GeneralDoc {
  id: string;
  title: string;
  folder: string;
  date: string;
  owner: string;
  file: string;
  downloadable: boolean;
}

export type EntityKey =
  | "users"
  | "incidents"
  | "contacts"
  | "documents"
  | "acknowledgements"
  | "ppe"
  | "ppeNorms"
  | "ppeRequests"
  | "risks"
  | "sout"
  | "courses"
  | "enrollments"
  | "briefings"
  | "champTeams"
  | "champTasks"
  | "champSubmissions"
  | "champNews"
  | "contractors"
  | "trainers"
  | "sessions"
  | "trainerApps"
  | "audits"
  | "tasks"
  | "generalDocs"
  | "fire"
  | "industrial"
  | "inspections"
  | "links"
  | "forum"
  | "policyAck";

export interface AppState {
  users: User[];
  currentUserId: string;
  favorites: string[];
  incidents: Incident[];
  contacts: SafetyContact[];
  documents: DocItem[];
  acknowledgements: Acknowledgement[];
  ppe: PPEItem[];
  ppeNorms: PPENorm[];
  ppeRequests: PPERequest[];
  risks: Risk[];
  sout: SOUTCard[];
  courses: Course[];
  enrollments: Enrollment[];
  briefings: Briefing[];
  champSeason: string;
  champRules: string;
  champTeams: ChampTeam[];
  champTasks: ChampTask[];
  champSubmissions: ChampSubmission[];
  champNews: ChampNews[];
  contractors: Contractor[];
  trainers: TrainerProfile[];
  sessions: TrainingSession[];
  trainerApps: TrainerApplication[];
  audits: Audit[];
  tasks: TaskItem[];
  generalDocs: GeneralDoc[];
  fire: FireAsset[];
  industrial: IndustrialItem[];
  inspections: Inspection[];
  links: UsefulLink[];
  forum: ForumPost[];
  policyAck: Acknowledgement[];
  policyVersion: string;
}

export const SITES = ["Площадка «Центральная»", "Площадка «Восточная»", "Площадка «Северная»"];

export const WORKSHOPS = [
  "Цех полимеров №1",
  "Цех мономеров",
  "Установка пиролиза",
  "Компрессорная станция",
  "Склад ГСМ",
  "Очистные сооружения",
  "Ремонтно-механический цех",
  "Эстакада налива",
  "Лаборатория ОТК",
  "Административный корпус",
];

export const SHIFTS = ["Смена А", "Смена Б", "Смена В", "Смена Г", "Дневная"];

export const INCIDENT_TYPES: IncidentType[] = [
  "микротравма",
  "без потери времени",
  "с потерей времени",
  "авария",
  "почти-событие",
  "экологический инцидент",
  "пожар",
];
