from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import json
from pathlib import Path

app = FastAPI(title="Candidate Management API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load mock data
DATA_FILE = Path(__file__).parent.parent / "mock-data" / "candidates.json"

def load_candidates():
    """Load candidates from JSON file"""
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    return data["candidates"]


@app.get("/")
def read_root():
    """Root endpoint"""
    return {"message": "Candidate Management API", "docs": "/docs"}


@app.get("/api/candidates")
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
    """
    Get paginated and filtered candidates

    YOUR TASK: Implement a complete backend API with:
    1. Multi-field filtering (search, application_type, source, job_id)
    2. Flexible sorting (by last_activity or name, asc or desc)
    3. Server-side pagination
    4. Proper response formatting

    This is the core of the fullstack assessment!
    """

    candidates = load_candidates()

    if search:
        search_lower = search.lower()
        candidates = [c for c in candidates
                      if search_lower in c['name'].lower() or
                         search_lower in c['position'].lower() or
                         search_lower in c['company'].lower()]

    if application_type:
        candidates = [c for c in candidates
                      if c['application_type'] in application_type]

    if source:
        candidates = [c for c in candidates
                      if c['source'] in source]

    if job_id:
        candidates = [c for c in candidates
                      if c['job_id'] == job_id]

    if sort_by == 'last_activity':
        candidates = sorted(
            candidates,
            key=lambda x: x['last_activity'],
            reverse=(sort_order == 'desc')
        )
    elif sort_by == 'name':
        candidates = sorted(
            candidates,
            key=lambda x: x['name'].lower(),
            reverse=(sort_order == 'desc')
        )

    total = len(candidates)
    total_pages = (total + per_page - 1) // per_page
    start_idx = (page - 1) * per_page
    end_idx = start_idx + per_page
    paginated_candidates = candidates[start_idx:end_idx]

    return {
        "candidates": paginated_candidates,
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
