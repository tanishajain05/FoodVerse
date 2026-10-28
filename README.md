# 🍽️ Food Verse AI – Multimodal Food Intelligence Agent

> **An Autonomous Multimodal Food Intelligence Platform powered by Groq LPU Inference, Computer Vision, and Clinical Nutritional Science.**

[![GitHub Repo](https://img.shields.io/badge/GitHub-ShlokNaidu%2FFoodVerse-181717?style=for-the-badge&logo=github)](https://github.com/ShlokNaidu/FoodVerse)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FShlokNaidu%2FFoodVerse&root-directory=frontend)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/ShlokNaidu/FoodVerse)
[![Groq LPU](https://img.shields.io/badge/Groq%20LPU-Ultra--Fast%20(~110ms)-f59e0b?style=for-the-badge&logo=fastapi)](https://groq.com)
[![Multimodal Vision](https://img.shields.io/badge/Vision%20Model-Qwen--3.8%20Multimodal-8b5cf6?style=for-the-badge)](https://console.groq.com)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20Python-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![Design](https://img.shields.io/badge/Design-Glassmorphic%20Dark%20System-ec4899?style=for-the-badge)](#)

---

## 🌟 Executive Summary

In modern households, commercial hospitality, and clinical nutrition environments, food-related decision-making is heavily fragmented:
- **Nutrition tracking** relies on tedious manual calorie estimations.
- **Produce freshness** is judged subjectively by sight without scientific validation, leading to massive food waste or foodborne illness risks.
- **Restaurant kitchen hygiene** depends on sporadic annual health inspections.
- **Cooking assistance** is locked to static text recipes without context-aware real-time pan monitoring.

**Food Verse AI** bridges these silos through a unified, multimodal intelligence platform combining computer vision, biochemical spoilage markers, clinical metabolic modeling, and real-time cooking state diagnosis on **Groq's high-speed LPU infrastructure**.

---

## ⚡ Key Capabilities & Modules

### 1. 🥗 Food Recognition & Nutritional Intelligence
- **Multimodal Visual Extraction**: Identify dishes from any photo, mobile snapshot, or webcam frame.
- **Macronutrient Breakdown**: Dynamic caloric and macro distribution bars (Protein, Carbohydrates, Healthy Fats, Dietary Fiber).
- **Micronutrient Profiling**: Vitamin D, B12, Iron, Potassium, and Omega-3 daily value percentages.
- **Dietary & Allergen Verification**: Flags allergens (Gluten, Dairy, Peanuts, Shellfish) and dietary labels (Vegan, Keto, High-Protein).

### 2. 🍎 Food Freshness & Spoilage Detection
- **Freshness Scoring (0–100%)**: Radial animated SVG gauge reflecting visual degradation and oxidation markers.
- **Biological Safety Verdict**: Immediate status banner: *Peak Freshness* (🟢), *Consume Soon / Caution* (🟡), or *Bio-Hazard / Spoiled* (🔴).
- **Shelf Life Estimation**: Remaining shelf life countdown in days.
- **HACCP Preservation Protocols**: Tailored storage temperatures, crisper humidity levels, and culinary rescue suggestions.

### 3. 🏥 Restaurant Hygiene & Smart Kitchen Auditor
- **Commercial Sanitation Grading**: Automatic assignment of official inspection Letter Grades (**A**, **B**, **C**, **F**).
- **HACCP Compliance Checklists**:
  - Cross-Contamination Prevention
  - Surface Sanitation & Degreasing
  - Personnel Hygiene & Protective PPE (Gloves, Hairnets)
  - Waste & Pest Management
- **Violation Logging**: Pinpoints health code violations with severity rankings (Critical, Major, Minor) and actionable remedies.
- **Exportable Audit Reports**: One-click printable sanitary audit documentation.

### 4. 👨‍🍳 Smart Cooking Coach (Multimodal Assistant)
- **AI Recipe Architect**: Generates bespoke recipes from available ingredients, skill level, and cooking appliances.
- **Interactive Step-by-Step Cookalong**: Checkable steps, countdown timers, danger warnings, and chef secrets.
- **Live Visual Cooking Guide (Multimodal Vision)**: Upload a photo of your pan, pot, or skillet to diagnose searing crust, caramelization, and heat management in real time.

### 5. 📊 Personalized Metabolic Nutrition Planner
- **Metabolic Modeling**: Precision BMR and TDEE calculations based on age, gender, height, weight, activity, and goals.
- **Adaptive 7-Day Protocol**: Complete schedule for Breakfast, Lunch, Dinner, and Snacks with exact gram macros.
- **Interactive Grocery Checklist**: Auto-generated categorized shopping list (Proteins, Produce, Grains, Pantry) with checkable items.

---

## 🏗️ Technical Architecture

```
                                ┌──────────────────────────────────────────┐
                                │             User Browser                 │
                                │   React 19 + Vite (Dark Glassmorphism)   │
                                └────────────────────┬─────────────────────┘
                                                     │ HTTP / REST
                                                     ▼
                                ┌──────────────────────────────────────────┐
                                │           FastAPI Backend                │
                                │            Port: 8000                    │
                                └──────┬─────────────┬─────────────┬───────┘
                                       │             │             │
                    ┌──────────────────┘             │             └──────────────────┐
                    ▼                                ▼                                ▼
         /api/food/recognize              /api/freshness/detect              /api/hygiene/analyze
         /api/cooking/recipe              /api/cooking/guide                 /api/nutrition/plan
                    │                                │                                │
                    └────────────────────────────────┼────────────────────────────────┘
                                                     │
                                                     ▼
                                      ┌─────────────────────────────┐
                                      │       Groq LPU Engine       │
                                      │   Qwen-3.8 Multimodal Vision│
                                      │   GPT-OSS-120B Text Engine  │
                                      └─────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19, Vite, Vanilla CSS Design System, Lucide Icons |
| **Backend** | Python 3.11+, FastAPI, Uvicorn, Pillow, Pydantic, Python-Dotenv |
| **AI / Inference** | **Groq API** (`qwen/qwen3.8-27b` Multimodal Vision + `openai/gpt-oss-120b` Text) |
| **Styling** | Custom Glassmorphic Dark UI, Outfit + Inter typography, CSS Micro-animations |

---

## 🚀 Quickstart & Installation

### Prerequisites
- **Node.js** v18+ and **npm**
- **Python** 3.10+
- **Groq API Key** (Get free key from [console.groq.com](https://console.groq.com))

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/foodverse.git
cd foodverse
```

### 2. Configure Backend
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Create or verify .env file
# backend/.env:
GROQ_API_KEY=your_groq_api_key_here
PORT=8000
HOST=0.0.0.0
```

### 3. Start Backend Server
```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
*API docs will be live at: [http://localhost:8000/docs](http://localhost:8000/docs)*

### 4. Configure & Start Frontend
```bash
# In a new terminal:
cd frontend

# Install packages
npm install

# Run Vite dev server
npm run dev
```
*Frontend will be live at: [http://localhost:5173](http://localhost:5173)*

---

## 📂 Project Structure

```
foodverse/
├── backend/
│   ├── main.py                     # FastAPI app with CORS & router mounts
│   ├── config.py                   # Environment configuration loader
│   ├── requirements.txt            # Python dependencies
│   ├── test_backend.py             # Unit tests for sample registries
│   ├── .env                        # Groq API configuration
│   ├── services/
│   │   ├── groq_service.py         # Vision & text inference wrapper with fallback
│   │   └── sample_data.py          # Instant demo showcase registries
│   └── routers/
│       ├── food_recognition.py     # POST /api/food/recognize
│       ├── freshness.py            # POST /api/freshness/detect
│       ├── hygiene.py              # POST /api/hygiene/analyze
│       ├── cooking.py              # POST /api/cooking/recipe & /guide
│       └── nutrition.py            # POST /api/nutrition/plan
│
├── frontend/
│   ├── index.html                  # HTML entry point with Google Fonts
│   ├── package.json                # Dependencies & scripts
│   ├── vite.config.js              # Vite configuration
│   └── src/
│       ├── main.jsx                # React root mount
│       ├── App.jsx                 # Main layout & navigation shell
│       ├── index.css               # Luxury Dark Glassmorphic Design System
│       ├── utils/
│       │   └── api.js              # API client for all backend endpoints
│       ├── components/
│       │   ├── Navbar.jsx          # Top telemetry & breadcrumb bar
│       │   ├── Sidebar.jsx         # Navigation sidebar with status dots
│       │   ├── ImageUploader.jsx   # Drag & drop image uploader
│       │   ├── SampleSelector.jsx  # 1-click test cards for instant demo
│       │   ├── MacroRings.jsx      # Macro progress bars & calorie count
│       │   ├── FreshnessGauge.jsx  # Animated SVG radial freshness meter
│       │   └── LoadingState.jsx    # Pulsing spinner with Groq step indicator
│       └── pages/
│           ├── Dashboard.jsx       # Overview hub with telemetry cards
│           ├── FoodRecognition.jsx  # Dish identification & macros
│           ├── FreshnessDetection.jsx # Spoilage & shelf-life audit
│           ├── HygieneMonitor.jsx  # Restaurant HACCP inspection
│           ├── CookingAssistant.jsx # Recipe generator & visual pan guide
│           └── NutritionPlanner.jsx# Metabolic targets & 7-day plan
│
└── README.md                       # Complete platform documentation
```

---

## 🌐 API Endpoints Reference

| Method | Endpoint | Description | Model |
|--------|----------|-------------|-------|
| `GET` | `/api/health` | System health check & model readiness | — |
| `POST` | `/api/food/recognize` | Food identification & macro breakdown | `qwen/qwen3.8-27b` |
| `GET` | `/api/food/samples` | Sample food showcase presets | — |
| `POST` | `/api/freshness/detect` | Freshness score & spoilage analysis | `qwen/qwen3.8-27b` |
| `GET` | `/api/freshness/samples` | Freshness test cases (fresh/caution/spoiled) | — |
| `POST` | `/api/hygiene/analyze` | Kitchen HACCP compliance audit | `qwen/qwen3.8-27b` |
| `GET` | `/api/hygiene/samples` | Kitchen inspection scene presets | — |
| `POST` | `/api/cooking/recipe` | Gourmet recipe generation from pantry | `openai/gpt-oss-120b` |
| `POST` | `/api/cooking/guide` | Live visual cooking pan doneness guide | `qwen/qwen3.8-27b` |
| `GET` | `/api/cooking/presets` | Quick ingredient presets | — |
| `POST` | `/api/nutrition/plan` | Metabolic TDEE & 7-day meal plan | `openai/gpt-oss-120b` |
| `GET` | `/api/nutrition/archetypes` | Fitness & dietary archetypes | — |

---

## 🧑‍🏫 Evaluation & Mentor Demo Guide

For evaluators and mentors testing this project:
1. Open the web app at `http://localhost:5173`.
2. Notice the **Groq LPU telemetry** indicator in the navbar and sidebar confirming active connection.
3. Every single module includes **1-Click Test Presets**:
   - **Food Recognition**: Click *Grilled Atlantic Salmon Quinoa Bowl* to see instantaneous macro extraction.
   - **Freshness Detection**: Click *Mold Contaminated Bread* to see the gauge plummet to 14% with danger biohazard alerts.
   - **Hygiene Auditor**: Click *Active Line Station* to see cross-contact hazard detection and Grade C compliance bars.
   - **Smart Cooking Coach**: Switch to *Live Vision Cooking Guide* to see real-time pan searing diagnosis.
   - **Nutrition Planner**: Click *Lean Muscle & Strength* to see calculated metabolic TDEE and the interactive 7-day calendar.

---

## 📄 License
This project is developed for educational and portfolio demonstration under the MIT License.
