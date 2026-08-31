from pydantic import BaseModel, Field
from typing import List, Dict, Optional

# Schema untuk 1 objek deteksi kerusakan jalan
class DetectionItem(BaseModel):
    class_id: int = Field(..., description="ID kelas numerik (0: pothole, 1: crack, 2: manhole)")
    class_name: str = Field(..., description="Nama kelas kerusakan jalan")
    confidence: float = Field(..., description="Tingkat keyakinan deteksi (0.0 - 1.0)")
    bbox: List[float] = Field(..., description="Koordinat bounding box [x1, y1, x2, y2] dalam pixel")

# Schema response untuk endpoint /predict
class PredictionResponse(BaseModel):
    status: str = Field("success", description="Status hasil prediksi ('success' atau 'error')")
    total_detections: int = Field(..., description="Jumlah total kerusakan jalan yang terdeteksi")
    class_counts: Dict[str, int] = Field(..., description="Jumlah deteksi per kategori kelas")
    detections: List[DetectionItem] = Field(default_factory=list, description="Daftar detil seluruh objek yang terdeteksi")
    annotated_image: Optional[str] = Field(None, description="Gambar hasil visualisasi bounding box (Base64 Data URL)")

# Schema response untuk endpoint /health
class HealthResponse(BaseModel):
    status: str = Field("ok", description="Status server API")
    model_loaded: bool = Field(..., description="Apakah model YOLOv8n siap digunakan")
    model_path: str = Field(..., description="Lokasi file model yang aktif")
    classes: List[str] = Field(..., description="Daftar kelas yang didukung")
