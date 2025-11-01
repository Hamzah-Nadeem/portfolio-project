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
        slidesPerView={2.4}
        centeredSlides={false} // Explicitly set to false
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
