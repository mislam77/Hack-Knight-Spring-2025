import json
import os
import subprocess
import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
import sys

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Get the base directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Set correct paths
FACE_TAKER_PATH = os.path.join(BASE_DIR, "face-recognition", "face_taker.py")
FACE_TRAINER_PATH = os.path.join(BASE_DIR, "face-recognition", "face_trainer.py")
FACE_RECOGNIZER_PATH = os.path.join(BASE_DIR, "face-recognition", "face_recognizer.py")

# Update subprocess.run calls in server.py to use the virtual environment's Python executable
VENV_PYTHON = os.path.join(BASE_DIR, ".venv", "Scripts", "python.exe")

@app.route('/capture', methods=['POST'])
def capture_face():
    try:
        user_id = request.json.get('userId')
        if not user_id:
            return jsonify({"error": "user_id is required"}), 400
        result = subprocess.run([VENV_PYTHON, FACE_TAKER_PATH, user_id], capture_output=True, text=True)
        if result.stderr:
            return jsonify({"error": result.stderr}), 500
        return jsonify({"message": "Face captured", "output": result.stdout})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/train', methods=['POST'])
def train_model():
    try:
        user_id = request.json.get('userId')
        if not user_id:
            return jsonify({"error": "user_id is required"}), 400
        result = subprocess.run([VENV_PYTHON, FACE_TRAINER_PATH, user_id], capture_output=True, text=True)
        if result.stderr:
            return jsonify({"error": result.stderr}), 500
        return jsonify({"message": "Training completed", "output": result.stdout})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recognize', methods=['GET'])
def recognize_face():
    try:
        result = subprocess.run(
            [VENV_PYTHON, FACE_RECOGNIZER_PATH],
            capture_output=True,
            text=True
        )

        output = result.stdout.strip()
        if output:
            data = json.loads(output)
            user_id = data.get("user_id")
            if user_id:
                return jsonify({"message": "Face recognition completed", "user_id": user_id})
            else:
                return jsonify({"error": "No user recognized"}), 404
        else:
            return jsonify({"error": "No output from face recognition script"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)