// src/components/HomeGrid.jsx
import { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/AspectRatio";
import "@/font.css";
import IconCarousel from "./ui/IconCarousel";

const sampleImages = [
  "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
  "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
  "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg",
  "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
  "https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg",
  "https://www.themealdb.com/images/media/meals/qtuwxu1468233098.jpg",
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function HomeGrid() {
  const [randomized, setRandomized] = useState([]);

  useEffect(() => {
    setRandomized(shuffle(sampleImages));
  }, []);

  return (
    <section className="min-h-[80vh] min-w-auto flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-16 max-w-8xl mx-auto mt-0">
      {/* Left Section - Intro */}
      <div className="flex-1 text-center md:text-left space-y-8">
        <h1 className="text-7xl md:text-7xl lg:text-8xl leading-tight tracking-tight caveat-custom antialiased">
          Welcome to <br />
          <span className="text-shadow-red-400 caveat-custom antialiased">
            Recipidia
          </span>
        </h1>
        <div className="flex flex-col items-start">
       <p className="text-gray-600 text-lg md:text-xl text-justify max-w-lg poppins-regular ">
            Discover recipes instantly — just enter your ingredients and get
            delicious meal ideas within seconds and share them with friends.
          </p>
          <div className="flex items-center gap-2">
            <p className="text-gray-600 text-lg md:text-xl poppins-regular">
              Your personal recipe webpage.
            </p>
            <IconCarousel />
          </div>
        </div>
      </div>

      {/* Right Section - Bento Grid */}
      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl">
        {randomized.map((img, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-xl shadow-md ${
              i % 3 === 0 ? "md:col-span-2 md:row-span-2" : ""
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
    </section>
  );
}