import { ArrowLeft, Users, Search, UserPlus, Check, X, Clock, Trash2, MessageCircle } from 'lucide-react';
import { UserProfile } from '../App';
import { useState } from 'react';
import { mockFriends, mockIncomingRequests, mockOutgoingRequests, getMockUserData, Friend, FriendRequest } from '../data/friendsData';

type FriendsViewProps = {
  currentUser: UserProfile;
  onBack: () => void;
  onViewProfile: (username: string) => void;
};

type Tab = 'friends' | 'requests' | 'add';

export function FriendsView({ currentUser, onBack, onViewProfile }: FriendsViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [incomingRequests, setIncomingRequests] = useState<FriendRequest[]>(mockIncomingRequests);
  const [outgoingRequests, setOutgoingRequests] = useState<FriendRequest[]>(mockOutgoingRequests);
  const [searchResults, setSearchResults] = useState<Friend[]>([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    // Simula busca (em produção seria uma chamada ao backend)
    const results = [
      getMockUserData(searchQuery),
      getMockUserData(`${searchQuery}123`),
      getMockUserData(`Pro${searchQuery}`)
    ].filter(user => 
      !friends.some(f => f.username === user.username) &&
      user.username !== currentUser.username &&
      !outgoingRequests.some(req => req.to === user.username)
    );

    setSearchResults(results);
  };

  const handleSendRequest = (username: string) => {
    const newRequest: FriendRequest = {
      id: `req-${Date.now()}`,
      from: currentUser.username,
      to: username,
      sentAt: new Date().toISOString(),
      status: 'pending'
    };
    setOutgoingRequests([...outgoingRequests, newRequest]);
    setSearchResults(searchResults.filter(r => r.username !== username));
  };

  const handleAcceptRequest = (request: FriendRequest) => {
    const userData = getMockUserData(request.from);
    setFriends([...friends, userData]);
    setIncomingRequests(incomingRequests.filter(r => r.id !== request.id));
  };

  const handleRejectRequest = (requestId: string) => {
    setIncomingRequests(incomingRequests.filter(r => r.id !== requestId));
  };

  const handleCancelRequest = (requestId: string) => {
    setOutgoingRequests(outgoingRequests.filter(r => r.id !== requestId));
  };

  const handleRemoveFriend = (username: string) => {
    if (confirm(`Deseja remover ${username} da sua lista de amigos?`)) {
      setFriends(friends.filter(f => f.username !== username));
    }
  };

  const totalPendingRequests = incomingRequests.length;

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
            <Users className="w-6 h-6" />
            Amigos
          </h1>
          <div className="text-slate-500">{friends.length} amigos</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('friends')}
          className={`px-4 py-3 transition-colors relative ${
            activeTab === 'friends'
              ? 'text-white'
              : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          Meus Amigos ({friends.length})
          {activeTab === 'friends' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-3 transition-colors relative ${
            activeTab === 'requests'
              ? 'text-white'
              : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          Solicitações
          {totalPendingRequests > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {totalPendingRequests}
            </span>
          )}
          {activeTab === 'requests' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-3 transition-colors relative ${
            activeTab === 'add'
              ? 'text-white'
              : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          Adicionar Amigos
          {activeTab === 'add' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
          )}
        </button>
      </div>

      {/* Friends Tab */}
      {activeTab === 'friends' && (
        <div>
          {friends.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-700 mx-auto mb-3" />
              <div className="text-slate-500 mb-4">Você ainda não tem amigos</div>
              <button
                onClick={() => setActiveTab('add')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Adicionar Amigos
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {friends
                .sort((a, b) => {
                  // Online primeiro
                  if (a.isOnline && !b.isOnline) return -1;
                  if (!a.isOnline && b.isOnline) return 1;
                  return b.weeklyXP - a.weeklyXP;
                })
                .map((friend) => (
                  <div
                    key={friend.username}
                    className="bg-slate-800 p-4 rounded-xl hover:bg-slate-750 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar com status online */}
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">{friend.username[0]}</span>
                        </div>
                        <div
                          className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-slate-800 ${
                            friend.isOnline ? 'bg-green-500' : 'bg-slate-600'
                          }`}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <button
                            onClick={() => onViewProfile(friend.username)}
                            className="text-slate-200 hover:text-white transition-colors"
                          >
                            {friend.username}
                          </button>
                          <div className="flex gap-1">
                            {friend.badges.map((badge, i) => (
                              <span key={i} className="text-sm">{badge}</span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <span>Nível {friend.level}</span>
                          <span>•</span>
                          <span>{friend.weeklyXP} XP esta semana</span>
                          {!friend.isOnline && friend.lastSeen && (
                            <>
                              <span>•</span>
                              <span>{friend.lastSeen}</span>
                            </>
                          )}
                        </div>

                        <div className="text-xs text-slate-600 mt-1">
                          Amigos desde {new Date(friend.friendsSince).toLocaleDateString('pt-BR')}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                          title="Enviar mensagem"
                        >
                          <MessageCircle className="w-5 h-5 text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleRemoveFriend(friend.username)}
                          className="p-2 bg-slate-700 hover:bg-red-600 rounded-lg transition-colors"
                          title="Remover amigo"
                        >
                          <Trash2 className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Requests Tab */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          {/* Incoming Requests */}
          <div>
            <h3 className="text-slate-400 mb-3 flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Solicitações Recebidas ({incomingRequests.length})
            </h3>
            
            {incomingRequests.length === 0 ? (
              <div className="bg-slate-800 p-6 rounded-xl text-center text-slate-500">
                Nenhuma solicitação pendente
              </div>
            ) : (
              <div className="space-y-3">
                {incomingRequests.map((request) => {
                  const userData = getMockUserData(request.from);
                  return (
                    <div
                      key={request.id}
                      className="bg-slate-800 p-4 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-lg">{request.from[0]}</span>
                        </div>

                        <div className="flex-1">
                          <div className="text-slate-200 mb-1">{request.from}</div>
                          <div className="text-sm text-slate-500">
                            Nível {userData.level} • {userData.totalXP} XP
                          </div>
                          <div className="text-xs text-slate-600 mt-1">
                            Enviada {new Date(request.sentAt).toLocaleDateString('pt-BR')}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptRequest(request)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            Aceitar
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request.id)}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Recusar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Outgoing Requests */}
          <div>
            <h3 className="text-slate-400 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Solicitações Enviadas ({outgoingRequests.length})
            </h3>
            
            {outgoingRequests.length === 0 ? (
              <div className="bg-slate-800 p-6 rounded-xl text-center text-slate-500">
                Nenhuma solicitação enviada
              </div>
            ) : (
              <div className="space-y-3">
                {outgoingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-slate-800 p-4 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">{request.to[0]}</span>
                      </div>

                      <div className="flex-1">
                        <div className="text-slate-200 mb-1">{request.to}</div>
                        <div className="text-sm text-slate-500 flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          Aguardando resposta
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Enviada {new Date(request.sentAt).toLocaleDateString('pt-BR')}
                        </div>
                      </div>

                      <button
                        onClick={() => handleCancelRequest(request.id)}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Friends Tab */}
      {activeTab === 'add' && (
        <div>
          {/* Search Box */}
          <div className="bg-slate-800 p-4 rounded-xl mb-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Buscar por nome de usuário..."
                  className="w-full bg-slate-900 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Buscar
              </button>
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-slate-400 mb-3">Resultados da Busca</h3>
              {searchResults.map((user) => (
                <div
                  key={user.username}
                  className="bg-slate-800 p-4 rounded-xl hover:bg-slate-750 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">{user.username[0]}</span>
                    </div>

                    <div className="flex-1">
                      <div className="text-slate-200 mb-1">{user.username}</div>
                      <div className="text-sm text-slate-500">
                        Nível {user.level} • {user.totalXP} XP Total
                      </div>
                    </div>

                    <button
                      onClick={() => handleSendRequest(user.username)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery && searchResults.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-slate-700 mx-auto mb-3" />
              <div className="text-slate-500">
                {searchQuery ? 'Nenhum usuário encontrado' : 'Use a busca para encontrar amigos'}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <UserPlus className="w-16 h-16 text-slate-700 mx-auto mb-3" />
              <div className="text-slate-500">
                Digite o nome de usuário para buscar amigos
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}