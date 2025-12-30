const API_BASE_URL = 'http://localhost:8000';

export interface UserData {
  id: number;
  email: string;
  name: string;
  picture_url: string | null;
  bio: string | null;
  level: number;
  xp: number;
  total_xp: number;
  time_spent_minutes: number;
  manuscript_count: number;
  is_active: boolean;
  created_at: string;
}

export interface UserStats {
  user_id: number;
  email: string;
  name: string;
  level: number;
  xp: number;
  total_xp: number;
  time_spent_minutes: number;
  manuscript_count: number;
  submissions_count: number;
  correct_answers: number;
  accuracy: number;
  categories_stats: Record<string, any>;
}

class APIService {
  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private getAuthHeader(): HeadersInit {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  async getCurrentUser(): Promise<UserData | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'GET',
        headers: this.getAuthHeader(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('access_token');
          return null;
        }
        throw new Error('Failed to fetch user');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }

  async getCurrentUserStats(): Promise<UserStats | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me/stats`, {
        method: 'GET',
        headers: this.getAuthHeader(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('access_token');
          return null;
        }
        throw new Error('Failed to fetch user stats');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return null;
    }
  }

  async getWeeklyRanking(limit: number = 10): Promise<any | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/rankings/weekly?limit=${limit}`, {
        method: 'GET',
        headers: this.getAuthHeader(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('access_token');
          return null;
        }
        throw new Error('Failed to fetch weekly ranking');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching weekly ranking:', error);
      return null;
    }
  }
}

export const apiService = new APIService();
