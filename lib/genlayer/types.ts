export enum ThreadStatus { Pending = 0, Upheld = 1, Frayed = 2 }
export const STATUS_LABEL: Record<ThreadStatus, string> = {
  [ThreadStatus.Pending]: "Unassessed", [ThreadStatus.Upheld]: "Upheld", [ThreadStatus.Frayed]: "Frayed",
};
export const STATUS_COLOR: Record<ThreadStatus, string> = {
  [ThreadStatus.Pending]: "#B8860B", [ThreadStatus.Upheld]: "#3B4A8C", [ThreadStatus.Frayed]: "#B4452F",
};
export interface Thread { id: number; weaver: string; claim: string; sourceUrl: string; status: ThreadStatus; rationale: string; }
export interface WeaveStats { total: number; upheld: number; frayed: number; pending: number; }
export interface RawThread { weaver: string; claim: string; source_url: string; status: number | bigint; rationale: string; archived: number | bigint; }
export interface RawStats { total: number | bigint; upheld: number | bigint; frayed: number | bigint; pending: number | bigint; }
