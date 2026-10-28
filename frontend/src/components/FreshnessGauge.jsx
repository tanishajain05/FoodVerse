import React from "react";
import { ShieldCheck, AlertTriangle, XCircle } from "lucide-react";

export default function FreshnessGauge({ score = 85, status = "Fresh", statusColor = "green", daysRemaining = 4 }) {
  // Normalize score between 0 and 100
  const normalizedScore = Math.max(0, Math.min(100, score));
  
  // SVG circular arc calculations
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Arc spans 260 degrees (leaving 100 degrees open at the bottom)
  const arcLength = circumference * (260 / 360);
  const strokeDashoffset = arcLength - (arcLength * normalizedScore) / 100;

  let colorHex = "#10b981"; // green
  let glowColor = "rgba(16, 185, 129, 0.4)";
  let StatusIcon = ShieldCheck;

  if (statusColor === "yellow" || (normalizedScore < 75 && normalizedScore >= 45)) {
    colorHex = "#f59e0b";
    glowColor = "rgba(245, 158, 11, 0.4)";
    StatusIcon = AlertTriangle;
  } else if (statusColor === "red" || normalizedScore < 45) {
    colorHex = "#f43f5e";
    glowColor = "rgba(244, 63, 94, 0.4)";
    StatusIcon = XCircle;
  }

  return (
    <div style={styles.container}>
      <div style={styles.gaugeWrapper}>
        <svg
          width={size}
          height={size}
          style={{ transform: "rotate(140deg)", overflow: "visible" }}
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Glowing Animated Value Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={colorHex}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s ease",
              filter: `drop-shadow(0 0 10px ${glowColor})`,
            }}
          />
        </svg>

        {/* Center Readout */}
        <div style={styles.centerReadout}>
          <div style={{ ...styles.scoreNumber, color: colorHex }}>
            {normalizedScore}
            <span style={styles.percentSymbol}>%</span>
          </div>
          <div style={styles.scoreLabel}>Freshness Index</div>
        </div>
      </div>

      {/* Status Pill Badge */}
      <div
        style={{
          ...styles.statusBadge,
          backgroundColor: `${colorHex}15`,
          borderColor: `${colorHex}40`,
        }}
      >
        <StatusIcon size={16} color={colorHex} />
        <span style={{ ...styles.statusText, color: colorHex }}>{status}</span>
      </div>

      {/* Days remaining badge */}
      {daysRemaining !== undefined && (
        <div style={styles.shelfLifeText}>
          Estimated Shelf Life: <strong>{daysRemaining > 0 ? `${daysRemaining} days` : "Expired"}</strong>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem 1rem",
  },
  gaugeWrapper: {
    position: "relative",
    width: "180px",
    height: "180px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  centerReadout: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
  },
  scoreNumber: {
    fontFamily: "var(--font-heading)",
    fontSize: "2.8rem",
    fontWeight: "900",
    lineHeight: 1,
    letterSpacing: "-0.03em",
  },
  percentSymbol: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginLeft: "2px",
  },
  scoreLabel: {
    fontSize: "0.72rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--text-muted)",
    fontWeight: 600,
    marginTop: "4px",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.45rem 1.1rem",
    borderRadius: "999px",
    border: "1px solid",
    marginTop: "0.85rem",
  },
  statusText: {
    fontSize: "0.88rem",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
  },
  shelfLifeText: {
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
    marginTop: "0.6rem",
  },
};
