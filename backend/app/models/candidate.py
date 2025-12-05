from typing import Optional, List
from pydantic import BaseModel, Field

class CandidateQueryParams(BaseModel):
    page: int = Field(1, ge=1, description="Page number")
    per_page: int = Field(5, ge=1, le=50, description="Items per page")
    search: Optional[str] = Field(None, description="Search by name, position, or company")
    sort_by: Optional[str] = Field("last_activity", description="Field to sort by")
    sort_order: Optional[str] = Field("desc", description="Sort order (asc, desc)")
    application_type: Optional[List[str]] = Field(None, description="Filter by application type")
    source: Optional[List[str]] = Field(None, description="Filter by source")
    job_id: Optional[str] = Field(None, description="Filter by job ID")

class CandidatesResponse(BaseModel):
    candidates: List[dict]
    total: int
    page: int
    per_page: int
    total_pages: int
