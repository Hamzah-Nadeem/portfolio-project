import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProjectCard from "./ProjectCard";
import { carouselSlides, projectInfo } from "../data/projects";

export default function ProjectCarousel({ onSlideChange }) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2.5 },
        }}
        onSlideChange={(swiper) => {
          onSlideChange(swiper.activeIndex);
        }}
        pagination={{ clickable: true }}
        className="mb-8"
      >
        {carouselSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <ProjectCard image={slide.image} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className={`${projectInfo.buttonColor} hover:opacity-90 px-8 py-3 rounded-lg font-semibold transition-all duration-300 text-white`}
      >
        {projectInfo.buttonText}
      </button>
    </div>
  );
}
