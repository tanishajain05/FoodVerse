const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";


export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    return { status: "offline", ready: false, error: err.message };
  }
}

// 🥗 Food Recognition
export async function getFoodSamples() {
  const res = await fetch(`${API_BASE}/food/samples`);
  return await res.json();
}

export async function recognizeFood(file = null, sampleId = null) {
  const formData = new FormData();
  if (file) formData.append("file", file);
  if (sampleId) formData.append("sample_id", sampleId);

  const res = await fetch(`${API_BASE}/food/recognize`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Food recognition failed");
  }
  return await res.json();
}

// 🍎 Freshness & Spoilage
export async function getFreshnessSamples() {
  const res = await fetch(`${API_BASE}/freshness/samples`);
  return await res.json();
}

export async function detectFreshness(file = null, sampleId = null) {
  const formData = new FormData();
  if (file) formData.append("file", file);
  if (sampleId) formData.append("sample_id", sampleId);

  const res = await fetch(`${API_BASE}/freshness/detect`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Freshness detection failed");
  }
  return await res.json();
}

// 🏥 Restaurant Hygiene
export async function getHygieneSamples() {
  const res = await fetch(`${API_BASE}/hygiene/samples`);
  return await res.json();
}

export async function analyzeHygiene(file = null, sampleId = null) {
  const formData = new FormData();
  if (file) formData.append("file", file);
  if (sampleId) formData.append("sample_id", sampleId);

  const res = await fetch(`${API_BASE}/hygiene/analyze`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Hygiene analysis failed");
  }
  return await res.json();
}

// 👨‍🍳 Smart Cooking Assistant
export async function getCookingPresets() {
  const res = await fetch(`${API_BASE}/cooking/presets`);
  return await res.json();
}

export async function generateRecipe(recipeRequest) {
  const res = await fetch(`${API_BASE}/cooking/recipe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipeRequest),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Recipe generation failed");
  }
  return await res.json();
}

export async function guideCookingStep(file = null, recipeContext = "Searing food") {
  const formData = new FormData();
  if (file) formData.append("file", file);
  formData.append("recipe_context", recipeContext);

  const res = await fetch(`${API_BASE}/cooking/guide`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Live guidance failed");
  }
  return await res.json();
}

// 📊 Personalized Nutrition Planner
export async function getNutritionArchetypes() {
  const res = await fetch(`${API_BASE}/nutrition/archetypes`);
  return await res.json();
}

export async function generateMealPlan(planRequest) {
  const res = await fetch(`${API_BASE}/nutrition/plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(planRequest),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Meal plan generation failed");
  }
  return await res.json();
}
