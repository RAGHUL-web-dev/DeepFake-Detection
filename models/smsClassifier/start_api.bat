cd "C:\Users\SURENDHAR\OneDrive\Desktop\DeepFake Detection\deepfake detection\models\smsClassifier"
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn api:app --reload
