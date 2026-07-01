"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { ENV, PREVIEW_MODE } from "@/lib/env";
import { ThreadStatus, STATUS_COLOR, STATUS_LABEL } from "@/lib/genlayer/types";
import { formatContractError } from "@/lib/genlayer/errors";
import { useAssess, useStats, useThreads, useWallet, useWeave } from "@/hooks/useWeave";

const LoomViz = dynamic(() => import("@/components/LoomViz").then(m => m.LoomViz), { ssr: false, loading: () => <div className="h-[420px] thread-card grid place-items-center"><span className="label">Weaving…</span></div> });

export default function Weave() {
  const threads = useThreads();
  const stats = useStats();
  const { account, connect } = useWallet();
  const weave = useWeave();
  const assess = useAssess();
  const [sel, setSel] = useState<number | null>(null);
  const [f, setF] = useState({ claim: "", sourceUrl: "" });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [live, setLive] = useState("");
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const data = threads.data ?? [];
  const current = data.find(t => t.id === sel) ?? null;

  const validate = () => { const e: Record<string, string> = {}; if (!f.claim.trim()) e.claim = "Required."; else if (f.claim.length > 240) e.claim = "Max 240."; if (!/^https?:\/\//.test(f.sourceUrl)) e.sourceUrl = "http(s) URL."; setErrs(e); return Object.keys(e).length === 0; };
  const onWeave = async () => { if (!validate()) return; if (PREVIEW_MODE) { setLive("Preview mode: weaving disabled."); return; } setLive("Submitting to the wallet…"); try { await weave.mutateAsync({ ...f }); setLive("Thread woven."); setF({ claim: "", sourceUrl: "" }); } catch (e) { setLive(formatContractError(e)); } };
  const onAssess = async (id: number) => { if (PREVIEW_MODE) { setLive("Preview mode: assess disabled."); return; } setLive("Validators reading the source…"); try { await assess.mutateAsync(id); setLive("Assessed."); } catch (e) { setLive(formatContractError(e)); } };

  return (
    <div className="mx-auto max-w-wide px-4 pb-16 sm:px-5 md:px-8">
      <section className="grid gap-6 py-8 lg:grid-cols-[1fr_360px]">
        <div>
          <span className="label">GL-008 · Woven evidence</span>
          <h1 className="mt-2 font-head text-fluid-page font-bold">Every claim, woven to its source.</h1>
          <p className="mt-3 max-w-reading text-ink/80">Weave a claim to a citation. A GenLayer validator set reads the source and upholds or frays the thread. {PREVIEW_MODE ? "Preview mode - illustrative." : "Live on " + ENV.network + "."}</p>
          <div className="thread-card mt-4 p-3"><LoomViz threads={data} onSelect={setSel} /></div>
          <p className="label mt-2">{data.length} threads · {stats.data?.upheld ?? 0} upheld · {stats.data?.frayed ?? 0} frayed · {stats.data?.pending ?? 0} unassessed</p>
        </div>
        <aside className="flex flex-col gap-5">
          {current && (
            <div className="thread-card p-4">
              <span className="label" style={{ color: STATUS_COLOR[current.status] }}>{STATUS_LABEL[current.status]}</span>
              <p className="mt-1 font-head text-fluid-panel font-semibold">{current.claim}</p>
              {current.rationale && <p className="mt-2 border-l-2 pl-3 text-sm italic text-slate" style={{ borderColor: STATUS_COLOR[current.status] }}>{current.rationale}</p>}
              <p className="mono mt-2 break-all text-xs"><a className="text-indigo" href={current.sourceUrl} target="_blank" rel="noopener noreferrer">source ↗</a></p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={`/thread/${current.id}`} className="thread-card px-3 py-2 text-sm hover:border-indigo">Open thread</Link>
                {current.status === ThreadStatus.Pending && !PREVIEW_MODE && <button onClick={() => onAssess(current.id)} disabled={assess.isPending} className="bg-indigo px-3 py-2 text-sm font-semibold text-white disabled:opacity-50">{assess.isPending ? "Assessing…" : "Assess"}</button>}
              </div>
            </div>
          )}
          <div className="thread-card p-4">
            <h2 className="font-head text-fluid-panel font-semibold">Weave a thread</h2>
            {PREVIEW_MODE && <p className="label mt-1 text-madder">preview - disabled</p>}
            <div className="mt-3 flex flex-col gap-3">
              <label className="block"><span className="label">Claim</span><textarea value={f.claim} onChange={e => set("claim", e.target.value)} maxLength={240} aria-invalid={!!errs.claim} className="mt-1 min-h-[90px] w-full border border-ink/20 bg-white p-3 text-base" placeholder="A claim the source must uphold." />{errs.claim && <span className="text-madder text-sm">{errs.claim}</span>}</label>
              <label className="block"><span className="label">Source URL</span><input value={f.sourceUrl} onChange={e => set("sourceUrl", e.target.value)} aria-invalid={!!errs.sourceUrl} className="mt-1 h-11 w-full border border-ink/20 bg-white px-3 text-base" placeholder="https://…" />{errs.sourceUrl && <span className="text-madder text-sm">{errs.sourceUrl}</span>}</label>
              <p aria-live="polite" className="min-h-[1.1rem] text-sm text-slate">{live}</p>
              {!account && !PREVIEW_MODE && <button onClick={() => connect()} className="thread-card min-h-[44px] px-3 text-sm hover:border-indigo">Connect wallet</button>}
              <button onClick={onWeave} disabled={weave.isPending} className="min-h-[48px] bg-ink px-4 text-sm font-semibold text-linen disabled:opacity-50">{weave.isPending ? "Weaving…" : "Weave thread"}</button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
