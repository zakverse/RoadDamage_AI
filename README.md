# 🛣️ RoadDamage AI

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB.svg?logo=python&logoColor=white)](https://www.python.org/)
[![YOLOv8](https://img.shields.io/badge/YOLOv8-Ultralytics-0052FF.svg?logo=yolo&logoColor=white)](https://docs.ultralytics.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**RoadDamage AI** adalah sistem deteksi kerusakan jalan berbasis Computer Vision (*Object Detection*) menggunakan model **YOLOv8n** dengan pendekatan *Transfer Learning*. Sistem ini mampu mendeteksi dan melokalisasi tiga kategori kondisi permukaan jalan (**Pothole**, **Crack**, dan **Manhole**) secara otomatis melalui citra digital dengan antarmuka web interaktif dan REST API backend.

---

## 📌 Tentang Project

Project ini dikembangkan sebagai bagian dari tugas dan pembelajaran selama **internship di Vinix7**. Tujuan utama dari project ini adalah:
1. Menerapkan alur kerja *Machine Learning* dan *Computer Vision* secara *end-to-end*, mulai dari eksplorasi data (*EDA*), prapemrosesan, validasi data, pelatihan model, evaluasi performa, hingga deployment.
2. Membangun model *baseline* deteksi kerusakan jalan yang ringan (*lightweight*) dan cepat agar dapat diintegrasikan dengan aplikasi web secara *real-time*.
3. Menyediakan antarmuka visual yang mudah digunakan bagi pengguna untuk mengunggah foto jalan dan melihat hasil deteksi secara langsung.

---

## 🔍 Project Overview

- **Masalah:** Kerusakan jalan seperti lubang (*potholes*) dan retakan (*cracks*) yang terlambat diperbaiki sering memicu kecelakaan lalu lintas dan merusak kendaraan. Survei jalan manual membutuhkan waktu lama, biaya tinggi, dan rawan kesalahan pencatatan.
- **Pendekatan:** Menggunakan algoritma Deep Learning modern berbasis single-stage object detector (**YOLOv8n**) yang telah dilatih awal (*pretrained*) pada dataset MS COCO, kemudian disesuaikan (*fine-tuned*) pada dataset citra jalan raya.
- **Model:** YOLOv8n (Nano) dengan ~3.0 Juta parameter, dirancang untuk efisiensi komputasi dan latensi inferensi rendah.
- **Dataset:** 2,009 citra jalan raya dengan total 4,737 objek anotasi.
- **Output Sistem:** Citra teranotasi dengan kotak pembatas (*bounding boxes*), label kelas kerusakan, skor keyakinan (*confidence score*), serta rekap statistik jumlah objek terdeteksi.

---

## ✨ Features

- 🎯 **Deteksi Kerusakan Jalan Otomatis:** Mengidentifikasi dan menandai posisi kerusakan jalan dari gambar.
- 🏷️ **3 Kategori Kerusakan:** Mendeteksi *Pothole* (lubang jalan), *Crack* (retakan aspal), dan *Manhole* (tutup utilitas/saluran air).
- 📤 **Upload Gambar Interaktif:** Mendukung fitur drag-and-drop file gambar (JPG, PNG, WEBP) serta tombol sampel instan untuk pengujian cepat.
- 🎚️ **Slider Ambang Batas Keyakinan (*Confidence Threshold*):** Pengguna dapat menyesuaikan sensitivitas deteksi secara dinamis (10% s.d. 90%).
- 🖼️ **Visualisasi Bounding Box:** Menampilkan kotak pembatas warna-warni pada area kerusakan lengkap dengan tombol *toggle* untuk melihat foto asli.
- 📊 **Tabel Rincian Objek:** Menyajikan daftar setiap objek terdeteksi, persentase confidence, dan koordinat bounding box `[x1, y1, x2, y2]`.
- 🔌 **REST API Siap Pakai:** Dilengkapi endpoint FastAPI untuk integrasi sistem eksternal (`/health` dan `/predict`).
- 📓 **Dokumentasi Eksperimen Terstruktur:** 7 Jupyter Notebook lengkap yang mendokumentasikan setiap tahapan pengembangan model.

---

## 🛠️ Tech Stack

### Machine Learning & Computer Vision
- **Python 3.9+** — Bahasa pemrograman utama.
- **YOLOv8 (Ultralytics)** — Arsitektur object detection modern dan framework pelatihan.
- **PyTorch** — Deep learning framework untuk komputasi tensor dan autograd.
- **OpenCV & Pillow** — Pengolahan citra dan manipulasi visual.
- **Pandas, NumPy, Matplotlib, Seaborn** — Manipulasi data, perhitungan metrik, dan plotting grafik.

### Backend
- **FastAPI** — Web framework asynchronous Python berkinerja tinggi.
- **Uvicorn** — ASGI web server untuk menjalankan aplikasi backend.
- **Pydantic** — Validasi tipe data dan manajemen skema request/response.

### Frontend
- **React 18** — Library JavaScript berbasis komponen untuk antarmuka pengguna.
- **Vite** — Build tool modern dengan Hot Module Replacement (HMR) cepat.
- **Tailwind CSS** — Framework utility-first CSS untuk implementasi desain *Claymorphism* yang responsif.
- **Lucide React** — Kumpulan ikon antarmuka yang modern dan konsisten.

---

## 📊 Dataset

Dataset yang digunakan bersumber dari citra survei jalan raya dengan total **2,009 gambar** dan **4,737 objek anotasi**.

### Distribusi Kelas & Tantangan Imbalance
| Class ID | Kelas | Deskripsi Fisik | Jumlah Objek | Persentase | Karakteristik |
|:---:|:---:|:---|:---:|:---:|:---|
| **0** | `pothole` | Lubang pada aspal | 1,261 | 26.6% | Bentuk cekung dengan variasi kedalaman |
| **1** | `crack` | Retakan permukaan jalan | 2,519 | 53.2% | **Mayoritas**; bentuk memanjang dan tipis |
| **2** | `manhole` | Tutup got / saluran air | 957 | 20.2% | **Minoritas**; bentuk geometris teratur |

> ℹ️ **Catatan Ketidakseimbangan (*Class Imbalance*):**  
> Kelas `crack` mendominasi lebih dari 50% anotasi dataset, sementara `manhole` hanya mencakup ~20%. Hal ini menjadi pertimbangan penting dalam evaluasi metrik per kelas.

### Pembagian Data (*Data Split*)
Dataset dibagi secara acak berlapis dengan proporsi standar:
- **Train Set (70%):** 1,406 gambar — Digunakan untuk memperbarui bobot model.
- **Validation Set (20%):** 401 gambar — Digunakan untuk memantau proses training dan memilih model terbaik (*best checkpoint*).
- **Test Set (10%):** 202 gambar — Data uji independen (*unseen*) yang tidak pernah dilihat model selama pelatihan.

---

## 🔄 Machine Learning Workflow

Alur kerja machine learning pada project ini dirancang secara berurutan dan transparan melalui 7 tahapan notebook:

```text
┌──────────────┐     ┌───────────────────────┐     ┌─────────────────────┐
│ 01. EDA      │ ──> │ 02. Preprocessing     │ ──> │ 03. Validation      │
│  Distribusi  │     │  Split 70/20/10       │     │  Cek Integritas     │
│  & Bounding  │     │  & File data.yaml     │     │  & Bebas Leakage    │
└──────────────┘     └───────────────────────┘     └─────────────────────┘
                                                              │
                                                              ▼
┌──────────────┐     ┌───────────────────────┐     ┌─────────────────────┐
│ 06. Diagnosis│ <── │ 05. Model Evaluation  │ <── │ 04. Model Training  │
│  Overfit vs  │     │  mAP, Precision,      │     │  YOLOv8n 50 Epochs  │
│  Underfit    │     │  Recall, CM Matrix    │     │  Transfer Learning  │
└──────────────┘     └───────────────────────┘     └─────────────────────┘
       │
       ▼
┌──────────────┐     ┌───────────────────────┐
│ 07. Inference│ ──> │ Deployment            │
│  Test Set &  │     │  FastAPI Backend      │
│  FPS Speed   │     │  + React Web UI       │
└──────────────┘     └───────────────────────┘
```

---

## 🏋️ Model Training

Pelatihan model baseline menggunakan konfigurasi berikut:
- **Arsitektur Model:** `yolov8n.pt` (Pretrained backbone dari COCO)
- **Dataset Configuration:** `data/data.yaml`
- **Total Epochs:** 50 Epochs
- **Image Size:** 640 × 640 piksel
- **Batch Size:** 16
- **Optimizer:** AdamW (*automatic learning rate schedule*)
- **Early Stopping:** Patience = 10 epoch
- **Device:** CPU (Intel Core i5 multi-threaded)
- **Model Output:** Checkpoint terbaik disimpan di `backend/models/road_damage.pt` (ukuran file: ~5.93 MB)

> 💡 **Apa itu Epoch?**  
> **Epoch** adalah satu putaran penuh di mana seluruh data training telah dipelajari oleh model satu kali. Pelatihan 50 epoch berarti model melihat dataset training sebanyak 50 kali untuk menyempurnakan deteksinya.

---

## 📈 Evaluation Results

Berikut adalah hasil evaluasi resmi model baseline 50-epoch pada subset **Validation (401 gambar)** dan **Test Set (202 gambar unseen)**:

| Metrik Evaluasi | Validation Set (401 Gambar) | Test Set Unseen (202 Gambar) | Penjelasan Sederhana |
|---|:---:|:---:|:---|
| **Precision (P)** | **0.5390** (53.90%) | **0.5676** (56.76%) | Dari semua kotak yang ditebak model, seberapa banyak yang benar-benar kerusakan jalan (mengurangi alarm palsu). |
| **Recall (R)** | **0.4740** (47.40%) | **0.4598** (45.98%) | Dari semua kerusakan jalan nyata di lapangan, seberapa banyak yang berhasil ditemukan model. |
| **mAP@50** | **0.4673** (46.73%) | **0.4753** (47.53%) | Rata-rata akurasi deteksi dengan ambang tumpang tindih (*IoU*) minimal 50%. |
| **mAP@50-95** | **0.2003** (20.03%) | **0.2040** (20.40%) | Rata-rata ketepatan posisi kotak pembatas pada berbagai ambang batas ketat (IoU 50% sampai 95%). |
| **Inference Latency** | ~51.0 ms/gambar | **~50.7 ms/gambar** | Waktu yang dibutuhkan model untuk memproses satu gambar di CPU (~19.7 Frame Per Second). |

> 💡 **Apa itu mAP (Mean Average Precision)?**  
> **mAP** adalah skor standar industri untuk mengukur kualitas model Object Detection, menggabungkan seberapa tepat tebakan model (*Precision*) dan seberapa lengkap objek yang ditemukan (*Recall*). Nilai berkisar antara 0.0 (buruk) hingga 1.0 (sempurna).

---

## 🎯 Per-Class Performance

Evaluasi mendalam per kategori kerusakan pada **Test Set (202 gambar)**:

| Kategori Kerusakan | Jumlah Gambar | Total Objek | Precision (P) | Recall (R) | mAP@50 | mAP@50-95 | Analisis Karakteristik |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| **Manhole** | 70 | 92 | **0.6970** | **0.6410** | **0.6920** | **0.3290** | Performa tertinggi karena bentuk tutup saluran air bundar/persegi teratur dan kontras dengan aspal. |
| **Pothole** | 77 | 129 | **0.5320** | **0.3640** | **0.4000** | **0.1630** | Presisi baik (>53%), namun recall lebih rendah karena lubang kecil/dangkal sering menyerupai bercak aspal. |
| **Crack** | 140 | 272 | **0.4740** | **0.3740** | **0.3340** | **0.1200** | Memiliki tingkat kesulitan tertinggi karena garis retakan tipis dan mudah tersamar oleh tekstur jalan. |

---

## 🔬 Overfitting & Underfitting

Pada audit awal, eksperimen singkat dengan **4 epoch** menunjukkan model berada dalam kondisi **under-trained** (*mAP@50 hanya 0.2119 dan loss masih tinggi ~2.26*). Model belum sempat mempelajari pola fitur visual secara optimal.

Setelah durasi pelatihan diperpanjang menjadi **50 epoch**:
1. **Penurunan Loss yang Stabil:** Training Classification Loss turun konsisten dari **3.66 ke 1.22**, dan Validation Classification Loss turun dari **3.46 ke 1.88** tanpa menunjukkan kurva berbalik naik (*divergence*).
2. **Generalisasi yang Konsisten:** Nilai **mAP@50 pada Validation Set (46.73%)** dan **Test Set (47.53%)** menunjukkan angka yang hampir identik. Hal ini membuktikan bahwa model tidak sekadar menghafal data latihan (*tidak overfitting*).
3. **Status Baseline:** Model ini merupakan **baseline yang sudah cukup baik untuk eksperimen lanjutan**, bukan model yang sempurna atau siap pakai di lingkungan produksi kritis. Masih terdapat ruang peningkatan, terutama pada sensitivitas deteksi retakan (*crack*).

---

## 🏗️ Project Architecture

Alur pertukaran data dari antarmuka pengguna hingga inferensi model:

```text
┌────────────────────────────────────────┐
│            User / Browser              │
│       http://localhost:5173/           │
└───────────────────┬────────────────────┘
                    │
                    │ 1. Unggah Gambar & Set Confidence
                    ▼
┌────────────────────────────────────────┐
│         Frontend (React + Vite)        │
│    • Drag-and-drop Dropzone            │
│    • Slider Ambang Batas Keyakinan     │
│    • Toggle Original / Bounding Box    │
└───────────────────┬────────────────────┘
                    │
                    │ 2. HTTP POST /predict (Multipart Form)
                    ▼
┌────────────────────────────────────────┐
│         Backend (FastAPI)              │
│    • Endpoint /health & /predict       │
│    • Validasi File Gambar & Schema     │
└───────────────────┬────────────────────┘
                    │
                    │ 3. Panggil Inference Service
                    ▼
┌────────────────────────────────────────┐
│       YOLOv8n Model Engine             │
│   backend/models/road_damage.pt        │
│    • Preprocessing citra (640x640)     │
│    • Non-Maximum Suppression (NMS)     │
└───────────────────┬────────────────────┘
                    │
                    │ 4. Output: Bounding Box & Class Scores
                    ▼
┌────────────────────────────────────────┐
│         Hasil Deteksi Teranotasi       │
│    • Base64 Annotated Image            │
│    • List Koordinat Bounding Box       │
│    • Rekap Jumlah Kerusakan per Kelas  │
└────────────────────────────────────────┘
```

---

## 📁 Project Structure

Struktur folder aktual pada repository ini:

```text
RoadDamage_AI/
│
├── backend/                         # Layanan REST API Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py                # Konfigurasi path model & parameter
│   │   ├── main.py                  # API endpoints, CORS, & error handler
│   │   ├── model.py                 # Service loader & inferensi YOLOv8n
│   │   └── schemas.py               # Skema Pydantic request & response
│   ├── models/
│   │   ├── road_damage.pt           # Checkpoint model terbaik 50-epoch (5.93 MB)
│   │   └── road_damage_4epoch.pt    # Backup model baseline lama (4-epoch)
│   ├── requirements.txt             # Dependensi Python backend
│   └── README.md                    # Dokumentasi internal backend
│
├── frontend/                        # Aplikasi Web Frontend
│   ├── public/
│   │   ├── logo.png                 # Logo aplikasi untuk favicon & assets
│   │   └── samples/                 # Gambar sampel jalan untuk uji coba 1-klik
│   │       ├── sample_crack_manhole.jpg
│   │       ├── sample_pothole.jpg
│   │       └── sample_road.jpg
│   ├── src/
│   │   ├── components/
│   │   │   ├── ClassBadge.jsx       # Badge kategori berwarna
│   │   │   ├── DamageTypes.jsx      # Kartu informasi 3 jenis kerusakan
│   │   │   ├── DetectionResult.jsx  # Tampilan visual hasil anotasi & tabel objek
│   │   │   ├── FinalCTA.jsx         # Bagian Call-To-Action bawah
│   │   │   ├── Footer.jsx           # Footer aplikasi
│   │   │   ├── Header.jsx           # Navbar dengan indikator status backend
│   │   │   ├── Hero.jsx             # Hero section dengan kartu preview 3D
│   │   │   ├── HowItWorks.jsx       # Penjelasan 3 langkah kerja sistem
│   │   │   ├── ImageUploader.jsx    # Area drag-and-drop & slider confidence
│   │   │   ├── ModelInfo.jsx        # Spesifikasi model YOLOv8n
│   │   │   ├── QuickStats.jsx       # Kartu ringkasan 4 statistik project
│   │   │   └── StatsCard.jsx        # Kartu counter jumlah deteksi
│   │   ├── App.jsx                  # Komponen utama aplikasi
│   │   ├── index.css                # Styling Tailwind CSS & Claymorphism
│   │   ├── logo.png                 # Asset logo utama
│   │   └── main.jsx                 # Entry point React
│   ├── index.html                   # File HTML utama
│   ├── package.json                 # Dependensi Node.js frontend
│   ├── postcss.config.js            # Konfigurasi PostCSS
│   ├── tailwind.config.js           # Konfigurasi token & palet Tailwind CSS
│   └── vite.config.js               # Konfigurasi Vite bundler
│
├── data/                            # Dataset citra dan anotasi
│   ├── annotations_coco.json        # Format anotasi COCO JSON
│   ├── data.yaml                    # Konfigurasi subset dan nama kelas YOLO
│   ├── images/                      # Kumpulan 2,009 gambar jalan original
│   ├── labels/                      # Anotasi polygon original
│   ├── labels-YOLO/                 # Anotasi format YOLO normalized bbox
│   ├── train/                       # 1,406 citra dan label pelatihan
│   ├── val/                         # 401 citra dan label validasi
│   └── test/                        # 202 citra dan label pengujian
│
├── notebooks/                       # 7 Jupyter Notebook alur ML
│   ├── 01_EDA.ipynb                 # Analisis eksploratif data & distribusi
│   ├── 02_Data_Preprocessing.ipynb  # Pembagian subset data 70/20/10
│   ├── 03_Data_Validation.ipynb     # Verifikasi integritas data & bounding box
│   ├── 04_Model_Training.ipynb      # Pelatihan YOLOv8n transfer learning
│   ├── 05_Model_Evaluation.ipynb    # Evaluasi metrik mAP, Confusion Matrix
│   ├── 06_Overfitting_Underfitting.ipynb # Analisis kurva loss & generalisasi
│   └── 07_Inference_Testing.ipynb   # Pengujian visual pada test set & benchmark FPS
│
├── ppt/                             # Presentasi Project
│   ├── RoadDamage_AI_Presentation_V2.pptx # Slide presentasi lengkap (14 slides)
│   └── assets/                      # Visualisasi grafik resolusi tinggi
│
├── scripts/                         # Script utilitas konversi format anotasi
│   ├── COCO-conversion-script.py
│   └── YOLO-conversion-script.py
│
├── requirements.txt                 # Dependensi Python global
├── .gitignore                       # Berkas pengecualian Git
└── README.md                        # Dokumentasi utama proyek
```

---

## 🚀 How to Run

Ikuti langkah-langkah berikut untuk menjalankan project ini secara lokal di komputer Anda:

### 1. Clone Repository
```bash
git clone https://github.com/zakverse/RoadDamage_AI.git
cd RoadDamage_AI
```

### 2. Install Dependensi Python
Disarankan menggunakan virtual environment (Python 3.9+):
```bash
# Membuat & mengaktifkan virtual environment (opsional)
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependensi
pip install -r requirements.txt
```

### 3. Jalankan Backend (FastAPI)
Buka terminal dan jalankan perintah berikut dari root project:
```bash
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```
Pastikan terminal menampilkan bahwa model berhasil dimuat:
`INFO: Uvicorn running on http://127.0.0.1:8000`

### 4. Install Dependensi & Jalankan Frontend (React)
Buka tab terminal baru:
```bash
cd frontend
npm install
npm run dev
```

### 5. Buka di Browser
Akses aplikasi melalui browser di alamat:
👉 **`http://localhost:5173/`**

- Status backend di pojok kanan atas akan menyala hijau bertuliskan **Ready**.
- Anda dapat mengunggah gambar jalan Anda sendiri atau menggunakan tombol sampel jalan yang tersedia untuk melakukan uji coba deteksi secara instan.

---

## 🔌 API Endpoints

FastAPI menyediakan dokumentasi interaktif Swagger UI yang dapat diakses langsung di: **`http://127.0.0.1:8000/docs`**.

### 1. Health Check
Memeriksa status operasional backend dan status pemuatan bobot model YOLO.
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
Mengirim citra jalan untuk dideteksi oleh model YOLOv8n.
- **Method:** `POST`
- **URL:** `/predict`
- **Body (Multipart/Form-Data):**
  - `file`: File gambar (JPG, PNG, atau WEBP)
  - `conf`: Ambang batas confidence *(opsional, default: `0.25`)*
- **Contoh Request (cURL):**
```bash
curl -X POST "http://127.0.0.1:8000/predict?conf=0.25" \
  -F "file=@data/test/images/20250219_164838.jpg"
```
- **Contoh Response JSON:**
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

## 📓 Notebooks

Folder `notebooks/` berisi 7 Jupyter Notebook yang dapat dijalankan secara berurutan untuk menelusuri seluruh siklus eksperimen:

| File Notebook | Nama Tahapan | Tujuan & Konten Utama |
|---|---|---|
| **`01_EDA.ipynb`** | Exploratory Data Analysis | Menganalisis distribusi kelas, memeriksa ketidakseimbangan data, visualisasi ukuran bounding box, dan inspeksi visual sampel citra jalan. |
| **`02_Data_Preprocessing.ipynb`** | Data Preprocessing | Melakukan partisi dataset menjadi Train (70%), Val (20%), dan Test (10%), serta menyusun file konfigurasi `data/data.yaml`. |
| **`03_Data_Validation.ipynb`** | Data Validation & QA | Melakukan *Quality Assurance* untuk memastikan 0 citra korup, 0 label kosong di luar format, dan bebas dari kebocoran data (*data leakage*). |
| **`04_Model_Training.ipynb`** | Model Training | Melatih model YOLOv8n menggunakan transfer learning selama 50 epoch dan menyimpan bobot model terbaik ke direktori backend. |
| **`05_Model_Evaluation.ipynb`** | Model Evaluation | Menghitung metrik performa (Precision, Recall, mAP@50, mAP@50-95), plotting Confusion Matrix, dan kurva Precision-Recall (PR Curve). |
| **`06_Overfitting_Underfitting.ipynb`** | Overfitting / Underfitting Analysis | Mendiagnosis kurva pelatihan (Train Loss vs Val Loss) untuk memverifikasi apakah model mengalami underfitting atau overfitting. |
| **`07_Inference_Testing.ipynb`** | Inference Testing | Menguji model pada data uji baru (*Test Set*), memvisualisasikan hasil deteksi bounding box, dan mengukur kecepatan inferensi (FPS). |

---

## ⚠️ Limitations

Secara objektif, model baseline saat ini memiliki beberapa keterbatasan:
1. **Ukuran Dataset Terbatas:** Total 2,009 citra tergolong berukuran kecil untuk model deep learning object detection, sehingga kemampuan menangani skenario jalanan yang sangat bervariasi masih terbatas.
2. **Ketidakseimbangan Kelas (*Class Imbalance*):** Objek `crack` memiliki jumlah sampel jauh lebih banyak (~53%) dibandingkan `pothole` (~26%) dan `manhole` (~20%).
3. **Deteksi Retakan Lebih Sulit:** Pola retakan (*crack*) tipis dan memanjang sering kali menyerupai tekstur aspal kasar atau bayangan pohon, sehingga skor mAP50 retakan (33.4%) lebih rendah dibanding manhole (69.2%).
4. **Komputasi Pelatihan pada CPU:** Pelatihan baseline dilakukan pada CPU sehingga memerlukan waktu komputasi yang lebih lama per epoch dibandingkan lingkungan GPU modern.
5. **Status Model Baseline:** Model ini adalah model baseline awal yang solid untuk evaluasi konsep, bukan model final yang siap untuk deployment armada berskala besar.

---

## 🔮 Future Improvements

Beberapa rencana peningkatan yang dapat dilakukan pada iterasi mendatang:
1. **Pelatihan dengan Akselerasi GPU:** Memanfaatkan GPU CUDA untuk mempercepat waktu komputasi pelatihan dan memungkinkan eksplorasi epoch yang lebih banyak.
2. **Hyperparameter Tuning:** Melakukan eksperimen sistematis pada *learning rate*, *weight decay*, dan *optimizer* untuk mencari titik konvergensi terbaik.
3. **Augmentasi Data Khusus Retakan:** Mengimplementasikan teknik augmentasi spasial seperti *Mosaic*, *MixUp*, atau *Copy-Paste augmentation* untuk memperkaya variasi sampel retakan dan lubang.
4. **Penanganan Ketidakseimbangan Kelas:** Menerapkan pembobotan loss (*loss weighting*) atau *focal loss* untuk meningkatkan recall pada kelas minoritas.
5. **Eksplorasi Skala Backbone (YOLOv8s):** Menguji arsitektur yang lebih dalam seperti YOLOv8s (*Small*) guna menangkap fitur visual yang lebih detail jika sumber daya komputasi tersedia.
6. **Ekspansi Dataset:** Mengumpulkan citra tambahan pada kondisi pencahayaan minim (malam hari), jalan basah setelah hujan, dan berbagai jenis permukaan jalan lainnya.

---

## 🎓 Internship Context

Project **RoadDamage AI** disusun sebagai bagian dari proses pembelajaran dan tugas praktik selama program **internship di Vinix7**. Melalui project ini, peserta magang mempraktikkan keterampilan langsung dalam:
- Memahami dan mengelola alur kerja Machine Learning yang terstruktur dan terukur.
- Menganalisis metrik Computer Vision secara objektif berbasis data aktual tanpa asumsi spekulatif.
- Mengintegrasikan model Machine Learning ke dalam arsitektur software nyata menggunakan backend FastAPI dan antarmuka web modern berbasis React.
- Menyusun dokumentasi teknis dan materi presentasi yang profesional dan mudah dipahami oleh berbagai kalangan.

---

## 👥 Tim Pengembang

Project ini dikembangkan oleh:
- **Kelompok 2 - Road Damage** — *Internship Project di Vinix7*
