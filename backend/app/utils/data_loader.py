import json
from typing import List, Dict
from functools import lru_cache
from app.core.config import settings

@lru_cache(maxsize=1)
def load_candidates() -> List[Dict]:
    with open(settings.DATA_FILE, "r") as f:
        data = json.load(f)
    return data["candidates"]
