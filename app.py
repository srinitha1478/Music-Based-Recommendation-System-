from flask import Flask, render_template, request
import os
from utils.emotion_detection import predict_emotion
from utils.recommender import recommend_songs

app = Flask(__name__)
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET', 'POST'])
def index():
    emotion = None
    songs = []

    if request.method == 'POST':
        audio = request.files['audio']
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], audio.filename)
        audio.save(file_path)

        emotion = predict_emotion(file_path)
        songs = recommend_songs(emotion)

    return render_template('index.html', emotion=emotion, songs=songs)

if __name__ == '__main__':
    app.run(debug=True)
