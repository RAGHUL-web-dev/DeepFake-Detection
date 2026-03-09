import streamlit as st
import torch
import torchvision.transforms as transforms
from PIL import Image
from model import CNNModel

# ---------------------------
# Device
# ---------------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ---------------------------
# Load Model
# ---------------------------
@st.cache_resource
def load_model():
    model = CNNModel()
    model.load_state_dict(
        torch.load("deep_cnn_model_weights.pth", map_location=device)
    )
    model.to(device)
    model.eval()
    return model

model = load_model()

# ---------------------------
# Transform (MUST match training)
# ---------------------------
transform = transforms.Compose([
    transforms.Resize((64, 64)),
    transforms.ToTensor()
])

# ---------------------------
# UI
# ---------------------------
st.set_page_config(page_title="Deepfake Detector", layout="centered")

st.title("Deepfake Image Detector")
st.write("Upload an image to check whether it is Real or Fake.")

uploaded_file = st.file_uploader(
    "Upload Image",
    type=["jpg", "jpeg", "png"]
)

if uploaded_file:

    try:
        # Safe image loading
        image = Image.open(uploaded_file).convert("RGB")

        st.image(image, caption="Uploaded Image", width="stretch")

        # Preprocess
        img_tensor = transform(image).unsqueeze(0).to(device)

        # Inference
        with torch.no_grad():
            output = model(img_tensor)
            probability = output.item()

        st.write(f"Raw Probability Output: {probability:.4f}")

        # IMPORTANT:
        # If training folders were:
        # fake -> 0
        # real -> 1
        # then probability >= 0.5 means REAL

        if probability >= 0.5:
            st.success(f"Prediction: REAL (Confidence: {probability:.4f})")
        else:
            st.error(f"Prediction: FAKE (Confidence: {1 - probability:.4f})")

    except Exception as e:
        st.error(f"Inference failed: {e}")