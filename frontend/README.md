# RoadDamage_AI - Frontend (React + Vite)

Antarmuka web modern, cepat, dan responsif berbasis **React + Vite** untuk mengunggah gambar dan memvisualisasikan hasil deteksi kerusakan jalan secara interaktif.

---

## 📁 Struktur Folder
```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Header bar & backend health status
│   │   ├── ImageUploader.jsx    # Drag-and-drop uploader & confidence slider
│   │   ├── DetectionResult.jsx  # Visualisasi gambar ber-bounding box & tabel deteksi
│   │   ├── StatsCard.jsx        # Kartu statistik ringkasan objek
│   │   └── ClassBadge.jsx       # Badge kategori (Pothole, Crack, Manhole)
│   ├── App.jsx                  # Main component & API integration
│   ├── main.jsx                 # React DOM root
│   └── index.css                # Custom modern styling
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Cara Menjalankan Frontend

### 1. Masuk ke folder frontend & install dependencies (jika belum):
```bash
cd frontend
npm install
```

### 2. Jalankan development server:
```bash
npm run dev
```

Aplikasi web dapat diakses melalui browser di `http://localhost:5173`.

---

## 🔗 Integrasi Backend
Frontend secara otomatis berkomunikasi dengan Backend FastAPI di `http://127.0.0.1:8000`:
- `GET /health`: Memeriksa ketersediaan server & model secara periodik.
- `POST /predict`: Mengirim file gambar dan confidence threshold yang dipilih pengguna, lalu menerima bounding boxes dan gambar hasil anotasi.
