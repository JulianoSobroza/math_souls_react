import { useState } from 'react';
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
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: 'Jogador',
    totalXP: 1250,
    level: 8,
    timeSpent: 345,
    questionsCompleted: 42,
    favoriteCategory: 'Álgebra',
    weeklyXP: 380,
    badges: ['🥉'],
    achievements: [
      {
        id: 'first-win',
        name: 'Primeira Vitória',
        description: 'Complete sua primeira questão',
        icon: '🎯',
        unlockedAt: '2025-12-01'
      },
      {
        id: 'manuscript-master',
        name: 'Mestre do Manuscrito',
        description: 'Valide 10 resoluções manuscritas',
        icon: '✍️',
        unlockedAt: '2025-12-05'
      }
    ],
    categoryStats: [
      { categoryId: 'algebra', categoryName: 'Álgebra', questionsCompleted: 18, xpEarned: 650 },
      { categoryId: 'geometria', categoryName: 'Geometria', questionsCompleted: 12, xpEarned: 380 },
      { categoryId: 'trigonometria', categoryName: 'Trigonometria', questionsCompleted: 8, xpEarned: 150 },
      { categoryId: 'aritmetica', categoryName: 'Aritmética', questionsCompleted: 4, xpEarned: 70 }
    ],
    joinedDate: '2025-11-15'
  });

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setUserProfile(prev => ({ ...prev, username }));
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