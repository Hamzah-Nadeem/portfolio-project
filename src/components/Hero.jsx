import { useState } from "react";
import { carouselSlides, projectInfo } from "../data/projects";
import ProjectCarousel from "./ProjectCarousel";

export default function Hero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = carouselSlides[currentSlideIndex];

  const handleSlideChange = (index) => {
    setCurrentSlideIndex(index);
  };

  return (
    <section
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000 relative"
      style={{
        backgroundImage: `url(${currentSlide.bgImage})`,
      }}
    >
      {/* Dark Overlay for better text visibility */}
      <div className="w-full min-h-screen bg-black/60">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Content */}
            <div>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white transition-all duration-500">
                Project {currentSlide.projectNumber}
              </h1>
              <p className="text-lg text-gray-300 mb-10 max-w-md">
                {projectInfo.description}
              </p>
              <button
                className={`${projectInfo.buttonColor} hover:opacity-90 px-8 py-3 rounded-lg font-semibold transition-all duration-300 text-white mb-12`}
              >
                {projectInfo.buttonText}
              </button>

              {/* Carousel Dots Navigation */}
              <div className="flex gap-3">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideChange(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === currentSlideIndex
                        ? "bg-white w-8"
                        : "bg-gray-600 hover:bg-gray-500 w-3"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Content - Carousel */}
            <div>
              <ProjectCarousel onSlideChange={handleSlideChange} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
