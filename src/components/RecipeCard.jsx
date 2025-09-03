import { AspectRatio } from "./ui/AspectRatio"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"

function RecipeCard({ meal, onClick }) {
  return (
    <Card
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition"
    >
      <AspectRatio ratio={1}>
        {/* Image */}
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-lg font-semibold drop-shadow-md">
            {meal.strMeal}
          </h3>
        </div>
      </AspectRatio>
    </Card>
  )
}

export default RecipeCard