'use client';
import { useRoleStore, type UserRole } from '@/state/useRoleStore';

const roles: UserRole[] = ['TechLead', 'SWE', 'PdM', 'QA', 'Designer'];

export default function LoginPage() {
  const { loginWithGitHub, selectRole, role, isAuthenticated } = useRoleStore();

  const handleLogin = () => {
    loginWithGitHub();
  };

  const handleRoleSelect = (pickedRole: UserRole) => {
    selectRole(pickedRole);
  };

  return (
    <section className="space-y-6" aria-label="Login">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-vibe">
        <h2 className="text-2xl font-bold mb-2">GitHub OAuth login (mock)</h2>
        <p className="text-slate-300 mb-4">GitHub OAuth を模したフローです。ログイン後に役割を選択できます。</p>
        <button
          type="button"
          onClick={handleLogin}
          className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-semibold shadow-vibe hover:shadow-float transition"
        >
          Simulate GitHub Login
        </button>
      </div>

      {isAuthenticated && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-vibe space-y-4">
          <h3 className="text-xl font-semibold">Choose your role to continue</h3>
          <p className="text-slate-400 text-sm">同じボードでも役割に応じて強調が変化します。</p>
          <div className="flex flex-wrap gap-3">
            {roles.map((candidate) => (
              <button
                key={candidate}
                type="button"
                onClick={() => handleRoleSelect(candidate)}
                className={`px-3 py-2 rounded-lg border transition shadow-sm hover:shadow-float ${
                  role === candidate
                    ? 'bg-indigo-500 text-white border-indigo-400'
                    : 'bg-slate-800/60 border-slate-700 text-slate-200 hover:border-indigo-400'
                }`}
              >
                {candidate}
              </button>
            ))}
          </div>
          {role && (
            <p className="text-emerald-300 font-semibold">Role selected: {role}</p>
          )}
        </div>
      )}
    </section>
  );
}
