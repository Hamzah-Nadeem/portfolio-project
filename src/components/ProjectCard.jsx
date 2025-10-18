export default function ProjectCard({ image, index, isActive }) {
  return (
    <div
      className={`transition-transform duration-500 ease-in-out ${
        isActive ? " z-20" : "scale-90 opacity-80 z-10"
      } flex justify-center items-center overflow-visible`}
    >
      <img
        src={image}
        alt={`Project slide ${index}`}
        className="w-full h-full object-contain rounded-2xl shadow-xl transition-transform duration-500 ease-in-out"
      />
    </div>
  );
}
