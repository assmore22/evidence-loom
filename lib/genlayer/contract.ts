import { ENV, PREVIEW_MODE } from "@/lib/env";
import { getReadClient, writeContract } from "./client";
import { ThreadStatus } from "./types";
import type { Thread, WeaveStats, RawThread, RawStats } from "./types";

const ADDRESS = ENV.contractAddress;
const n = (v: number | bigint) => (typeof v === "bigint" ? Number(v) : v);
const toT = (id: number, r: RawThread): Thread => ({ id, weaver: r.weaver, claim: r.claim, sourceUrl: r.source_url, status: n(r.status) as ThreadStatus, rationale: r.rationale });

const PREVIEW: Thread[] = [
  { id: 0, weaver: "0xPREVIEW", claim: "Water is composed of hydrogen and oxygen.", sourceUrl: "https://preview.local/water", status: ThreadStatus.Upheld, rationale: "The source upholds the claim." },
  { id: 1, weaver: "0xPREVIEW", claim: "Humans can breathe in the vacuum of space.", sourceUrl: "https://preview.local/space", status: ThreadStatus.Frayed, rationale: "The source contradicts the claim." },
  { id: 2, weaver: "0xPREVIEW", claim: "Everest is the highest mountain above sea level.", sourceUrl: "https://preview.local/everest", status: ThreadStatus.Upheld, rationale: "The source upholds the claim." },
  { id: 3, weaver: "0xPREVIEW", claim: "A permanent Mars colony is imminent.", sourceUrl: "https://preview.local/mars", status: ThreadStatus.Pending, rationale: "" },
];
const stats = (x: Thread[]): WeaveStats => ({ total: x.length, upheld: x.filter(t => t.status === ThreadStatus.Upheld).length, frayed: x.filter(t => t.status === ThreadStatus.Frayed).length, pending: x.filter(t => t.status === ThreadStatus.Pending).length });

export async function fetchThreads(): Promise<Thread[]> {
  if (PREVIEW_MODE) return PREVIEW;
  const c = await getReadClient();
  const count = n((await c.readContract({ address: ADDRESS, functionName: "get_thread_count" })) as number | bigint);
  const out: Thread[] = [];
  for (let i = 0; i < count; i++) { const r = (await c.readContract({ address: ADDRESS, functionName: "get_thread", args: [i] })) as RawThread; if (n(r.archived) === 0) out.push(toT(i, r)); }
  return out;
}
export async function fetchStats(): Promise<WeaveStats> { return stats(await fetchThreads()); }
export async function fetchThread(id: number): Promise<Thread | null> {
  if (PREVIEW_MODE) return PREVIEW.find(x => x.id === id) ?? null;
  const c = await getReadClient();
  const count = n((await c.readContract({ address: ADDRESS, functionName: "get_thread_count" })) as number | bigint);
  if (id < 0 || id >= count) return null;
  return toT(id, (await c.readContract({ address: ADDRESS, functionName: "get_thread", args: [id] })) as RawThread);
}
export const weaveThread = (claim: string, sourceUrl: string) => writeContract(ADDRESS, "weave_thread", [claim, sourceUrl]);
export const assessThread = (id: number) => writeContract(ADDRESS, "assess_thread", [id]);
