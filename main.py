from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.api import api_router

app = FastAPI(
    title="FastAPI",
    description="practice FastAPI backend",
)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["http://localhost:3000", "http://bj.memorywzd.tk:9307"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app="main:app", host="0.0.0.0", port=8080, reload=True)
