// src/components/ProjectCarousel.jsx
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import SwiperCarousel from "./common/SwiperCarousel";

export default function ProjectCarousel({ onSlideChange, activeIndex }) {
  return (
    <div className="w-full">
      <SwiperCarousel
        slides={projects}
        onSlideChange={onSlideChange}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          1024: { slidesPerView: 1.8 },
          1440: { slidesPerView: 2.2 },
        }}
        showPagination={true}
        paginationConfig={{ paddingBottom: "!pb-16" }}
        className="mb-8"
      >
        {(slide, index) => (
          <ProjectCard
            image={slide.image}
            index={index}
            isActive={index === activeIndex}
          />
        )}
      </SwiperCarousel>
    </div>
  );
}
