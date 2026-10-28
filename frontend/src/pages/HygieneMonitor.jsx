import React, { useState, useEffect } from "react";
import ImageUploader from "../components/ImageUploader";
import SampleSelector from "../components/SampleSelector";
import LoadingState from "../components/LoadingState";
import { getHygieneSamples, analyzeHygiene } from "../utils/api";
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Printer, 
  Sparkles,
  ClipboardList,
  AlertOctagon
} from "lucide-react";

export default function HygieneMonitor() {
  const [samples, setSamples] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHygieneSamples().then(setSamples).catch(console.error);
    // Auto-select clean kitchen for instant demo
    handleSelectSample({
      id: "clean_kitchen",
      name: "Pristine Commercial Prep Kitchen",
      preview_url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80"
    });
  }, []);

  const handleSelectSample = async (sample) => {
    setSelectedSample(sample.id);
    setUploadedFile(null);
    setPreviewUrl(sample.preview_url);
    setIsLoading(true);
    setError(null);

    try {
      const response = await analyzeHygiene(null, sample.id);
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
      const response = await analyzeHygiene(file, null);
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in" style={styles.container}>
      <div style={styles.introHeader}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2>Restaurant Hygiene & Smart Kitchen Auditor</h2>
            <p style={{ marginTop: "4px" }}>
              Automated visual HACCP safety audit for commercial kitchens, prep stations, and dining operations. Identifies cross-contact hazards, sanitization standards, and regulatory compliance.
            </p>
          </div>
          {result && (
            <button onClick={handlePrint} className="btn-secondary" style={{ flexShrink: 0 }}>
              <Printer size={16} />
              <span>Export Audit Report</span>
            </button>
          )}
        </div>
      </div>

      <div style={styles.layout}>
        {/* Left Column: Upload & Presets */}
        <div style={styles.leftCol}>
          <div className="glass-panel" style={{ padding: "1.5rem" }}>
            <ImageUploader
              onImageSelected={handleFileSelected}
              previewUrl={previewUrl}
              onClear={handleClear}
              label="Upload Kitchen / Prep Station Photo"
              sublabel="Audit surface grease, utensil sanitation & hazards"
            />

            <SampleSelector
              samples={samples}
              selectedId={selectedSample}
              onSelect={handleSelectSample}
              title="Or inspect real kitchen sample scenes:"
            />
          </div>
        </div>

        {/* Right Column: Inspection Findings */}
        <div style={styles.rightCol}>
          {isLoading && <LoadingState message="Groq Vision AI is evaluating kitchen surfaces, cross-contact risks, and HACCP compliance..." />}

          {error && <div style={styles.errorBox}>{error}</div>}

          {result && !isLoading && (
            <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Overall Grade Card */}
              <div className="glass-panel" style={styles.gradeCard}>
                <div style={styles.gradeLeft}>
                  <div
                    style={{
                      ...styles.letterGradeBox,
                      backgroundColor: result.grade === "A" ? "rgba(16, 185, 129, 0.15)" : result.grade === "B" ? "rgba(6, 182, 212, 0.15)" : "rgba(245, 158, 11, 0.15)",
                      borderColor: result.grade === "A" ? "#10b981" : result.grade === "B" ? "#06b6d4" : "#f59e0b",
                    }}
                  >
                    <div style={styles.letterGradeText}>{result.grade || "A"}</div>
                    <div style={styles.letterGradeSub}>GRADE</div>
                  </div>

                  <div>
                    <span className="badge badge-emerald" style={{ marginBottom: "0.4rem" }}>
                      HACCP Verified
                    </span>
                    <h2 style={styles.facilityTitle}>{result.facility_name}</h2>
                    <div style={styles.complianceStatus}>{result.compliance_status}</div>
                  </div>
                </div>

                <div style={styles.overallScoreBox}>
                  <div style={styles.overallScoreVal}>{result.overall_score}%</div>
                  <div style={styles.overallScoreLbl}>Compliance Score</div>
                </div>
              </div>

              {/* Categorized Compliance Checklist Bars */}
              <div className="glass-panel" style={{ padding: "1.6rem" }}>
                <div style={styles.cardHeader}>
                  <ClipboardList size={18} color="var(--primary)" />
                  <span style={styles.cardHeaderTitle}>Category Compliance Breakdown</span>
                </div>

                <div style={styles.categoryGrid}>
                  {result.categories?.map((cat, i) => (
                    <div key={i} style={styles.catBox}>
                      <div style={styles.catTop}>
                        <span style={styles.catName}>{cat.name}</span>
                        <span
                          className={`badge ${
                            cat.score >= 90 ? "badge-emerald" : cat.score >= 75 ? "badge-amber" : "badge-rose"
                          }`}
                        >
                          {cat.score}% - {cat.status}
                        </span>
                      </div>

                      <div style={styles.track}>
                        <div
                          style={{
                            ...styles.fill,
                            width: `${cat.score}%`,
                            backgroundColor: cat.score >= 90 ? "#10b981" : cat.score >= 75 ? "#f59e0b" : "#f43f5e",
                          }}
                        />
                      </div>

                      <div style={styles.catNotes}>{cat.notes}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Violations & Commendations */}
              <div style={styles.twoColGrid}>
                {/* Violations */}
                <div className="glass-panel" style={{ padding: "1.5rem" }}>
                  <div style={styles.cardHeader}>
                    <AlertOctagon size={18} color="#f43f5e" />
                    <span style={styles.cardHeaderTitle}>
                      Detected Violations ({result.violations?.length || 0})
                    </span>
                  </div>

                  {result.violations && result.violations.length > 0 ? (
                    <div style={styles.violationsList}>
                      {result.violations.map((v, i) => (
                        <div key={i} style={styles.violationItem}>
                          <div style={styles.vHeader}>
                            <span className="badge badge-rose">{v.severity} Hazard</span>
                            <span style={styles.vCode}>{v.code}</span>
                          </div>
                          <div style={styles.vTitle}>{v.title}</div>
                          <div style={styles.vDesc}>{v.description}</div>
                          <div style={styles.vRemedy}>
                            <strong>Corrective Action:</strong> {v.remedy}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={styles.noViolations}>
                      <CheckCircle2 size={32} color="#10b981" />
                      <div style={{ fontWeight: 600, color: "#ffffff", marginTop: "0.5rem" }}>
                        Zero Safety Violations Found
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                        Station demonstrates exceptional adherence to commercial sanitation guidelines.
                      </p>
                    </div>
                  )}
                </div>

                {/* Commendations & Recommendations */}
                <div className="glass-panel" style={{ padding: "1.5rem" }}>
                  <div style={styles.cardHeader}>
                    <Sparkles size={18} color="#10b981" />
                    <span style={styles.cardHeaderTitle}>Commendations & Best Practices</span>
                  </div>

                  <ul style={styles.bulletList}>
                    {result.commendations?.map((item, i) => (
                      <li key={i} style={styles.bulletItem}>
                        <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ ...styles.cardHeader, marginTop: "1.5rem" }}>
                    <AlertTriangle size={18} color="#f59e0b" />
                    <span style={styles.cardHeaderTitle}>Audit Recommendations</span>
                  </div>

                  <ul style={styles.bulletList}>
                    {result.recommendations?.map((item, i) => (
                      <li key={i} style={styles.bulletItem}>
                        <div style={styles.amberDot} />
                        <span>{item}</span>
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
  gradeCard: {
    padding: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1.5rem",
  },
  gradeLeft: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  letterGradeBox: {
    width: "84px",
    height: "84px",
    borderRadius: "20px",
    border: "2px solid",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.4)",
  },
  letterGradeText: {
    fontSize: "2.8rem",
    fontWeight: 900,
    fontFamily: "var(--font-heading)",
    color: "#ffffff",
    lineHeight: 1,
  },
  letterGradeSub: {
    fontSize: "0.65rem",
    letterSpacing: "0.1em",
    color: "var(--text-muted)",
    fontWeight: 700,
  },
  facilityTitle: {
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "#ffffff",
  },
  complianceStatus: {
    fontSize: "0.88rem",
    color: "var(--text-secondary)",
    marginTop: "2px",
  },
  overallScoreBox: {
    textAlign: "right",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid var(--border-light)",
    padding: "0.85rem 1.4rem",
    borderRadius: "16px",
  },
  overallScoreVal: {
    fontSize: "2.2rem",
    fontWeight: 900,
    fontFamily: "var(--font-heading)",
    color: "#ffffff",
    lineHeight: 1,
  },
  overallScoreLbl: {
    fontSize: "0.72rem",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginTop: "4px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1.2rem",
  },
  cardHeaderTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "#ffffff",
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1.2rem",
  },
  catBox: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid var(--border-light)",
    borderRadius: "var(--radius-md)",
    padding: "1rem",
  },
  catTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.6rem",
  },
  catName: {
    fontSize: "0.84rem",
    fontWeight: 600,
    color: "var(--text-main)",
  },
  track: {
    height: "6px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: "999px",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: "999px",
    transition: "width 0.8s ease",
  },
  catNotes: {
    fontSize: "0.78rem",
    color: "var(--text-muted)",
    marginTop: "0.6rem",
    lineHeight: 1.4,
  },
  twoColGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.2rem",
  },
  violationsList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  violationItem: {
    backgroundColor: "rgba(244, 63, 94, 0.08)",
    border: "1px solid rgba(244, 63, 94, 0.25)",
    borderRadius: "var(--radius-md)",
    padding: "1rem",
  },
  vHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.4rem",
  },
  vCode: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    fontFamily: "monospace",
  },
  vTitle: {
    fontSize: "0.92rem",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "0.25rem",
  },
  vDesc: {
    fontSize: "0.82rem",
    color: "var(--text-secondary)",
    lineHeight: 1.45,
    marginBottom: "0.6rem",
  },
  vRemedy: {
    fontSize: "0.8rem",
    color: "#fca5a5",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: "0.45rem 0.75rem",
    borderRadius: "6px",
  },
  noViolations: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2.5rem 1rem",
    textAlign: "center",
  },
  bulletList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
  },
  bulletItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.6rem",
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    lineHeight: 1.5,
  },
  amberDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#f59e0b",
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
