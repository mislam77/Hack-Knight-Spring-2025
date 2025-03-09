import warnings
warnings.filterwarnings('ignore', category=UserWarning)

import json
import cv2
import numpy as np
import os
import logging
import firebase_admin
from firebase_admin import credentials, storage, firestore, auth
from settings import CAMERA, FACE_DETECTION, PATHS

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate(os.path.join(os.path.dirname(__file__), 'firebase', 'firebase_auth.json'))
firebase_admin.initialize_app(cred, {'storageBucket': 'cardless-pay-861d9.firebasestorage.app'})

# Initialize Firestore
db = firestore.client()

def create_custom_token(user_id: str) -> str:
    return auth.create_custom_token(user_id).decode('utf-8')

def download_trainer_file():
    bucket = storage.bucket()
    blob = bucket.blob('face_model/trainer.yml')
    local_trainer_path = PATHS['trainer_file']
    blob.download_to_filename(local_trainer_path)
    return local_trainer_path

def get_user_id_from_firestore(face_id: int) -> str:
    users_ref = db.collection('users')
    query = users_ref.where('faceUniqueId', '==', face_id).stream()
    for doc in query:
        return doc.id
    return None

if __name__ == "__main__":
    try:
        logger.info("Starting face recognition system...")

        # Download trainer file from Firebase Storage
        trainer_file_path = download_trainer_file()
        
        # Initialize face recognizer
        recognizer = cv2.face.LBPHFaceRecognizer_create()
        recognizer.read(trainer_file_path)

        # Load face cascade classifier
        face_cascade = cv2.CascadeClassifier(PATHS['cascade_file'])
        if face_cascade.empty():
            raise ValueError("Error loading cascade classifier")
        
        # Initialize camera
        cam = cv2.VideoCapture(CAMERA['index'])
        if not cam.isOpened():
            raise ValueError("Failed to initialize camera")
        
        logger.info("Press 'CTRL + C' to exit.")
        
        recognized = False

        user_id = None
        
        while not recognized:
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
                id, confidence = recognizer.predict(gray[y:y+h, x:x+w])
                
                if confidence <= 100:
                    user_id = get_user_id_from_firestore(id)
                    if user_id == None:
                        logger.warning("No user recognized")
                        continue
                    logger.info(f"Recognized User ID: {user_id}")
                    recognized = True
                    break
            
            if cv2.waitKey(1) & 0xFF == 27:
                break
        
        logger.info("Face recognition stopped")
        if user_id:
            custom_token = create_custom_token(user_id)
            print(json.dumps({"user_id": user_id, "custom_token": custom_token}))
        
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        
    finally:
        if 'cam' in locals():
            cam.release()
        cv2.destroyAllWindows()
        if os.path.exists(trainer_file_path):
            os.remove(trainer_file_path)
            logger.info(f"Deleted local trainer file {trainer_file_path}")