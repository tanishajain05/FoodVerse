import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, X, Sparkles } from "lucide-react";

export default function ImageUploader({
  onImageSelected,
  previewUrl,
  onClear,
  label = "Upload Food Image",
  sublabel = "Supports JPG, PNG, WEBP (Max 10MB)",
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, or WEBP).");
      return;
    }
    onImageSelected(file);
  };

  return (
    <div style={styles.container}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {previewUrl ? (
        <div style={styles.previewContainer}>
          <img src={previewUrl} alt="Uploaded Preview" style={styles.previewImage} />
          <div style={styles.previewOverlay}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClear();
                if (inputRef.current) inputRef.current.value = "";
              }}
              style={styles.clearButton}
              title="Remove image"
            >
              <X size={18} color="#ffffff" />
            </button>
            <div style={styles.previewBadge}>
              <Sparkles size={13} color="#a78bfa" />
              <span>Image Loaded for Groq AI</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current && inputRef.current.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            ...styles.dropZone,
            ...(isDragging ? styles.dropZoneActive : {}),
          }}
        >
          <div style={styles.uploadIconWrapper}>
            <UploadCloud size={30} color={isDragging ? "#a78bfa" : "var(--primary)"} />
          </div>
          <div style={styles.label}>{label}</div>
          <div style={styles.sublabel}>{sublabel}</div>
          <div style={styles.browseButton}>
            <ImageIcon size={14} />
            <span>Browse Computer</span>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
  },
  dropZone: {
    border: "2px dashed rgba(139, 92, 246, 0.35)",
    backgroundColor: "rgba(18, 20, 36, 0.5)",
    borderRadius: "var(--radius-lg)",
    padding: "2.5rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    textAlign: "center",
  },
  dropZoneActive: {
    borderColor: "var(--primary)",
    backgroundColor: "rgba(139, 92, 246, 0.12)",
    transform: "scale(1.01)",
    boxShadow: "0 0 30px rgba(139, 92, 246, 0.25)",
  },
  uploadIconWrapper: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    backgroundColor: "rgba(139, 92, 246, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  label: {
    fontFamily: "var(--font-heading)",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "0.25rem",
  },
  sublabel: {
    fontSize: "0.82rem",
    color: "var(--text-muted)",
    marginBottom: "1.2rem",
  },
  browseButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    padding: "0.45rem 1rem",
    borderRadius: "999px",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    border: "1px solid var(--border-light)",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "var(--text-secondary)",
  },
  previewContainer: {
    position: "relative",
    width: "100%",
    height: "280px",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    border: "1px solid var(--border-glow)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  previewOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(10, 12, 22, 0.85) 0%, transparent 60%)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "1rem",
  },
  clearButton: {
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },
  previewBadge: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    backgroundColor: "rgba(10, 12, 22, 0.8)",
    backdropFilter: "blur(8px)",
    border: "1px solid var(--border-light)",
    padding: "0.35rem 0.75rem",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#ffffff",
  },
};
