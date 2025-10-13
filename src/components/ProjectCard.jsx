export default function ProjectCard({ image, index }) {
  return (
    <div className="rounded-2xl overflow-hidden border-4 border-white shadow-lg hover:shadow-2xl transition-all duration-300">
      <img
        src={image}
        alt={`Project slide ${index}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
