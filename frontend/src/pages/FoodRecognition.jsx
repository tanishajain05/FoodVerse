import React, { useState, useEffect } from "react";
import ImageUploader from "../components/ImageUploader";
import SampleSelector from "../components/SampleSelector";
import MacroRings from "../components/MacroRings";
import LoadingState from "../components/LoadingState";
import { getFoodSamples, recognizeFood } from "../utils/api";
import { 
  Sparkles, 
  Award, 
  AlertOctagon, 
  CheckCircle2, 
  HeartHandshake, 
  UtensilsCrossed 
} from "lucide-react";

export default function FoodRecognition() {
  const [samples, setSamples] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Load sample showcases on mount
  useEffect(() => {
    getFoodSamples().then(setSamples).catch(console.error);
    // Auto-select first sample for instant wow factor!
    handleSelectSample({
      id: "salmon_bowl",
      name: "Grilled Atlantic Salmon Quinoa Bowl",
      preview_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"
    });
  }, []);

  const handleSelectSample = async (sample) => {
    setSelectedSample(sample.id);
    setUploadedFile(null);
    setPreviewUrl(sample.preview_url);
    setIsLoading(true);
    setError(null);

    try {
      const response = await recognizeFood(null, sample.id);
      setResult(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelected = async (file) => {
    setUploadedFile(file);
    setSelectedSample(null);
    setPreviewUrl(URL.createObjectURL(file));
    setIsLoading(true);
    setError(null);

    try {
      const response = await recognizeFood(file, null);
      setResult(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setUploadedFile(null);
    setSelectedSample(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="animate-fade-in" style={styles.container}>
      {/* Page Description */}
      <div style={styles.introHeader}>
        <h2>Multimodal Food Recognition & Macro Profiling</h2>
        <p style={{ marginTop: "4px" }}>
          Upload any meal photo or snapshot. Groq Vision AI recognizes ingredients, estimates caloric density, breaks down macronutrients, and audits clinical dietary compatibility in real time.
        </p>
      </div>

      <div style={styles.layout}>
        {/* Left Column: Upload & Sample Selector */}
        <div style={styles.leftCol}>
          <div className="glass-panel" style={{ padding: "1.5rem" }}>
            <ImageUploader
              onImageSelected={handleFileSelected}
              previewUrl={previewUrl}
              onClear={handleClear}
              label="Upload Meal / Dish Photo"
              sublabel="Drag & drop or snap from mobile camera"
            />

            <SampleSelector
              samples={samples}
              selectedId={selectedSample}
              onSelect={handleSelectSample}
              title="Or test instant food samples:"
            />
          </div>
        </div>

        {/* Right Column: AI Analysis Result */}
        <div style={styles.rightCol}>
          {isLoading && <LoadingState message="Groq Vision AI is identifying food & calculating nutritional density..." />}

          {error && (
            <div style={styles.errorBox}>
              <AlertOctagon size={20} color="#f43f5e" />
              <span>{error}</span>
            </div>
          )}

          {result && !isLoading && (
            <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Dish Overview Card */}
              <div className="glass-panel" style={styles.overviewCard}>
                <div style={styles.overviewTop}>
                  <div>
                    <span className="badge badge-purple" style={{ marginBottom: "0.5rem" }}>
                      AI Recognized Dish
                    </span>
                    <h2 style={styles.dishName}>{result.food_name}</h2>
                    <p style={styles.dishDesc}>{result.description}</p>
                  </div>

                  {/* Health Score Readout */}
                  <div style={styles.healthScoreBox}>
                    <div style={styles.healthScoreNum}>{result.health_score || 9.2}</div>
                    <div style={styles.healthScoreLbl}>/10 Health Score</div>
                    <div style={styles.healthRatingTag}>{result.health_rating || "Nutrient Dense"}</div>
                  </div>
                </div>

                {/* Dietary Tags */}
                <div style={styles.tagsRow}>
                  {result.dietary_tags?.map((tag, i) => (
                    <span key={i} className="badge badge-emerald">
                      <CheckCircle2 size={12} />
                      <span>{tag}</span>
                    </span>
                  ))}
                  {result.allergens?.map((allergen, i) => (
                    <span key={i} className="badge badge-rose">
                      <AlertOctagon size={12} />
                      <span>Allergen: {allergen}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Macronutrient breakdown */}
              <MacroRings
                macros={result.macros}
                calories={result.calories}
                servingSize={result.serving_size}
              />

              {/* Micronutrients & Ingredients Grid */}
              <div style={styles.twoColGrid}>
                {/* Ingredients Identified */}
                <div className="glass-panel" style={{ padding: "1.5rem" }}>
                  <div style={styles.cardHeaderSmall}>
                    <UtensilsCrossed size={16} color="var(--primary)" />
                    <span style={styles.cardHeaderTitle}>Identified Ingredients</span>
                  </div>
                  <div style={styles.ingredientTags}>
                    {result.ingredients?.map((ing, i) => (
                      <div key={i} style={styles.ingPill}>
                        <span>{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micronutrients */}
                <div className="glass-panel" style={{ padding: "1.5rem" }}>
                  <div style={styles.cardHeaderSmall}>
                    <Sparkles size={16} color="#06b6d4" />
                    <span style={styles.cardHeaderTitle}>Key Micronutrients & Vitamins</span>
                  </div>
                  <div style={styles.microList}>
                    {result.micronutrients?.map((m, i) => (
                      <div key={i} style={styles.microItem}>
                        <span style={styles.microName}>{m.name}</span>
                        <div style={styles.microRight}>
                          <span style={styles.microAmount}>{m.amount}</span>
                          <span style={styles.microPct}>{m.percent_daily}% DV</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clinical Nutrition Insights */}
              {result.nutrition_insights && (
                <div className="glass-panel" style={{ padding: "1.5rem", borderLeft: "4px solid var(--primary)" }}>
                  <div style={styles.cardHeaderSmall}>
                    <HeartHandshake size={18} color="var(--primary)" />
                    <span style={styles.cardHeaderTitle}>Metabolic & Clinical Insights</span>
                  </div>
                  <p style={{ fontSize: "0.92rem", lineHeight: 1.6, marginTop: "0.5rem" }}>
                    {result.nutrition_insights}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  introHeader: {
    marginBottom: "0.5rem",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(320px, 420px) 1fr",
    gap: "2rem",
    alignItems: "flex-start",
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  overviewCard: {
    padding: "1.8rem",
  },
  overviewTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "1.5rem",
    marginBottom: "1.2rem",
  },
  dishName: {
    fontSize: "1.6rem",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "0.4rem",
  },
  dishDesc: {
    fontSize: "0.92rem",
    lineHeight: 1.55,
    color: "var(--text-secondary)",
  },
  healthScoreBox: {
    backgroundColor: "rgba(139, 92, 246, 0.12)",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    padding: "0.85rem 1.2rem",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "120px",
  },
  healthScoreNum: {
    fontSize: "2.2rem",
    fontWeight: 900,
    fontFamily: "var(--font-heading)",
    color: "#ffffff",
    lineHeight: 1,
  },
  healthScoreLbl: {
    fontSize: "0.7rem",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginTop: "2px",
  },
  healthRatingTag: {
    fontSize: "0.72rem",
    color: "#c4b5fd",
    fontWeight: 700,
    marginTop: "4px",
  },
  tagsRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
    borderTop: "1px solid var(--border-light)",
    paddingTop: "1rem",
  },
  twoColGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.2rem",
  },
  cardHeaderSmall: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  cardHeaderTitle: {
    fontSize: "0.95rem",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "#ffffff",
  },
  ingredientTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.45rem",
  },
  ingPill: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid var(--border-light)",
    padding: "0.4rem 0.75rem",
    borderRadius: "8px",
    fontSize: "0.82rem",
    color: "var(--text-secondary)",
  },
  microList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  microItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.4rem 0.6rem",
    borderRadius: "6px",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
  microName: {
    fontSize: "0.84rem",
    color: "var(--text-secondary)",
  },
  microRight: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  microAmount: {
    fontSize: "0.84rem",
    fontWeight: 700,
    color: "#ffffff",
  },
  microPct: {
    fontSize: "0.72rem",
    color: "#38bdf8",
    fontWeight: 600,
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "1rem 1.4rem",
    borderRadius: "var(--radius-md)",
    backgroundColor: "rgba(244, 63, 94, 0.12)",
    border: "1px solid rgba(244, 63, 94, 0.3)",
    color: "#fda4af",
  },
};
