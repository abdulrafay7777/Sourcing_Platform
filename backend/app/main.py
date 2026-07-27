from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from .routers import sourcing

Base.metadata.create_all(bind=engine)

app = FastAPI(title="PakSource Connect API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server; add prod domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sourcing.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
