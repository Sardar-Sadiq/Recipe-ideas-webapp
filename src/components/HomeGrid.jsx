// src/components/HomeGrid.jsx
import { AspectRatio } from "@/components/ui/AspectRatio"

const sampleImages = [
  "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
  "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
  "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg",
  "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
  "https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg",
  "https://www.themealdb.com/images/media/meals/qtuwxu1468233098.jpg",
]
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5)
}
export default function HomeGrid() {
  const randomized = shuffle(sampleImages)
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto mt-10">
      {randomized.map((img, i) => (
        <div
          key={i}
          className={`overflow-hidden rounded-xl shadow-md ${
            i % 3 === 0 ? "col-span-2 row-span-2" : ""
          }`}
        >
          <AspectRatio ratio={1}>
            <img
              src={img}
              alt="food"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </AspectRatio>
        </div>
      ))}
    </div>
  )
}
