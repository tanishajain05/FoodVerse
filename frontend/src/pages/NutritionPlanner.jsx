import React, { useState, useEffect } from "react";
import LoadingState from "../components/LoadingState";
import { getNutritionArchetypes, generateMealPlan } from "../utils/api";
import { 
  CalendarCheck, 
  Sparkles, 
  Flame, 
  Beef, 
  Wheat, 
  Droplet, 
  ShoppingCart, 
  CheckCircle2, 
  Clock, 
  Activity, 
  HeartPulse, 
  User, 
  ChevronRight 
} from "lucide-react";

export default function NutritionPlanner() {
  const [archetypes, setArchetypes] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Form State
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState("Male");
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(75);
  const [activity, setActivity] = useState("Moderately Active");
  const [goal, setGoal] = useState("Lean Muscle Gain");
  const [dietary, setDietary] = useState("High Protein");
  const [mealsPerDay, setMealsPerDay] = useState(4);
  const [checkedGrocery, setCheckedGrocery] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    getNutritionArchetypes().then(setArchetypes).catch(console.error);
    // Initial generation
    handleGeneratePlan();
  }, []);

  const handleApplyArchetype = (arch) => {
    setAge(arch.age);
    setWeightKg(arch.weight);
    setHeightCm(arch.height);
    setGoal(arch.goal);
    setDietary(arch.diet);
  };

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setCheckedGrocery({});
    try {
      const response = await generateMealPlan({
        age,
        gender,
        height_cm: heightCm,
        weight_kg: weightKg,
        activity_level: activity,
        goal,
        dietary_preference: dietary,
        meals_per_day: mealsPerDay,
        plan_duration_days: 7,
      });
      setPlan(response.data);
      setSelectedDayIndex(0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleGroceryItem = (item) => {
    setCheckedGrocery((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const activeDay = plan?.weekly_plan?.[selectedDayIndex] || plan?.weekly_plan?.[0];

  return (
    <div className="animate-fade-in" style={styles.container}>
      {/* Intro Header */}
      <div style={styles.introHeader}>
        <h2>Personalized Metabolic Nutrition Planner</h2>
        <p style={{ marginTop: "4px" }}>
          Synthesizes clinical metabolic modeling (BMR/TDEE targets) with personalized macronutrient ratios to generate an adaptive 7-day nutritional schedule and integrated grocery shopping list.
        </p>
      </div>

      <div style={styles.layout}>
        {/* Left Column: Metabolic Profile Input */}
        <div style={styles.leftCol}>
          <div className="glass-panel" style={{ padding: "1.6rem" }}>
            <div style={styles.sectionHeader}>
              <User size={18} color="var(--primary)" />
              <span style={styles.sectionTitle}>User Metabolic Profile</span>
            </div>

            {/* Archetype Quick Selectors */}
            {archetypes.length > 0 && (
              <div style={{ marginBottom: "1.2rem" }}>
                <div style={styles.subTitle}>1-Click Archetype Presets:</div>
                <div style={styles.archetypeGrid}>
                  {archetypes.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => handleApplyArchetype(a)}
                      style={styles.archetypeBtn}
                    >
                      <Sparkles size={12} color="#f59e0b" />
                      <div>
                        <div style={{ fontWeight: 700, color: "#ffffff" }}>{a.name}</div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{a.goal}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Profile inputs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                <div>
                  <label style={styles.inputLabel}>Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label style={styles.inputLabel}>Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input-field"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                <div>
                  <label style={styles.inputLabel}>Height (cm)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label style={styles.inputLabel}>Weight (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label style={styles.inputLabel}>Physical Activity Level</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="input-field"
                >
                  <option value="Sedentary">Sedentary (Desk Job)</option>
                  <option value="Lightly Active">Lightly Active (1-3 days/wk)</option>
                  <option value="Moderately Active">Moderately Active (3-5 days/wk)</option>
                  <option value="Very Active">Very Active (6-7 days/wk)</option>
                  <option value="Elite Athlete">Elite Athlete (2x training/day)</option>
                </select>
              </div>

              <div>
                <label style={styles.inputLabel}>Primary Fitness Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="input-field"
                >
                  <option value="Lean Muscle Gain">Lean Muscle Gain (Hypertrophy)</option>
                  <option value="Fat Loss">Accelerated Fat Loss</option>
                  <option value="Clean Bulk">Clean Caloric Surplus</option>
                  <option value="Maintenance">Maintenance & Vitality</option>
                  <option value="Heart Health & Longevity">Heart Health & Longevity</option>
                </select>
              </div>

              <div>
                <label style={styles.inputLabel}>Dietary Pattern</label>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="input-field"
                >
                  <option value="High Protein">High Protein Omnivore</option>
                  <option value="Mediterranean">Mediterranean Superfood</option>
                  <option value="Plant-Based / Vegan">Plant-Based / 100% Vegan</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Keto / Low Carb">Keto / Low Carb</option>
                  <option value="Pescatarian">Pescatarian</option>
                </select>
              </div>

              <button
                onClick={handleGeneratePlan}
                disabled={isLoading}
                className="btn-primary"
                style={{ width: "100%", marginTop: "0.6rem" }}
              >
                <Sparkles size={16} />
                <span>{isLoading ? "Calculating Metabolic Plan..." : "Synthesize 7-Day Plan"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Nutrition Plan & Daily Breakdown */}
        <div style={styles.rightCol}>
          {isLoading && <LoadingState message="Groq AI is computing metabolic targets & structuring your 7-day culinary protocol..." />}

          {plan && !isLoading && (
            <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Metabolic Targets Header Banner */}
              <div className="glass-panel" style={{ padding: "1.8rem" }}>
                <div style={styles.bannerTop}>
                  <div>
                    <span className="badge badge-rose">Metabolic Targets</span>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.4rem" }}>
                      Daily Caloric Target: {plan.metabolic_profile?.target_daily_calories} kcal
                    </h2>
                    <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                      {plan.metabolic_profile?.calorie_strategy}
                    </p>
                  </div>

                  <div style={styles.tdeeBox}>
                    <div style={styles.tdeeVal}>{plan.metabolic_profile?.tdee_calories}</div>
                    <div style={styles.tdeeLbl}>TDEE Cal/Day</div>
                  </div>
                </div>

                {/* Macro summary pills */}
                <div style={styles.macroStrip}>
                  <div style={styles.macroPill}>
                    <Beef size={15} color="#8b5cf6" />
                    <span><strong>{plan.metabolic_profile?.target_protein_g}g</strong> Protein</span>
                  </div>
                  <div style={styles.macroPill}>
                    <Wheat size={15} color="#06b6d4" />
                    <span><strong>{plan.metabolic_profile?.target_carbs_g}g</strong> Carbs</span>
                  </div>
                  <div style={styles.macroPill}>
                    <Flame size={15} color="#f59e0b" />
                    <span><strong>{plan.metabolic_profile?.target_fat_g}g</strong> Healthy Fats</span>
                  </div>
                  <div style={styles.macroPill}>
                    <Droplet size={15} color="#38bdf8" />
                    <span><strong>{plan.metabolic_profile?.target_water_liters}L</strong> Water/Day</span>
                  </div>
                </div>
              </div>

              {/* 7-Day Day Selector Bar */}
              <div style={styles.daySelectorBar}>
                {plan.weekly_plan?.map((dayObj, idx) => {
                  const isActive = selectedDayIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDayIndex(idx)}
                      style={{
                        ...styles.dayButton,
                        ...(isActive ? styles.dayButtonActive : {}),
                      }}
                    >
                      <div style={styles.dayName}>{dayObj.day}</div>
                      <div style={styles.dayCal}>{dayObj.total_calories} kcal</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Day Meal Cards */}
              {activeDay && (
                <div style={styles.dayMealsContainer}>
                  <div style={styles.dayFocusHeader}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <CalendarCheck size={18} color="var(--primary)" />
                      <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff" }}>
                        {activeDay.day} Schedule
                      </span>
                    </div>
                    {activeDay.focus && (
                      <span className="badge badge-purple">{activeDay.focus}</span>
                    )}
                  </div>

                  <div style={styles.mealsGrid}>
                    {activeDay.meals?.map((meal, i) => (
                      <div key={i} className="glass-panel" style={styles.mealCard}>
                        <div style={styles.mealHeader}>
                          <span className="badge badge-cyan">{meal.type}</span>
                          <div style={styles.mealTime}>
                            <Clock size={13} />
                            <span>{meal.prep_time_minutes} min prep</span>
                          </div>
                        </div>

                        <h3 style={styles.mealTitle}>{meal.name}</h3>
                        <p style={styles.mealDesc}>{meal.description}</p>

                        <div style={styles.mealFooter}>
                          <div style={styles.mealCal}>{meal.calories} kcal</div>
                          <div style={styles.mealMacros}>
                            <span>P: {meal.protein_g}g</span>
                            <span>C: {meal.carbs_g}g</span>
                            <span>F: {meal.fat_g}g</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grocery Shopping List Section */}
              {plan.grocery_list && (
                <div className="glass-panel" style={{ padding: "1.8rem" }}>
                  <div style={styles.sectionHeader}>
                    <ShoppingCart size={18} color="#10b981" />
                    <span style={styles.sectionTitle}>Curated Weekly Grocery Shopping List</span>
                  </div>

                  <div style={styles.groceryGrid}>
                    {Object.entries(plan.grocery_list).map(([category, items]) => (
                      <div key={category} style={styles.groceryCategoryBox}>
                        <div style={styles.categoryTitle}>{category}</div>
                        <div style={styles.groceryItemsList}>
                          {items.map((item, i) => {
                            const isChecked = !!checkedGrocery[item];
                            return (
                              <div
                                key={i}
                                onClick={() => toggleGroceryItem(item)}
                                style={{
                                  ...styles.groceryItem,
                                  ...(isChecked ? styles.groceryItemChecked : {}),
                                }}
                              >
                                <div
                                  style={{
                                    ...styles.checkCircle,
                                    backgroundColor: isChecked ? "#10b981" : "transparent",
                                    borderColor: isChecked ? "#10b981" : "rgba(255, 255, 255, 0.2)",
                                  }}
                                >
                                  {isChecked && <CheckCircle2 size={12} color="#ffffff" />}
                                </div>
                                <span style={styles.itemText}>{item}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
  sectionHeader: {
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
  subTitle: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "0.5rem",
  },
  archetypeGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "0.5rem",
  },
  archetypeBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    padding: "0.6rem 0.8rem",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid var(--border-light)",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  inputLabel: {
    display: "block",
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    fontWeight: 600,
    marginBottom: "0.3rem",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  bannerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1.2rem",
  },
  tdeeBox: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    border: "1px solid var(--border-light)",
    padding: "0.6rem 1rem",
    borderRadius: "12px",
    textAlign: "right",
  },
  tdeeVal: {
    fontSize: "1.4rem",
    fontWeight: 800,
    fontFamily: "var(--font-heading)",
    color: "#ffffff",
    lineHeight: 1,
  },
  tdeeLbl: {
    fontSize: "0.68rem",
    color: "var(--text-muted)",
    textTransform: "uppercase",
  },
  macroStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: "0.8rem",
    borderTop: "1px solid var(--border-light)",
    paddingTop: "1rem",
  },
  macroPill: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid var(--border-light)",
    padding: "0.5rem 0.8rem",
    borderRadius: "10px",
    fontSize: "0.82rem",
    color: "var(--text-secondary)",
  },
  daySelectorBar: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "0.5rem",
    overflowX: "auto",
  },
  dayButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0.75rem 0.5rem",
    borderRadius: "12px",
    backgroundColor: "rgba(18, 20, 36, 0.6)",
    border: "1px solid var(--border-light)",
    transition: "all 0.2s ease",
  },
  dayButtonActive: {
    backgroundColor: "rgba(139, 92, 246, 0.2)",
    borderColor: "var(--primary)",
    boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)",
  },
  dayName: {
    fontSize: "0.82rem",
    fontWeight: 700,
    color: "#ffffff",
  },
  dayCal: {
    fontSize: "0.7rem",
    color: "var(--text-muted)",
    marginTop: "2px",
  },
  dayMealsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  dayFocusHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.2rem",
  },
  mealCard: {
    padding: "1.4rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  mealHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.8rem",
  },
  mealTime: {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    fontSize: "0.72rem",
    color: "var(--text-muted)",
  },
  mealTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "0.4rem",
  },
  mealDesc: {
    fontSize: "0.82rem",
    color: "var(--text-secondary)",
    lineHeight: 1.5,
    marginBottom: "1rem",
  },
  mealFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid var(--border-light)",
    paddingTop: "0.8rem",
  },
  mealCal: {
    fontSize: "1rem",
    fontWeight: 800,
    fontFamily: "var(--font-heading)",
    color: "#ffffff",
  },
  mealMacros: {
    display: "flex",
    gap: "0.6rem",
    fontSize: "0.72rem",
    color: "var(--text-muted)",
  },
  groceryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.5rem",
  },
  groceryCategoryBox: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: "var(--radius-md)",
    padding: "1rem",
    border: "1px solid var(--border-light)",
  },
  categoryTitle: {
    fontSize: "0.88rem",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "0.8rem",
    fontFamily: "var(--font-heading)",
  },
  groceryItemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  groceryItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    fontSize: "0.82rem",
    color: "var(--text-secondary)",
    cursor: "pointer",
    padding: "0.3rem 0.4rem",
    borderRadius: "6px",
    transition: "all 0.2s ease",
  },
  groceryItemChecked: {
    textDecoration: "line-through",
    opacity: 0.5,
  },
  checkCircle: {
    width: "16px",
    height: "16px",
    borderRadius: "4px",
    border: "1px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  itemText: {
    flex: 1,
  },
};
