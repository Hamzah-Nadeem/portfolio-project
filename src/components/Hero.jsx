import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { carouselSlides } from "../data/projects";
import ProjectCarousel from "./ProjectCarousel";
import Container from "./common/container";

export default function Hero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = carouselSlides[currentSlideIndex];

  const handleSlideChange = (index) => setCurrentSlideIndex(index);

  const headingVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
  };

  return (
    <section
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000 relative"
      style={{ backgroundImage: `url(${currentSlide.bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <Container
        className="relative z-10"
        style={{
          marginInlineStart: "calc((100% - 1260px) / 2)",
          width: "auto",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 min-h-screen py-24">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="overflow-hidden h-[80px] mb-6">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentSlide.projectNumber}
                  variants={headingVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="text-5xl md:text-6xl font-bold text-white"
                >
                  {currentSlide.projectNumber}
                </motion.h1>
              </AnimatePresence>
            </div>

            <p className="text-lg text-gray-300 mb-10 max-w-md mx-auto lg:mx-0">
              {currentSlide.description}
            </p>

            <button
              className={`${currentSlide.buttonColor} hover:opacity-90 px-8 py-3 rounded-lg font-semibold text-white transition-colors duration-500`}
            >
              View Project
            </button>
          </div>

          {/* Right: Carousel */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-[900px] overflow-visible">
            <ProjectCarousel
              onSlideChange={handleSlideChange}
              activeIndex={currentSlideIndex}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
