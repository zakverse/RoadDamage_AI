# RoadDamage_AI - Backend Service (FastAPI)

Backend REST API sederhana dan cepat berbasis **FastAPI** dan **YOLOv8n** untuk inferensi deteksi kerusakan jalan secara real-time.

---

## 📁 Struktur Folder
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py        # Routing API & CORS
│   ├── config.py      # Konfigurasi model & threshold
│   ├── model.py       # YOLOv8n loader & inference service
│   └── schemas.py     # Pydantic schemas (request/response)
├── models/
│   └── road_damage.pt # Bobot model hasil training
├── requirements.txt   # Dependensi backend
└── README.md
```

---

## 🚀 Cara Menjalankan Backend

### 1. Masuk ke folder backend & pastikan dependensi terpasang:
```bash
pip install -r backend/requirements.txt
```

### 2. Jalankan Uvicorn server:
```bash
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

Server akan aktif di `http://127.0.0.1:8000`.
Dokumentasi interaktif Swagger UI tersedia di `http://127.0.0.1:8000/docs`.

---

## 📡 Endpoint API

### 1. `GET /health`
Mengecek status server dan model.

**Response:**
```json
{
  "status": "ok",
  "model_loaded": true,
  "model_path": "backend/models/road_damage.pt",
  "classes": ["pothole", "crack", "manhole"]
}
```

### 2. `POST /predict`
Mengunggah gambar dan mendapatkan hasil deteksi kerusakan jalan.

**Request (multipart/form-data):**
- `file`: File gambar (JPG/PNG)
- `conf` (opsional): Minimum confidence score, default `0.25`

**Contoh cURL:**
```bash
curl -X POST "http://127.0.0.1:8000/predict" \
     -F "file=@data/test/images/sample.jpg" \
     -F "conf=0.25"
```

**Response:**
```json
{
  "status": "success",
  "total_detections": 2,
  "class_counts": {
    "pothole": 1,
    "crack": 1,
    "manhole": 0
  },
  "detections": [
    {
      "class_id": 0,
      "class_name": "pothole",
      "confidence": 0.8921,
      "bbox": [120.5, 200.1, 250.3, 310.8]
    },
    {
      "class_id": 1,
      "class_name": "crack",
      "confidence": 0.7645,
      "bbox": [320.0, 150.2, 510.4, 280.0]
    }
  ],
  "annotated_image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```
