from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
from keybert import KeyBERT
import uvicorn

app = FastAPI()

# Sentence Transformer for scoring
model = SentenceTransformer('all-MiniLM-L6-v2')

# KeyBERT for extracting keywords from job descriptions
kw_model = KeyBERT(model)

class ResumeRequest(BaseModel):
    resume: str
    job_description: str

def extract_dynamic_keywords(jd_text):
    keywords = kw_model.extract_keywords(jd_text, keyphrase_ngram_range=(1, 2), stop_words='english', top_n=10)
    return [kw[0].lower() for kw in keywords]

def compare_keywords(resume_text, jd_keywords):
    resume_text = resume_text.lower()
    matched = [kw for kw in jd_keywords if kw in resume_text]
    missing = [kw for kw in jd_keywords if kw not in resume_text]
    return matched, missing

@app.post("/score")
async def score_resume(req: ResumeRequest):
    resume_emb = model.encode(req.resume, convert_to_tensor=True)
    job_emb = model.encode(req.job_description, convert_to_tensor=True)
    semantic_score = util.cos_sim(resume_emb, job_emb).item() * 100

    jd_keywords = extract_dynamic_keywords(req.job_description)
    matched, missing = compare_keywords(req.resume, jd_keywords)
    keyword_score = (len(matched) / len(jd_keywords)) * 100 if jd_keywords else 0
    final_score = round((semantic_score + keyword_score) / 2, 2)

    return {
        "match_score": final_score,
        "semantic_score": round(semantic_score, 2),
        "keyword_score": round(keyword_score, 2),
        "jd_keywords": jd_keywords,
        "matched_keywords": matched,
        "missing_keywords": missing,
        "suggestions": [f"Consider adding or emphasizing: {kw}" for kw in missing]
    }
