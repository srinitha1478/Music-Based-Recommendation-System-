import numpy as np
from tensorflow.keras.models import load_model
from utils.feature_extraction import extract_features

model = load_model('models/emotion_model.h5')

emotions = ['angry', 'happy', 'sad', 'neutral']

def predict_emotion(file_path):
    features = extract_features(file_path)
    features = np.expand_dims(features, axis=0)

    prediction = model.predict(features)
    return emotions[np.argmax(prediction)]
