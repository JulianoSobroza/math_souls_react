import { ArrowLeft, Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { UserProfile } from '../App';

type RankingViewProps = {
  currentUser: UserProfile;
  onBack: () => void;
  onViewProfile: (username: string) => void;
};

type RankingUser = {
  rank: number;
  username: string;
  weeklyXP: number;
  level: number;
  badge?: string;
};

export function RankingView({ currentUser, onBack, onViewProfile }: RankingViewProps) {
  // Mock data - em produção viria do backend
  const rankingData: RankingUser[] = [
    { rank: 1, username: 'MathGenius', weeklyXP: 2450, level: 24, badge: '🥇' },
    { rank: 2, username: 'AlgebraKing', weeklyXP: 2180, level: 21, badge: '🥈' },
    { rank: 3, username: 'GeometriaPro', weeklyXP: 1920, level: 19, badge: '🥉' },
    { rank: 4, username: 'TrigMaster', weeklyXP: 1650, level: 17 },
    { rank: 5, username: 'CalculusLord', weeklyXP: 1480, level: 16 },
    { rank: 6, username: 'NumberTheory', weeklyXP: 1320, level: 15 },
    { rank: 7, username: 'FunctionFan', weeklyXP: 1150, level: 14 },
    { rank: 8, username: currentUser.username, weeklyXP: currentUser.weeklyXP, level: currentUser.level },
    { rank: 9, username: 'EquationSolver', weeklyXP: 890, level: 11 },
    { rank: 10, username: 'MathLover99', weeklyXP: 720, level: 10 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-slate-300" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-400" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-slate-500">{rank}</div>;
    }
  };

  const currentUserRank = rankingData.find(u => u.username === currentUser.username);
  const daysUntilReset = 7 - new Date().getDay();

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-slate-200">Ranking Semanal</h1>
          <div className="text-slate-500">Reseta em {daysUntilReset} dias</div>
        </div>
      </div>

      {/* User's Position */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-blue-100 mb-1">Sua Posição</div>
            <div className="text-3xl">#{currentUserRank?.rank || '-'}</div>
          </div>
          <div className="text-right">
            <div className="text-blue-100 mb-1">XP Semanal</div>
            <div className="text-3xl">{currentUser.weeklyXP}</div>
          </div>
        </div>
      </div>

      {/* Top 3 */}
      <div className="mb-6">
        <div className="text-slate-400 mb-3 flex items-center gap-2">
          <Award className="w-5 h-5" />
          <span>Top 3 - Ganham Insígnia</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {rankingData.slice(0, 3).map((user) => (
            <div
              key={user.rank}
              className={`bg-slate-800 rounded-xl p-4 text-center ${
                user.rank === 1 ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              <div className="text-4xl mb-2">{user.badge}</div>
              <div className="text-slate-300 mb-1 truncate">{user.username}</div>
              <div className="text-blue-400">{user.weeklyXP} XP</div>
              <div className="text-slate-500 text-sm mt-1">Lvl {user.level}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Ranking */}
      <div>
        <div className="text-slate-400 mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          <span>Classificação Completa</span>
        </div>
        <div className="space-y-2">
          {rankingData.map((user) => (
            <button
              key={user.rank}
              onClick={() => onViewProfile(user.username)}
              className={`w-full p-4 rounded-lg flex items-center gap-4 transition-colors text-left ${
                user.username === currentUser.username
                  ? 'bg-blue-600'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <div className="flex-shrink-0">
                {getRankIcon(user.rank)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-slate-200 truncate">{user.username}</div>
                <div className="text-slate-500">Level {user.level}</div>
              </div>
              
              <div className="text-right">
                <div className={`${
                  user.username === currentUser.username ? 'text-white' : 'text-blue-400'
                }`}>
                  {user.weeklyXP} XP
                </div>
                {user.badge && (
                  <div className="text-xl">{user.badge}</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg mt-6">
        <div className="text-slate-400 mb-2">Como Funciona</div>
        <ul className="text-slate-500 space-y-1 text-sm">
          <li>• O ranking reseta todo domingo à noite</li>
          <li>• Top 3 ganham insígnias especiais no perfil</li>
          <li>• Resolva com manuscrito para ganhar mais XP</li>
          <li>• Questões básicas também contam para o ranking</li>
        </ul>
      </div>
    </div>
  );
}