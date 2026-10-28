import React, { useState, useEffect } from "react";
import ImageUploader from "../components/ImageUploader";
import SampleSelector from "../components/SampleSelector";
import FreshnessGauge from "../components/FreshnessGauge";
import LoadingState from "../components/LoadingState";
import { getFreshnessSamples, detectFreshness } from "../utils/api";
import { 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  ThermometerSnowflake, 
  Lightbulb, 
  CheckCircle2, 
  Clock 
} from "lucide-react";

export default function FreshnessDetection() {
  const [samples, setSamples] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFreshnessSamples().then(setSamples).catch(console.error);
    // Auto-select fresh strawberries for instant demo
    handleSelectSample({
      id: "fresh_strawberry",
      name: "Fresh Garden Strawberries",
      preview_url: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80"
    });
  }, []);

  const handleSelectSample = async (sample) => {
    setSelectedSample(sample.id);
    setUploadedFile(null);
    setPreviewUrl(sample.preview_url);
    setIsLoading(true);
    setError(null);

    try {
      const response = await detectFreshness(null, sample.id);
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
      const response = await detectFreshness(file, null);
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
      <div style={styles.introHeader}>
        <h2>Food Freshness, Spoilage & Safety Analysis</h2>
        <p style={{ marginTop: "4px" }}>
          Upload produce, meat, dairy, or bakery items to evaluate degradation stages, fungal or microbial contamination, remaining shelf life, and critical storage protocols.
        </p>
      </div>

      <div style={styles.layout}>
        {/* Left Column: Upload & Samples */}
        <div style={styles.leftCol}>
          <div className="glass-panel" style={{ padding: "1.5rem" }}>
            <ImageUploader
              onImageSelected={handleFileSelected}
              previewUrl={previewUrl}
              onClear={handleClear}
              label="Upload Produce or Food Photo"
              sublabel="Detect mold, oxidation, bruising, or decay"
            />

            <SampleSelector
              samples={samples}
              selectedId={selectedSample}
              onSelect={handleSelectSample}
              title="Or test freshness presets (Fresh / Caution / Spoiled):"
            />
          </div>
        </div>

        {/* Right Column: Freshness Metrics */}
        <div style={styles.rightCol}>
          {isLoading && <LoadingState message="Groq Vision AI is analyzing visual cellular integrity, color, and microbial markers..." />}

          {error && <div style={styles.errorBox}>{error}</div>}

          {result && !isLoading && (
            <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Main Freshness Gauge & Summary */}
              <div className="glass-panel" style={styles.mainScoreCard}>
                <div style={styles.gaugeSection}>
                  <FreshnessGauge
                    score={result.freshness_score}
                    status={result.status}
                    statusColor={result.status_color}
                    daysRemaining={result.days_remaining}
                  />
                </div>

                <div style={styles.summarySection}>
                  <div style={styles.itemTitleRow}>
                    <span className="badge badge-cyan">Visual Spoilage Audit</span>
                    <h2 style={styles.itemName}>{result.item_name}</h2>
                  </div>

                  {/* Safety verdict banner */}
                  <div
                    style={{
                      ...styles.safetyVerdict,
                      backgroundColor: result.safe_to_consume ? "rgba(16, 185, 129, 0.12)" : "rgba(244, 63, 94, 0.12)",
                      borderColor: result.safe_to_consume ? "rgba(16, 185, 129, 0.35)" : "rgba(244, 63, 94, 0.35)",
                    }}
                  >
                    {result.safe_to_consume ? (
                      <ShieldCheck size={20} color="#10b981" />
                    ) : (
                      <XCircle size={20} color="#f43f5e" />
                    )}
                    <div>
                      <div style={{ ...styles.verdictTitle, color: result.safe_to_consume ? "#6ee7b7" : "#fda4af" }}>
                        {result.safe_to_consume ? "Safe for Human Consumption" : "Bio-Hazard: Unsafe to Consume"}
                      </div>
                      <div style={styles.verdictDesc}>
                        {result.action_recommendation}
                      </div>
                    </div>
                  </div>

                  {/* Estimated Shelf Life */}
                  <div style={styles.shelfLifePill}>
                    <Clock size={16} color="var(--primary)" />
                    <span>Estimated Remaining Shelf Life: <strong>{result.days_remaining} Days</strong></span>
                  </div>
                </div>
              </div>

              {/* Visual Indicators & Storage Tips Grid */}
              <div style={styles.twoColGrid}>
                {/* Visual Indicators */}
                <div className="glass-panel" style={{ padding: "1.5rem" }}>
                  <div style={styles.cardHeader}>
                    <CheckCircle2 size={18} color="var(--primary)" />
                    <span style={styles.cardHeaderTitle}>Visual Spoilage Indicators</span>
                  </div>
                  <ul style={styles.indicatorList}>
                    {result.visual_indicators?.map((item, i) => (
                      <li key={i} style={styles.indicatorItem}>
                        <div style={styles.bulletDot} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Storage & Preservation Guidelines */}
                <div className="glass-panel" style={{ padding: "1.5rem" }}>
                  <div style={styles.cardHeader}>
                    <ThermometerSnowflake size={18} color="#06b6d4" />
                    <span style={styles.cardHeaderTitle}>Preservation & Storage Protocols</span>
                  </div>
                  <ul style={styles.indicatorList}>
                    {result.storage_tips?.map((tip, i) => (
                      <li key={i} style={styles.indicatorItem}>
                        <Lightbulb size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
  mainScoreCard: {
    padding: "2rem",
    display: "grid",
    gridTemplateColumns: "240px 1fr",
    gap: "2rem",
    alignItems: "center",
  },
  gaugeSection: {
    display: "flex",
    justifyContent: "center",
    borderRight: "1px solid var(--border-light)",
    paddingRight: "1rem",
  },
  summarySection: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  itemTitleRow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  itemName: {
    fontSize: "1.7rem",
    fontWeight: 800,
    color: "#ffffff",
  },
  safetyVerdict: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.85rem",
    padding: "1rem 1.2rem",
    borderRadius: "var(--radius-md)",
    border: "1px solid",
  },
  verdictTitle: {
    fontSize: "0.95rem",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
  },
  verdictDesc: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    marginTop: "0.2rem",
    lineHeight: 1.5,
  },
  shelfLifePill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    border: "1px solid var(--border-light)",
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    fontSize: "0.85rem",
    color: "var(--text-main)",
  },
  twoColGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.2rem",
  },
  cardHeader: {
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
  indicatorList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  indicatorItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.6rem",
    fontSize: "0.86rem",
    color: "var(--text-secondary)",
    lineHeight: 1.5,
  },
  bulletDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "var(--primary)",
    marginTop: "7px",
    flexShrink: 0,
  },
  errorBox: {
    padding: "1.2rem",
    borderRadius: "var(--radius-md)",
    backgroundColor: "rgba(244, 63, 94, 0.12)",
    border: "1px solid rgba(244, 63, 94, 0.3)",
    color: "#fda4af",
  },
};
