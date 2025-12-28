import { User, Trophy, Target, Users, Award, UserPlus } from 'lucide-react';
import { categories } from '../data/categories';
import { Screen, UserProfile } from '../App';

type HomeProps = {
  onNavigate: (screen: Screen) => void;
  userProfile: UserProfile;
};

export function Home({ onNavigate, userProfile }: HomeProps) {
  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-slate-400 mb-1">Level {userProfile.level}</h1>
          <div className="flex items-center gap-3">
            <div className="h-2 w-48 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500"
                style={{ width: `${(userProfile.totalXP % 200) / 2}%` }}
              />
            </div>
            <span className="text-slate-400">{userProfile.totalXP} XP</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate({ type: 'achievements' })}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Award className="w-6 h-6 text-green-500" />
          </button>
          <button
            onClick={() => onNavigate({ type: 'community' })}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Users className="w-6 h-6 text-purple-500" />
          </button>
          <button
            onClick={() => onNavigate({ type: 'ranking' })}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Trophy className="w-6 h-6 text-yellow-500" />
          </button>
          <button
            onClick={() => onNavigate({ type: 'profile' })}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <User className="w-6 h-6" />
          </button>
          <button
            onClick={() => onNavigate({ type: 'friends' })}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <UserPlus className="w-6 h-6 text-blue-500" />
          </button>
        </div>
      </div>

      {/* Stats rápidas */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="text-slate-400 mb-1">XP Semanal</div>
          <div className="text-blue-400">{userProfile.weeklyXP}</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="text-slate-400 mb-1">Questões</div>
          <div className="text-green-400">{userProfile.questionsCompleted}</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="text-slate-400 mb-1">Tempo</div>
          <div className="text-purple-400">{Math.floor(userProfile.timeSpent / 60)}h</div>
        </div>
      </div>

      {/* Categorias */}
      <div className="mb-6">
        <h2 className="text-slate-400 mb-4">Escolha o que resolver</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onNavigate({ type: 'category', categoryId: category.id })}
              className="bg-slate-800 hover:bg-slate-700 p-6 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              <div className="text-5xl mb-3">{category.icon}</div>
              <div>{category.name}</div>
              <div className="text-slate-500 mt-1">
                {category.subcategories.length} tópicos
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dica */}
      <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg flex items-start gap-3">
        <Target className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-slate-300 mb-1">Dica de Veterano</div>
          <div className="text-slate-500">
            Resolva as questões básicas para ganhar XP extra e subir no ranking semanal.
          </div>
        </div>
      </div>
    </div>
  );
}