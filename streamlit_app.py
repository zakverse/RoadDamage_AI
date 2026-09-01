import io
import time
from pathlib import Path
import cv2
import streamlit as st
from PIL import Image
import numpy as np
import pandas as pd
from ultralytics import YOLO

# ==========================================
# 1. Konfigurasi Halaman & Metadata
# ==========================================
st.set_page_config(
    page_title="RoadDamage AI - Road Damage Detection",
    page_icon="🛣️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Definisi path model aman menggunakan pathlib (kompatibel Linux & Windows)
ROOT_DIR = Path(__file__).resolve().parent
MODEL_PATH = ROOT_DIR / "backend" / "models" / "road_damage.pt"
SAMPLES_DIR = ROOT_DIR / "frontend" / "public" / "samples"
LOGO_PATH = ROOT_DIR / "frontend" / "public" / "logo.png"

CLASS_NAMES = {
    0: "pothole",
    1: "crack",
    2: "manhole"
}

CLASS_ICONS = {
    "pothole": "🕳️ Pothole",
    "crack": "⚡ Crack",
    "manhole": "🔘 Manhole"
}

# ==========================================
# 2. Custom CSS (Claymorphism Style)
# ==========================================
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

    /* Global background */
    .stApp {
        background-color: #F8F6F0;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #1E293B;
    }

    /* Headings font */
    h1, h2, h3, h4 {
        font-family: 'Fredoka', sans-serif !important;
        font-weight: 700 !important;
        color: #0F172A !important;
    }

    /* Claymorphism Card Container */
    .clay-card {
        background: #FFFFFF;
        border-radius: 24px;
        border: 2px solid #EAE5D9;
        box-shadow: 0 8px 0 #DCD6C5, 0 16px 24px -6px rgba(0, 0, 0, 0.05);
        padding: 24px;
        margin-bottom: 20px;
    }

    /* Stat Cards */
    .metric-card {
        background: #FFFFFF;
        border-radius: 20px;
        border: 2px solid #EAE5D9;
        box-shadow: 0 5px 0 #DCD6C5, 0 10px 18px -4px rgba(0, 0, 0, 0.04);
        padding: 16px;
        text-align: center;
    }

    .metric-title {
        font-size: 0.8rem;
        font-weight: 700;
        color: #64748B;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .metric-value {
        font-family: 'Fredoka', sans-serif;
        font-size: 2rem;
        font-weight: 700;
        color: #0F172A;
        margin-top: 4px;
    }

    /* Class Badges */
    .badge-pothole {
        background-color: #FEF3C7;
        color: #92400E;
        border: 1.5px solid #FCD34D;
        padding: 4px 10px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 0.75rem;
    }

    .badge-crack {
        background-color: #FFE4E6;
        color: #9F1239;
        border: 1.5px solid #FDA4AF;
        padding: 4px 10px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 0.75rem;
    }

    .badge-manhole {
        background-color: #E0F2FE;
        color: #075985;
        border: 1.5px solid #7DD3FC;
        padding: 4px 10px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 0.75rem;
    }

    /* 3D Primary Button */
    div.stButton > button:first-child {
        background: linear-gradient(180deg, #10B981 0%, #059669 100%);
        color: #FFFFFF;
        font-family: 'Fredoka', sans-serif;
        font-weight: 700;
        font-size: 1.1rem;
        border: 2px solid #047857;
        border-radius: 18px;
        box-shadow: 0 5px 0 #047857, 0 10px 15px -3px rgba(16, 185, 129, 0.3);
        padding: 12px 28px;
        width: 100%;
        transition: all 0.15s ease-in-out;
    }

    div.stButton > button:first-child:hover {
        transform: translateY(2px);
        box-shadow: 0 3px 0 #047857, 0 6px 10px -2px rgba(16, 185, 129, 0.3);
    }

    /* Sidebar Styling */
    section[data-testid="stSidebar"] {
        background-color: #F3EFE6;
        border-right: 2px solid #EAE5D9;
    }
</style>
""", unsafe_allow_html=True)


# ==========================================
# 3. Model Loader (Cached)
# ==========================================
@st.cache_resource(show_spinner="Memuat model YOLOv8n...")
def load_yolo_model():
    """Memuat model YOLOv8n satu kali dan disimpan di memori cache."""
    if not MODEL_PATH.exists():
        # Coba fallback ke yolov8n.pt di root jika model belum ada
        fallback_path = ROOT_DIR / "yolov8n.pt"
        if fallback_path.exists():
            return YOLO(str(fallback_path)), "yolov8n.pt (Fallback)"
        raise FileNotFoundError(f"File model tidak ditemukan di: {MODEL_PATH}")
    
    model = YOLO(str(MODEL_PATH))
    return model, MODEL_PATH.name


# ==========================================
# 4. Sidebar Controls & Branding
# ==========================================
with st.sidebar:
    # Logo / Brand Header
    if LOGO_PATH.exists():
        st.image(str(LOGO_PATH), width=64)
    st.markdown("### 🛣️ RoadDamage AI")
    st.caption("v1.0 • YOLOv8n Baseline (50 Epochs)")
    st.markdown("---")

    # Pengaturan Sensitivitas Deteksi
    st.markdown("#### ⚙️ Pengaturan Deteksi")
    conf_threshold = st.slider(
        "Ambang Batas Keyakinan (*Confidence Threshold*)",
        min_value=0.10,
        max_value=0.90,
        value=0.25,
        step=0.05,
        help="Semakin rendah nilai, semakin sensitif mendeteksi objek. Nilai 0.25 direkomendasikan untuk keseimbangan presisi dan recall."
    )
    st.caption(f"Sensitivitas aktif: **{int(conf_threshold * 100)}%**")

    st.markdown("---")

    # Pilihan Sampel Gambar Cepat
    st.markdown("#### ⚡ Coba Sampel Gambar")
    sample_choice = st.selectbox(
        "Pilih gambar uji:",
        [
            "Unggah Sendiri (Upload)",
            "Sampel 1: ⚡ Crack & Manhole",
            "Sampel 2: 🕳️ Pothole (Lubang)",
            "Sampel 3: 🛣️ Pavement (Permukaan Jalan)"
        ]
    )

    st.markdown("---")
    st.markdown("#### 📌 Informasi Model")
    st.markdown("""
    - **Arsitektur:** YOLOv8n (Nano)
    - **Parameter:** ~3.0 Juta
    - **Ukuran Input:** 640 × 640
    - **Kelas:** Pothole, Crack, Manhole
    - **Status:** Baseline Model (50 Epochs)
    """)
    st.caption("Internship Project di **Vinix7** — Kelompok 2")


# ==========================================
# 5. Area Utama (Header & Layout)
# ==========================================
st.markdown("""
<div style="text-align: center; margin-bottom: 24px;">
    <span style="background: #D1FAE5; color: #065F46; border: 1px solid #A7F3D0; padding: 4px 12px; border-radius: 9999px; font-weight: 700; font-size: 0.8rem;">
        ✨ Computer Vision & Infrastructure Monitoring
    </span>
    <h1 style="margin-top: 8px; margin-bottom: 4px;">Deteksi Kerusakan Jalan Raya</h1>
    <p style="color: #64748B; max-width: 650px; margin: 0 auto; font-size: 0.95rem;">
        Unggah foto permukaan jalan untuk mendeteksi <b>Pothole</b> (lubang), <b>Crack</b> (retakan), 
        dan <b>Manhole</b> (tutup utilitas) secara otomatis menggunakan model <b>YOLOv8</b>.
    </p>
</div>
""", unsafe_allow_html=True)


# Muat Model
try:
    model, model_name = load_yolo_model()
except Exception as e:
    st.error(f"⚠️ Gagal memuat model: {str(e)}")
    st.stop()


# Penanganan Input Gambar
input_image = None
image_source_name = ""

# 1. Jika memilih sampel bawaan
if sample_choice == "Sampel 1: ⚡ Crack & Manhole":
    sample_file = SAMPLES_DIR / "sample_crack_manhole.jpg"
    if sample_file.exists():
        input_image = Image.open(sample_file).convert("RGB")
        image_source_name = "sample_crack_manhole.jpg"
elif sample_choice == "Sampel 2: 🕳️ Pothole (Lubang)":
    sample_file = SAMPLES_DIR / "sample_pothole.jpg"
    if sample_file.exists():
        input_image = Image.open(sample_file).convert("RGB")
        image_source_name = "sample_pothole.jpg"
elif sample_choice == "Sampel 3: 🛣️ Pavement (Permukaan Jalan)":
    sample_file = SAMPLES_DIR / "sample_road.jpg"
    if sample_file.exists():
        input_image = Image.open(sample_file).convert("RGB")
        image_source_name = "sample_road.jpg"

# 2. Atau jika upload file sendiri
col_left, col_right = st.columns([1, 1], gap="large")

with col_left:
    st.markdown('<div class="clay-card">', unsafe_allow_html=True)
    st.markdown("### 📤 1. Unggah Citra Jalan")
    
    uploaded_file = st.file_uploader(
        "Pilih file gambar (JPG, JPEG, PNG, WEBP):",
        type=["jpg", "jpeg", "png", "webp"],
        help="Unggah foto jalan dari dashcam, smartphone, atau kamera drone."
    )

    if uploaded_file is not None:
        try:
            input_image = Image.open(uploaded_file).convert("RGB")
            image_source_name = uploaded_file.name
        except Exception:
            st.error("File yang diunggah rusak atau bukan gambar yang valid.")
            input_image = None

    if input_image is not None:
        st.image(input_image, caption=f"Citra Input: {image_source_name}", use_column_width=True)
        detect_btn = st.button("🚀 Jalankan Deteksi Kerusakan Jalan", type="primary")
    else:
        st.info("💡 Silakan unggah gambar di atas atau pilih salah satu sampel pada menu sebelah kiri.")
        detect_btn = False

    st.markdown('</div>', unsafe_allow_html=True)


# ==========================================
# 6. Area Hasil Deteksi
# ==========================================
with col_right:
    st.markdown('<div class="clay-card">', unsafe_allow_html=True)
    st.markdown("### 🎯 2. Hasil Deteksi YOLOv8")

    if input_image is not None and detect_btn:
        with st.spinner("Menjalankan inferensi YOLOv8..."):
            start_time = time.time()
            results = model.predict(
                source=input_image,
                conf=conf_threshold,
                verbose=False
            )
            inference_time = (time.time() - start_time) * 1000  # milidetik

        result = results[0]
        detections = []
        counts = {"pothole": 0, "crack": 0, "manhole": 0}

        # Ekstraksi Bounding Box
        if result.boxes is not None and len(result.boxes) > 0:
            for box in result.boxes:
                cls_id = int(box.cls[0].item())
                conf = float(box.conf[0].item())
                coords = [round(float(v), 1) for v in box.xyxy[0].tolist()]
                cls_name = CLASS_NAMES.get(cls_id, result.names.get(cls_id, f"class_{cls_id}"))

                if cls_name in counts:
                    counts[cls_name] += 1
                else:
                    counts[cls_name] = 1

                detections.append({
                    "Kelas": cls_name,
                    "Keyakinan (%)": round(conf * 100, 1),
                    "Confidence": conf,
                    "Bounding Box [x1, y1, x2, y2]": str(coords)
                })

        total_detected = len(detections)

        # Ringkasan Metrik
        m1, m2, m3, m4 = st.columns(4)
        with m1:
            st.markdown(f"""
            <div class="metric-card">
                <div class="metric-title">Total Objek</div>
                <div class="metric-value" style="color: #059669;">{total_detected}</div>
            </div>
            """, unsafe_allow_html=True)
        with m2:
            st.markdown(f"""
            <div class="metric-card">
                <div class="metric-title">🕳️ Pothole</div>
                <div class="metric-value" style="color: #D97706;">{counts.get('pothole', 0)}</div>
            </div>
            """, unsafe_allow_html=True)
        with m3:
            st.markdown(f"""
            <div class="metric-card">
                <div class="metric-title">⚡ Crack</div>
                <div class="metric-value" style="color: #E11D48;">{counts.get('crack', 0)}</div>
            </div>
            """, unsafe_allow_html=True)
        with m4:
            st.markdown(f"""
            <div class="metric-card">
                <div class="metric-title">🔘 Manhole</div>
                <div class="metric-value" style="color: #0284C7;">{counts.get('manhole', 0)}</div>
            </div>
            """, unsafe_allow_html=True)

        st.markdown("<div style='margin-top: 16px;'></div>", unsafe_allow_html=True)

        # Visualisasi Gambar Anotasi Bounding Box
        annotated_bgr = result.plot()
        annotated_rgb = cv2.cvtColor(annotated_bgr, cv2.COLOR_BGR2RGB)
        st.image(
            annotated_rgb,
            caption=f"Hasil Prediksi YOLOv8 (Waktu Inferensi: {inference_time:.1f} ms / ~{1000/inference_time:.1f} FPS)",
            use_column_width=True
        )

        # Tabel Rincian Objek Terdeteksi
        if total_detected > 0:
            st.markdown("#### 📋 Rincian Objek Terdeteksi")
            df = pd.DataFrame(detections)
            st.dataframe(
                df[["Kelas", "Keyakinan (%)", "Bounding Box [x1, y1, x2, y2]"]],
                use_container_width=True,
                hide_index=True
            )
        else:
            st.success("✅ Tidak terdeteksi kerusakan jalan pada batas keyakinan (confidence) yang dipilih.")

    else:
        # Empty State
        st.markdown("""
        <div style="text-align: center; padding: 48px 16px;">
            <div style="font-size: 3rem; margin-bottom: 8px;">🔍</div>
            <h4 style="color: #475569;">Belum Ada Analisis yang Berjalan</h4>
            <p style="color: #94A3B8; font-size: 0.9rem; max-width: 360px; margin: 0 auto;">
                Pilih atau unggah gambar jalan di sebelah kiri, lalu tekan tombol 
                <b>"Jalankan Deteksi Kerusakan Jalan"</b> untuk melihat hasil analisis AI.
            </p>
        </div>
        """, unsafe_allow_html=True)

    st.markdown('</div>', unsafe_allow_html=True)


# ==========================================
# 7. Footer
# ==========================================
st.markdown("---")
st.markdown(
    "<div style='text-align: center; color: #94A3B8; font-size: 0.8rem; padding: 12px;'>"
    "RoadDamage AI • YOLOv8n Deep Learning • Developed for Vinix7 Internship Portfolio"
    "</div>",
    unsafe_allow_html=True
)
