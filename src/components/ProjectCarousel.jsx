import ProjectCard from "./ProjectCard";
import { carouselSlides, projectInfo } from "../data/projects";
import SwiperCarousel from "./common/SwiperCarousel";

export default function ProjectCarousel({ onSlideChange }) {
  return (
    <div className="w-full">
      <SwiperCarousel
        slides={carouselSlides}
        onSlideChange={onSlideChange}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2.5 },
        }}
        showPagination={true}
        paginationConfig={{ paddingBottom: "!pb-16" }}
        className="mb-8"
      >
        {(slide, index) => <ProjectCard image={slide.image} index={index} />}
      </SwiperCarousel>

      <button
        className={`${projectInfo.buttonColor} hover:opacity-90 px-8 py-3 rounded-lg font-semibold transition-all duration-300 text-white`}
      >
        {projectInfo.buttonText}
      </button>
    </div>
  );
}
