import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adaptive AI Flow-Kanban',
  description: 'Adaptive roles and AI insights for collaborative flow.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-slate-950 text-slate-50">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <header className="p-6 border-b border-slate-800/60 backdrop-blur-sm sticky top-0 z-30 bg-slate-950/70">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-xl font-semibold tracking-tight text-indigo-200">
                Adaptive AI Flow-Kanban
              </h1>
              <span className="text-xs uppercase text-slate-400">Prototype</span>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
