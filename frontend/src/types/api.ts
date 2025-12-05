export interface CandidatesResponse {
  candidates: any[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface CandidateFilters {
  application_type: string[];
  source: string[];
}

export interface CandidateQueryParams {
  page: number;
  per_page: number;
  search?: string;
  sort_by?: string;
  sort_order?: string;
  application_type?: string[];
  source?: string[];
}
