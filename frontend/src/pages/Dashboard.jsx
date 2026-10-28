import React from "react";
import { 
  Salad, 
  Apple, 
  ShieldCheck, 
  ChefHat, 
  CalendarCheck, 
  Zap, 
  Sparkles, 
  ArrowRight,
  Eye,
  Cpu,
  Award,
  Clock
} from "lucide-react";

export default function Dashboard({ setActiveTab }) {
  const modules = [
    {
      id: "food",
      title: "Food Recognition & Nutrition",
      subtitle: "Instant dish identification, calorie counting, and macro/micronutrient profiling from any food photo.",
      badge: "Multimodal Vision",
      badgeColor: "purple",
      icon: Salad,
      stats: "Calories & Macros in ~110ms",
      cta: "Analyze Food Photo",
      color: "#8b5cf6",
    },
    {
      id: "freshness",
      title: "Freshness & Spoilage Detection",
      subtitle: "Scientific freshness scoring (0-100), microbial spoilage risk, shelf-life estimation, and preservation advice.",
      badge: "Food Safety",
      badgeColor: "emerald",
      icon: Apple,
      stats: "Prevent Food Waste",
      cta: "Check Produce Freshness",
      color: "#10b981",
    },
    {
      id: "hygiene",
      title: "Restaurant Hygiene Auditor",
      subtitle: "Automated HACCP inspection of commercial kitchens and prep stations with compliance scoring & violation flags.",
      badge: "Regulatory Grade",
      badgeColor: "amber",
      icon: ShieldCheck,
      stats: "Grade A to F Compliance",
      cta: "Audit Kitchen Hygiene",
      color: "#f59e0b",
    },
    {
      id: "cooking",
      title: "Smart Cooking Assistant",
      subtitle: "Gourmet recipes from pantry ingredients + live visual pan/skillet monitoring to prevent burning and guide every step.",
      badge: "Interactive Chef",
      badgeColor: "cyan",
      icon: ChefHat,
      stats: "Step-by-Step with Vision",
      cta: "Start Cooking Session",
      color: "#06b6d4",
    },
    {
      id: "nutrition",
      title: "Personalized Nutrition Planner",
      subtitle: "Metabolic energy modeling (BMR/TDEE) and 7-day personalized meal protocols with categorized grocery lists.",
      badge: "Metabolic AI",
      badgeColor: "rose",
      icon: CalendarCheck,
      stats: "Goal-Calibrated Targets",
      cta: "Generate 7-Day Plan",
      color: "#f43f5e",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <div style={styles.heroBanner}>
        <div style={styles.heroContent}>
          <div style={styles.tagline}>
            <Sparkles size={16} color="#c084fc" />
            <span>Next-Generation Multimodal Food Intelligence</span>
          </div>
          <h1 style={styles.heroTitle}>
            Unified Vision, Safety & Nutrition on <span className="gradient-text">Groq LPUs</span>
          </h1>
          <p style={styles.heroDesc}>
            Food Verse AI bridges computer vision, clinical nutritional science, and culinary intelligence into a single seamless agent. From farm-to-table freshness to restaurant hygiene compliance and personalized metabolic meal plans.
          </p>

          <div style={styles.heroActions}>
            <button
              onClick={() => setActiveTab("food")}
              className="btn-primary"
            >
              <span>Launch Food Recognition</span>
              <ArrowRight size={17} />
            </button>
            <button
              onClick={() => setActiveTab("cooking")}
              className="btn-secondary"
            >
              <ChefHat size={17} />
              <span>Smart Cooking Coach</span>
            </button>
          </div>
        </div>

        {/* Telemetry Quick Grid */}
        <div style={styles.telemetryGrid}>
          <div style={styles.telemetryCard}>
            <Cpu size={22} color="#06b6d4" />
            <div style={styles.telemetryVal}>~110ms</div>
            <div style={styles.telemetryLbl}>Groq LPU Latency</div>
          </div>
          <div style={styles.telemetryCard}>
            <Eye size={22} color="#8b5cf6" />
            <div style={styles.telemetryVal}>Qwen-3.8</div>
            <div style={styles.telemetryLbl}>Multimodal Vision</div>
          </div>
          <div style={styles.telemetryCard}>
            <Award size={22} color="#10b981" />
            <div style={styles.telemetryVal}>5 Modules</div>
            <div style={styles.telemetryLbl}>Autonomous AI Agents</div>
          </div>
          <div style={styles.telemetryCard}>
            <Clock size={22} color="#f59e0b" />
            <div style={styles.telemetryVal}>Real-Time</div>
            <div style={styles.telemetryLbl}>Interactive Guidance</div>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div style={styles.sectionHeader}>
        <div>
          <h2>Core Intelligence Modules</h2>
          <p style={{ marginTop: "4px" }}>Select any module below to begin multimodal analysis or generate meal intelligence.</p>
        </div>
      </div>

      {/* Module Grid */}
      <div style={styles.moduleGrid}>
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              onClick={() => setActiveTab(m.id)}
              style={styles.moduleCard}
              className="glass-panel"
            >
              <div style={styles.cardHeader}>
                <div
                  style={{
                    ...styles.iconBox,
                    backgroundColor: `${m.color}15`,
                    borderColor: `${m.color}35`,
                  }}
                >
                  <Icon size={24} color={m.color} />
                </div>
                <span className={`badge badge-${m.badgeColor}`}>{m.badge}</span>
              </div>

              <div style={styles.cardBody}>
                <h3 style={styles.cardTitle}>{m.title}</h3>
                <p style={styles.cardDesc}>{m.subtitle}</p>
              </div>

              <div style={styles.cardFooter}>
                <div style={styles.statsLabel}>
                  <Zap size={14} color="#f59e0b" />
                  <span>{m.stats}</span>
                </div>
                <div style={{ ...styles.cardCta, color: m.color }}>
                  <span>{m.cta}</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  heroBanner: {
    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(6, 182, 212, 0.08) 50%, rgba(18, 20, 36, 0.6) 100%)",
    border: "1px solid rgba(139, 92, 246, 0.25)",
    borderRadius: "var(--radius-xl)",
    padding: "3rem",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
    marginBottom: "3rem",
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem",
  },
  heroContent: {
    maxWidth: "880px",
  },
  tagline: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    padding: "0.4rem 0.9rem",
    borderRadius: "999px",
    fontSize: "0.82rem",
    color: "#c4b5fd",
    fontWeight: 600,
    marginBottom: "1.2rem",
  },
  heroTitle: {
    fontSize: "2.8rem",
    fontWeight: 800,
    lineHeight: 1.15,
    marginBottom: "1rem",
    letterSpacing: "-0.02em",
  },
  heroDesc: {
    fontSize: "1.05rem",
    color: "var(--text-secondary)",
    lineHeight: 1.65,
    marginBottom: "2rem",
  },
  heroActions: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  telemetryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1.2rem",
    borderTop: "1px solid var(--border-light)",
    paddingTop: "2rem",
  },
  telemetryCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid var(--border-light)",
    borderRadius: "var(--radius-md)",
    padding: "1rem 1.2rem",
  },
  telemetryVal: {
    fontSize: "1.5rem",
    fontFamily: "var(--font-heading)",
    fontWeight: 800,
    color: "#ffffff",
    marginTop: "0.5rem",
  },
  telemetryLbl: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginTop: "2px",
  },
  sectionHeader: {
    marginBottom: "1.6rem",
  },
  moduleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "1.6rem",
  },
  moduleCard: {
    padding: "1.8rem",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.2rem",
  },
  iconBox: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    border: "1px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    flex: 1,
    marginBottom: "1.5rem",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
    color: "#ffffff",
  },
  cardDesc: {
    fontSize: "0.88rem",
    color: "var(--text-secondary)",
    lineHeight: 1.55,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid var(--border-light)",
    paddingTop: "1rem",
  },
  statsLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.78rem",
    color: "var(--text-muted)",
  },
  cardCta: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.82rem",
    fontWeight: 700,
  },
};
