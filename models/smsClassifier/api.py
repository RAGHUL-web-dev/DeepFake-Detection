import pickle
import nltk
import string
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="SMS Classifier API")

# Add CORS middleware to allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize PorterStemmer
ps = PorterStemmer()

# --- NLTK Data Download ---
# Ensure necessary NLTK data is downloaded. This is crucial for production.
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
except LookupError:
    print("Downloading required NLTK data...")
    nltk.download('punkt')
    nltk.download('stopwords')


def transform_text(text):
    text = text.lower()
    text = nltk.word_tokenize(text)

    y = []
    for i in text:
        if i.isalnum():
            y.append(i)

    text = y[:]
    y.clear()
    for i in text:
        if i not in stopwords.words("english") and i not in string.punctuation:
            y.append(i)

    text = y[:]
    y.clear()
    for i in text:
        y.append(ps.stem(i))

    return " ".join(y)

# Load the vectorizer and model
# Get the directory of the current script to safely load pickle files
current_dir = os.path.dirname(os.path.abspath(__file__))
vectorizer_path = os.path.join(current_dir, 'vectorizer.pkl')
model_path = os.path.join(current_dir, 'model.pkl')

try:
    tfidf = pickle.load(open(vectorizer_path, 'rb'))
    model = pickle.load(open(model_path, 'rb'))
    print("Model and vectorizer loaded successfully.")
except FileNotFoundError as e:
    print(f"Error loading model/vectorizer: {e}")
    # In a real app, you might want to handle this more gracefully or prevent startup
    tfidf = None
    model = None


class PredictRequest(BaseModel):
    text: str

class PredictResponse(BaseModel):
    prediction: int  # 1 for Spam, 0 for Not Spam
    result: str # "Spam" or "Not Spam"
    confidence: float = None # Optional: if your model supports predict_proba

@app.post("/predict", response_model=PredictResponse)
async def predict_spam(request: PredictRequest):
    if not tfidf or not model:
        return {"prediction": -1, "result": "Model not loaded properly. Check server logs."}

    # 1. Preprocess the text
    transformed_text = transform_text(request.text)

    # 2. Vectorize the input
    vectorized_input = tfidf.transform([transformed_text])

    # 3. Predict
    prediction_result = model.predict(vectorized_input)[0]
    
    # Optional: Get probability if model supports it (e.g., LogisticRegression, RandomForest)
    confidence = None
    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(vectorized_input)[0]
        confidence = float(max(probabilities))

    result_text = "Spam" if prediction_result == 1 else "Not Spam"

    return PredictResponse(
        prediction=int(prediction_result), 
        result=result_text,
        confidence=confidence
    )

@app.get("/")
def read_root():
    return {"message": "SMS Classifier API is running. Send POST request to /predict"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
