import { ArrowLeft, Users, Search, TrendingUp, Clock, Target } from 'lucide-react';
import { UserProfile } from '../App';
import { mockUsers } from '../data/mockUsers';
import { useState } from 'react';

type CommunityViewProps = {
  currentUser: UserProfile;
  onBack: () => void;
  onViewProfile: (username: string) => void;
};

export function CommunityView({ currentUser, onBack, onViewProfile }: CommunityViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'top' | 'active'>('all');

  const filteredUsers = mockUsers
    .filter(user => {
      const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      if (filter === 'top') {
        return user.totalXP >= 3000;
      } else if (filter === 'active') {
        return user.weeklyXP >= 1000;
      }
      return true;
    })
    .sort((a, b) => b.totalXP - a.totalXP);

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
          <h1 className="text-slate-200 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Comunidade
          </h1>
          <div className="text-slate-500">{mockUsers.length} jogadores ativos</div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar jogadores..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter('top')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
            filter === 'top'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Top Players (3000+ XP)
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
            filter === 'active'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <Clock className="w-4 h-4" />
          Ativos Esta Semana
        </button>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUsers.map((user) => (
          <button
            key={user.username}
            onClick={() => onViewProfile(user.username)}
            className="bg-slate-800 hover:bg-slate-700 p-5 rounded-xl transition-all text-left"
          >
            {/* Header do Card */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">
                    {user.badges[0] || '🎯'}
                  </span>
                </div>
                <div>
                  <div className="text-slate-200">{user.username}</div>
                  <div className="text-slate-500">Level {user.level}</div>
                </div>
              </div>
              {user.badges.length > 0 && (
                <div className="flex gap-1">
                  {user.badges.slice(0, 3).map((badge, i) => (
                    <span key={i} className="text-xl">{badge}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-900 p-2 rounded-lg">
                <div className="text-slate-500 text-xs">XP Total</div>
                <div className="text-blue-400">{user.totalXP.toLocaleString()}</div>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg">
                <div className="text-slate-500 text-xs">Questões</div>
                <div className="text-green-400">{user.questionsCompleted}</div>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg">
                <div className="text-slate-500 text-xs">XP Semanal</div>
                <div className="text-purple-400">{user.weeklyXP}</div>
              </div>
            </div>

            {/* Categoria Favorita */}
            <div className="mt-3 text-slate-400 text-sm flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>Favorito: {user.favoriteCategory}</span>
            </div>
          </button>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-slate-700 mx-auto mb-3" />
          <div className="text-slate-500">Nenhum jogador encontrado</div>
        </div>
      )}
    </div>
  );
}
