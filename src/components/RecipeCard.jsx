import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"

function RecipeCard({ meal, onClick }) {
  return (
    <Card
      className="hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
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
// src/components/RecipeCard.jsx