import { apiClient } from './api';
import { API_ENDPOINTS } from '../constants/config';
import type { CandidatesResponse, CandidateQueryParams } from '../types/api';
import { buildQueryString } from '../utils/queryBuilder';

export const candidateService = {
  async getCandidates(params: CandidateQueryParams): Promise<CandidatesResponse> {
    const queryString = buildQueryString(params);
    return apiClient.get<CandidatesResponse>(API_ENDPOINTS.CANDIDATES, queryString);
  },
};
