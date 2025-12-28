export type FriendRequest = {
  id: string;
  from: string;
  to: string;
  sentAt: string;
  status: 'pending' | 'accepted' | 'rejected';
};

export type Friend = {
  username: string;
  level: number;
  totalXP: number;
  weeklyXP: number;
  isOnline: boolean;
  lastSeen?: string;
  friendsSince: string;
  badges: string[];
};

// Mock data de amigos
export const mockFriends: Friend[] = [
  {
    username: 'MathWizard',
    level: 12,
    totalXP: 2850,
    weeklyXP: 520,
    isOnline: true,
    friendsSince: '2025-11-20',
    badges: ['🥇', '🔥']
  },
  {
    username: 'AlgebraQueen',
    level: 10,
    totalXP: 2100,
    weeklyXP: 340,
    isOnline: true,
    friendsSince: '2025-11-25',
    badges: ['🥈']
  },
  {
    username: 'GeometryKing',
    level: 9,
    totalXP: 1900,
    weeklyXP: 280,
    isOnline: false,
    lastSeen: '2 horas atrás',
    friendsSince: '2025-12-01',
    badges: ['🥉']
  },
  {
    username: 'TrigMaster',
    level: 11,
    totalXP: 2400,
    weeklyXP: 410,
    isOnline: false,
    lastSeen: '1 dia atrás',
    friendsSince: '2025-11-18',
    badges: ['🥈', '✍️']
  },
  {
    username: 'NumberNinja',
    level: 7,
    totalXP: 1400,
    weeklyXP: 180,
    isOnline: false,
    lastSeen: '3 horas atrás',
    friendsSince: '2025-12-05',
    badges: ['🥉']
  }
];

// Mock data de solicitações recebidas
export const mockIncomingRequests: FriendRequest[] = [
  {
    id: 'req-1',
    from: 'CalculusHero',
    to: 'Jogador',
    sentAt: '2025-12-12T10:30:00',
    status: 'pending'
  },
  {
    id: 'req-2',
    from: 'ProblemSolver99',
    to: 'Jogador',
    sentAt: '2025-12-11T15:20:00',
    status: 'pending'
  },
  {
    id: 'req-3',
    from: 'MathGenius',
    to: 'Jogador',
    sentAt: '2025-12-10T09:45:00',
    status: 'pending'
  }
];

// Mock data de solicitações enviadas
export const mockOutgoingRequests: FriendRequest[] = [
  {
    id: 'req-4',
    from: 'Jogador',
    to: 'EquationExpert',
    sentAt: '2025-12-11T14:00:00',
    status: 'pending'
  },
  {
    id: 'req-5',
    from: 'Jogador',
    to: 'FormulaFanatic',
    sentAt: '2025-12-09T11:30:00',
    status: 'pending'
  }
];

// Função helper para obter dados mock de um usuário
export function getMockUserData(username: string): Friend {
  const existing = mockFriends.find(f => f.username === username);
  if (existing) return existing;
  
  // Gera dados aleatórios se o usuário não existe nos mocks
  return {
    username,
    level: Math.floor(Math.random() * 15) + 1,
    totalXP: Math.floor(Math.random() * 3000) + 500,
    weeklyXP: Math.floor(Math.random() * 500) + 50,
    isOnline: Math.random() > 0.7,
    lastSeen: Math.random() > 0.5 ? `${Math.floor(Math.random() * 24)} horas atrás` : undefined,
    friendsSince: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    badges: ['🥉']
  };
}
