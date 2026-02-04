import { Link } from "react-router";

export default function IndexRoute() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-16">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Colmeia Web
        </p>
        <h1 className="text-4xl font-semibold">Web App Bootstrap</h1>
        <p className="text-lg text-slate-600">
          Mocked SPA routes for Generals, Captains, and public forms.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300"
          to="/app/general"
        >
          General Dashboard
        </Link>
        <Link
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300"
          to="/app/captain"
        >
          Captain Missions
        </Link>
        <Link
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300"
          to="/forms/example"
        >
          Public Form
        </Link>
      </div>
    </main>
  );
}
