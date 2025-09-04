import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import { ScrollArea } from "@/components/ui/scroll-area"

function RecipeDetails({ recipe, onClose }) {
  return (
    <Dialog open={!!recipe} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[600px] bg-transparent p-4 lg:p-8 border-none shadow-none lg:max-h-[90vh]  [&>button]:hidden">
        {/* Card component to hold the content */}
        <Card className="rounded-lg overflow-hidden border-none shadow-2xl">
          <CardHeader className="flex justify-between items-center sticky top-0 bg-white z-10 py-4 px-6">
            <CardTitle className="text-2xl font-semibold">{recipe.strMeal}</CardTitle>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="rounded-lg mb-6 w-full object-cover max-h-[30vh] lg:max-h-[200px]"
            />
            
            {/* Using ScrollArea for instructions */}
            <ScrollArea className="h-[400px] lg:h-[500px] pr-4 pb-6">
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
            </ScrollArea>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

export default RecipeDetails