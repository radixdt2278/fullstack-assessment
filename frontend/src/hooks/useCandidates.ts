import { useState, useEffect } from 'react';
import { candidateService } from '../services/candidateService';
import type { Candidate } from '../types/candidate';
import type { CandidateFilters } from '../types/api';
import { DEFAULT_PER_PAGE } from '../constants/config';

export const useCandidates = (
  searchValue: string,
  currentPage: number,
  filters: CandidateFilters,
  sortBy: string = 'last_activity',
  sortOrder: string = 'desc'
) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await candidateService.getCandidates({
          page: currentPage,
          per_page: DEFAULT_PER_PAGE,
          search: searchValue || undefined,
          sort_by: sortBy,
          sort_order: sortOrder,
          application_type: filters.application_type.length > 0 ? filters.application_type : undefined,
          source: filters.source.length > 0 ? filters.source : undefined,
        });

        setCandidates(data.candidates);
        setTotal(data.total);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch candidates');
        console.error('Error fetching candidates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [currentPage, searchValue, sortBy, sortOrder, filters.application_type.join(','), filters.source.join(',')]);

  return { candidates, total, totalPages, loading, error };
};
