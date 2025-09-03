import React, { useState, useEffect } from 'react';
import { CookingPot, ChefHat, Croissant, Microwave, Hamburger, Cookie } from 'lucide-react';

// Array of icons to cycle through
const icons = [
  CookingPot,
  ChefHat,
  Croissant,
  Microwave,
  Hamburger,
  Cookie,
];

export default function IconCarousel() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle through the icons
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 800);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs once on mount

  const IconComponent = icons[currentIconIndex];

  return (
    <div className="flex justify-center items-center ">
      <div className="text-red-500 transition-opacity duration-800">
        <IconComponent size={24.5} />
      </div>
    </div>
  );
}