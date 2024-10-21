from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import requests
from mangum import Mangum

app = FastAPI()

# Enable CORS to allow communication with the frontend hosted on Netlify
origins = [
    "https://diuresultswithdefense.netlify.app"  # Your Netlify site URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = 'http://software.diu.edu.bd:8006'

@app.get("/results")
async def fetch_student_results(studentId: str):
    # Example of fetching results from DIU API
    response = requests.get(f"{BASE_URL}/result", params={'studentId': studentId})
    return response.json()

@app.post("/add-defense")
async def add_defense(defenseCGPA: float):
    # Logic to handle defense CGPA addition
    return {"message": f"Defense result with CGPA {defenseCGPA} added successfully."}

# Wrap the FastAPI app with Mangum to handle Lambda requests
handler = Mangum(app)
