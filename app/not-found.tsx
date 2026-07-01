import Link from "next/link";
export const metadata = { title: "Loose thread - Evidence Loom" };
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60svh] max-w-reading flex-col justify-center px-4 py-16 sm:px-5 md:px-8">
      <span className="label">Error 404</span>
      <h1 className="mt-2 font-head text-fluid-page font-bold">A loose thread.</h1>
      <p className="mt-3 text-ink/80">This thread isn&rsquo;t in the weave. It may have been archived, or the link mistyped.</p>
      <Link href="/" className="mt-6 inline-flex min-h-[48px] w-fit items-center bg-indigo px-6 text-sm font-semibold text-white">Back to the loom</Link>
    </div>
  );
}
