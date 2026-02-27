import streamlit as st
import pickle
import nltk
import string
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

ps = PorterStemmer()

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

tfidf = pickle.load(open(vectorizer_path, 'rb'))
model = pickle.load(open(model_path, 'rb'))

# 🔥 HOTFIX: Check if vectorizer is fitted
if not hasattr(tfidf, "idf_"):
    print("⚠️ TFIDF NOT FITTED! Fitting at runtime...")

    import pandas as pd
    
    # Load same training dataset used before
    data_path = os.path.join(current_dir, "spam.csv")

    if os.path.exists(data_path):
        df = pd.read_csv(data_path, encoding="latin-1")

        corpus = []

        for msg in df["v2"]:
            corpus.append(transform_text(msg))

        tfidf.fit(corpus)

        print("✅ TFIDF fitted successfully at runtime")
    else:
        print("❌ spam.csv NOT FOUND — cannot fit TFIDF")

st.title("Email/SMS Spam Classifier")

input_sms = st.text_area("Enter the message")

if st.button("Predict"):
    transform_sms = transform_text(input_sms)

    vectore_input = tfidf.transform([transform_sms])

    result = model.predict(vectore_input)[0]

    if result == 1:
        st.header("Spam")
    else:
        st.header("Not Spam")