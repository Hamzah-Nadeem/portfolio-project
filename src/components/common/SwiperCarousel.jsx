import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function SwiperCarousel({
  slides,
  onSlideChange,
  spaceBetween = 20,
  slidesPerView = 3,
  breakpoints,
  showPagination = true,
  showNavigation = false,
  paginationConfig,
  className = "",
  children,
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination, EffectCoverflow]}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={slidesPerView}
      coverflowEffect={{
        rotate: 0,
        stretch: 0, // keep it 0 for clean alignment
        depth: 150, // smaller depth to avoid extreme perspective
        modifier: 1, // controls how dramatic scaling is
        slideShadows: false,
      }}
      spaceBetween={spaceBetween}
      breakpoints={breakpoints}
      onSlideChange={(swiper) => onSlideChange?.(swiper.activeIndex)}
      pagination={
        showPagination ? { clickable: true, ...paginationConfig } : false
      }
      navigation={showNavigation}
      className={`swiper-pagination-custom ${
        showPagination ? paginationConfig?.paddingBottom || "!pb-16" : ""
      } ${className}`}
    >
      {slides?.map((slide, index) => (
        <SwiperSlide key={slide.id || index}>
          {children?.(slide, index)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
