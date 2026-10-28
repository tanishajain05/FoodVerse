import React from "react";
import { Flame, Beef, Wheat, Droplet, Sparkles } from "lucide-react";

export default function MacroRings({ macros, calories, servingSize }) {
  if (!macros) return null;

  const protein = macros.protein_g || 0;
  const carbs = macros.carbs_g || 0;
  const fat = macros.fat_g || 0;
  const fiber = macros.fiber_g || 0;

  // Caloric calculations: Protein 4, Carbs 4, Fat 9
  const totalMacroCal = (protein * 4) + (carbs * 4) + (fat * 9) || 1;
  const pPct = Math.round(((protein * 4) / totalMacroCal) * 100);
  const cPct = Math.round(((carbs * 4) / totalMacroCal) * 100);
  const fPct = Math.round(((fat * 9) / totalMacroCal) * 100);

  const macroItems = [
    {
      name: "Protein",
      amount: `${protein}g`,
      pct: pPct,
      color: "#8b5cf6",
      bgGradient: "linear-gradient(90deg, #8b5cf6 0%, #c084fc 100%)",
      icon: Beef,
    },
    {
      name: "Carbohydrates",
      amount: `${carbs}g`,
      pct: cPct,
      color: "#06b6d4",
      bgGradient: "linear-gradient(90deg, #06b6d4 0%, #38bdf8 100%)",
      icon: Wheat,
    },
    {
      name: "Healthy Fats",
      amount: `${fat}g`,
      pct: fPct,
      color: "#f59e0b",
      bgGradient: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)",
      icon: Droplet,
    },
    {
      name: "Dietary Fiber",
      amount: `${fiber}g`,
      pct: Math.min(100, Math.round((fiber / 30) * 100)),
      color: "#10b981",
      bgGradient: "linear-gradient(90deg, #10b981 0%, #34d399 100%)",
      icon: Sparkles,
    },
  ];

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Macronutrient Breakdown</div>
          {servingSize && <div style={styles.serving}>Per {servingSize}</div>}
        </div>
        <div style={styles.calorieBox}>
          <Flame size={18} color="#f43f5e" />
          <span style={styles.calorieValue}>{calories}</span>
          <span style={styles.calorieUnit}>kcal</span>
        </div>
      </div>

      {/* Visual Macro Bar Stack */}
      <div style={styles.stackBar}>
        <div style={{ ...styles.barSegment, width: `${pPct}%`, backgroundColor: "#8b5cf6" }} title={`Protein: ${pPct}%`} />
        <div style={{ ...styles.barSegment, width: `${cPct}%`, backgroundColor: "#06b6d4" }} title={`Carbs: ${cPct}%`} />
        <div style={{ ...styles.barSegment, width: `${fPct}%`, backgroundColor: "#f59e0b" }} title={`Fat: ${fPct}%`} />
      </div>

      {/* Macro detail cards */}
      <div style={styles.grid}>
        {macroItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} style={styles.itemBox}>
              <div style={styles.itemTop}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Icon size={15} color={item.color} />
                  <span style={styles.itemName}>{item.name}</span>
                </div>
                <span style={{ ...styles.itemAmount, color: item.color }}>{item.amount}</span>
              </div>

              {/* Progress bar */}
              <div style={styles.track}>
                <div
                  style={{
                    ...styles.fill,
                    width: `${Math.min(100, item.pct)}%`,
                    background: item.bgGradient,
                  }}
                />
              </div>

              <div style={styles.itemFooter}>
                <span>{item.pct}% of energy</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "rgba(18, 20, 36, 0.7)",
    backdropFilter: "blur(18px)",
    border: "1px solid var(--border-light)",
    borderRadius: "var(--radius-lg)",
    padding: "1.5rem",
    boxShadow: "var(--shadow-card)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.2rem",
  },
  title: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#ffffff",
    fontFamily: "var(--font-heading)",
  },
  serving: {
    fontSize: "0.78rem",
    color: "var(--text-muted)",
    marginTop: "2px",
  },
  calorieBox: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.3rem",
    backgroundColor: "rgba(244, 63, 94, 0.12)",
    border: "1px solid rgba(244, 63, 94, 0.3)",
    padding: "0.4rem 0.85rem",
    borderRadius: "12px",
  },
  calorieValue: {
    fontSize: "1.4rem",
    fontWeight: 800,
    fontFamily: "var(--font-heading)",
    color: "#ffffff",
  },
  calorieUnit: {
    fontSize: "0.75rem",
    color: "#fda4af",
    fontWeight: 600,
  },
  stackBar: {
    height: "10px",
    borderRadius: "999px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    display: "flex",
    overflow: "hidden",
    marginBottom: "1.3rem",
  },
  barSegment: {
    height: "100%",
    transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "0.85rem",
  },
  itemBox: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid var(--border-light)",
    borderRadius: "var(--radius-md)",
    padding: "0.85rem 1rem",
  },
  itemTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.6rem",
  },
  itemName: {
    fontSize: "0.82rem",
    fontWeight: 600,
    color: "var(--text-secondary)",
  },
  itemAmount: {
    fontSize: "0.95rem",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
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
    transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  itemFooter: {
    marginTop: "0.45rem",
    fontSize: "0.7rem",
    color: "var(--text-muted)",
  },
};
