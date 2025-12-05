import { useState, useCallback } from 'react';
import type { CandidateFilters } from '../types/api';

export const useFilters = () => {
  const [filters, setFilters] = useState<CandidateFilters>({
    application_type: [],
    source: [],
  });

  const handleFilterChange = useCallback(
    (filterType: keyof CandidateFilters, value: string, checked: boolean) => {
      setFilters(prev => ({
        ...prev,
        [filterType]: checked
          ? [...prev[filterType], value]
          : prev[filterType].filter(v => v !== value)
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({
      application_type: [],
      source: [],
    });
  }, []);

  return { filters, handleFilterChange, resetFilters };
};
