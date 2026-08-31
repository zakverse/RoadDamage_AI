import os

# Konfigurasi Backend RoadDamage_AI

# Direktori dasar backend
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Path model YOLOv8n
MODEL_PATH = os.path.join(BASE_DIR, "models", "road_damage.pt")

# Fallback path jika model belum disalin ke backend/models/
FALLBACK_MODEL_PATHS = [
    os.path.join(os.path.dirname(BASE_DIR), "runs", "detect", "train", "weights", "best.pt"),
    os.path.join(os.path.dirname(BASE_DIR), "yolov8n.pt")
]

# Daftar kelas deteksi kerusakan jalan
CLASS_NAMES = {
    0: "pothole",   # Lubang Jalan
    1: "crack",     # Retakan Permukaan Jalan
    2: "manhole"    # Penutup Saluran / Got
}

# Confidence threshold default
DEFAULT_CONFIDENCE = 0.25

# Pengaturan Server
HOST = "0.0.0.0"
PORT = 8000
