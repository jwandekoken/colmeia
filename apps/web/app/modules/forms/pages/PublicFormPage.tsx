type PublicFormPageProps = {
  slug: string;
};

export function PublicFormPage({ slug }: PublicFormPageProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-16">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Public Form
        </p>
        <h1 className="text-3xl font-semibold">Form: {slug}</h1>
        <p className="text-slate-600">
          Mocked public form page for data capture.
        </p>
      </header>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4">
          <label className="text-sm font-medium text-slate-700">
            Name
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
              placeholder="Your name"
              type="text"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            WhatsApp
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
              placeholder="+55 11 99999-0000"
              type="tel"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Feedback
            <textarea
              className="mt-2 min-h-[120px] w-full rounded-xl border border-slate-200 px-4 py-3"
              placeholder="Share your thoughts"
            />
          </label>
          <button className="rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
            Send (Mock)
          </button>
        </div>
      </div>
    </main>
  );
}
