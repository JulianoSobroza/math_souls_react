import { ArrowLeft, Clock, Target, Trophy, TrendingUp, Award, Calendar, LogOut } from 'lucide-react';
import { UserProfile } from '../App';

type ProfileViewProps = {
  userProfile: UserProfile;
  onBack: () => void;
  onNavigateToAchievements?: () => void;
  onLogout?: () => void;
};

export function ProfileView({ userProfile, onBack, onNavigateToAchievements, onLogout }: ProfileViewProps) {
  const xpToNextLevel = 200 - (userProfile.totalXP % 200);
  const progressPercentage = ((userProfile.totalXP % 200) / 200) * 100;

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
          <h1 className="text-slate-200">Meu Perfil</h1>
          <div className="text-slate-500">Privado</div>
        </div>
        {onLogout && (
          <button
            onClick={onLogout}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* User Card */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl">{userProfile.badges[0] || '🎯'}</span>
          </div>
          <div>
            <h2 className="text-xl">{userProfile.username}</h2>
            <div className="text-blue-100">Level {userProfile.level}</div>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Progresso para Level {userProfile.level + 1}</span>
            <span>{userProfile.totalXP % 200} / 200 XP</span>
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

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2 text-blue-400">
            <TrendingUp className="w-5 h-5" />
            <span>XP Total</span>
          </div>
          <div className="text-2xl">{userProfile.totalXP}</div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2 text-green-400">
            <Target className="w-5 h-5" />
            <span>Questões</span>
          </div>
          <div className="text-2xl">{userProfile.questionsCompleted}</div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2 text-purple-400">
            <Clock className="w-5 h-5" />
            <span>Tempo Total</span>
          </div>
          <div className="text-2xl">{Math.floor(userProfile.timeSpent / 60)}h {userProfile.timeSpent % 60}min</div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2 text-yellow-400">
            <Award className="w-5 h-5" />
            <span>XP Semanal</span>
          </div>
          <div className="text-2xl">{userProfile.weeklyXP}</div>
        </div>
      </div>

      {/* Categoria Favorita */}
      <div className="bg-slate-800 p-4 rounded-xl mb-6">
        <div className="text-slate-400 mb-2">Disciplina Favorita</div>
        <div className="text-xl text-slate-200">{userProfile.favoriteCategory}</div>
        <div className="text-slate-500">Baseado no tempo gasto</div>
      </div>

      {/* Stats por Categoria */}
      <div className="bg-slate-800 p-5 rounded-xl mb-6">
        <div className="text-slate-400 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          <span>Progresso por Disciplina</span>
        </div>
        <div className="space-y-3">
          {userProfile.categoryStats
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
                    style={{ width: `${(stat.questionsCompleted / userProfile.questionsCompleted) * 100}%` }}
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Badges */}
      <div className="bg-slate-800 p-4 rounded-xl mb-6">
        <div className="text-slate-400 mb-3">Insígnias</div>
        {userProfile.badges.length > 0 ? (
          <div className="grid grid-cols-4 gap-3">
            {userProfile.badges.map((badge, index) => (
              <div key={index} className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{badge}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Award className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <div>Nenhuma insígnia ainda</div>
            <div className="text-sm">Continue resolvendo para desbloquear!</div>
          </div>
        )}
      </div>

      {/* Conquistas */}
      <div className="bg-slate-800 p-5 rounded-xl mb-6">
        <div className="text-slate-400 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span>Conquistas Recentes ({userProfile.achievements.length})</span>
          </div>
          {onNavigateToAchievements && (
            <button
              onClick={onNavigateToAchievements}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Ver todas →
            </button>
          )}
        </div>
        {userProfile.achievements.length > 0 ? (
          <div className="space-y-3">
            {userProfile.achievements.slice(0, 3).map((achievement) => (
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

      {/* Info adicional */}
      <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
        <div className="text-slate-400 mb-2">Dica</div>
        <div className="text-slate-500">
          Seu XP semanal reseta todo domingo à noite. Fique no Top 3 para ganhar insígnias especiais!
        </div>
      </div>
    </div>
  );
}