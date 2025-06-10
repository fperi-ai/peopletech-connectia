import { DEMO_USERS } from '../constants';
import { PeriodType } from '../components/challenges/sidebar/hooks/usePeriod';
import { UserWithRankAndPoints } from '../components/challenges/sidebar/PodiumCard';

// Generador de números aleatorios pero consistentes para un identificador y periodo
const consistentRandomForUser = (userId: string, periodSeed: string): number => {
  // Crear una cadena combinando userId y periodo para tener un hash consistente
  const combined = `${userId}-${periodSeed}`;
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) - hash) + combined.charCodeAt(i);
    hash |= 0; // Convertir a entero de 32 bits
  }
  // Normalizar a un valor entre 0 y 1
  const random = Math.abs(hash) / 2147483647;
  return random;
};

// Estructura de datos para el leaderboard
interface LeaderboardData {
  top3: UserWithRankAndPoints[];
  yourRank: UserWithRankAndPoints | null;
}

/**
 * Simulates fetching leaderboard data based on the selected period
 */
export const getLeaderboard = async (period: PeriodType, currentUserId?: string): Promise<LeaderboardData> => {
  // Simulate network delay (under 200ms per requirement)
  await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 150) + 50));
  
  // Generate consistent points for each user based on their ID and the selected period
  const periodSeed = period === 'week' ? 'week-2025-23' : period === 'month' ? 'month-2025-06' : 'all-time';
  
  // Create a sorted list of users with points
  const usersWithPoints: UserWithRankAndPoints[] = DEMO_USERS.map(user => {
    // Generar puntos consistentes basados en el ID de usuario y periodo
    const random = consistentRandomForUser(user.id, periodSeed);
    const points = Math.floor(random * 1000) + (period === 'week' ? 0 : (period === 'month' ? 200 : 500));
    
    return {
      ...user,
      points,
      rank: 0 // Will be assigned after sorting
    };
  }).sort((a, b) => b.points - a.points);
  
  // Assign ranks
  usersWithPoints.forEach((user, index) => {
    user.rank = index + 1;
  });
  
  // Get top 3 users
  const top3 = usersWithPoints.slice(0, 3);
  
  // Find current user's rank
  const yourRank = currentUserId ? 
    usersWithPoints.find(user => user.id === currentUserId) || null : 
    usersWithPoints[Math.floor(Math.random() * 5) + 3]; // Random user between 4-8 for demo
  
  return {
    top3,
    yourRank
  };
};
