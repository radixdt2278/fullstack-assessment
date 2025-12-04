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
    """

    candidates = load_candidates()

    search_lower = search.lower() if search else None

    candidates = [
        c for c in candidates
        if (not search_lower or
            search_lower in c['name'].lower() or
            search_lower in c['position'].lower() or
            search_lower in c['company'].lower())
        and (not application_type or c['application_type'] in application_type)
        and (not source or c['source'] in source)
        and (not job_id or c['job_id'] == job_id)
    ]

    if not candidates:
        return {
            "candidates": [],
            "total": 0,
            "page": page,
            "per_page": per_page,
            "total_pages": 0
        }

    reverse = (sort_order == 'desc')
    if sort_by == 'name':
        candidates.sort(key=lambda x: x['name'].lower(), reverse=reverse)
    else:
        candidates.sort(key=lambda x: x['last_activity'], reverse=reverse)

    total = len(candidates)
    total_pages = (total + per_page - 1) // per_page
    start_idx = (page - 1) * per_page
    paginated_candidates = candidates[start_idx:start_idx + per_page]

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
