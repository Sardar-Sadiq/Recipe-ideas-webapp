import { useState } from "react"
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import RecipeCard from "./components/RecipeCard"
import RecipeDetails from "./components/RecipeDetails"
import HomeGrid from "./components/HomeGrid"
import { ChefHat } from 'lucide-react';
import "@/font.css";
function App() {
  const [ingredient, setIngredient] = useState("")
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const fetchRecipes = async () => {
    if (!ingredient.trim()) return

    setIsSearching(true)
    setHasSearched(false)

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      )
      const data = await res.json()
      setRecipes(data.meals || [])
    } catch (error) {
      console.error("Failed to fetch recipes:", error)
      setRecipes([])
    } finally {
      setIsSearching(false)
      setHasSearched(true)
      setSelectedRecipe(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
     <div className="flex items-center gap-2 justify-center mb-6">
  <h1 className="text-3xl font-bold caveat-custom">Recipedia</h1>
  <ChefHat />
</div>

      {/* Search Section */}
      <div className="flex gap-2 max-w-md mx-auto mb-8">
        <Input
          placeholder="Enter ingredients (e.g., chicken, onion, garlic)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <Button onClick={fetchRecipes}>Search</Button>
      </div>

      {/* Home Bento Grid (before search) */}
      {!hasSearched && (
        <div className="transition-all duration-700 opacity-100">
          <HomeGrid />
        </div>
      )}

      {/* Recipes Grid (after search) */}
      {hasSearched && (
        <div className="transition-all duration-700 opacity-100">
          {isSearching ? (
            <div className="text-center text-gray-500">Searching for recipes...</div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recipes.map((meal) => (
                <RecipeCard
                  key={meal.idMeal}
                  meal={meal}
                  onClick={() => setSelectedRecipe(meal)}
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
  )
}

export default App
