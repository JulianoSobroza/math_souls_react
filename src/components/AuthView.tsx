import { useState } from 'react';
import { Brain, Mail, Lock, User, Eye, EyeOff, Trophy, Target, Users, Award } from 'lucide-react';

type AuthViewProps = {
  onLogin: (username: string) => void;
};

type AuthMode = 'login' | 'register';

export function AuthView({ onLogin }: AuthViewProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!loginEmail || !loginPassword) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || 'Falha ao fazer login');
        setLoading(false);
        return;
      }

      const data = await response.json();
      
      // Store tokens in localStorage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setLoading(false);
      onLogin(data.user.name);
    } catch (err) {
      setError('Erro de conexão com o servidor');
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!registerUsername || !registerEmail || !registerPassword || !registerConfirmPassword) {
      setError('Preencha todos os campos');
      return;
    }

    if (registerUsername.length < 3) {
      setError('Nome de usuário deve ter no mínimo 3 caracteres');
      return;
    }

    if (registerPassword.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || 'Falha ao criar conta');
        setLoading(false);
        return;
      }

      const data = await response.json();
      
      // Store tokens in localStorage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setLoading(false);
      onLogin(data.user.name);
    } catch (err) {
      setError('Erro de conexão com o servidor');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      <div className="w-full max-w-6xl flex gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="flex-1 hidden lg:block">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Brain className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl">MathQuest</h1>
                <div className="text-slate-400">Plataforma de Matemática Gamificada</div>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-slate-200 mb-1">Resolva e Aprenda</h3>
                <p className="text-slate-400">
                  Questões de múltipla escolha organizadas por categoria. Sem tutoriais - você escolhe o que resolver.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-slate-200 mb-1">Sistema de XP Duplo</h3>
                <p className="text-slate-400">
                  Ganhe 30% do XP marcando a alternativa ou 100% enviando o manuscrito validado por IA.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Trophy className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-slate-200 mb-1">Ranking Competitivo</h3>
                <p className="text-slate-400">
                  Ranking semanal que reseta todo domingo. Sem vidas ou penalidades por erro.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-slate-200 mb-1">Comunidade Ativa</h3>
                <p className="text-slate-400">
                  Adicione amigos, veja perfis públicos e conquiste achievements exclusivos.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
            <div className="text-slate-400 mb-3">Categorias Disponíveis</div>
            <div className="flex gap-2 flex-wrap">
              {['📐 Álgebra', '📏 Geometria', '📊 Trigonometria', '🔢 Aritmética'].map((cat) => (
                <div key={cat} className="px-3 py-1.5 bg-slate-800/50 rounded-lg text-sm text-slate-300">
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-[480px]">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Brain className="w-10 h-10" />
            </div>
            <h1 className="text-3xl mb-1">MathQuest</h1>
            <div className="text-slate-400">Plataforma de Matemática Gamificada</div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
            {/* Tab Switcher */}
            <div className="flex gap-2 mb-6 bg-slate-800/50 p-1 rounded-xl">
              <button
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className={`flex-1 py-3 rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => {
                  setMode('register');
                  setError('');
                }}
                className={`flex-1 py-3 rounded-lg transition-all ${
                  mode === 'register'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                Criar Conta
              </button>
            </div>

            {/* Login Form */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-slate-400 mb-2 text-sm">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full bg-slate-800 text-white pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-2 text-sm">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-800 text-white pl-11 pr-11 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>

                <div className="text-center">
                  <button type="button" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                    Esqueceu a senha?
                  </button>
                </div>
              </form>
            )}

            {/* Register Form */}
            {mode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-slate-400 mb-2 text-sm">Nome de Usuário</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      value={registerUsername}
                      onChange={(e) => setRegisterUsername(e.target.value)}
                      placeholder="seu_nome"
                      className="w-full bg-slate-800 text-white pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-2 text-sm">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full bg-slate-800 text-white pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-2 text-sm">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-800 text-white pl-11 pr-11 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-2 text-sm">Confirmar Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-800 text-white pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? 'Criando conta...' : 'Criar Conta'}
                </button>

                <div className="text-center text-sm text-slate-400">
                  Ao criar uma conta, você concorda com nossos{' '}
                  <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Termos de Uso
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center text-sm text-slate-500">
            {mode === 'login' ? (
              <div>
                Conectado ao servidor em localhost:8000
              </div>
            ) : (
              <div>
                Já tem uma conta?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Faça login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
