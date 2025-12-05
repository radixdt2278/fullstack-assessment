from typing import List, Dict, Optional

def filter_candidates(
    candidates: List[Dict],
    search: Optional[str] = None,
    application_type: Optional[List[str]] = None,
    source: Optional[List[str]] = None,
    job_id: Optional[str] = None
) -> List[Dict]:
    search_lower = search.lower() if search else None
    
    filtered = [
        c for c in candidates
        if (not search_lower or
            search_lower in c['name'].lower() or
            search_lower in c['position'].lower() or
            search_lower in c['company'].lower())
        and (not application_type or c['application_type'] in application_type)
        and (not source or c['source'] in source)
        and (not job_id or c['job_id'] == job_id)
    ]
    
    return filtered

def sort_candidates(
    candidates: List[Dict],
    sort_by: str = "last_activity",
    sort_order: str = "desc"
) -> List[Dict]:
    reverse = (sort_order == 'desc')
    
    if sort_by == 'name':
        candidates.sort(key=lambda x: x['name'].lower(), reverse=reverse)
    else:
        candidates.sort(key=lambda x: x['last_activity'], reverse=reverse)
    
    return candidates

def paginate_candidates(
    candidates: List[Dict],
    page: int,
    per_page: int
) -> tuple[List[Dict], int, int]:
    total = len(candidates)
    total_pages = (total + per_page - 1) // per_page if total > 0 else 0
    
    start_idx = (page - 1) * per_page
    paginated = candidates[start_idx:start_idx + per_page]
    
    return paginated, total, total_pages
