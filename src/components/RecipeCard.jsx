// src/components/RecipeCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"

function RecipeCard({ meal }) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <CardTitle>{meal.strMeal}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="rounded-lg"
        />
      </CardContent>
    </Card>
  )
}

export default RecipeCard
