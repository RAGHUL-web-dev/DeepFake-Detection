import pickle
import nltk
import string
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import traceback

app = FastAPI(title="SMS Classifier API")

# Add CORS middleware to allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handler to capture 500 errors and return them with CORS headers
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"ERROR: {exc}")
    traceback.print_exc()
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error", "detail": str(exc)},
    )

# Initialize PorterStemmer
ps = PorterStemmer()

# --- NLTK Data Download ---
def setup_nltk():
    try:
        # Check and download required packages
        packages = ['punkt', 'stopwords', 'punkt_tab']
        for package in packages:
            try:
                nltk.data.find(f'tokenizers/{package}' if 'punkt' in package else f'corpora/{package}')
            except LookupError:
                print(f"Downloading {package}...")
                nltk.download(package)
    except Exception as e:
        print(f"NLTK Setup Error: {e}")

setup_nltk()

def transform_text(text):
    try:
        text = text.lower()
        text = nltk.word_tokenize(text)

        y = []
        for i in text:
            if i.isalnum():
                y.append(i)

        text = y[:]
        y.clear()
        
        # Access stopwords carefully
        stop_words = set(stopwords.words("english"))
        for i in text:
            if i not in stop_words and i not in string.punctuation:
                y.append(i)

        text = y[:]
        y.clear()
        for i in text:
            y.append(ps.stem(i))

        return " ".join(y)
    except Exception as e:
        print(f"Error in transform_text: {e}")
        raise e

# Load the vectorizer and model
current_dir = os.path.dirname(os.path.abspath(__file__))
vectorizer_path = os.path.join(current_dir, 'vectorizer.pkl')
model_path = os.path.join(current_dir, 'model.pkl')

tfidf = None
model = None

try:
    if os.path.exists(vectorizer_path) and os.path.exists(model_path):
        tfidf = pickle.load(open(vectorizer_path, 'rb'))
        model = pickle.load(open(model_path, 'rb'))
        print("Model and vectorizer loaded successfully.")
        
        # Diagnostic: Check if fitted
        if hasattr(tfidf, 'vocabulary_'):
            print(f"Vectorizer vocabulary size: {len(tfidf.vocabulary_)}")
        else:
            print("WARNING: Vectorizer has NO vocabulary_ attribute!")
            
        if hasattr(tfidf, 'idf_'):
            print(f"Vectorizer idf_ attribute present.")
        else:
            print("WARNING: Vectorizer has NO idf_ attribute!")
            
    else:
        print(f"Pickle files not found in {current_dir}")
except Exception as e:
    print(f"Error loading model/vectorizer: {e}")
    traceback.print_exc()

class PredictRequest(BaseModel):
    text: str

class PredictResponse(BaseModel):
    prediction: int
    result: str
    confidence: float = None

@app.post("/predict", response_model=PredictResponse)
async def predict_spam(request: PredictRequest):
    if tfidf is None or model is None:
        return JSONResponse(
            status_code=503,
            content={"prediction": -1, "result": "Model not loaded properly. Check server logs."}
        )

    try:
        # 1. Preprocess the text
        transformed_text = transform_text(request.text)

        # 2. Vectorize the input
        vectorized_input = tfidf.transform([transformed_text])

        # 3. Predict
        prediction_result = model.predict(vectorized_input)[0]
        
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
    except Exception as e:
        print(f"Prediction Error: {e}")
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"message": "Error during prediction", "detail": str(e)}
        )

@app.get("/")
def read_root():
    return {"message": "SMS Classifier API is running. Send POST request to /predict"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
