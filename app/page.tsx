import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-vibe">
        <h2 className="text-2xl font-bold mb-2">Welcome to Adaptive AI Flow-Kanban</h2>
        <p className="text-slate-300 mb-4">
          ロール別のカンバンビューと AI の提案を備えたプロトタイプです。ログインして役割を選択し、ボードを体験してください。
        </p>
        <Link
          href="/login"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-500 text-white font-semibold shadow-vibe hover:shadow-float transition"
        >
          Go to Login
        </Link>
      </div>
    </section>
  );
}
