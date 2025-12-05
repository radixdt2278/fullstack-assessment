import { useEffect, useCallback } from 'react';
import type { CandidateFilters } from '../types/api';


export const useUrlState = (
  page: number,
  search: string,
  filters: CandidateFilters,
  setPage: (page: number) => void,
  setSearch: (search: string) => void,
  setFilters: (filters: CandidateFilters) => void
) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    const urlPage = params.get('page');
    const urlSearch = params.get('search');
    const urlAppTypes = params.getAll('application_type');
    const urlSources = params.getAll('source');

    if (urlPage) setPage(parseInt(urlPage));
    if (urlSearch) setSearch(urlSearch);
    if (urlAppTypes.length > 0 || urlSources.length > 0) {
      setFilters({
        application_type: urlAppTypes,
        source: urlSources,
      });
    }
  }, []);

  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    
    if (page > 1) params.set('page', page.toString());
    if (search) params.set('search', search);
    
    filters.application_type.forEach(type => params.append('application_type', type));
    filters.source.forEach(src => params.append('source', src));

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [page, search, filters]);

  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  return { updateUrl };
};
