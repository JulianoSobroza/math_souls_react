import { ArrowLeft, Trophy, Lock, Star, TrendingUp, Award, Filter } from 'lucide-react';
import { UserProfile } from '../App';
import { achievementsData, getTierColor, getTierName, getRarityLabel, getRarityColor, AchievementDefinition } from '../data/achievementsData';
import { useState } from 'react';

type AchievementsViewProps = {
  currentUser: UserProfile;
  onBack: () => void;
};

type FilterType = 'all' | 'unlocked' | 'locked' | 'bronze' | 'silver' | 'gold' | 'platinum';

export function AchievementsView({ currentUser, onBack }: AchievementsViewProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [category, setCategory] = useState<'all' | 'progress' | 'skill' | 'dedication' | 'special'>('all');

  // Simula progresso do usuário (em produção viria do backend)
  const userProgress: Record<string, number> = {
    'first-win': 1,
    'getting-started': 10,
    'dedicated-solver': 42,
    'centenarian': 42,
    'master-solver': 42,
    'manuscript-master': 10,
    'manuscript-legend': 15,
    'manuscript-god': 15,
    'algebra-master': 18,
    'early-bird': 5,
    'night-owl': 12,
  };

  const unlockedIds = currentUser.achievements.map(a => a.id);

  const filteredAchievements = achievementsData.filter(achievement => {
    // Filter by unlock status
    const isUnlocked = unlockedIds.includes(achievement.id);
    if (filter === 'unlocked' && !isUnlocked) return false;
    if (filter === 'locked' && isUnlocked) return false;
    if (filter !== 'all' && filter !== 'unlocked' && filter !== 'locked') {
      if (achievement.tier !== filter) return false;
    }

    // Filter by category
    if (category !== 'all' && achievement.category !== category) return false;

    return true;
  });

  const totalAchievements = achievementsData.length;
  const unlockedCount = unlockedIds.length;
  const completionPercentage = (unlockedCount / totalAchievements) * 100;

  const getAchievementProgress = (achievement: AchievementDefinition) => {
    const progress = userProgress[achievement.id] || 0;
    const max = achievement.maxProgress || 1;
    return { current: progress, max, percentage: (progress / max) * 100 };
  };

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
          <h1 className="text-slate-200 flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Conquistas
          </h1>
          <div className="text-slate-500">{unlockedCount} de {totalAchievements} desbloqueadas</div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-blue-100 mb-1">Progresso Geral</div>
            <div className="text-3xl">{Math.floor(completionPercentage)}%</div>
          </div>
          <div className="text-right">
            <div className="text-blue-100 mb-1">Conquistas</div>
            <div className="text-3xl">{unlockedCount}/{totalAchievements}</div>
          </div>
        </div>
        
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Tier Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {(['bronze', 'silver', 'gold', 'platinum'] as const).map((tier) => {
          const tierTotal = achievementsData.filter(a => a.tier === tier).length;
          const tierUnlocked = achievementsData.filter(a => a.tier === tier && unlockedIds.includes(a.id)).length;
          return (
            <div key={tier} className={`bg-gradient-to-br ${getTierColor(tier)} rounded-lg p-3 text-center`}>
              <div className="text-xs text-white/80 mb-1">{getTierName(tier)}</div>
              <div className="text-white">{tierUnlocked}/{tierTotal}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3 text-slate-400">
          <Filter className="w-4 h-4" />
          <span>Filtros</span>
        </div>
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {(['all', 'unlocked', 'locked'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {f === 'all' ? 'Todas' : f === 'unlocked' ? 'Desbloqueadas' : 'Bloqueadas'}
            </button>
          ))}
          <div className="w-px bg-slate-700 mx-1" />
          {(['bronze', 'silver', 'gold', 'platinum'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {getTierName(f)}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto">
          {(['all', 'progress', 'skill', 'dedication', 'special'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-colors ${
                category === cat
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-800/50 text-slate-500 hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'Todas' : 
               cat === 'progress' ? 'Progresso' :
               cat === 'skill' ? 'Habilidade' :
               cat === 'dedication' ? 'Dedicação' : 'Especial'}
            </button>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="space-y-3">
        {filteredAchievements.map((achievement) => {
          const isUnlocked = unlockedIds.includes(achievement.id);
          const unlockedData = currentUser.achievements.find(a => a.id === achievement.id);
          const progress = getAchievementProgress(achievement);
          const showProgress = achievement.maxProgress && achievement.maxProgress > 1;

          return (
            <div
              key={achievement.id}
              className={`rounded-xl p-5 transition-all ${
                isUnlocked
                  ? `bg-gradient-to-r ${getTierColor(achievement.tier)} relative overflow-hidden`
                  : 'bg-slate-800 opacity-60'
              }`}
            >
              {isUnlocked && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
              )}
              
              <div className="relative flex gap-4">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isUnlocked ? 'bg-white/20 backdrop-blur-sm' : 'bg-slate-700'
                }`}>
                  {achievement.isSecret && !isUnlocked ? (
                    <Lock className="w-8 h-8 text-slate-500" />
                  ) : (
                    <span className="text-3xl">{achievement.icon}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className={`mb-1 ${isUnlocked ? 'text-white' : 'text-slate-300'}`}>
                        {achievement.isSecret && !isUnlocked ? '???' : achievement.name}
                      </h3>
                      <p className={`text-sm ${isUnlocked ? 'text-white/80' : 'text-slate-500'}`}>
                        {achievement.isSecret && !isUnlocked 
                          ? 'Continue jogando para descobrir...' 
                          : achievement.description}
                      </p>
                    </div>
                    
                    {/* Rarity Badge */}
                    <div className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                      isUnlocked ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400'
                    }`}>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{achievement.rarity}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {showProgress && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className={isUnlocked ? 'text-white/70' : 'text-slate-500'}>
                          {achievement.requirement}
                        </span>
                        <span className={isUnlocked ? 'text-white/70' : 'text-slate-500'}>
                          {progress.current}/{progress.max}
                        </span>
                      </div>
                      <div className={`h-2 rounded-full overflow-hidden ${
                        isUnlocked ? 'bg-white/20' : 'bg-slate-700'
                      }`}>
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isUnlocked ? 'bg-white' : 'bg-blue-500'
                          }`}
                          style={{ width: `${Math.min(progress.percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Unlocked Info */}
                  {isUnlocked && unlockedData && (
                    <div className="mt-2 text-xs text-white/60 flex items-center gap-2">
                      <Trophy className="w-3 h-3" />
                      <span>Desbloqueado em {new Date(unlockedData.unlockedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}

                  {/* Requirement (locked only) */}
                  {!isUnlocked && !showProgress && (
                    <div className="mt-2 text-xs text-slate-500">
                      {achievement.requirement}
                    </div>
                  )}

                  {/* Rarity Label */}
                  <div className={`mt-2 text-xs ${getRarityColor(achievement.rarity)}`}>
                    {getRarityLabel(achievement.rarity)} • {getTierName(achievement.tier)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-slate-700 mx-auto mb-3" />
          <div className="text-slate-500">Nenhuma conquista encontrada</div>
        </div>
      )}

      {/* Stats Footer */}
      <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg mt-6">
        <div className="text-slate-400 mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span>Estatísticas</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-slate-500">Conquistas Raras</div>
            <div className="text-slate-300">
              {achievementsData.filter(a => a.rarity < 20 && unlockedIds.includes(a.id)).length} desbloqueadas
            </div>
          </div>
          <div>
            <div className="text-slate-500">Conquistas Secretas</div>
            <div className="text-slate-300">
              {achievementsData.filter(a => a.isSecret && unlockedIds.includes(a.id)).length} / {achievementsData.filter(a => a.isSecret).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
