import React from 'react';
import { PeriodType } from './hooks/usePeriod';

interface LeaderboardPeriodSelectProps {
  period: PeriodType;
  setPeriod: (period: PeriodType) => void;
}

export const LeaderboardPeriodSelect: React.FC<LeaderboardPeriodSelectProps> = ({ 
  period, 
  setPeriod 
}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor="period-select" 
        className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1"
      >
        Periodo
      </label>
      <select
        id="period-select"
        value={period}
        onChange={(e) => setPeriod(e.target.value as PeriodType)}
        className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
          text-sm py-1.5 px-3 text-gray-800 dark:text-gray-200 focus:outline-none 
          focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 transition-colors"
        aria-label="Seleccionar periodo para el leaderboard"
      >
        <option value="week">Semanal</option>
        <option value="month">Mensual</option>
        <option value="all">Todo el tiempo</option>
      </select>
    </div>
  );
};
