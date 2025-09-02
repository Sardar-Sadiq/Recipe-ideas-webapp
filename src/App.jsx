// src/App.jsx
import { useState } from "react"
import { Input } from "./components/ui/Input"
import { Button } from "./components/ui/Button"
import RecipeCard from "./components/RecipeCard"

function App() {
  const [ingredient, setIngredient] = useState("")
  const [recipes, setRecipes] = useState([])

  const fetchRecipes = async () => {
    if (!ingredient) return
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`
    )
    const data = await res.json()
    setRecipes(data.meals || [])
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🍳 Recipe Ideas</h1>

      <div className="flex gap-2 max-w-md mx-auto mb-8">
        <Input
          placeholder="Enter ingredient (e.g., chicken)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <Button onClick={fetchRecipes}>Search</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recipes.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  )
}

export default App
