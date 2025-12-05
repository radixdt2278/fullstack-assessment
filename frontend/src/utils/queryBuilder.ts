import type { CandidateQueryParams } from '../types/api';

export const buildQueryString = (params: CandidateQueryParams): string => {
  const urlParams = new URLSearchParams({
    page: params.page.toString(),
    per_page: params.per_page.toString(),
  });

  if (params.search) {
    urlParams.append('search', params.search);
  }

  if (params.sort_by) {
    urlParams.append('sort_by', params.sort_by);
  }

  if (params.sort_order) {
    urlParams.append('sort_order', params.sort_order);
  }

  params.application_type?.forEach(type => {
    urlParams.append('application_type', type);
  });

  params.source?.forEach(src => {
    urlParams.append('source', src);
  });

  return urlParams.toString();
};
