import warnings
warnings.filterwarnings('ignore', category=UserWarning)

import json
import cv2
import os
import random
import string
import numpy as np
from typing import Optional, Dict
import logging
from settings import CAMERA, FACE_DETECTION, TRAINING, PATHS
import firebase_admin
from firebase_admin import credentials, storage, firestore
import hashlib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize Firebase Admin SDK
firebase_cred_path = os.path.join(BASE_DIR, 'firebase', 'firebase_auth.json')
cred = credentials.Certificate(firebase_cred_path)
firebase_app = firebase_admin.initialize_app(cred, {
    'storageBucket': 'cardless-pay-861d9.firebasestorage.app'
})

# Initialize Firestore
db = firestore.client()

def generate_numeric_id(user_id: str) -> int:
    """
    Generate a unique numeric ID for a given user_id.

    Parameters:
        user_id (str): The user ID.

    Returns:
        int: A unique numeric ID.
    """
    return int(hashlib.sha256(user_id.encode()).hexdigest(), 16) % 10**8

def update_face_unique_id(user_id: str, numeric_id: int):
    """
    Update the faceUniqueId field in the users table with the generated numeric ID.

    Parameters:
        user_id (str): The user ID.
        numeric_id (int): The generated numeric ID.
    """
    try:
        user_ref = db.collection('users').document(user_id)
        user_ref.update({'faceUniqueId': numeric_id})
        logger.info(f"Updated faceUniqueId for user {user_id} to {numeric_id}")
    except Exception as e:
        logger.error(f"Error updating faceUniqueId: {e}")
        raise

def get_face_id(user_id: str) -> str:
    """
    Return the user ID passed from the API request
    """
    return user_id

def initialize_camera(camera_index: int = 0) -> Optional[cv2.VideoCapture]:
    """Initialize the camera with error handling"""
    try:
        cam = cv2.VideoCapture(camera_index)
        if not cam.isOpened():
            logger.error("Could not open webcam")
            return None
            
        cam.set(cv2.CAP_PROP_FRAME_WIDTH, CAMERA['width'])
        cam.set(cv2.CAP_PROP_FRAME_HEIGHT, CAMERA['height'])
        return cam
    except Exception as e:
        logger.error(f"Error initializing camera: {e}")
        return None

def upload_to_firebase_storage(image_data: bytes, numeric_id: str, count: int) -> str:
    """Uploads image bytes directly to Firebase Storage"""
    bucket = storage.bucket()
    blob = bucket.blob(f'face_images/Users-{numeric_id}-{count}.jpg')
    blob.upload_from_string(image_data, content_type='image/jpeg')
    blob.make_public()
    return blob.public_url

# def update_firestore_user(user_id: str, face_image_urls: list) -> None:
#     """Updates the Firestore document for the user with the faceImageUrls"""
#     try:
#         user_ref = db.collection('users').document(user_id)
#         user_ref.update({
#             'faceImageURL': face_image_urls
#         })
#         logger.info(f"Updated Firestore document for user {user_id} with faceImageUrls")
#     except Exception as e:
#         logger.error(f"Error updating Firestore document for user {user_id}: {e}")
#         raise

if __name__ == '__main__':
    import sys

    if len(sys.argv) < 2:
        logger.error("User ID is required as an argument")
        sys.exit(1)

    user_id = sys.argv[1]

    try:
        # Initialize components
        face_cascade = cv2.CascadeClassifier(PATHS['cascade_file'])
        if face_cascade.empty():
            raise ValueError("Error loading cascade classifier")
            
        cam = initialize_camera(CAMERA['index'])
        if cam is None:
            raise ValueError("Failed to initialize camera")

        # Generate user information
        face_id = get_face_id(user_id)
        numeric_id = generate_numeric_id(face_id)
        update_face_unique_id(user_id, numeric_id)
        
        logger.info(f"Initializing face capture for {face_id} (ID: {numeric_id})")
        logger.info("Look at the camera...")

        count = 0
        face_image_urls = []
        while count < TRAINING['samples_needed']:
            ret, img = cam.read()
            if not ret:
                logger.warning("Failed to grab frame")
                continue
                
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(
                gray,
                scaleFactor=FACE_DETECTION['scale_factor'],
                minNeighbors=FACE_DETECTION['min_neighbors'],
                minSize=FACE_DETECTION['min_size']
            )
            
            for (x, y, w, h) in faces:
                if count < TRAINING['samples_needed']:
                    # Extract face region and convert to JPEG bytes
                    face_img = gray[y:y+h, x:x+w]
                    _, img_encoded = cv2.imencode('.jpg', face_img)
                    image_data = img_encoded.tobytes()
                    
                    # Upload directly to Firebase
                    public_url = upload_to_firebase_storage(image_data, str(numeric_id), count+1)
                    logger.info(f"Uploaded image {count+1} to {public_url}")

                    # Collect URLs
                    # face_image_urls.append(public_url)
                    
                    count += 1

            # Exit on ESC key
            if cv2.waitKey(100) & 0xff == 27:
                break
                
        # Update Firestore with all faceImageUrls
        # update_firestore_user(str(face_id), face_image_urls)
        logger.info(f"Successfully captured {count} images")

    except Exception as e:
        logger.error(f"An error occurred: {e}")
        
    finally:
        if 'cam' in locals():
            cam.release()
        cv2.destroyAllWindows()