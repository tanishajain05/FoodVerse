import React from "react";
import { 
  LayoutDashboard, 
  Salad, 
  Apple, 
  ShieldCheck, 
  ChefHat, 
  CalendarCheck, 
  Sparkles,
  Zap
} from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab, apiStatus }) {
  const navItems = [
    { id: "dashboard", label: "Intelligence Hub", icon: LayoutDashboard, badge: "Overview" },
    { id: "food", label: "Food Recognition", icon: Salad, badge: "Vision" },
    { id: "freshness", label: "Freshness Detection", icon: Apple, badge: "Safety" },
    { id: "hygiene", label: "Hygiene Auditor", icon: ShieldCheck, badge: "HACCP" },
    { id: "cooking", label: "Smart Cooking Coach", icon: ChefHat, badge: "Multimodal" },
    { id: "nutrition", label: "Nutrition Planner", icon: CalendarCheck, badge: "Metabolic" },
  ];

  return (
    <aside style={styles.sidebar}>
      {/* Brand Header */}
      <div style={styles.brandContainer}>
        <div style={styles.logoIconWrapper}>
          <Sparkles size={22} color="#ffffff" />
        </div>
        <div>
          <div style={styles.brandTitle}>
            Food<span style={{ color: "var(--primary)" }}>Verse</span> AI
          </div>
          <div style={styles.brandSubtitle}>Multimodal Intelligence</div>
        </div>
      </div>

      {/* Groq Powered Tag */}
      <div style={styles.engineBadge}>
        <Zap size={13} color="#f59e0b" />
        <span>Groq LPU Engine Active</span>
      </div>

      {/* Navigation Links */}
      <nav style={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                ...styles.navButton,
                ...(isActive ? styles.navButtonActive : {}),
              }}
            >
              <div style={styles.navLeft}>
                <div
                  style={{
                    ...styles.navIconBox,
                    ...(isActive ? styles.navIconBoxActive : {}),
                  }}
                >
                  <Icon size={18} color={isActive ? "#ffffff" : "var(--text-muted)"} />
                </div>
                <span
                  style={{
                    ...styles.navLabel,
                    color: isActive ? "#ffffff" : "var(--text-secondary)",
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {item.label}
                </span>
              </div>
              <span
                style={{
                  ...styles.itemBadge,
                  ...(isActive ? styles.itemBadgeActive : {}),
                }}
              >
                {item.badge}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer System Status */}
      <div style={styles.footerStatus}>
        <div style={styles.statusIndicator}>
          <div
            style={{
              ...styles.statusDot,
              backgroundColor: apiStatus?.ready ? "#10b981" : "#f59e0b",
            }}
          />
          <span style={styles.statusText}>
            {apiStatus?.ready ? "API: Online (Groq)" : "Connecting..."}
          </span>
        </div>
        <div style={styles.statusModel}>
          Model: {apiStatus?.vision_model || "qwen3.8-27b"}
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "var(--sidebar-width)",
    height: "100vh",
    backgroundColor: "rgba(10, 12, 22, 0.95)",
    backdropFilter: "blur(20px)",
    borderRight: "1px solid var(--border-light)",
    display: "flex",
    flexDirection: "column",
    padding: "1.6rem 1.1rem",
    zIndex: 50,
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.85rem",
    padding: "0.4rem 0.6rem 1.4rem",
  },
  logoIconWrapper: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)",
  },
  brandTitle: {
    fontFamily: "var(--font-heading)",
    fontSize: "1.3rem",
    fontWeight: "800",
    letterSpacing: "-0.02em",
    color: "#ffffff",
  },
  brandSubtitle: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    fontWeight: 500,
    marginTop: "-2px",
  },
  engineBadge: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    border: "1px solid rgba(245, 158, 11, 0.25)",
    padding: "0.4rem 0.75rem",
    borderRadius: "8px",
    fontSize: "0.75rem",
    color: "#fcd34d",
    fontWeight: 600,
    marginBottom: "1.5rem",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    flex: 1,
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.7rem 0.8rem",
    borderRadius: "12px",
    backgroundColor: "transparent",
    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    textAlign: "left",
    width: "100%",
  },
  navButtonActive: {
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    border: "1px solid rgba(139, 92, 246, 0.35)",
    boxShadow: "0 4px 20px rgba(139, 92, 246, 0.15)",
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  navIconBox: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },
  navIconBoxActive: {
    backgroundColor: "var(--primary)",
  },
  navLabel: {
    fontSize: "0.88rem",
  },
  itemBadge: {
    fontSize: "0.65rem",
    padding: "0.15rem 0.45rem",
    borderRadius: "6px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "var(--text-dim)",
    fontWeight: 600,
  },
  itemBadgeActive: {
    backgroundColor: "rgba(139, 92, 246, 0.3)",
    color: "#ddd6fe",
  },
  footerStatus: {
    padding: "0.85rem 0.9rem",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: "12px",
    border: "1px solid var(--border-light)",
  },
  statusIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    boxShadow: "0 0 10px #10b981",
  },
  statusText: {
    fontSize: "0.78rem",
    fontWeight: 600,
    color: "var(--text-main)",
  },
  statusModel: {
    fontSize: "0.7rem",
    color: "var(--text-muted)",
    marginTop: "0.25rem",
    paddingLeft: "1rem",
  },
};
