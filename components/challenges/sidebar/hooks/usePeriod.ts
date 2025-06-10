import { useState } from 'react';

export type PeriodType = 'week' | 'month' | 'all';

// Para compatibilidad con nuestro código existente
export const ALL_TIME_PERIOD: PeriodType = 'all';

/**
 * Hook to manage leaderboard period selection
 */
export const usePeriod = () => {
  const [period, setPeriod] = useState<PeriodType>('week');
  return { period, setPeriod };
};
