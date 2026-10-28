"""
Pre-computed realistic fallback and sample showcases for all 5 Food Verse AI modules.
Ensures zero-downtime demonstration for mentors, evaluators, and instant testing.
"""

SAMPLE_FOODS = {
    "salmon_bowl": {
        "food_name": "Grilled Atlantic Salmon Quinoa Bowl",
        "description": "Pan-seared Atlantic salmon fillet served over organic tri-color quinoa, roasted broccolini, sliced avocado, and a light lemon-tarragon drizzle.",
        "serving_size": "1 bowl (380g)",
        "calories": 540,
        "macros": {
            "protein_g": 42.0,
            "carbs_g": 38.0,
            "fat_g": 24.0,
            "fiber_g": 7.5
        },
        "micronutrients": [
            {"name": "Omega-3 Fatty Acids", "amount": "2.6g", "percent_daily": 160},
            {"name": "Vitamin D", "amount": "14.2mcg", "percent_daily": 71},
            {"name": "Vitamin B12", "amount": "3.1mcg", "percent_daily": 129},
            {"name": "Potassium", "amount": "820mg", "percent_daily": 18},
            {"name": "Iron", "amount": "3.2mg", "percent_daily": 18}
        ],
        "health_score": 9.4,
        "health_rating": "Superfood Tier",
        "dietary_tags": ["High Protein", "Heart Healthy", "Gluten Free", "Mediterranean", "Anti-inflammatory"],
        "allergens": ["Fish (Salmon)"],
        "ingredients": [
            "Atlantic Salmon Fillet",
            "Tri-Color Quinoa",
            "Baby Broccolini",
            "Hass Avocado",
            "Extra Virgin Olive Oil",
            "Fresh Lemon Juice",
            "Tarragon & Sea Salt"
        ],
        "nutrition_insights": "Exceptional lean protein profile rich in EPA/DHA Omega-3s. The combination of slow-burning quinoa carbohydrates and healthy monounsaturated fats from avocado provides sustained metabolic energy without blood sugar spikes."
    },
    "avocado_toast": {
        "food_name": "Artisan Sourdough Avocado Toast with Poached Egg",
        "description": "Toasted sourdough bread topped with mashed Hass avocado, microgreens, chia seeds, chili flakes, and a pasture-raised poached egg.",
        "serving_size": "2 slices (260g)",
        "calories": 420,
        "macros": {
            "protein_g": 18.0,
            "carbs_g": 34.0,
            "fat_g": 22.0,
            "fiber_g": 9.0
        },
        "micronutrients": [
            {"name": "Folate", "amount": "140mcg", "percent_daily": 35},
            {"name": "Choline", "amount": "147mg", "percent_daily": 27},
            {"name": "Vitamin E", "amount": "3.8mg", "percent_daily": 25},
            {"name": "Lutein & Zeaxanthin", "amount": "320mcg", "percent_daily": 40}
        ],
        "health_score": 8.8,
        "health_rating": "Nutrient Dense",
        "dietary_tags": ["Vegetarian", "High Fiber", "Healthy Fats", "Gut Friendly"],
        "allergens": ["Egg", "Gluten (Wheat)"],
        "ingredients": [
            "Sourdough Loaf",
            "Fresh Hass Avocado",
            "Pasture-Raised Hen Egg",
            "Organic Microgreens",
            "Black Chia Seeds",
            "Red Pepper Flakes"
        ],
        "nutrition_insights": "Excellent balance of healthy fats and bioavailable egg protein. Sourdough fermentation lowers glycemic impact and fosters gut microbiota."
    },
    "caesar_salad": {
        "food_name": "Grilled Chicken Caesar Salad with Shaved Parmesan",
        "description": "Crisp romaine hearts tossed in garlic parmesan dressing, topped with seasoned grilled chicken breast, rosemary croutons, and aged Parmigiano-Reggiano.",
        "serving_size": "1 salad entree (310g)",
        "calories": 490,
        "macros": {
            "protein_g": 39.0,
            "carbs_g": 16.0,
            "fat_g": 29.0,
            "fiber_g": 4.0
        },
        "micronutrients": [
            {"name": "Calcium", "amount": "280mg", "percent_daily": 22},
            {"name": "Vitamin A", "amount": "450mcg", "percent_daily": 50},
            {"name": "Vitamin K", "amount": "110mcg", "percent_daily": 92},
            {"name": "Zinc", "amount": "2.4mg", "percent_daily": 22}
        ],
        "health_score": 7.8,
        "health_rating": "High Protein / Moderate Fat",
        "dietary_tags": ["High Protein", "Low Carb Compatible", "Keto Friendly (sans croutons)"],
        "allergens": ["Dairy (Parmesan)", "Egg (Dressing)", "Fish (Anchovy)", "Wheat (Croutons)"],
        "ingredients": [
            "Grilled Chicken Breast",
            "Crisp Romaine Hearts",
            "Parmigiano-Reggiano",
            "Garlic Herb Croutons",
            "Classic Caesar Emulsion"
        ],
        "nutrition_insights": "High satiety index with 39g protein. Keep dressing portion monitored if tracking saturated fat."
    }
}

