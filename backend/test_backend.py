import asyncio
from services.sample_data import SAMPLE_FOODS, SAMPLE_FRESHNESS, SAMPLE_HYGIENE
from routers.food_recognition import get_sample_foods
from routers.freshness import get_sample_freshness
from routers.hygiene import get_sample_kitchens
from routers.cooking import get_cooking_presets
from routers.nutrition import get_user_archetypes

def test_sync():
    print("Testing sample registries...")
    assert len(get_sample_foods()) == 3
    assert len(get_sample_freshness()) == 3
    assert len(get_sample_kitchens()) == 2
    assert len(get_cooking_presets()) == 3
    assert len(get_user_archetypes()) == 3
    print("All sample registries validated successfully!")

if __name__ == "__main__":
    test_sync()
