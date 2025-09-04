import { useState } from "react";
import { Input } from "./components/ui/Input.jsx";
import { Button } from "./components/ui/Button.jsx";
import RecipeCard from "./components/RecipeCard.jsx";
import RecipeDetails from "./components/RecipeDetail.jsxs";
import HomeGrid from "./components/HomeGrid.jsx";
import { ChefHat } from "lucide-react";
import "@/font.css";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch recipes based on ingredient(s)
  const fetchRecipes = async () => {
    if (!ingredient.trim()) return;

    setIsSearching(true);
    setHasSearched(false);
    setSelectedRecipe(null); // Clear selected recipe when starting a new search

    const ingredients = ingredient
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);

    try {
      const allMeals = [];
      const fetchedIds = new Set();

      for (const ing of ingredients) {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
        );
        const data = await res.json();
        if (data.meals) {
          // Use a Set to prevent duplicates
          data.meals.forEach((meal) => {
            if (!fetchedIds.has(meal.idMeal)) {
              allMeals.push(meal);
              fetchedIds.add(meal.idMeal);
            }
          });
        }
      }

      setRecipes(allMeals);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      setRecipes([]);
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  // Fetch full recipe details when clicking a card
  const fetchRecipeDetails = async (idMeal) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
      const data = await res.json();
      if (data.meals) {
        setSelectedRecipe(data.meals[0]);
      }
    } catch (error) {
      console.error("Failed to fetch recipe details:", error);
    }
  };

  return (
    <div className="min-h-screen  bg-gray-50 pt-6 px-20 pb-20">
      {/* Header */}
      <div className="flex items-center gap-2 justify-center mb-6">
        <a href="/" className="text-3xl font-bold caveat-custom">
          Recipedia
        </a>
        <ChefHat />
      </div>

      {/* Search Section */}
      <div className="flex gap-2 max-w-md mx-auto mb-8">
        <Input
          placeholder="Enter ingredients (e.g., chicken, onion, garlic)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <Button className="mt-[2px]" onClick={fetchRecipes}>
          Search
        </Button>
      </div>

      {/* Home Bento Grid (before search) */}
      {!hasSearched && !isSearching && (
        <div className="transition-all duration-700 opacity-100">
          <HomeGrid />
        </div>
      )}

      {/* Recipes Grid (after search) */}
      {(hasSearched || isSearching) && (
        <div className="transition-all duration-700 opacity-100">
          {isSearching ? (
            <div className="text-center text-gray-500">
              Searching for recipes...
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3  lg:px-20 gap-6">
              {recipes.map((meal) => (
                <RecipeCard
                  key={meal.idMeal}
                  meal={meal}
                  onClick={() => fetchRecipeDetails(meal.idMeal)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No recipes found for those ingredients.
            </div>
          )}
        </div>
      )}

      {/* Recipe Preview Section */}
      {selectedRecipe && (
        <RecipeDetails
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}

export default App;