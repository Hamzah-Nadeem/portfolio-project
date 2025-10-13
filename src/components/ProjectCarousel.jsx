import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProjectCard from "./ProjectCard";

export default function ProjectCarousel({ currentProject, onProjectChange }) {
  const swiperRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const buttonColors = {
    accent: "bg-blue-500 hover:bg-blue-600",
    success: "bg-green-500 hover:bg-green-600",
    warning: "bg-orange-500 hover:bg-orange-600",
  };

  return (
    <div className="w-full">
      {/* Image Carousel */}
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2.5 },
        }}
        onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
        pagination={{ clickable: true }}
        className="mb-8"
      >
        {currentProject.images.map((image, index) => (
          <SwiperSlide key={index}>
            <ProjectCard image={image} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Button */}
      <button
        className={`btn-primary ${
          buttonColors[currentProject.buttonColor]
        } px-8 py-3 rounded-lg font-semibold transition-all duration-300`}
      >
        {currentProject.buttonText}
      </button>
    </div>
  );
}
