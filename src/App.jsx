import { useState } from "react"
import { Input } from "./components/ui/Input"
import { Button } from "./components/ui/Button"
import RecipeCard from "./components/RecipeCard"
import RecipeDetails from "./components/RecipeDetails"

function App() {
  const [ingredient, setIngredient] = useState("")
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const fetchRecipes = async () => {
    if (!ingredient.trim()) return

    setIsSearching(true)
    setHasSearched(false) // Reset search status

    const ingredients = ingredient.split(',').map(item => item.trim()).filter(item => item.length > 0);

    try {
      const allResults = await Promise.all(
        ingredients.map(async (ing) => {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
          )
          const data = await res.json()
          return data.meals || []
        })
      )

      if (allResults.length === 0) {
        setRecipes([]);
      } else {
        const firstIngredientRecipes = allResults[0];
        const commonMeals = firstIngredientRecipes.filter(recipe => {
          return allResults.every(resultList => 
            resultList.some(r => r.idMeal === recipe.idMeal)
          );
        });
        setRecipes(commonMeals);
      }

    } catch (error) {
      console.error("Failed to fetch recipes:", error)
      setRecipes([])
    } finally {
      setIsSearching(false)
      setHasSearched(true)
      setSelectedRecipe(null) // reset when searching new
    }
  }

  const fetchRecipeDetails = async (idMeal) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    )
    const data = await res.json()
    setSelectedRecipe(data.meals[0])
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1  className="text-3xl font-bold text-center mb-6">🍳 Recipe Ideas</h1>

      {/* Search Section */}
      <div className="flex gap-2 max-w-md mx-auto mb-8">
        <Input
          placeholder="Enter ingredients (e.g., chicken, onion, garlic)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <Button onClick={fetchRecipes}>Search</Button>
      </div>

      {/* Recipes Grid */}
      {isSearching ? (
        <div className="text-center text-gray-500 col-span-3">
          Searching for recipes...
        </div>
      ) : (
        recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipes.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
                onClick={() => fetchRecipeDetails(meal.idMeal)}
              />
            ))}
          </div>
        ) : (
          hasSearched && (
            <div className="text-center text-gray-500 col-span-3">
              No recipes found for those ingredients.
            </div>
          )
        )
      )}

      {/* Recipe Preview Section */}
      {selectedRecipe && (
        <RecipeDetails recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  )
}

export default App