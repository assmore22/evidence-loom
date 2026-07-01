import Link from "next/link";
export const metadata = { title: "Method - Evidence Loom" };
export default function MethodPage() {
  const steps = [
    ["01 Weave", "A claim and a public source are stored on-chain as a thread."],
    ["02 Read", "On assessment the contract fetches the source. Reading is nondeterministic, so it runs in GenLayer's equivalence flow."],
    ["03 Agree", "Each validator independently reads the same source and decides upheld or not; recorded only on agreement."],
    ["04 Hold", "Upheld threads hold the weave; frayed ones are dashed and marked. The raw page is never stored."],
    ["05 Undetermined", "If the source can't be read or validators disagree, the thread stays unassessed - never guessed."],
  ];
  return (
    <div className="mx-auto max-w-reading px-4 py-10 sm:px-5 md:px-8">
      <span className="label">Method</span>
      <h1 className="mt-2 font-head text-fluid-section font-bold">How a thread is assessed.</h1>
      <p className="mt-3 text-ink/80">Evidence Loom is a thin weave over a GenLayer Intelligent Contract. Assessing a claim needs reading a source and protecting that judgement from any single party.</p>
      <div className="mt-6">{steps.map(([h, b]) => (<section key={h} className="border-t border-ink/15 py-5"><h2 className="font-head text-fluid-panel font-semibold">{h}</h2><p className="mt-1 max-w-reading text-ink/80">{b}</p></section>))}</div>
      <Link href="/" className="mt-8 inline-flex min-h-[48px] items-center bg-indigo px-6 text-sm font-semibold text-white">Open the loom</Link>
    </div>
  );
}
