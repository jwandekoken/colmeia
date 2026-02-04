export function CaptainMissionsPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Captain Area
        </p>
        <h1 className="text-3xl font-semibold">Today’s Missions</h1>
        <p className="text-slate-300">
          Mocked list of missions and share actions for PWA flow.
        </p>
      </header>
      <div className="space-y-4">
        {[1, 2, 3].map((mission) => (
          <div
            key={mission}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Mission {mission}</p>
                <h2 className="text-lg font-semibold">Share the new video</h2>
              </div>
              <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                Share
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Placeholder mission description.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
