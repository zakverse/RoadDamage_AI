import io
import base64
import os
from PIL import Image
import numpy as np
import cv2
from ultralytics import YOLO
from . import config

# Variabel global untuk menyimpan instance model
_model_instance = None
_active_model_path = None

def get_model():
    """
    Fungsi sederhana untuk memuat model YOLOv8n (Lazy loading).
    Mencari file model di backend/models/road_damage.pt, atau fallback ke runs/detect/train/weights/best.pt
    """
    global _model_instance, _active_model_path

    if _model_instance is not None:
        return _model_instance, _active_model_path

    # Cari file model yang tersedia
    target_paths = [config.MODEL_PATH] + config.FALLBACK_MODEL_PATHS
    chosen_path = None
    for p in target_paths:
        if os.path.exists(p):
            chosen_path = p
            break

    if chosen_path is None:
        # Gunakan nama yolov8n.pt langsung jika file lokal belum ada
        chosen_path = "yolov8n.pt"

    print(f"Loading YOLO model from: {chosen_path}")
    _model_instance = YOLO(chosen_path)
    _active_model_path = chosen_path
    return _model_instance, _active_model_path


def predict_road_damage(image: Image.Image, conf_threshold: float = config.DEFAULT_CONFIDENCE):
    """
    Fungsi inference sederhana untuk mendeteksi kerusakan jalan pada gambar.
    
    Args:
        image (PIL.Image): Gambar input dari user.
        conf_threshold (float): Batas minimum confidence score (default: 0.25).
        
    Returns:
        tuple: (detections_list, class_counts_dict, annotated_image_base64)
    """
    model, _ = get_model()

    # Jalankan prediksi dengan YOLOv8n
    results = model.predict(
        source=image,
        conf=conf_threshold,
        verbose=False
    )

    result = results[0]
    detections = []
    class_counts = {"pothole": 0, "crack": 0, "manhole": 0}

    # Ekstraksi bounding boxes dan kelas
    if result.boxes is not None and len(result.boxes) > 0:
        boxes = result.boxes
        for i in range(len(boxes)):
            box = boxes[i]
            cls_id = int(box.cls[0].item())
            conf = float(box.conf[0].item())
            xyxy = [float(v) for v in box.xyxy[0].tolist()]  # [x1, y1, x2, y2]

            # Nama kelas berdasarkan ID
            cls_name = config.CLASS_NAMES.get(cls_id, result.names.get(cls_id, f"class_{cls_id}"))

            if cls_name in class_counts:
                class_counts[cls_name] += 1
            else:
                class_counts[cls_name] = 1

            detections.append({
                "class_id": cls_id,
                "class_name": cls_name,
                "confidence": round(conf, 4),
                "bbox": [round(c, 2) for c in xyxy]
            })

    # Render gambar dengan bounding box menggunakan fungsi bawaan YOLO
    annotated_bgr = result.plot()  # numpy array (BGR)
    annotated_rgb = cv2.cvtColor(annotated_bgr, cv2.COLOR_BGR2RGB)
    annotated_pil = Image.fromarray(annotated_rgb)

    # Encode gambar hasil ke format base64 Data URL (JPEG)
    buffer = io.BytesIO()
    annotated_pil.save(buffer, format="JPEG", quality=90)
    base64_str = base64.b64encode(buffer.getvalue()).decode("utf-8")
    annotated_image_url = f"data:image/jpeg;base64,{base64_str}"

    return detections, class_counts, annotated_image_url
