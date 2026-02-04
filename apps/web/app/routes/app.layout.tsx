import { Link, Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Colmeia
            </p>
            <p className="text-lg font-semibold">App Shell</p>
          </div>
          <nav className="flex gap-4 text-sm text-slate-300">
            <Link className="hover:text-white" to="/app/general">
              General
            </Link>
            <Link className="hover:text-white" to="/app/captain">
              Captain
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
