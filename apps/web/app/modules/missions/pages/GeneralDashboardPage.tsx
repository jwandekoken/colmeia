export function GeneralDashboardPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          General Dashboard
        </p>
        <h1 className="text-3xl font-semibold">Mission Control</h1>
        <p className="text-slate-300">
          Mocked layout for mission creation, media uploads, and metrics.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {["New Mission", "Upload Media", "Live Metrics"].map((label) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <p className="text-sm text-slate-400">Card</p>
            <h2 className="text-lg font-semibold text-white">{label}</h2>
            <p className="mt-2 text-sm text-slate-400">
              Placeholder content.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
