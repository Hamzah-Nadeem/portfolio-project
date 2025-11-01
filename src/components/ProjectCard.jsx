export default function ProjectCard({ image, index, isActive }) {
  return (
    <div
      className={`transition-opacity duration-500 ease-in-out ${
        isActive ? "opacity-100 z-20" : "opacity-80 z-10"
      } flex justify-center items-center overflow-visible`}
    >
      <img
        src={image}
        alt={`Project slide ${index}`}
        className="w-full h-full object-cover rounded-2xl shadow-xl"
      />
    </div>
  );
}
