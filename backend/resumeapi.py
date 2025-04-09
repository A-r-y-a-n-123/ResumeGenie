from fastapi import FastAPI, Request
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
import uvicorn

app = FastAPI()
model = SentenceTransformer('all-MiniLM-L6-v2')
class ResumeRequest(BaseModel):
    resume: str
    job_description: str

@app.post("/score")
async def score_resume(req: ResumeRequest):
    resume_emb = model.encode(req.resume, convert_to_tensor=True)
    job_emb = model.encode(req.job_description, convert_to_tensor=True)
    score = util.cos_sim(resume_emb, job_emb).item() * 100  # percent
    return {
        "match_score": round(score, 2),
        "message": f"Resume matches the job description with a score of {round(score, 2)}%"
    }

# run directly with Python
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)