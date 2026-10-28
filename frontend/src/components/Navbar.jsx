import React from "react";
import { Sparkles, Cpu, Activity, ExternalLink } from "lucide-react";

export default function Navbar({ activeTab, onOpenDemo }) {
  const titles = {
    dashboard: "Intelligence Command Center",
    food: "Food Recognition & Nutritional Intelligence",
    freshness: "Food Spoilage & Freshness Detection",
    hygiene: "Restaurant Hygiene & HACCP Auditing",
    cooking: "Smart Multimodal Cooking Assistant",
    nutrition: "Personalized Metabolic Nutrition Planner",
  };

  return (
    <header style={styles.header}>
      <div style={styles.leftSection}>
        <div style={styles.breadcrumb}>
          <span>FoodVerse AI</span>
          <span style={styles.separator}>/</span>
          <span style={styles.activePage}>{activeTab.toUpperCase()}</span>
        </div>
        <h1 style={styles.title}>{titles[activeTab] || "Platform Overview"}</h1>
      </div>

      <div style={styles.rightSection}>
        {/* Groq LPU speed badge */}
        <div style={styles.chip}>
          <Cpu size={14} color="#06b6d4" />
          <span>Groq LPU: <strong>~110ms</strong></span>
        </div>

        {/* Vision AI model badge */}
        <div style={styles.chip}>
          <Activity size={14} color="#10b981" />
          <span>Qwen-3.8 Multimodal</span>
        </div>

        {/* Quick sample demo launcher */}
        {onOpenDemo && (
          <button onClick={onOpenDemo} style={styles.demoButton}>
            <Sparkles size={15} />
            <span>Load Quick Demo</span>
          </button>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    height: "var(--header-height)",
    padding: "0 2.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid var(--border-light)",
    backgroundColor: "rgba(10, 12, 22, 0.7)",
    backdropFilter: "blur(16px)",
    position: "sticky",
    top: 0,
    zIndex: 40,
  },
  leftSection: {
    display: "flex",
    flexDirection: "column",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.72rem",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  separator: {
    color: "var(--text-dim)",
  },
  activePage: {
    color: "var(--primary)",
    fontWeight: 700,
  },
  title: {
    fontSize: "1.25rem",
    fontFamily: "var(--font-heading)",
    fontWeight: 700,
    color: "#ffffff",
    marginTop: "2px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "0.85rem",
  },
  chip: {
    display: "flex",
    alignItems: "center",
    gap: "0.45rem",
    padding: "0.4rem 0.8rem",
    borderRadius: "999px",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    border: "1px solid var(--border-light)",
    fontSize: "0.78rem",
    color: "var(--text-secondary)",
  },
  demoButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.45rem",
    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(236, 72, 153, 0.25) 100%)",
    border: "1px solid rgba(139, 92, 246, 0.4)",
    padding: "0.45rem 0.95rem",
    borderRadius: "999px",
    color: "#ffffff",
    fontSize: "0.8rem",
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
};
