# Suppress macOS warning
import warnings
warnings.filterwarnings('ignore', category=UserWarning)

import cv2
import numpy as np
from PIL import Image
import os
import logging
import requests
from io import BytesIO
from settings import PATHS
import firebase_admin
from firebase_admin import credentials, storage, firestore
import re

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize Firebase Admin SDK
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
firebase_cred_path = os.path.join(BASE_DIR, 'firebase', 'firebase_auth.json')
cred = credentials.Certificate(firebase_cred_path)
firebase_app = firebase_admin.initialize_app(cred, {
    'storageBucket': 'cardless-pay-861d9.firebasestorage.app'
})

# Initialize Firestore
db = firestore.client()

def get_images_and_labels(user_id: str):
    """
    Load face images and corresponding labels from Firebase Storage.

    Parameters:
        user_id (str): User ID to fetch images for.

    Returns:
        tuple: (face_samples, ids) Lists of face samples and corresponding labels.
    """
    try:
        # user_ref = db.collection('users').document(user_id)
        # user_doc = user_ref.get()
        # if not user_doc.exists:
        #     raise ValueError(f"No user found with ID {user_id}")

        # face_image_urls = user_doc.to_dict().get('faceImageURL', [])
        # if not face_image_urls:
        #     raise ValueError(f"No face images found for user ID {user_id}")

        bucket = storage.bucket()
        face_image_urls = []
        blobs = bucket.list_blobs(prefix=f'face_images/')

        for blob in blobs:
            face_image_urls.append(blob.public_url)

        if not face_image_urls:
            raise ValueError(f"No face images found")

        faceSamples = []
        ids = []

        # Create face detector
        detector = cv2.CascadeClassifier(PATHS['cascade_file'])
        if detector.empty():
            raise ValueError("Error loading cascade classifier")

        for url in face_image_urls:
            response = requests.get(url)
            if response.status_code != 200:
                logger.warning(f"Failed to fetch image from {url}")
                continue

            # Convert image to grayscale
            PIL_img = Image.open(BytesIO(response.content)).convert('L')
            img_numpy = np.array(PIL_img, 'uint8')

            # Extract numeric ID from the URL
            match = re.search(r'Users-([^%-]+)-1', url)
            if not match:
                logger.warning(f"Failed to extract numeric ID from {url}")
                continue
            numeric_id = match.group(1)

            # Detect faces in the grayscale image
            faces = detector.detectMultiScale(img_numpy)

            for (x, y, w, h) in faces:
                # Extract face region and append to the samples
                faceSamples.append(img_numpy[y:y+h, x:x+w])
                ids.append(numeric_id)

        return faceSamples, ids
    except Exception as e:
        logger.error(f"Error processing images: {e}")
        raise

# def upload_model_to_firebase_storage(model_path: str, user_id: str) -> str:
#     """Uploads the trained model to Firebase Storage"""
#     bucket = storage.bucket()
#     blob = bucket.blob(f'face_model/trainer.yml')
#     blob.upload_from_filename(model_path)
#     return blob.public_url

if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        logger.error("User ID is required as an argument")
        sys.exit(1)

    user_id = sys.argv[1]

    try:
        logger.info("Starting face recognition training...")

        # Initialize face recognizer
        recognizer = cv2.face.LBPHFaceRecognizer_create()

        # Get training data
        faces, ids = get_images_and_labels(user_id)

        if not faces or not ids:
            raise ValueError("No training data found")

        # Train the model
        logger.info("Training model...")
        recognizer.train(faces, np.array(ids, dtype=np.int32))

        # Save the model locally
        local_model_path = PATHS['trainer_file']
        recognizer.write(local_model_path)
        logger.info(f"Model trained with {len(np.unique(ids))} faces")

        # Upload the model to Firebase Storage
        # model_url = upload_model_to_firebase_storage(local_model_path, user_id)
        # logger.info(f"Model uploaded to {model_url}")

    except Exception as e:
        logger.error(f"An error occurred: {e}")