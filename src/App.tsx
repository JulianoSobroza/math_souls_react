import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { CategoryView } from './components/CategoryView';
import { QuestionView } from './components/QuestionView';
import { ProfileView } from './components/ProfileView';
import { RankingView } from './components/RankingView';
import { CommunityView } from './components/CommunityView';
import { PublicProfileView } from './components/PublicProfileView';
import { AchievementsView } from './components/AchievementsView';
import { FriendsView } from './components/FriendsView';
import { AuthView } from './components/AuthView';
import { apiService } from './services/api';

export type Category = {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
};

export type Subcategory = {
  id: string;
  name: string;
  description: string;
  questionCount: number;
};

export type Question = {
  id: string;
  name: string;
  description: string;
  image?: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  xp: number;
  options: string[];
  correctAnswer: number;
  categoryId: string;
  subcategoryId: string;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
};

export type CategoryStat = {
  categoryId: string;
  categoryName: string;
  questionsCompleted: number;
  xpEarned: number;
};

export type UserProfile = {
  username: string;
  totalXP: number;
  level: number;
  timeSpent: number; // em minutos
  questionsCompleted: number;
  favoriteCategory: string;
  weeklyXP: number;
  badges: string[];
  achievements: Achievement[];
  categoryStats: CategoryStat[];
  joinedDate: string;
};

export type Screen = 
  | { type: 'home' }
  | { type: 'category'; categoryId: string }
  | { type: 'question'; question: Question }
  | { type: 'profile' }
  | { type: 'ranking' }
  | { type: 'community' }
  | { type: 'publicProfile'; username: string }
  | { type: 'achievements' }
  | { type: 'friends' }
  | { type: 'auth' };

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [screen, setScreen] = useState<Screen>({ type: 'home' });
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: 'Indisponível',
    totalXP: 0,
    level: 0,
    timeSpent: 0,
    questionsCompleted: 0,
    favoriteCategory: 'Indisponível',
    weeklyXP: 0,
    badges: [],
    achievements: [],
    categoryStats: [],
    joinedDate: new Date().toISOString().split('T')[0]
  });

  // Carregar dados do usuário após autenticação
  useEffect(() => {
    if (isAuthenticated) {
      loadUserData();
    }
  }, [isAuthenticated]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      // Buscar dados do usuário
      const user = await apiService.getCurrentUser();
      const stats = await apiService.getCurrentUserStats();

      if (user && stats) {
        // Encontrar categoria com mais XP
        let favoriteCategory = 'Indisponível';
        if (stats.categories_stats && Object.keys(stats.categories_stats).length > 0) {
          const categories = Object.entries(stats.categories_stats);
          if (categories.length > 0) {
            const topCategory = categories.reduce((prev, current) => {
              const prevXp = (prev[1] as any)?.xp_earned || 0;
              const currentXp = (current[1] as any)?.xp_earned || 0;
              return currentXp > prevXp ? current : prev;
            });
            favoriteCategory = topCategory[0];
          }
        }

        setUserProfile({
          username: user.name || 'Indisponível',
          totalXP: stats.total_xp || 0,
          level: stats.level || 0,
          timeSpent: stats.time_spent_minutes || 0,
          questionsCompleted: stats.submissions_count || 0,
          favoriteCategory: favoriteCategory,
          weeklyXP: stats.xp || 0, // XP da semana (xp current)
          badges: [],
          achievements: [],
          categoryStats: Object.entries(stats.categories_stats || {}).map(([name, data]: any) => ({
            categoryId: name.toLowerCase(),
            categoryName: name,
            questionsCompleted: data.submissions || 0,
            xpEarned: data.xp_earned || 0
          })),
          joinedDate: user.created_at?.split('T')[0] || new Date().toISOString().split('T')[0]
        });
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AuthView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {screen.type === 'home' && (
        <Home 
          onNavigate={setScreen}
          userProfile={userProfile}
        />
      )}
      
      {screen.type === 'category' && (
        <CategoryView
          categoryId={screen.categoryId}
          onBack={() => setScreen({ type: 'home' })}
          onSelectQuestion={(question) => setScreen({ type: 'question', question })}
        />
      )}
      
      {screen.type === 'question' && (
        <QuestionView
          question={screen.question}
          onBack={() => setScreen({ type: 'home' })}
          onComplete={(xpGained, timeSpent) => {
            setUserProfile(prev => ({
              ...prev,
              totalXP: prev.totalXP + xpGained,
              weeklyXP: prev.weeklyXP + xpGained,
              timeSpent: prev.timeSpent + timeSpent,
              questionsCompleted: prev.questionsCompleted + 1,
              level: Math.floor((prev.totalXP + xpGained) / 200) + 1
            }));
            setScreen({ type: 'home' });
          }}
        />
      )}
      
      {screen.type === 'profile' && (
        <ProfileView
          userProfile={userProfile}
          onBack={() => setScreen({ type: 'home' })}
          onNavigateToAchievements={() => setScreen({ type: 'achievements' })}
          onLogout={() => setIsAuthenticated(false)}
        />
      )}
      
      {screen.type === 'ranking' && (
        <RankingView
          currentUser={userProfile}
          onBack={() => setScreen({ type: 'home' })}
          onViewProfile={(username) => setScreen({ type: 'publicProfile', username })}
        />
      )}
      
      {screen.type === 'community' && (
        <CommunityView
          currentUser={userProfile}
          onBack={() => setScreen({ type: 'home' })}
          onViewProfile={(username) => setScreen({ type: 'publicProfile', username })}
        />
      )}
      
      {screen.type === 'publicProfile' && (
        <PublicProfileView
          username={screen.username}
          currentUser={userProfile}
          onBack={() => setScreen({ type: 'community' })}
        />
      )}
      
      {screen.type === 'achievements' && (
        <AchievementsView
          currentUser={userProfile}
          onBack={() => setScreen({ type: 'home' })}
        />
      )}
      
      {screen.type === 'friends' && (
        <FriendsView
          currentUser={userProfile}
          onBack={() => setScreen({ type: 'home' })}
          onViewProfile={(username) => setScreen({ type: 'publicProfile', username })}
        />
      )}
    </div>
  );
}

export default App;