SAMPLE_FRESHNESS = {
    "fresh_strawberry": {
        "item_name": "Organic Strawberries",
        "freshness_score": 96,
        "status": "Peak Freshness",
        "status_color": "green",
        "safe_to_consume": True,
        "days_remaining": 5,
        "visual_indicators": [
            "Vibrant uniform crimson color with natural gloss",
            "Firm, plump fruit structure without indentations or fluid pooling",
            "Lush bright-green calyx (stem leaves) showing zero wilting",
            "No mycelium (mold), bruising, or soft spots detected"
        ],
        "storage_tips": [
            "Keep refrigerated in a ventilated container lined with a dry paper towel",
            "Do not wash until immediately prior to consumption to prevent moisture spoilage",
            "Ideal storage temperature: 32°F - 36°F (0°C - 2°C)"
        ],
        "action_recommendation": "Optimal for fresh consumption, smoothies, or berry tarts over the next 4-6 days."
    },
    "caution_avocado": {
        "item_name": "Hass Avocado",
        "freshness_score": 62,
        "status": "Consume Soon (Caution)",
        "status_color": "yellow",
        "safe_to_consume": True,
        "days_remaining": 1,
        "visual_indicators": [
            "Darkened pebbled skin indicating late-stage ripening",
            "Mild softening near stem cavity with slight yielding",
            "Early enzymatic browning starting at superficial margins",
            "No microbial fuzz or foul odor present"
        ],
        "storage_tips": [
            "Transfer immediately to the crisper drawer of your refrigerator to arrest over-ripening",
            "If cut open, brush exposed flesh with lemon juice and store in an airtight container with onion slices"
        ],
        "action_recommendation": "Consume within 24 hours. Ideal for immediate guacamole, mashing, or freezing for smoothies."
    },
    "spoiled_bread": {
        "item_name": "Sourdough Bread Loaf",
        "freshness_score": 14,
        "status": "Spoiled / Unsafe",
        "status_color": "red",
        "safe_to_consume": False,
        "days_remaining": 0,
        "visual_indicators": [
            "Visible colonies of green/white Penicillium mold spores on crust and crumb",
            "Extensive hyphae penetration throughout the porous bread matrix",
            "Moisture condensation trapped inside plastic packaging fostering mold proliferation",
            "Structural degradation and loss of crumb elasticity"
        ],
        "storage_tips": [
            "Discard immediately into municipal compost or sealed waste bin",
            "Do not attempt to cut away molded section as microscopic fungal roots permeate deep inside porous food"
        ],
        "action_recommendation": "DO NOT CONSUME. Ingesting mycotoxins can provoke severe gastrointestinal and respiratory distress. Dispose safely."
    }
}

SAMPLE_HYGIENE = {
    "clean_kitchen": {
        "facility_name": "Prep Station #1 - Cold Kitchen",
        "overall_score": 95,
        "grade": "A",
        "grade_color": "green",
        "compliance_status": "Fully Compliant (HACCP Standards Met)",
        "categories": [
            {"name": "Cross-Contamination Prevention", "score": 98, "status": "Pass", "notes": "Color-coded cutting boards properly segregated and clean"},
            {"name": "Surface Sanitation & Cleanliness", "score": 96, "status": "Pass", "notes": "Stainless steel counters degreased and sanitized"},
            {"name": "Personnel Hygiene & PPE", "score": 94, "status": "Pass", "notes": "Staff wearing approved hairnets and disposable nitriles"},
            {"name": "Waste & Drainage Management", "score": 92, "status": "Pass", "notes": "Waste bins covered with foot-pedal lids"}
        ],
        "violations": [],
        "commendations": [
            "Sanitizer bucket test strips verified within 200-400 ppm quat",
            "Clear separation between raw poultry prep and ready-to-eat salad stations",
            "Temperature log clipboard maintained and signed hourly"
        ],
        "recommendations": [
            "Schedule quarterly resealing of tile grout near floor drainage basin"
        ]
    },
    "moderate_kitchen": {
        "facility_name": "Hot Line Station #3",
        "overall_score": 74,
        "grade": "C",
        "grade_color": "yellow",
        "compliance_status": "Conditional Pass (Corrective Action Required)",
        "categories": [
            {"name": "Cross-Contamination Prevention", "score": 68, "status": "Warning", "notes": "Raw protein tongs stored adjacent to cooked plating dish"},
            {"name": "Surface Sanitation & Cleanliness", "score": 72, "status": "Warning", "notes": "Grease splatter buildup beneath ventilation hood"},
            {"name": "Personnel Hygiene & PPE", "score": 85, "status": "Pass", "notes": "Aprons clean, single-use gloves changed regularly"},
            {"name": "Waste & Storage Management", "score": 70, "status": "Warning", "notes": "Open sauce squeeze bottles left without date stickers"}
        ],
        "violations": [
            {
                "severity": "Major",
                "code": "HACCP-CC-04",
                "title": "Cross-Contact Risk Near Plating Station",
                "description": "Utensils handling uncooked meats placed on prep rail within 6 inches of ready-to-serve plates.",
                "remedy": "Designate dedicated stainless steel utensil caddies with color-coded silicon grips."
            },
            {
                "severity": "Minor",
                "code": "FDA-FS-12",
                "title": "Missing FIFO Date Labels",
                "description": "Two squeeze bottles containing house aioli lacking discard date markers.",
                "remedy": "Apply waterproof grease-pencil labels with timestamp upon decanting."
            }
        ],
        "commendations": [
            "Refrigeration cold-holding temperatures reading compliant at 38°F"
        ],
        "recommendations": [
            "Conduct 15-minute shift re-training on color-coded tool separation",
            "Deep clean grease filters on line exhaust hood tonight"
        ]
    }
}
