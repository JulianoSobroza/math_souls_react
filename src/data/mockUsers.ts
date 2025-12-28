import { UserProfile } from '../App';

// Mock de usuários da comunidade
export const mockUsers: UserProfile[] = [
  {
    username: 'MathGenius',
    totalXP: 4850,
    level: 24,
    timeSpent: 1240,
    questionsCompleted: 187,
    favoriteCategory: 'Álgebra',
    weeklyXP: 2450,
    badges: ['🥇', '👑', '⚡'],
    achievements: [
      { id: '1', name: 'Mestre da Álgebra', description: 'Complete 100 questões de álgebra', icon: '📐', unlockedAt: '2025-11-20' },
      { id: '2', name: 'Velocista', description: 'Resolva 10 questões em menos de 1 hora', icon: '⚡', unlockedAt: '2025-11-25' },
      { id: '3', name: 'Top 1 Semanal', description: 'Fique em 1º lugar no ranking semanal', icon: '👑', unlockedAt: '2025-12-01' },
      { id: '4', name: 'Perfeccionista', description: 'Acerte 50 questões seguidas', icon: '💯', unlockedAt: '2025-12-05' }
    ],
    categoryStats: [
      { categoryId: 'algebra', categoryName: 'Álgebra', questionsCompleted: 78, xpEarned: 2340 },
      { categoryId: 'geometria', categoryName: 'Geometria', questionsCompleted: 52, xpEarned: 1560 },
      { categoryId: 'trigonometria', categoryName: 'Trigonometria', questionsCompleted: 38, xpEarned: 710 },
      { categoryId: 'aritmetica', categoryName: 'Aritmética', questionsCompleted: 19, xpEarned: 240 }
    ],
    joinedDate: '2025-09-10'
  },
  {
    username: 'AlgebraKing',
    totalXP: 4120,
    level: 21,
    timeSpent: 980,
    questionsCompleted: 156,
    favoriteCategory: 'Álgebra',
    weeklyXP: 2180,
    badges: ['🥈', '📐'],
    achievements: [
      { id: '1', name: 'Mestre da Álgebra', description: 'Complete 100 questões de álgebra', icon: '📐', unlockedAt: '2025-10-15' },
      { id: '2', name: 'Top 3 Semanal', description: 'Fique no Top 3 do ranking semanal', icon: '🥈', unlockedAt: '2025-12-08' },
      { id: '3', name: 'Manuscrito Gold', description: 'Tenha 100 manuscritos validados', icon: '✍️', unlockedAt: '2025-11-30' }
    ],
    categoryStats: [
      { categoryId: 'algebra', categoryName: 'Álgebra', questionsCompleted: 92, xpEarned: 2760 },
      { categoryId: 'geometria', categoryName: 'Geometria', questionsCompleted: 34, xpEarned: 820 },
      { categoryId: 'trigonometria', categoryName: 'Trigonometria', questionsCompleted: 22, xpEarned: 440 },
      { categoryId: 'aritmetica', categoryName: 'Aritmética', questionsCompleted: 8, xpEarned: 100 }
    ],
    joinedDate: '2025-10-01'
  },
  {
    username: 'GeometriaPro',
    totalXP: 3820,
    level: 19,
    timeSpent: 875,
    questionsCompleted: 142,
    favoriteCategory: 'Geometria',
    weeklyXP: 1920,
    badges: ['🥉', '📏'],
    achievements: [
      { id: '1', name: 'Rei da Geometria', description: 'Complete 100 questões de geometria', icon: '📏', unlockedAt: '2025-11-18' },
      { id: '2', name: 'Veterano', description: 'Jogue por 90 dias consecutivos', icon: '🔥', unlockedAt: '2025-12-01' },
      { id: '3', name: 'Top 3 Semanal', description: 'Fique no Top 3 do ranking semanal', icon: '🥉', unlockedAt: '2025-12-08' }
    ],
    categoryStats: [
      { categoryId: 'geometria', categoryName: 'Geometria', questionsCompleted: 88, xpEarned: 2640 },
      { categoryId: 'algebra', categoryName: 'Álgebra', questionsCompleted: 31, xpEarned: 780 },
      { categoryId: 'trigonometria', categoryName: 'Trigonometria', questionsCompleted: 18, xpEarned: 320 },
      { categoryId: 'aritmetica', categoryName: 'Aritmética', questionsCompleted: 5, xpEarned: 80 }
    ],
    joinedDate: '2025-09-15'
  },
  {
    username: 'TrigMaster',
    totalXP: 3450,
    level: 17,
    timeSpent: 720,
    questionsCompleted: 118,
    favoriteCategory: 'Trigonometria',
    weeklyXP: 1650,
    badges: ['📊', '🎯'],
    achievements: [
      { id: '1', name: 'Mestre da Trigonometria', description: 'Complete 80 questões de trigonometria', icon: '📊', unlockedAt: '2025-11-22' },
      { id: '2', name: 'Primeira Vitória', description: 'Complete sua primeira questão', icon: '🎯', unlockedAt: '2025-10-05' },
      { id: '3', name: 'Sem Erros', description: 'Complete 20 questões sem errar', icon: '💎', unlockedAt: '2025-11-10' }
    ],
    categoryStats: [
      { categoryId: 'trigonometria', categoryName: 'Trigonometria', questionsCompleted: 74, xpEarned: 2220 },
      { categoryId: 'algebra', categoryName: 'Álgebra', questionsCompleted: 26, xpEarned: 780 },
      { categoryId: 'geometria', categoryName: 'Geometria', questionsCompleted: 14, xpEarned: 350 },
      { categoryId: 'aritmetica', categoryName: 'Aritmética', questionsCompleted: 4, xpEarned: 100 }
    ],
    joinedDate: '2025-10-05'
  },
  {
    username: 'CalculusLord',
    totalXP: 3280,
    level: 16,
    timeSpent: 650,
    questionsCompleted: 102,
    favoriteCategory: 'Álgebra',
    weeklyXP: 1480,
    badges: ['🎓'],
    achievements: [
      { id: '1', name: 'Estudante Dedicado', description: 'Estude por 10 horas', icon: '🎓', unlockedAt: '2025-11-15' },
      { id: '2', name: 'Centenário', description: 'Complete 100 questões', icon: '💯', unlockedAt: '2025-12-01' }
    ],
    categoryStats: [
      { categoryId: 'algebra', categoryName: 'Álgebra', questionsCompleted: 58, xpEarned: 1740 },
      { categoryId: 'geometria', categoryName: 'Geometria', questionsCompleted: 28, xpEarned: 840 },
      { categoryId: 'trigonometria', categoryName: 'Trigonometria', questionsCompleted: 12, xpEarned: 480 },
      { categoryId: 'aritmetica', categoryName: 'Aritmética', questionsCompleted: 4, xpEarned: 220 }
    ],
    joinedDate: '2025-10-20'
  },
  {
    username: 'NumberTheory',
    totalXP: 2980,
    level: 15,
    timeSpent: 580,
    questionsCompleted: 94,
    favoriteCategory: 'Aritmética',
    weeklyXP: 1320,
    badges: ['🔢'],
    achievements: [
      { id: '1', name: 'Mestre da Aritmética', description: 'Complete 60 questões de aritmética', icon: '🔢', unlockedAt: '2025-11-28' },
      { id: '2', name: 'Primeira Vitória', description: 'Complete sua primeira questão', icon: '🎯', unlockedAt: '2025-10-22' }
    ],
    categoryStats: [
      { categoryId: 'aritmetica', categoryName: 'Aritmética', questionsCompleted: 62, xpEarned: 1860 },
      { categoryId: 'algebra', categoryName: 'Álgebra', questionsCompleted: 20, xpEarned: 600 },
      { categoryId: 'geometria', categoryName: 'Geometria', questionsCompleted: 10, xpEarned: 400 },
      { categoryId: 'trigonometria', categoryName: 'Trigonometria', questionsCompleted: 2, xpEarned: 120 }
    ],
    joinedDate: '2025-10-22'
  }
];

export function getUserByUsername(username: string): UserProfile | undefined {
  return mockUsers.find(u => u.username === username);
}
