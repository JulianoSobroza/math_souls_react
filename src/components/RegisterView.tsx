import { useState } from 'react';
import { ArrowLeft, Sparkles, Shield, Trophy, Loader2 } from 'lucide-react';

type RegisterViewProps = {
  onBack: () => void;
  onFinish: () => void;
};

const steps = [
  { title: 'Escolha seu codinome', desc: 'Seu nome de guerra para os rankings' },
  { title: 'E-mail', desc: 'Para recuperar progresso e logar' },
  { title: 'Senha', desc: 'Mantemos tudo seguro com hashing' },
];

export function RegisterView({ onBack, onFinish }: RegisterViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const completion = Math.min(100, Math.floor((Number(Boolean(name)) + Number(Boolean(email)) + Number(password.length >= 6)) / 3 * 100));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      // No backend signup endpoint yet; simulate success
      await new Promise((resolve) => setTimeout(resolve, 800));
      setMessage('Perfil criado! Você já ganhou +50 XP de boas-vindas.');
      setTimeout(() => onFinish(), 600);
    } catch (err) {
      setMessage('Não foi possível criar a conta agora. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <div className="text-slate-400">Cadastro</div>
          <h1 className="text-slate-100 text-2xl">Crie seu piloto Mathlingo</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 p-4 rounded-xl shadow-lg text-white">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5" />
            <span>Recompensas de entrada</span>
          </div>
          <ul className="space-y-2 text-sm text-indigo-100">
            <li>• +50 XP de boas-vindas</li>
            <li>• Badge "Primeira Missão"</li>
            <li>• Desbloqueie ranking semanal</li>
          </ul>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-slate-100 mb-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span>Segurança</span>
          </div>
          <p className="text-slate-400 text-sm">Usamos armazenamento seguro e tokens para proteger seu perfil e progresso.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-slate-100 mb-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span>Meta inicial</span>
          </div>
          <p className="text-slate-400 text-sm">Complete 3 questões no primeiro dia para ganhar +100 XP extra.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-slate-200 font-medium">Progresso do cadastro</div>
            <div className="text-slate-500 text-sm">Preencha os campos para ganhar XP</div>
          </div>
          <div className="text-blue-400 text-sm font-medium">{completion}% completo</div>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
            style={{ width: `${completion}%` }}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-3 mb-6">
          {steps.map((step, idx) => {
            const done = (idx === 0 && Boolean(name)) || (idx === 1 && Boolean(email)) || (idx === 2 && password.length >= 6);
            return (
              <div key={step.title} className={`p-4 rounded-lg border ${done ? 'border-emerald-500/60 bg-emerald-500/10' : 'border-slate-800 bg-slate-800/50'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-200">{step.title}</span>
                  <span className={`w-2.5 h-2.5 rounded-full ${done ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                </div>
                <div className="text-slate-500 text-sm">{step.desc}</div>
              </div>
            );
          })}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-300 mb-1">Codinome</label>
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Ex: EquacaoHunter"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1">E-mail</label>
            <input
              type="email"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1">Senha</label>
            <input
              type="password"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {loading ? 'Criando perfil...' : 'Criar minha conta'}
          </button>

          {message && <div className="text-center text-slate-200 text-sm">{message}</div>}
        </form>
      </div>
    </div>
  );
}
