import { useState, useEffect } from "react";
import { projects } from "../data/projects";
import ProjectCarousel from "./ProjectCarousel";

export default function Hero() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentProject = projects[currentProjectIndex];

  const goToProject = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentProjectIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    goToProject((currentProjectIndex + 1) % projects.length);
  };

  return (
    <section className="relative w-full min-h-screen pt-32 overflow-hidden">
      {/* Background Layers */}
      <div
        className={`absolute inset-0 ${
          currentProject.backgroundColor
        } transition-all duration-700 ${
          isTransitioning ? "opacity-50" : "opacity-100"
        }`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark/80" />

      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-128px)]">
          {/* Left Content */}
          <div
            className={`fade-enter ${
              isTransitioning ? "opacity-50" : "opacity-100"
            } transition-opacity duration-300`}
          >
            <h1 className="heading-xl mb-6">{currentProject.title}</h1>
            <p className="text-body mb-10 max-w-md">
              {currentProject.description}
            </p>
            <button onClick={goToNext} className="btn-primary mb-12">
              {currentProject.buttonText}
            </button>

            {/* Project Dots Navigation */}
            <div className="flex gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProjectIndex
                      ? "bg-accent w-8"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Content - Carousel */}
          <div
            className={`fade-enter ${
              isTransitioning ? "opacity-50" : "opacity-100"
            } transition-opacity duration-300`}
          >
            <ProjectCarousel
              currentProject={currentProject}
              onProjectChange={goToProject}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
