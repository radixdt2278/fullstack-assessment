from fastapi import APIRouter, Query
from typing import Optional, List

from app.models.candidate import CandidatesResponse
from app.services.candidate_service import filter_candidates, sort_candidates, paginate_candidates
from app.utils.data_loader import load_candidates

router = APIRouter()

@router.get("/candidates", response_model=CandidatesResponse)
def get_candidates(
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(5, ge=1, le=50, description="Items per page"),
    search: Optional[str] = Query(None, description="Search by name, position, or company"),
    sort_by: Optional[str] = Query("last_activity", description="Field to sort by (last_activity, name)"),
    sort_order: Optional[str] = Query("desc", description="Sort order (asc, desc)"),
    application_type: Optional[List[str]] = Query(None, description="Filter by application type"),
    source: Optional[List[str]] = Query(None, description="Filter by source"),
    job_id: Optional[str] = Query(None, description="Filter by job ID"),
):
    candidates = load_candidates()
    
    candidates = filter_candidates(candidates, search, application_type, source, job_id)
    
    if not candidates:
        return CandidatesResponse(
            candidates=[],
            total=0,
            page=page,
            per_page=per_page,
            total_pages=0
        )
    
    candidates = sort_candidates(candidates, sort_by, sort_order)
    
    paginated, total, total_pages = paginate_candidates(candidates, page, per_page)
    
    return CandidatesResponse(
        candidates=paginated,
        total=total,
        page=page,
        per_page=per_page,
        total_pages=total_pages
    )
