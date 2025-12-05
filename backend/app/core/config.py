from pathlib import Path

class Settings:
    PROJECT_NAME: str = "Candidate Management API"
    API_V1_STR: str = "/api"
    
    CORS_ORIGINS: list = ["http://localhost:5173"]
    
    DATA_FILE: Path = Path(__file__).parent.parent.parent.parent / "mock-data" / "candidates.json"
    
    DEFAULT_PAGE: int = 1
    DEFAULT_PER_PAGE: int = 5
    MAX_PER_PAGE: int = 50

settings = Settings()
