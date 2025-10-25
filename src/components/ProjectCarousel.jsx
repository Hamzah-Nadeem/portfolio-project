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
        spaceBetween={4}
        slidesPerView={1.8} // Lower value = bigger slides
        breakpoints={{
          1024: {
            slidesPerView: 2.2, // Lower value = bigger slides
            spaceBetween: 30,
          },
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
