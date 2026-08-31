# 🛣️ RoadDamage_AI: Sistem Deteksi Kerusakan Jalan Berbasis YOLOv8n

[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![YOLOv8](https://img.shields.io/badge/YOLOv8-Ultralytics-orange.svg)](https://docs.ultralytics.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-cyan.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)

**RoadDamage_AI** adalah proyek Computer Vision & Machine Learning end-to-end untuk mendeteksi berbagai jenis kerusakan jalan (*Pothole*, *Crack*, dan *Manhole*) secara otomatis dari citra kamera/kendaraan menggunakan model **YOLOv8n (Nano)**.

Proyek ini dirancang secara khusus untuk **Week 3 Assignment - Kelompok Road Damage**, dengan fokus pada kejelasan kode, kemudahan dipelajari (*student-friendly*), alur workflow ML yang sistematis, serta siap dipresentasikan.

---

## 📑 Daftar Isi
1. [Project Overview](#-project-overview)
2. [Problem Statement](#-problem-statement)
3. [Dataset & Distribusi Kelas](#-dataset--distribusi-kelas)
4. [Tech Stack](#-tech-stack)
5. [Struktur Proyek](#-struktur-proyek)
6. [Machine Learning Workflow](#-machine-learning-workflow)
7. [Panduan Menjalankan Notebook (01 - 07)](#-panduan-menjalankan-notebook-01---07)
8. [Panduan Training Model](#-panduan-training-model)
9. [Panduan Menjalankan Backend (FastAPI)](#-panduan-menjalankan-backend-fastapi)
10. [Panduan Menjalankan Frontend (React + Vite)](#-panduan-menjalankan-frontend-react--vite)
11. [Dokumentasi API Endpoints](#-dokumentasi-api-endpoints)
12. [Evaluasi Model & Metrik](#-evaluasi-model--metrik)
13. [Analisis Overfitting / Underfitting](#-analisis-overfitting--underfitting)
14. [Batasan Sistem (Limitations)](#-batasan-sistem-limitations)
15. [Rencana Pengembangan (Future Improvement)](#-rencana-pengembangan-future-improvement)

---

## 📌 Project Overview
Kerusakan jalan raya seperti lubang (*potholes*) dan retakan (*cracks*) merupakan penyebab utama kecelakaan lalu lintas dan kerusakan komponen kendaraan. Inspeksi manual memakan waktu, mahal, dan berbahaya. **RoadDamage_AI** menghadirkan solusi otomasi deteksi kerusakan jalan secara real-time berbasis Deep Learning yang dapat diintegrasikan dengan kamera kendaraan (*dashcam*) dan antarmuka web interaktif.

---

## 🎯 Problem Statement
- **Tantangan Deteksi:** Variasi bentuk dan ukuran retakan jalan, pencahayaan alami yang dinamis, serta kemiripan tekstur aspal dengan bayangan pohon/kendaraan.
- **Dataset Terbatas & Imbalanced:** Dataset berukuran relatif kecil (~2,000 gambar) dengan distribusi kelas yang tidak seimbang (*Crack* mendominasi dibanding *Pothole* dan *Manhole*).
- **Kebutuhan Real-Time:** Model harus cukup ringan (*lightweight*) untuk dijalankan dengan latensi rendah pada perangkat edge/laptop.

---

## 📊 Dataset & Distribusi Kelas
Dataset bersumber dari penelitian inspeksi jalan (Zenodo DOI: `10.5281/zenodo.17834373`) dengan total **2,009 gambar** (resolusi 640×360 px) dan **4,737 objek anotasi**.

| Class ID | Nama Kelas | Arti / Karakteristik | Jumlah Objek | Persentase | Status |
|---|---|---|---|---|---|
| **0** | `pothole` | Lubang pada permukaan jalan | 1,261 | 26.6% | Sedang |
| **1** | `crack` | Retakan memanjang/bercabang pada aspal | 2,519 | 53.2% | **Dominan** |
| **2** | `manhole` | Tutup got / lubang utilitas saluran air | 957 | 20.2% | Minoritas |

### Pembagian Dataset (Data Split):
- **Train Set (70%):** 1,406 gambar (~3,315 objek) untuk proses pembelajaran bobot.
- **Validation Set (20%):** 401 gambar (~948 objek) untuk evaluasi dan tuning parameter.
- **Test Set (10%):** 202 gambar (~474 objek) untuk pengujian akhir pada data unseen.

---

## 🛠️ Tech Stack

### 1. Machine Learning & Computer Vision
- **Python 3.9+**
- **Ultralytics YOLOv8n (Nano):** Arsitektur object detection modern, cepat, dan akurat (~3.2M parameter).
- **PyTorch & Torchvision:** Framework Deep Learning.
- **OpenCV & Pillow:** Pengolahan citra dan augmentasi visual.
- **Pandas, NumPy, Matplotlib, Seaborn:** Analisis data dan visualisasi statistik.

### 2. Backend API
- **FastAPI:** Web framework Python modern, berkecepatan tinggi dengan validasi schema otomatis.
- **Uvicorn:** ASGI web server untuk deployment backend.
- **Pydantic:** Validasi data input/output.

### 3. Frontend Web
- **React 18:** Library UI berbasis komponen deklaratif.
- **Vite:** Build tool modern dengan Hot Module Replacement (HMR) instan.
- **Vanilla CSS (Modern Design):** Glassmorphism, kartu statistik, badge warna-warni, dark theme, dan micro-animations.
- **Lucide React:** Paket ikon modern.

---

## 📁 Struktur Proyek
```
RoadDamage_AI/
│
├── data/                            # Direktori dataset & konfigurasi
│   ├── images/                      # 2,009 gambar JPG original
│   ├── labels/                      # Anotasi format polygon original
│   ├── labels-YOLO/                 # Anotasi format YOLO bounding box
│   ├── annotations_coco.json        # Anotasi format COCO JSON
│   ├── data.yaml                    # Konfigurasi dataset untuk YOLOv8
│   ├── train/                       # Subset train (images & labels)
│   ├── val/                         # Subset val (images & labels)
│   └── test/                        # Subset test (images & labels)
│
├── notebooks/                       # 7 Notebooks ML berurutan
│   ├── 01_EDA.ipynb                 # Exploratory Data Analysis & visualisasi
│   ├── 02_Data_Preprocessing.ipynb  # Split dataset 70/20/10 & data.yaml
│   ├── 03_Data_Validation.ipynb     # Quality Assurance & integrity check
│   ├── 04_Model_Training.ipynb      # Training YOLOv8n transfer learning
│   ├── 05_Model_Evaluation.ipynb    # Metrik mAP, Precision, Recall, Matrix
│   ├── 06_Overfitting_Underfitting.ipynb # Diagnosa kurva loss & generalisasi
│   └── 07_Inference_Testing.ipynb   # Pengujian gambar baru & benchmark FPS
│
├── backend/                         # Service Backend REST API
│   ├── app/
│   │   ├── main.py                  # API endpoints & CORS middleware
│   │   ├── config.py                # Konfigurasi path & threshold
│   │   ├── model.py                 # YOLOv8n loader & inference service
│   │   └── schemas.py               # Pydantic schemas request/response
│   ├── models/
│   │   └── road_damage.pt           # Bobot model terbaik hasil training
│   ├── requirements.txt             # Dependensi backend
│   └── README.md                    # Dokumentasi backend
│
├── frontend/                        # Antarmuka Pengguna (Web UI)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx           # Navbar & status API pill
│   │   │   ├── ImageUploader.jsx    # Drag-and-drop & slider confidence
│   │   │   ├── DetectionResult.jsx  # Visualisasi bounding box & tabel
│   │   │   ├── StatsCard.jsx        # Kartu ringkasan jumlah objek
│   │   │   └── ClassBadge.jsx       # Badge kategori berwarna
│   │   ├── App.jsx                  # Main application & state
│   │   ├── main.jsx                 # React root
│   │   └── index.css                # Styling modern dark glassmorphism
│   ├── index.html                   # HTML template
│   ├── package.json                 # Dependensi frontend
│   ├── vite.config.js               # Konfigurasi Vite
│   └── README.md                    # Dokumentasi frontend
│
├── scripts/                         # Script utilitas konversi format
│   ├── COCO-conversion-script.py
│   └── YOLO-conversion-script.py
│
├── runs/                            # Output log, bobot, & grafik training YOLO
├── requirements.txt                 # Dependensi Python proyek
├── .gitignore                       # Git ignore file
└── README.md                        # Dokumentasi utama proyek
```

---

## 🔄 Machine Learning Workflow

```
┌────────────────────────────────────────────────────────┐
│                   DATASET (2009 Images)                │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│              01. EXPLORATORY DATA ANALYSIS             │
│   • Class distribution (Imbalance analysis)            │
│   • Bounding box dimensions & sample visualization     │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             02. PREPROCESSING & SPLITTING              │
│   • Train: 70% (1406) | Val: 20% (401) | Test: 10% (202)│
│   • Generate data/data.yaml                            │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             03. DATA VALIDATION & QA                   │
│   • 0 corrupt images | 0 invalid bbox | 0 data leakage │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             04. MODEL TRAINING (YOLOv8n)               │
│   • Transfer Learning dari yolov8n.pt (COCO)           │
│   • 15 Epochs, batch=16, imgsz=640, seed=42            │
│   • Output model: backend/models/road_damage.pt        │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             05. EVALUATION & PERFORMANCE               │
│   • Precision, Recall, mAP@50, mAP@50-95               │
│   • Confusion Matrix, PR Curve, F1 Curve               │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│         06. OVERFITTING / UNDERFITTING DIAGNOSIS       │
│   • Train Loss vs Val Loss analysis                    │
│   • Generalization verification (Good Fit)             │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             07. INFERENCE ON UNSEEN IMAGES             │
│   • Test set evaluation & Real-time latency benchmark  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             DEPLOYMENT: FASTAPI & REACT UI             │
│   • POST /predict -> Real-time Detection & Web Display │
└────────────────────────────────────────────────────────┘
```

---

## 📓 Panduan Menjalankan Notebook (01 - 07)

Semua notebook berada di dalam folder `notebooks/` dan dapat dijalankan menggunakan **Jupyter Notebook** atau **VS Code / JupyterLab**:

```bash
# 1. Pastikan virtual environment / dependensi aktif
pip install -r requirements.txt

# 2. Buka Jupyter Notebook
jupyter notebook notebooks/
```

Jalankan notebook secara berurutan:
1. `01_EDA.ipynb`: Analisis eksplorasi dataset awal.
2. `02_Data_Preprocessing.ipynb`: Pembuatan partisi data Train/Val/Test.
3. `03_Data_Validation.ipynb`: Verifikasi kualitas dataset.
4. `04_Model_Training.ipynb`: Pelatihan model YOLOv8n.
5. `05_Model_Evaluation.ipynb`: Evaluasi metrik mAP dan Confusion Matrix.
6. `06_Overfitting_Underfitting.ipynb`: Diagnosis kurva loss dan generalisasi.
7. `07_Inference_Testing.ipynb`: Uji prediksi visual dan kecepatan FPS.

---

## 🏋️ Panduan Training Model

Untuk melatih model secara langsung melalui script Python atau CLI:

### Menggunakan Python Script:
```python
from ultralytics import YOLO

# Load model pretrained
model = YOLO("yolov8n.pt")

# Jalankan training
results = model.train(
    data="data/data.yaml",
    epochs=15,
    imgsz=640,
    batch=16,
    seed=42,
    project="runs/detect",
    name="train"
)
```

Hasil training akan tersimpan otomatis di `runs/detect/train/weights/best.pt` dan disalin ke `backend/models/road_damage.pt`.

---

## ⚡ Panduan Menjalankan Backend (FastAPI)

```bash
# Masuk ke direktori backend (opsional) atau jalankan dari root:
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

- **Backend Base URL:** `http://127.0.0.1:8000`
- **Swagger Interactive API Docs:** `http://127.0.0.1:8000/docs`
- **Redoc Documentation:** `http://127.0.0.1:8000/redoc`

---

## 💻 Panduan Menjalankan Frontend (React + Vite)

```bash
# Masuk ke folder frontend
cd frontend

# Install dependensi (hanya saat pertama kali)
npm install

# Jalankan Vite development server
npm run dev
```

Buka browser pada alamat: **`http://localhost:5173`**.

---

## 📡 Dokumentasi API Endpoints

### 1. Health Check
- **Method:** `GET`
- **URL:** `/health`
- **Response:**
```json
{
  "status": "ok",
  "model_loaded": true,
  "model_path": "Z:\\Projects\\RoadDamage_AI\\backend\\models\\road_damage.pt",
  "classes": ["pothole", "crack", "manhole"]
}
```

### 2. Predict Road Damage
- **Method:** `POST`
- **URL:** `/predict`
- **Form Data:**
  - `file`: File gambar (JPG/PNG)
  - `conf`: Ambang batas confidence (default: `0.25`)
- **Response:**
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
      "confidence": 0.8912,
      "bbox": [145.2, 210.4, 280.6, 320.0]
    },
    {
      "class_id": 1,
      "class_name": "crack",
      "confidence": 0.7421,
      "bbox": [320.0, 150.0, 520.1, 260.5]
    }
  ],
  "annotated_image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

---

## 📈 Evaluasi Model & Metrik

Evaluasi dilakukan pada subset **Validation (401 gambar)**:

- **Precision (P):** Mengukur ketepatan deteksi bounding box yang diprediksi (meminimalkan alarm palsu).
- **Recall (R):** Mengukur sensitivitas model dalam menangkap semua kerusakan jalan nyata.
- **mAP@50 (Mean Average Precision @ IoU 0.50):** Rata-rata precision pada IoU 50%.
- **mAP@50-95:** Metrik komprehensif pada rentang IoU 0.50 s.d. 0.95.

### Karakteristik Performa per Kelas:
1. **Crack (Retakan):** Mendapatkan jumlah sampel terbanyak sehingga fitur visual retakan aspal dipelajari secara optimal.
2. **Pothole (Lubang):** Memiliki variasi kedalaman dan bayangan, namun berhasil dideteksi dengan baik pada ambang confidence 0.25.
3. **Manhole (Tutup Got):** Bentuk bundar/persegi teratur memudahkan lokalisasi posisi objek.

---

## 🔬 Analisis Overfitting / Underfitting

Berdasarkan perbandingan kurva pelatihan pada `06_Overfitting_Underfitting.ipynb`:
1. **Konvergensi Loss:** Baik *Train Box/Cls Loss* maupun *Val Box/Cls Loss* mengalami penurunan stabil tanpa divergensi tajam.
2. **Kapasitas Model:** Arsitektur **YOLOv8n** yang memiliki parameter kompak (~3.2 Juta parameter) sangat tepat untuk mencegah *overfitting* pada dataset ~2,000 gambar.
3. **Kesimpulan Diagnostik:** Model berada dalam status **Good Fit / Well-Generalized** (mampu menggeneralisasi citra jalan baru tanpa mengalami penghafalan data).

---

## ⚠️ Batasan Sistem (Limitations)
1. **Kondisi Cuaca Ekstrem:** Model dilatih pada dataset kondisi siang hari normal; performa pada malam hari dengan pencahayaan minim belum diuji secara ekstensif.
2. **Kamera Bergerak Sangat Cepat:** Motion blur parah dapat menurunkan akurasi deteksi retakan halus.
3. **Class Imbalance:** Jumlah objek *Manhole* lebih sedikit dibanding *Crack*.

---

## 🚀 Rencana Pengembangan (Future Improvement)
1. **Penambahan Data Malam & Cuaca Hujan:** Mengumpulkan citra malam hari dan saat hujan untuk meningkatkan *robustness*.
2. **Model Quantization (ONNX / TensorRT):** Mengonversi model ke format ONNX/TensorRT untuk akselerasi inferensi pada perangkat mini PC (*Raspberry Pi 5 / Jetson Nano*).
3. **Integrasi GPS & Heatmap GIS:** Menyimpan koordinat GPS dari kendaraan patroli jalan untuk membuat peta sebaran kerusakan jalan (*Road Damage Heatmap*).

---

## 👥 Tim Pengembang
- **Kelompok Road Damage** - Week 3 Assignment Machine Learning & Computer Vision
