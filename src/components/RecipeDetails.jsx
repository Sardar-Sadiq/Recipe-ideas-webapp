import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Button } from "./ui/Button"

function RecipeDetails({ recipe, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Centered Recipe Box */}
      <Card className="relative w-[90%] max-w-2xl h-[80%] overflow-y-auto shadow-2xl">
        <CardHeader className="flex justify-between items-center sticky top-0 bg-white z-10 p-4">
          <CardTitle className="text-2xl">{recipe.strMeal}</CardTitle>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </CardHeader>

        <CardContent className="p-4">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="rounded-lg mb-4 w-full"
          />

          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Category:</span> {recipe.strCategory}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Area:</span> {recipe.strArea}
          </p>
           <h3 className="font-bold mt-4 mb-2">Ingredients:</h3>
          <ul className="list-disc pl-6">
            {Array.from({ length: 20 }).map((_, i) => {
              const ingredient = recipe[`strIngredient${i + 1}`]
              const measure = recipe[`strMeasure${i + 1}`]
              return (
                ingredient && (
                  <li key={i}>
                    {ingredient} - {measure}
                  </li>
                )
              )
            })}
          </ul>

          <h3 className="font-bold mt-4 mb-2">Instructions:</h3>
          <p className="text-gray-700 whitespace-pre-line">{recipe.strInstructions}</p>

         
        </CardContent>
      </Card>
    </div>
  )
}

export default RecipeDetails