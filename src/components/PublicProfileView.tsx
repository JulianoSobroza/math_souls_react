import { ArrowLeft, Trophy, Clock, Target, Award, TrendingUp, Calendar, Flame } from 'lucide-react';
import { UserProfile } from '../App';
import { getUserByUsername } from '../data/mockUsers';

type PublicProfileViewProps = {
  username: string;
  currentUser: UserProfile;
  onBack: () => void;
};

export function PublicProfileView({ username, currentUser, onBack }: PublicProfileViewProps) {
  const user = getUserByUsername(username);

  if (!user) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-slate-400 mb-4">Usuário não encontrado</div>
          <button
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const isOwnProfile = user.username === currentUser.username;
  const xpToNextLevel = 200 - (user.totalXP % 200);
  const progressPercentage = ((user.totalXP % 200) / 200) * 100;

  // Calcula dias desde que entrou
  const joinDate = new Date(user.joinedDate);
  const today = new Date();
  const daysActive = Math.floor((today.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));

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
        <div className="flex-1">
          <h1 className="text-slate-200">{user.username}</h1>
          {isOwnProfile && (
            <div className="text-slate-500">Seu Perfil Público</div>
          )}
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-4xl">{user.badges[0] || '🎯'}</span>
            </div>
            <div>
              <h2 className="text-2xl mb-1">{user.username}</h2>
              <div className="text-blue-100">Level {user.level}</div>
            </div>
          </div>
          
          {/* Badges */}
          {user.badges.length > 0 && (
            <div className="flex gap-2">
              {user.badges.map((badge, i) => (
                <div key={i} className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <span className="text-xl">{badge}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Progresso para Level {user.level + 1}</span>
            <span>{user.totalXP % 200} / 200 XP</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        <div className="text-sm text-blue-100">
          Faltam {xpToNextLevel} XP para o próximo nível
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2 text-blue-400">
            <TrendingUp className="w-5 h-5" />
            <span>XP Total</span>
          </div>
          <div className="text-2xl">{user.totalXP.toLocaleString()}</div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2 text-green-400">
            <Target className="w-5 h-5" />
            <span>Questões</span>
          </div>
          <div className="text-2xl">{user.questionsCompleted}</div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2 text-purple-400">
            <Clock className="w-5 h-5" />
            <span>Tempo Total</span>
          </div>
          <div className="text-2xl">{Math.floor(user.timeSpent / 60)}h {user.timeSpent % 60}min</div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2 text-yellow-400">
            <Trophy className="w-5 h-5" />
            <span>XP Semanal</span>
          </div>
          <div className="text-2xl">{user.weeklyXP}</div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2 text-slate-400">
            <Target className="w-5 h-5" />
            <span>Favorito</span>
          </div>
          <div className="text-slate-200">{user.favoriteCategory}</div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2 text-slate-400">
            <Flame className="w-5 h-5" />
            <span>Dias Ativo</span>
          </div>
          <div className="text-slate-200">{daysActive} dias</div>
        </div>
      </div>

      {/* Stats por Categoria */}
      <div className="bg-slate-800 p-5 rounded-xl mb-6">
        <div className="text-slate-400 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          <span>Progresso por Disciplina</span>
        </div>
        <div className="space-y-3">
          {user.categoryStats
            .sort((a, b) => b.xpEarned - a.xpEarned)
            .map((stat) => (
              <div key={stat.categoryId}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-300">{stat.categoryName}</span>
                  <div className="text-sm text-slate-500">
                    {stat.questionsCompleted} questões • {stat.xpEarned} XP
                  </div>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${(stat.questionsCompleted / user.questionsCompleted) * 100}%` }}
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Conquistas */}
      <div className="bg-slate-800 p-5 rounded-xl mb-6">
        <div className="text-slate-400 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          <span>Conquistas ({user.achievements.length})</span>
        </div>
        {user.achievements.length > 0 ? (
          <div className="space-y-3">
            {user.achievements.map((achievement) => (
              <div key={achievement.id} className="bg-slate-900 p-4 rounded-lg flex items-start gap-3">
                <div className="text-3xl flex-shrink-0">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="text-slate-200 mb-1">{achievement.name}</div>
                  <div className="text-slate-500">{achievement.description}</div>
                  <div className="flex items-center gap-2 mt-2 text-slate-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Desbloqueado em {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Award className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <div>Nenhuma conquista ainda</div>
          </div>
        )}
      </div>

      {/* Member Since */}
      <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-slate-400">
          <Calendar className="w-5 h-5" />
          <span>Membro desde {joinDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}
