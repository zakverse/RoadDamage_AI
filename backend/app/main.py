import os
import io
from PIL import Image
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from . import config
from . import schemas
from . import model

# Inisialisasi Aplikasi FastAPI
app = FastAPI(
    title="RoadDamage AI API",
    description="REST API untuk Deteksi Kerusakan Jalan (Pothole, Crack, Manhole) menggunakan YOLOv8n",
    version="1.0.0"
)

# Konfigurasi CORS: Mengizinkan request dari frontend (Vercel di production & localhost di development)
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

# Tambahkan URL production jika diset melalui environment variable FRONTEND_URL
frontend_env = os.environ.get("FRONTEND_URL")
if frontend_env:
    for origin in frontend_env.split(","):
        cleaned = origin.strip()
        if cleaned and cleaned not in allowed_origins:
            allowed_origins.append(cleaned)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    # Jika FRONTEND_URL belum ditentukan, izinkan semua origin agar pengujian awal lancar
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.on_event("startup")
def startup_event():
    """Memuat model saat aplikasi pertama kali dijalankan."""
    try:
        model.get_model()
        print("✅ RoadDamage AI Model siap digunakan!")
    except Exception as e:
        print(f"⚠️ Peringatan saat memuat model: {e}")


@app.get("/", summary="Root Endpoint")
def read_root():
    """Endpoint perkenalan API."""
    return {
        "message": "Selamat datang di RoadDamage AI API",
        "description": "API Deteksi Kerusakan Jalan menggunakan YOLOv8n",
        "endpoints": {
            "health": "/health",
            "predict": "/predict",
            "docs": "/docs"
        }
    }


@app.get("/health", response_model=schemas.HealthResponse, summary="Health Check")
def health_check():
    """Memeriksa status kesiapan server dan model."""
    try:
        _, active_path = model.get_model()
        loaded = True
        # Bersihkan path agar menjadi path relatif yang rapi
        display_path = os.path.basename(active_path) if active_path != "None" else "None"
    except Exception:
        display_path = "None"
        loaded = False

    return schemas.HealthResponse(
        status="ok",
        model_loaded=loaded,
        model_path=display_path,
        classes=list(config.CLASS_NAMES.values())
    )


@app.post("/predict", response_model=schemas.PredictionResponse, summary="Deteksi Kerusakan Jalan")
async def predict_image(
    file: UploadFile = File(..., description="File gambar jalan (JPG/PNG) yang ingin dianalisis"),
    conf: float = Form(default=config.DEFAULT_CONFIDENCE, description="Batas confidence score (0.01 - 1.0)")
):
    """
    Menerima file gambar, menjalankan inferensi YOLOv8n, dan mengembalikan hasil deteksi objek beserta bounding box.
    """
    # Validasi tipe file
    if file.content_type not in ["image/jpeg", "image/png", "image/jpg", "image/webp"]:
        raise HTTPException(
            status_code=400,
            detail=f"Format file '{file.content_type}' tidak didukung. Harap unggah gambar JPG, PNG, atau WEBP."
        )

    # Validasi rentang confidence
    if not (0.01 <= conf <= 1.0):
        raise HTTPException(
            status_code=400,
            detail="Nilai parameter 'conf' harus berada di antara 0.01 dan 1.0."
        )

    try:
        # Baca bytes gambar
        contents = await file.read()
        try:
            image = Image.open(io.BytesIO(contents)).convert("RGB")
        except Exception:
            raise HTTPException(
                status_code=400,
                detail="File yang diunggah rusak atau bukan citra gambar yang valid."
            )

        # Jalankan prediksi
        detections, class_counts, annotated_img = model.predict_road_damage(
            image=image,
            conf_threshold=conf
        )

        return schemas.PredictionResponse(
            status="success",
            total_detections=len(detections),
            class_counts=class_counts,
            detections=detections,
            annotated_image=annotated_img
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Terjadi kesalahan saat memproses gambar: {str(e)}"
        )
