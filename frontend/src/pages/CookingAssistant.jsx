import React, { useState, useEffect } from "react";
import ImageUploader from "../components/ImageUploader";
import LoadingState from "../components/LoadingState";
import { getCookingPresets, generateRecipe, guideCookingStep } from "../utils/api";
import { 
  ChefHat, 
  Sparkles, 
  Timer, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  X, 
  Wine, 
  ArrowRight,
  Eye,
  Camera
} from "lucide-react";

export default function CookingAssistant() {
  const [activeMode, setActiveMode] = useState("recipe"); // "recipe" | "vision_guide"
  
  // Recipe Generator State
  const [presets, setPresets] = useState([]);
  const [ingredients, setIngredients] = useState(["Salmon Fillet", "Quinoa", "Avocado", "Lemon", "Garlic", "Olive Oil"]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [dietary, setDietary] = useState("High Protein");
  const [maxTime, setMaxTime] = useState(25);
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  const [appliances, setAppliances] = useState(["Stovetop", "Skillet"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [checkedSteps, setCheckedSteps] = useState({});

  // Vision Guide State
  const [guideFile, setGuideFile] = useState(null);
  const [guidePreview, setGuidePreview] = useState(null);
  const [guideContext, setGuideContext] = useState("Searing salmon in cast iron skillet");
  const [isGuiding, setIsGuiding] = useState(false);
  const [guideResult, setGuideResult] = useState(null);

  useEffect(() => {
    getCookingPresets().then(setPresets).catch(console.error);
    // Auto-generate initial gourmet recipe
    handleGenerateRecipe();
  }, []);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const trimmed = ingredientInput.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setIngredientInput("");
    }
  };

  const handleRemoveIngredient = (ing) => {
    setIngredients(ingredients.filter((i) => i !== ing));
  };

  const handleApplyPreset = (preset) => {
    setIngredients(preset.ingredients);
    setDietary(preset.dietary);
    setMaxTime(preset.time);
  };

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) return;
    setIsGenerating(true);
    setCheckedSteps({});
    try {
      const response = await generateRecipe({
        ingredients,
        dietary_preference: dietary,
        max_time_minutes: maxTime,
        skill_level: skillLevel,
        appliances,
      });
      setRecipe(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGuideSelected = async (file) => {
    setGuideFile(file);
    setGuidePreview(URL.createObjectURL(file));
    setIsGuiding(true);
    try {
      const response = await guideCookingStep(file, guideContext);
      setGuideResult(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGuiding(false);
    }
  };

  const toggleStep = (stepNumber) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  return (
    <div className="animate-fade-in" style={styles.container}>
      {/* Intro Header */}
      <div style={styles.introHeader}>
        <div>
          <h2>Smart Multimodal Cooking Assistant</h2>
          <p style={{ marginTop: "4px" }}>
            Generate bespoke gourmet recipes from available pantry ingredients or stream live visual feedback on cooking doneness, flame heat, and searing timing with Groq Multimodal Vision.
          </p>
        </div>

        {/* Mode Switcher */}
        <div style={styles.modeTabs}>
          <button
            onClick={() => setActiveMode("recipe")}
            style={{
              ...styles.modeTab,
              ...(activeMode === "recipe" ? styles.modeTabActive : {}),
            }}
          >
            <ChefHat size={16} />
            <span>AI Recipe Architect</span>
          </button>
          <button
            onClick={() => setActiveMode("vision_guide")}
            style={{
              ...styles.modeTab,
              ...(activeMode === "vision_guide" ? styles.modeTabActive : {}),
            }}
          >
            <Camera size={16} />
            <span>Live Vision Cooking Guide</span>
          </button>
        </div>
      </div>

      {activeMode === "recipe" ? (
        <div style={styles.layout}>
          {/* Left Column: Ingredients & Customizer */}
          <div style={styles.leftCol}>
            <div className="glass-panel" style={{ padding: "1.6rem" }}>
              <div style={styles.sectionTitleRow}>
                <ChefHat size={18} color="var(--primary)" />
                <span style={styles.sectionTitle}>Pantry Ingredients</span>
              </div>

              {/* Add Ingredient Form */}
              <form onSubmit={handleAddIngredient} style={styles.addForm}>
                <input
                  type="text"
                  placeholder="e.g. Garlic, Chicken, Rosemary..."
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  className="input-field"
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn-primary" style={{ padding: "0.85rem 1.1rem" }}>
                  <Plus size={18} />
                </button>
              </form>

              {/* Active Ingredients Tags */}
              <div style={styles.tagsContainer}>
                {ingredients.map((ing, i) => (
                  <div key={i} style={styles.ingredientTag}>
                    <span>{ing}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(ing)}
                      style={styles.removeTagBtn}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Quick Presets */}
              {presets.length > 0 && (
                <div style={{ marginTop: "1.4rem" }}>
                  <div style={styles.subTitle}>Quick Ingredient Presets:</div>
                  <div style={styles.presetButtons}>
                    {presets.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleApplyPreset(p)}
                        style={styles.presetBtn}
                      >
                        <Sparkles size={13} color="#f59e0b" />
                        <span>{p.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Preferences Form */}
              <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={styles.inputLabel}>Dietary Preference</label>
                  <select
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="input-field"
                  >
                    <option value="None">None (Standard)</option>
                    <option value="High Protein">High Protein</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Keto / Low Carb">Keto / Low Carb</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                  </select>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <label style={styles.inputLabel}>Maximum Cooking Time</label>
                    <span style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 700 }}>
                      {maxTime} Mins
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={maxTime}
                    onChange={(e) => setMaxTime(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--primary)" }}
                  />
                </div>

                <div>
                  <label style={styles.inputLabel}>Culinary Skill Level</label>
                  <select
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                    className="input-field"
                  >
                    <option value="Beginner">Beginner (Fast & Simple)</option>
                    <option value="Intermediate">Intermediate (Balanced Techniques)</option>
                    <option value="Master Chef">Master Chef (Gourmet Techniques)</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateRecipe}
                  disabled={isGenerating}
                  className="btn-primary"
                  style={{ width: "100%", marginTop: "0.5rem" }}
                >
                  <Sparkles size={16} />
                  <span>{isGenerating ? "Crafting Gourmet Recipe..." : "Generate Master Recipe"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Recipe Display */}
          <div style={styles.rightCol}>
            {isGenerating && <LoadingState message="Groq AI is designing a bespoke Michelin-calibrated recipe..." />}

            {recipe && !isGenerating && (
              <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Recipe Hero Card */}
                <div className="glass-panel" style={{ padding: "2rem" }}>
                  <div style={styles.recipeMetaRow}>
                    <span className="badge badge-purple">{recipe.difficulty}</span>
                    <span className="badge badge-cyan">{dietary}</span>
                    <div style={styles.timeBadge}>
                      <Timer size={14} color="#06b6d4" />
                      <span>{recipe.prep_time_minutes + recipe.cook_time_minutes} min total</span>
                    </div>
                  </div>

                  <h1 style={styles.recipeTitle}>{recipe.recipe_name}</h1>
                  <p style={styles.recipeSummary}>{recipe.summary}</p>

                  {/* Nutrition & Servings Badges */}
                  <div style={styles.statsStrip}>
                    <div style={styles.statItem}>
                      <span style={styles.statVal}>{recipe.calories_per_serving}</span>
                      <span style={styles.statLbl}>Calories / Svg</span>
                    </div>
                    <div style={styles.statItem}>
                      <span style={styles.statVal}>{recipe.macros?.protein_g}g</span>
                      <span style={styles.statLbl}>Protein</span>
                    </div>
                    <div style={styles.statItem}>
                      <span style={styles.statVal}>{recipe.macros?.carbs_g}g</span>
                      <span style={styles.statLbl}>Carbs</span>
                    </div>
                    <div style={styles.statItem}>
                      <span style={styles.statVal}>{recipe.macros?.fat_g}g</span>
                      <span style={styles.statLbl}>Fats</span>
                    </div>
                    <div style={styles.statItem}>
                      <span style={styles.statVal}>{recipe.servings}</span>
                      <span style={styles.statLbl}>Servings</span>
                    </div>
                  </div>
                </div>

                {/* Ingredients & Equipment List */}
                <div style={styles.twoColGrid}>
                  <div className="glass-panel" style={{ padding: "1.5rem" }}>
                    <div style={styles.cardHeader}>
                      <Flame size={18} color="var(--primary)" />
                      <span style={styles.cardHeaderTitle}>Mise en Place Ingredients</span>
                    </div>
                    <ul style={styles.ingredientList}>
                      {recipe.ingredients?.map((item, i) => (
                        <li key={i} style={styles.ingredientRow}>
                          <span style={styles.ingName}>{item.name}</span>
                          <span style={styles.ingAmount}>{item.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-panel" style={{ padding: "1.5rem" }}>
                    <div style={styles.cardHeader}>
                      <Wine size={18} color="#f59e0b" />
                      <span style={styles.cardHeaderTitle}>Chef Secret & Pairing</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div>
                        <div style={styles.subTitle}>Culinary Pro Secrets:</div>
                        {recipe.chef_secrets?.map((secret, i) => (
                          <div key={i} style={styles.secretBox}>
                            <Sparkles size={14} color="#f59e0b" style={{ flexShrink: 0, marginTop: "2px" }} />
                            <span>{secret}</span>
                          </div>
                        ))}
                      </div>

                      {recipe.drink_pairing && (
                        <div>
                          <div style={styles.subTitle}>Recommended Beverage Pairing:</div>
                          <div style={styles.pairingBox}>
                            <span>{recipe.drink_pairing}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Interactive Cookalong */}
                <div className="glass-panel" style={{ padding: "1.8rem" }}>
                  <div style={styles.cardHeader}>
                    <CheckCircle2 size={18} color="#10b981" />
                    <span style={styles.cardHeaderTitle}>Interactive Cooking Instructions</span>
                  </div>

                  <div style={styles.stepsList}>
                    {recipe.steps?.map((step) => {
                      const isCompleted = !!checkedSteps[step.step_number];
                      return (
                        <div
                          key={step.step_number}
                          onClick={() => toggleStep(step.step_number)}
                          style={{
                            ...styles.stepCard,
                            ...(isCompleted ? styles.stepCardDone : {}),
                          }}
                        >
                          <div style={styles.stepNumberCol}>
                            <div
                              style={{
                                ...styles.stepNumBadge,
                                backgroundColor: isCompleted ? "#10b981" : "var(--primary)",
                              }}
                            >
                              {isCompleted ? <CheckCircle2 size={16} /> : step.step_number}
                            </div>
                          </div>

                          <div style={styles.stepContent}>
                            <div style={styles.stepTitleRow}>
                              <span style={styles.stepTitle}>{step.title}</span>
                              {step.timer_seconds && (
                                <span style={styles.timerBadge}>
                                  <Timer size={13} />
                                  <span>{Math.round(step.timer_seconds / 60)} min timer</span>
                                </span>
                              )}
                            </div>

                            <p style={styles.stepInstruction}>{step.instruction}</p>

                            {step.pro_tip && (
                              <div style={styles.proTipBox}>
                                <Sparkles size={14} color="#a78bfa" />
                                <span><strong>Chef Tip:</strong> {step.pro_tip}</span>
                              </div>
                            )}

                            {step.danger_alert && (
                              <div style={styles.dangerAlertBox}>
                                <AlertTriangle size={14} color="#f43f5e" />
                                <span><strong>Caution:</strong> {step.danger_alert}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* MODE B: Live Visual Cooking Guide */
        <div style={styles.layout}>
          <div style={styles.leftCol}>
            <div className="glass-panel" style={{ padding: "1.6rem" }}>
              <div style={styles.sectionTitleRow}>
                <Eye size={18} color="#06b6d4" />
                <span style={styles.sectionTitle}>Visual Pan Monitoring</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                Upload or snap a photo of what is cooking in your pan right now. Groq Vision assesses searing crust, caramelization, and heat management.
              </p>

              <ImageUploader
                onImageSelected={handleGuideSelected}
                previewUrl={guidePreview}
                onClear={() => {
                  setGuideFile(null);
                  setGuidePreview(null);
                  setGuideResult(null);
                }}
                label="Upload Cookware Photo"
                sublabel="Pan, grill, cutting board, or pot"
              />

              <div style={{ marginTop: "1.2rem" }}>
                <label style={styles.inputLabel}>Current Cooking Action Context</label>
                <input
                  type="text"
                  value={guideContext}
                  onChange={(e) => setGuideContext(e.target.value)}
                  className="input-field"
                  placeholder="e.g. Searing chicken, sautéing onions..."
                />
              </div>

              {/* Quick test with sample demo image */}
              <button
                onClick={() => handleGuideSelected(null)}
                className="btn-secondary"
                style={{ width: "100%", marginTop: "1rem" }}
              >
                <Sparkles size={15} />
                <span>Simulate Live Pan Searing Stream</span>
              </button>
            </div>
          </div>

          <div style={styles.rightCol}>
            {isGuiding && <LoadingState message="Groq Vision AI is evaluating pan surface doneness & Maillard reaction..." />}

            {guideResult && !isGuiding && (
              <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div className="glass-panel" style={{ padding: "2rem" }}>
                  <div style={styles.guideTop}>
                    <span className="badge badge-cyan">Visual Diagnosis</span>
                    <span className="badge badge-emerald">{guideResult.doneness_assessment}</span>
                  </div>

                  <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0.8rem 0 0.4rem" }}>
                    {guideResult.observed_state}
                  </h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                    Heat Assessment: <strong>{guideResult.heat_management}</strong>
                  </p>

                  {/* Immediate Action Banner */}
                  <div style={styles.nextActionBanner}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <Flame size={22} color="#f97316" />
                      <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff" }}>
                        Immediate Next Step:
                      </span>
                    </div>
                    <p style={{ fontSize: "1rem", color: "#f8fafc", marginTop: "0.4rem", lineHeight: 1.6 }}>
                      {guideResult.immediate_next_step}
                    </p>
                  </div>

                  {/* Pro Chef Tip */}
                  <div style={styles.chefTipBox}>
                    <Sparkles size={18} color="#a78bfa" />
                    <div>
                      <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "0.9rem" }}>
                        Chef Technique Tip
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                        {guideResult.chef_tip}
                      </div>
                    </div>
                  </div>

                  {guideResult.safety_alert && (
                    <div style={styles.dangerAlertBox}>
                      <AlertTriangle size={18} color="#f43f5e" />
                      <span>{guideResult.safety_alert}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "1.2rem",
    marginBottom: "0.5rem",
  },
  modeTabs: {
    display: "flex",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: "0.3rem",
    borderRadius: "14px",
    border: "1px solid var(--border-light)",
  },
  modeTab: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.55rem 1.1rem",
    borderRadius: "10px",
    backgroundColor: "transparent",
    color: "var(--text-muted)",
    fontSize: "0.85rem",
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  modeTabActive: {
    backgroundColor: "var(--primary)",
    color: "#ffffff",
    boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)",
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
  sectionTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  sectionTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "#ffffff",
  },
  addForm: {
    display: "flex",
    gap: "0.6rem",
    marginBottom: "1rem",
  },
  tagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    minHeight: "45px",
  },
  ingredientTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    padding: "0.35rem 0.75rem",
    borderRadius: "8px",
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    border: "1px solid rgba(139, 92, 246, 0.35)",
    color: "#ffffff",
    fontSize: "0.82rem",
    fontWeight: 500,
  },
  removeTagBtn: {
    background: "transparent",
    color: "#c4b5fd",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  subTitle: {
    fontSize: "0.78rem",
    color: "var(--text-muted)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "0.5rem",
  },
  presetButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "0.45rem",
  },
  presetBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 0.8rem",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid var(--border-light)",
    color: "var(--text-secondary)",
    fontSize: "0.8rem",
    textAlign: "left",
    transition: "all 0.2s ease",
  },
  inputLabel: {
    display: "block",
    fontSize: "0.78rem",
    color: "var(--text-muted)",
    fontWeight: 600,
    marginBottom: "0.35rem",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  recipeMetaRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    flexWrap: "wrap",
    marginBottom: "0.8rem",
  },
  timeBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.78rem",
    color: "var(--text-secondary)",
  },
  recipeTitle: {
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "0.6rem",
  },
  recipeSummary: {
    fontSize: "0.95rem",
    lineHeight: 1.6,
    color: "var(--text-secondary)",
    marginBottom: "1.4rem",
  },
  statsStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
    gap: "0.8rem",
    borderTop: "1px solid var(--border-light)",
    paddingTop: "1.2rem",
  },
  statItem: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    padding: "0.75rem",
    borderRadius: "10px",
    textAlign: "center",
  },
  statVal: {
    display: "block",
    fontSize: "1.25rem",
    fontWeight: 800,
    fontFamily: "var(--font-heading)",
    color: "#ffffff",
  },
  statLbl: {
    fontSize: "0.68rem",
    color: "var(--text-muted)",
    textTransform: "uppercase",
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
    fontSize: "1rem",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "#ffffff",
  },
  ingredientList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  ingredientRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.45rem 0.6rem",
    borderRadius: "6px",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
  ingName: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
  },
  ingAmount: {
    fontSize: "0.82rem",
    fontWeight: 700,
    color: "#ffffff",
  },
  secretBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    fontSize: "0.84rem",
    color: "var(--text-secondary)",
    backgroundColor: "rgba(245, 158, 11, 0.08)",
    border: "1px solid rgba(245, 158, 11, 0.2)",
    padding: "0.6rem 0.8rem",
    borderRadius: "8px",
    lineHeight: 1.5,
  },
  pairingBox: {
    fontSize: "0.85rem",
    color: "#fcd34d",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    padding: "0.6rem 0.8rem",
    borderRadius: "8px",
    border: "1px solid var(--border-light)",
  },
  stepsList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  stepCard: {
    display: "flex",
    gap: "1.2rem",
    padding: "1.2rem",
    borderRadius: "var(--radius-md)",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid var(--border-light)",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  stepCardDone: {
    backgroundColor: "rgba(16, 185, 129, 0.08)",
    borderColor: "rgba(16, 185, 129, 0.3)",
    opacity: 0.75,
  },
  stepNumberCol: {
    flexShrink: 0,
  },
  stepNumBadge: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: "0.9rem",
  },
  stepContent: {
    flex: 1,
  },
  stepTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.4rem",
  },
  stepTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#ffffff",
  },
  timerBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    fontSize: "0.75rem",
    color: "#06b6d4",
    backgroundColor: "rgba(6, 182, 212, 0.12)",
    padding: "0.2rem 0.6rem",
    borderRadius: "999px",
  },
  stepInstruction: {
    fontSize: "0.88rem",
    color: "var(--text-secondary)",
    lineHeight: 1.55,
  },
  proTipBox: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.8rem",
    color: "#c4b5fd",
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    padding: "0.45rem 0.75rem",
    borderRadius: "6px",
    marginTop: "0.6rem",
  },
  dangerAlertBox: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.8rem",
    color: "#fda4af",
    backgroundColor: "rgba(244, 63, 94, 0.1)",
    padding: "0.45rem 0.75rem",
    borderRadius: "6px",
    marginTop: "0.5rem",
  },
  guideTop: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  nextActionBanner: {
    backgroundColor: "rgba(249, 115, 22, 0.15)",
    border: "1px solid rgba(249, 115, 22, 0.4)",
    padding: "1.4rem",
    borderRadius: "var(--radius-md)",
    margin: "1.5rem 0",
  },
  chefTipBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.75rem",
    backgroundColor: "rgba(139, 92, 246, 0.12)",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    padding: "1rem 1.2rem",
    borderRadius: "var(--radius-md)",
  },
};
