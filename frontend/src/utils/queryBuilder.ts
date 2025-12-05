import type { CandidateQueryParams } from '../types/api';

export const buildQueryString = (params: CandidateQueryParams): string => {
  const urlParams = new URLSearchParams({
    page: params.page.toString(),
    per_page: params.per_page.toString(),
  });

  if (params.search) {
    urlParams.append('search', params.search);
  }

  params.application_type?.forEach(type => {
    urlParams.append('application_type', type);
  });

  params.source?.forEach(src => {
    urlParams.append('source', src);
  });

  return urlParams.toString();
};
