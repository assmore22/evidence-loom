"use client";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assessThread, fetchThread, fetchThreads, fetchStats, weaveThread } from "@/lib/genlayer/contract";
import { activeAccount, connectWallet } from "@/lib/genlayer/client";
import { PREVIEW_MODE } from "@/lib/env";
export const useThreads = () => useQuery({ queryKey: ["threads"], queryFn: fetchThreads, staleTime: 15000 });
export const useStats = () => useQuery({ queryKey: ["stats"], queryFn: fetchStats, staleTime: 15000 });
export const useThread = (id: number) => useQuery({ queryKey: ["thread", id], queryFn: () => fetchThread(id), enabled: Number.isFinite(id) });
export function useWeave() { const qc = useQueryClient(); return useMutation({ mutationFn: (v: { claim: string; sourceUrl: string }) => weaveThread(v.claim, v.sourceUrl), onSuccess: () => { qc.invalidateQueries({ queryKey: ["threads"] }); qc.invalidateQueries({ queryKey: ["stats"] }); } }); }
export function useAssess() { const qc = useQueryClient(); return useMutation({ mutationFn: (id: number) => assessThread(id), onSuccess: (_h, id) => { qc.invalidateQueries({ queryKey: ["thread", id] }); qc.invalidateQueries({ queryKey: ["threads"] }); qc.invalidateQueries({ queryKey: ["stats"] }); } }); }
export function useWallet() {
  const [account, setAccount] = useState<string | null>(null); const [connecting, setConnecting] = useState(false);
  useEffect(() => { if (PREVIEW_MODE) return; activeAccount().then(setAccount).catch(() => setAccount(null)); window.ethereum?.on?.("accountsChanged", () => activeAccount().then(setAccount)); }, []);
  const connect = useCallback(async () => { setConnecting(true); try { setAccount(await connectWallet()); } finally { setConnecting(false); } }, []);
  return { account, connect, connecting };
}
