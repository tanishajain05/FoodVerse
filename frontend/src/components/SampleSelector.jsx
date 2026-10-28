import React from "react";
import { Sparkles } from "lucide-react";

export default function SampleSelector({ samples = [], selectedId, onSelect, title = "Or pick a sample scene to test instantly:" }) {
  if (!samples || samples.length === 0) return null;

  return (
    <div style={styles.container}>
      <div style={styles.titleRow}>
        <Sparkles size={14} color="#f59e0b" />
        <span style={styles.title}>{title}</span>
      </div>

      <div style={styles.grid}>
        {samples.map((s) => {
          const isSelected = selectedId === s.id;
          return (
            <div
              key={s.id}
              onClick={() => onSelect(s)}
              style={{
                ...styles.card,
                ...(isSelected ? styles.cardActive : {}),
              }}
            >
              <img src={s.preview_url} alt={s.name} style={styles.thumbnail} />
              <div style={styles.content}>
                <div style={styles.name}>{s.name}</div>
                <div style={styles.metaRow}>
                  {s.badge && <span style={styles.badge}>{s.badge}</span>}
                  {s.tag && <span style={styles.badge}>{s.tag}</span>}
                  {s.calories && <span style={styles.calories}>{s.calories} kcal</span>}
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
  container: {
    margin: "1.2rem 0",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.45rem",
    marginBottom: "0.75rem",
  },
  title: {
    fontSize: "0.82rem",
    color: "var(--text-muted)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "0.85rem",
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    padding: "0.6rem 0.8rem",
    borderRadius: "var(--radius-md)",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid var(--border-light)",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  cardActive: {
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    borderColor: "var(--primary)",
    boxShadow: "0 0 18px rgba(139, 92, 246, 0.3)",
    transform: "translateY(-2px)",
  },
  thumbnail: {
    width: "48px",
    height: "48px",
    borderRadius: "10px",
    objectFit: "cover",
  },
  content: {
    flex: 1,
    overflow: "hidden",
  },
  name: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--text-main)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    marginTop: "0.2rem",
  },
  badge: {
    fontSize: "0.68rem",
    padding: "0.15rem 0.45rem",
    borderRadius: "4px",
    backgroundColor: "rgba(139, 92, 246, 0.2)",
    color: "#c4b5fd",
    fontWeight: 600,
  },
  calories: {
    fontSize: "0.7rem",
    color: "var(--text-muted)",
  },
};
