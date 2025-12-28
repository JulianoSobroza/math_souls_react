export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export type AchievementDefinition = {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: AchievementTier;
  rarity: number; // % de jogadores que têm (0-100)
  isSecret?: boolean;
  requirement: string;
  category: 'progress' | 'skill' | 'dedication' | 'special';
  maxProgress?: number; // para conquistas com progresso (ex: resolver 100 questões)
};

export const achievementsData: AchievementDefinition[] = [
  // Progress Achievements
  {
    id: 'first-win',
    name: 'Primeira Vitória',
    description: 'Complete sua primeira questão',
    icon: '🎯',
    tier: 'bronze',
    rarity: 98.5,
    requirement: 'Complete 1 questão',
    category: 'progress',
    maxProgress: 1
  },
  {
    id: 'getting-started',
    name: 'Iniciante',
    description: 'Complete 10 questões',
    icon: '📚',
    tier: 'bronze',
    rarity: 87.3,
    requirement: 'Complete 10 questões',
    category: 'progress',
    maxProgress: 10
  },
  {
    id: 'dedicated-solver',
    name: 'Resolvedor Dedicado',
    description: 'Complete 50 questões',
    icon: '🎓',
    tier: 'silver',
    rarity: 45.2,
    requirement: 'Complete 50 questões',
    category: 'progress',
    maxProgress: 50
  },
  {
    id: 'centenarian',
    name: 'Centenário',
    description: 'Complete 100 questões',
    icon: '💯',
    tier: 'gold',
    rarity: 23.8,
    requirement: 'Complete 100 questões',
    category: 'progress',
    maxProgress: 100
  },
  {
    id: 'master-solver',
    name: 'Mestre Solucionador',
    description: 'Complete 500 questões',
    icon: '👑',
    tier: 'platinum',
    rarity: 4.1,
    requirement: 'Complete 500 questões',
    category: 'progress',
    maxProgress: 500
  },

  // Skill Achievements
  {
    id: 'perfectionist',
    name: 'Perfeccionista',
    description: 'Acerte 50 questões consecutivas',
    icon: '💎',
    tier: 'gold',
    rarity: 12.5,
    requirement: 'Acerte 50 questões seguidas',
    category: 'skill',
    maxProgress: 50
  },
  {
    id: 'no-mistakes',
    name: 'Impecável',
    description: 'Acerte 20 questões sem errar',
    icon: '✨',
    tier: 'silver',
    rarity: 34.6,
    requirement: 'Acerte 20 questões consecutivas',
    category: 'skill',
    maxProgress: 20
  },
  {
    id: 'speedster',
    name: 'Velocista',
    description: 'Resolva 10 questões em menos de 1 hora',
    icon: '⚡',
    tier: 'silver',
    rarity: 28.9,
    requirement: 'Complete 10 questões em até 60 minutos',
    category: 'skill'
  },
  {
    id: 'speed-demon',
    name: 'Demônio da Velocidade',
    description: 'Resolva uma questão difícil em menos de 2 minutos',
    icon: '🔥',
    tier: 'gold',
    rarity: 8.3,
    requirement: 'Complete questão difícil em < 2min',
    category: 'skill'
  },

  // Manuscript Achievements
  {
    id: 'manuscript-master',
    name: 'Mestre do Manuscrito',
    description: 'Valide 10 resoluções manuscritas',
    icon: '✍️',
    tier: 'bronze',
    rarity: 62.4,
    requirement: 'Valide 10 manuscritos pela IA',
    category: 'skill',
    maxProgress: 10
  },
  {
    id: 'manuscript-legend',
    name: 'Lenda do Manuscrito',
    description: 'Valide 100 resoluções manuscritas',
    icon: '📝',
    tier: 'gold',
    rarity: 15.7,
    requirement: 'Valide 100 manuscritos pela IA',
    category: 'skill',
    maxProgress: 100
  },
  {
    id: 'manuscript-god',
    name: 'Deus do Manuscrito',
    description: 'Valide 500 resoluções manuscritas',
    icon: '🖊️',
    tier: 'platinum',
    rarity: 2.1,
    requirement: 'Valide 500 manuscritos pela IA',
    category: 'dedication',
    maxProgress: 500
  },

  // Category Masters
  {
    id: 'algebra-master',
    name: 'Mestre da Álgebra',
    description: 'Complete 100 questões de álgebra',
    icon: '📐',
    tier: 'gold',
    rarity: 19.4,
    requirement: 'Complete 100 questões de Álgebra',
    category: 'progress',
    maxProgress: 100
  },
  {
    id: 'geometry-master',
    name: 'Rei da Geometria',
    description: 'Complete 100 questões de geometria',
    icon: '📏',
    tier: 'gold',
    rarity: 17.8,
    requirement: 'Complete 100 questões de Geometria',
    category: 'progress',
    maxProgress: 100
  },
  {
    id: 'trig-master',
    name: 'Mestre da Trigonometria',
    description: 'Complete 80 questões de trigonometria',
    icon: '📊',
    tier: 'gold',
    rarity: 14.2,
    requirement: 'Complete 80 questões de Trigonometria',
    category: 'progress',
    maxProgress: 80
  },
  {
    id: 'arithmetic-master',
    name: 'Mestre da Aritmética',
    description: 'Complete 60 questões de aritmética',
    icon: '🔢',
    tier: 'silver',
    rarity: 31.5,
    requirement: 'Complete 60 questões de Aritmética',
    category: 'progress',
    maxProgress: 60
  },

  // Dedication Achievements
  {
    id: 'weekend-warrior',
    name: 'Guerreiro de Fim de Semana',
    description: 'Ganhe 1000 XP em um final de semana',
    icon: '🎮',
    tier: 'silver',
    rarity: 22.1,
    requirement: 'Ganhe 1000 XP no sábado ou domingo',
    category: 'dedication'
  },
  {
    id: 'marathon-runner',
    name: 'Maratonista',
    description: 'Estude por 10 horas',
    icon: '🏃',
    tier: 'silver',
    rarity: 38.7,
    requirement: 'Acumule 10 horas de estudo',
    category: 'dedication'
  },
  {
    id: 'veteran',
    name: 'Veterano',
    description: 'Jogue por 90 dias consecutivos',
    icon: '🔥',
    tier: 'platinum',
    rarity: 5.3,
    requirement: 'Acesse a plataforma por 90 dias seguidos',
    category: 'dedication'
  },
  {
    id: 'early-bird',
    name: 'Madrugador',
    description: 'Resolva 10 questões antes das 7h da manhã',
    icon: '🌅',
    tier: 'bronze',
    rarity: 18.9,
    requirement: 'Complete 10 questões antes das 7h',
    category: 'special',
    maxProgress: 10
  },
  {
    id: 'night-owl',
    name: 'Coruja da Noite',
    description: 'Resolva 10 questões depois das 23h',
    icon: '🦉',
    tier: 'bronze',
    rarity: 42.3,
    requirement: 'Complete 10 questões após às 23h',
    category: 'special',
    maxProgress: 10
  },

  // Ranking Achievements
  {
    id: 'top-3-weekly',
    name: 'Top 3 Semanal',
    description: 'Fique no Top 3 do ranking semanal',
    icon: '🥉',
    tier: 'silver',
    rarity: 8.7,
    requirement: 'Termine a semana no Top 3',
    category: 'skill'
  },
  {
    id: 'weekly-champion',
    name: 'Campeão Semanal',
    description: 'Fique em 1º lugar no ranking semanal',
    icon: '🏆',
    tier: 'gold',
    rarity: 2.9,
    requirement: 'Termine a semana em 1º lugar',
    category: 'skill'
  },
  {
    id: 'three-time-champion',
    name: 'Tricampeão',
    description: 'Ganhe o ranking semanal 3 vezes',
    icon: '👑',
    tier: 'platinum',
    rarity: 0.8,
    requirement: 'Seja campeão semanal 3 vezes',
    category: 'skill',
    maxProgress: 3
  },

  // Special/Secret Achievements
  {
    id: 'secret-explorer',
    name: '???',
    description: 'Uma conquista misteriosa aguarda...',
    icon: '❓',
    tier: 'gold',
    rarity: 3.2,
    isSecret: true,
    requirement: 'Complete todas as questões de todas as categorias',
    category: 'special'
  },
  {
    id: 'lucky-seven',
    name: 'Sorte Grande',
    description: 'Resolva exatamente 777 questões',
    icon: '🎰',
    tier: 'platinum',
    rarity: 1.1,
    isSecret: true,
    requirement: 'Complete exatamente 777 questões',
    category: 'special'
  },
  {
    id: 'christmas-solver',
    name: 'Espírito Natalino',
    description: 'Resolva 25 questões no dia 25 de dezembro',
    icon: '🎄',
    tier: 'silver',
    rarity: 6.4,
    isSecret: true,
    requirement: 'Complete 25 questões no Natal',
    category: 'special'
  }
];

export function getTierColor(tier: AchievementTier): string {
  switch (tier) {
    case 'bronze': return 'from-orange-700 to-orange-900';
    case 'silver': return 'from-slate-400 to-slate-600';
    case 'gold': return 'from-yellow-400 to-yellow-600';
    case 'platinum': return 'from-cyan-400 to-blue-600';
  }
}

export function getTierName(tier: AchievementTier): string {
  switch (tier) {
    case 'bronze': return 'Bronze';
    case 'silver': return 'Prata';
    case 'gold': return 'Ouro';
    case 'platinum': return 'Platina';
  }
}

export function getRarityLabel(rarity: number): string {
  if (rarity >= 80) return 'Comum';
  if (rarity >= 50) return 'Incomum';
  if (rarity >= 20) return 'Raro';
  if (rarity >= 5) return 'Muito Raro';
  return 'Ultra Raro';
}

export function getRarityColor(rarity: number): string {
  if (rarity >= 80) return 'text-slate-400';
  if (rarity >= 50) return 'text-green-400';
  if (rarity >= 20) return 'text-blue-400';
  if (rarity >= 5) return 'text-purple-400';
  return 'text-yellow-400';
}
