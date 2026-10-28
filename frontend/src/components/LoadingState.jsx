import React, { useState, useEffect } from "react";
import { Sparkles, Cpu } from "lucide-react";

export default function LoadingState({ message = "Analyzing image with Groq Vision AI..." }) {
  const [subStepIndex, setSubStepIndex] = useState(0);

  const steps = [
    "Preprocessing high-resolution image tensor...",
    "Transmitting to Groq LPU cluster (Qwen-3.8)...",
    "Extracting food taxonomy & biochemical markers...",
    "Computing macronutrient & caloric density...",
    "Synthesizing actionable nutritional intelligence...",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSubStepIndex((prev) => (prev + 1) % steps.length);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.spinnerWrapper}>
        <div style={styles.glowRing} />
        <div style={styles.rotatingRing} />
        <div style={styles.centerIcon}>
          <Sparkles size={24} color="#8b5cf6" />
        </div>
      </div>

      <div style={styles.title}>{message}</div>
      <div style={styles.subStep}>
        <Cpu size={14} color="#06b6d4" />
        <span>{steps[subStepIndex]}</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3.5rem 1.5rem",
    backgroundColor: "rgba(18, 20, 36, 0.6)",
    backdropFilter: "blur(18px)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--border-light)",
    boxShadow: "var(--shadow-card)",
    margin: "1.5rem 0",
  },
  spinnerWrapper: {
    position: "relative",
    width: "72px",
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.3rem",
  },
  glowRing: {
    position: "absolute",
    inset: "-8px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%)",
    animation: "pulseGlow 2s infinite ease-in-out",
  },
  rotatingRing: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    border: "3px solid transparent",
    borderTopColor: "var(--primary)",
    borderRightColor: "var(--secondary)",
    animation: "spin 1s linear infinite",
  },
  centerIcon: {
    position: "relative",
    zIndex: 2,
  },
  title: {
    fontFamily: "var(--font-heading)",
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "0.4rem",
  },
  subStep: {
    display: "flex",
    alignItems: "center",
    gap: "0.45rem",
    fontSize: "0.82rem",
    color: "var(--text-muted)",
    transition: "all 0.3s ease",
  },
};
