"use client";
import Link from "next/link";
import { use, useState } from "react";
import { PREVIEW_MODE } from "@/lib/env";
import { ThreadStatus, STATUS_COLOR, STATUS_LABEL } from "@/lib/genlayer/types";
import { formatContractError } from "@/lib/genlayer/errors";
import { useAssess, useThread } from "@/hooks/useWeave";

export default function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = use(params);
  const id = Number(rawId);
  const { data: t, isLoading, isError, refetch } = useThread(id);
  const assess = useAssess();
  const [live, setLive] = useState("");
  const onAssess = async () => { if (PREVIEW_MODE) { setLive("Preview mode: assess disabled."); return; } setLive("Validators reading the source…"); try { await assess.mutateAsync(id); setLive("Assessed."); refetch(); } catch (e) { setLive(formatContractError(e)); } };
  return (
    <div className="mx-auto max-w-reading px-4 py-8 sm:px-5 md:px-8">
      <Link href="/" className="mono text-sm text-slate hover:text-indigo">← Loom</Link>
      {isLoading && <p className="mt-6 text-slate">Reading thread #{id}…</p>}
      {isError && <p className="mt-6 text-madder" role="alert">Could not read. <button onClick={() => refetch()}>Retry</button></p>}
      {!isLoading && !t && <p className="mt-6 text-slate">No thread #{id}.</p>}
      {t && (
        <article className="mt-4">
          <span className="label" style={{ color: STATUS_COLOR[t.status] }}>{STATUS_LABEL[t.status]}</span>
          <h1 className="mt-1 font-head text-fluid-section font-bold">{t.claim}</h1>
          {t.rationale && <p className="mt-4 border-l-2 pl-4 italic text-slate" style={{ borderColor: STATUS_COLOR[t.status] }}>{t.rationale}</p>}
          <dl className="border-t border-ink/15 mt-6 grid grid-cols-[6rem_1fr] gap-y-2 pt-4 text-sm">
            <dt className="label">Source</dt><dd className="break-all"><a className="text-indigo" href={t.sourceUrl} target="_blank" rel="noopener noreferrer">{t.sourceUrl}</a></dd>
            <dt className="label">Weaver</dt><dd className="mono break-all">{t.weaver}</dd>
          </dl>
          {t.status === ThreadStatus.Pending && !PREVIEW_MODE && (
            <div className="mt-6"><button onClick={onAssess} disabled={assess.isPending} className="min-h-[48px] bg-indigo px-5 text-sm font-semibold text-white disabled:opacity-50">{assess.isPending ? "Validators reading…" : "Assess with validators"}</button>
            <p aria-live="polite" className="mt-2 min-h-[1.1rem] text-sm text-slate">{live}</p></div>
          )}
        </article>
      )}
    </div>
  );
}
